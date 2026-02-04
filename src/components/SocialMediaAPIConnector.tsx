import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { motion } from 'motion/react';
import { Link2, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

interface SocialMediaAPIConnectorProps {
  platform: string;
  username: string;
  onFetchComplete: (comments: Comment[]) => void;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: number;
}

/**
 * IMPORTANT: Social Media API Integration Guide
 * 
 * This component provides a framework for connecting to real social media APIs.
 * To enable real data fetching, you'll need to:
 * 
 * INSTAGRAM:
 * - Register app at developers.facebook.com
 * - Get Instagram Basic Display API or Instagram Graph API access
 * - Obtain Access Token with instagram_basic and instagram_manage_comments scopes
 * - API Endpoint: https://graph.instagram.com/me/media?fields=comments{text,username,timestamp}
 * 
 * TWITTER/X:
 * - Apply for Twitter Developer Account at developer.twitter.com
 * - Create App and get API Key, API Secret, Bearer Token
 * - Use Twitter API v2 with tweets endpoint
 * - API Endpoint: https://api.twitter.com/2/tweets/:id/replies
 * 
 * FACEBOOK:
 * - Use Facebook Graph API
 * - Get Page Access Token from developers.facebook.com
 * - API Endpoint: https://graph.facebook.com/v18.0/{post-id}/comments
 * 
 * YOUTUBE:
 * - Enable YouTube Data API v3 in Google Cloud Console
 * - Get API Key from console.cloud.google.com
 * - API Endpoint: https://www.googleapis.com/youtube/v3/commentThreads
 * 
 * LINKEDIN:
 * - Create LinkedIn App at linkedin.com/developers
 * - Get Client ID and Client Secret
 * - Use OAuth 2.0 for authentication
 * - API Endpoint: https://api.linkedin.com/v2/socialActions/{share-urn}/comments
 */

export function SocialMediaAPIConnector({ platform, username, onFetchComplete }: SocialMediaAPIConnectorProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const getAPIInstructions = () => {
    const instructions: Record<string, { name: string; url: string; steps: string[] }> = {
      instagram: {
        name: 'Instagram Graph API',
        url: 'https://developers.facebook.com/docs/instagram-api',
        steps: [
          'Create Facebook Developer Account',
          'Register your app and add Instagram product',
          'Get User Access Token with instagram_basic scope',
          'Use /me/media endpoint to fetch posts and comments'
        ]
      },
      twitter: {
        name: 'Twitter API v2',
        url: 'https://developer.twitter.com/en/docs/twitter-api',
        steps: [
          'Apply for Twitter Developer Account',
          'Create a new App in Developer Portal',
          'Generate Bearer Token',
          'Use /tweets/:id endpoint to fetch tweet replies'
        ]
      },
      facebook: {
        name: 'Facebook Graph API',
        url: 'https://developers.facebook.com/docs/graph-api',
        steps: [
          'Create Facebook App',
          'Get Page Access Token',
          'Request pages_read_engagement permission',
          'Use /{post-id}/comments endpoint'
        ]
      },
      youtube: {
        name: 'YouTube Data API v3',
        url: 'https://developers.google.com/youtube/v3',
        steps: [
          'Enable YouTube Data API in Google Cloud Console',
          'Create API Key or OAuth 2.0 credentials',
          'Use commentThreads.list method',
          'Filter by video ID to get comments'
        ]
      },
      linkedin: {
        name: 'LinkedIn API',
        url: 'https://docs.microsoft.com/en-us/linkedin/',
        steps: [
          'Create LinkedIn App',
          'Implement OAuth 2.0 authentication',
          'Request r_liteprofile and w_member_social scopes',
          'Use Social Actions API for comments'
        ]
      }
    };

    return instructions[platform] || instructions.instagram;
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setError('');

    // Simulate API connection with mock data
    // In production, replace this with actual API calls
    setTimeout(() => {
      // Generate mock comments for demonstration
      const mockComments: Comment[] = generateMockComments(platform, username);
      
      setIsConnected(true);
      setIsConnecting(false);
      onFetchComplete(mockComments);
    }, 2000);
  };

  const instructions = getAPIInstructions();

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-primary/30 shadow-lg">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Link2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Connect to {instructions.name}</h3>
              <p className="text-sm text-muted-foreground">Fetch comments from @{username}</p>
            </div>
          </div>
        </div>

        {/* Demo Mode Alert */}
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <AlertCircle className="w-4 h-4 text-blue-500" />
          <AlertDescription className="text-sm">
            <strong>Demo Mode:</strong> Using simulated data. To fetch real comments, configure API credentials below.
          </AlertDescription>
        </Alert>

        {/* API Key Input */}
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key / Access Token</Label>
          <Input
            id="api-key"
            type="password"
            placeholder={`Enter your ${platform} API key`}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="bg-background/50 border-primary/20"
            disabled={isConnected}
          />
          <a
            href={instructions.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Get API credentials <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Setup Instructions */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Setup Steps:</Label>
          <div className="space-y-2">
            {instructions.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Badge variant="secondary" className="mt-0.5 min-w-[24px] h-5 flex items-center justify-center">
                  {index + 1}
                </Badge>
                <p className="text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Connect Button */}
        <Button
          onClick={handleConnect}
          disabled={isConnecting || isConnected}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isConnected && <Check className="w-4 h-4 mr-2" />}
          {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Fetch Comments'}
        </Button>

        {isConnected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-500">Successfully Connected</p>
              <p className="text-sm text-muted-foreground">Comments fetched and ready for analysis</p>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

// Mock data generator for demonstration
function generateMockComments(platform: string, username: string): Comment[] {
  const positiveComments = [
    'This is absolutely amazing! Love it! 😍❤️',
    'Great content as always! Keep it up! 👏✨',
    'Beautiful post! Really inspiring 🌟',
    'Wow! This made my day! Thank you! 🙏💕',
    'Stunning work! Absolutely love this 💯🔥',
    'This is so good! Can\'t wait for more! 😊',
    'Incredible! Best thing I\'ve seen today! ⭐',
    'Love your content! Always amazing! ❤️😍',
    'Perfect! Exactly what I needed to see! 🎉',
    'Outstanding work! Very impressive! 👌✨'
  ];

  const negativeComments = [
    'Not really feeling this one 😕',
    'Disappointed with this post 😞',
    'Could be much better honestly 👎',
    'This is not good at all 😠',
    'Expected more from you 😔',
    'Not your best work 😐',
    'Waste of time 😤',
    'Really? This is what you post? 🙄'
  ];

  const neutralComments = [
    'Interesting perspective 🤔',
    'Okay I guess',
    'Hmm, not sure about this one',
    'Seen better, seen worse',
    'It\'s alright 😐',
    'Meh 🤷',
    'Thoughts on this? 💭',
    'What do others think?'
  ];

  const allComments = [
    ...positiveComments.slice(0, 15),
    ...negativeComments.slice(0, 4),
    ...neutralComments.slice(0, 6)
  ];

  return allComments.map((text, index) => ({
    id: `comment-${index}`,
    text,
    author: `@user${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: Math.floor(Math.random() * 50),
    replies: Math.floor(Math.random() * 10)
  }));
}