import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SentimentChart } from './SentimentChart';
import { MentionsTable } from './MentionsTable';
import { PlatformBreakdown } from './PlatformBreakdown';
import { CommentAnalyzer } from './CommentAnalyzer';
import { RecommendationEngine } from './RecommendationEngine';
import { SentimentVisualization3D } from './SentimentVisualization3D';
import { AutoAnalysisCard } from './AutoAnalysisCard';
import { FeatureShowcase } from './FeatureShowcase';
import { EnhancedRecommendationEngine } from './EnhancedRecommendationEngine';
import { SocialMediaAPIConnector } from './SocialMediaAPIConnector';
import { CommentAnalyticsDashboard } from './CommentAnalyticsDashboard';
import { VisualContentRecommendations } from './VisualContentRecommendations';
import { analyzeTextWithEmojis } from './EmojiSentimentAnalyzer';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, MessageSquare, Heart, AlertCircle, Sparkles, BarChart3, ArrowLeft } from 'lucide-react';

interface Mention {
  id: string;
  text: string;
  sentiment: number;
  platform: string;
  author: string;
  timestamp: string;
  keywords: string[];
  engagement: number;
}

interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  keywords: string[];
  emotions: { emotion: string; score: number }[];
}

interface OnboardingData {
  platform: string;
  username: string;
  analysisMode: 'upload-media' | 'fetch-comments' | 'manual-entry';
  mediaFile?: File;
  commentsFile?: File;
  manualComments?: string;
  postDescription?: string;
}

interface SentimentDashboardProps {
  onboardingData?: OnboardingData;
  onShowPricing?: () => void;
  onBack?: () => void;
}

// Mock data for brand mentions
const mockMentions: Mention[] = [
  {
    id: '1',
    text: 'Just tried the new product from @brand and I absolutely love it! Amazing quality and great customer service.',
    sentiment: 0.8,
    platform: 'Twitter',
    author: '@happycustomer',
    timestamp: '2024-01-15T10:30:00Z',
    keywords: ['product', 'quality', 'customer service'],
    engagement: 45
  },
  {
    id: '2',
    text: 'Disappointed with my recent purchase. The delivery was late and the product quality was poor.',
    sentiment: -0.6,
    platform: 'Instagram',
    author: '@dissatisfied_user',
    timestamp: '2024-01-15T09:15:00Z',
    keywords: ['delivery', 'quality', 'purchase'],
    engagement: 23
  },
  {
    id: '3',
    text: 'Good value for money. Nothing spectacular but does the job well.',
    sentiment: 0.3,
    platform: 'Review Site',
    author: 'john_reviewer',
    timestamp: '2024-01-15T08:45:00Z',
    keywords: ['value', 'money'],
    engagement: 12
  },
  {
    id: '4',
    text: 'Excellent customer support! They resolved my issue within minutes. Highly recommend!',
    sentiment: 0.9,
    platform: 'Twitter',
    author: '@satisfied_buyer',
    timestamp: '2024-01-15T07:20:00Z',
    keywords: ['customer support', 'recommend'],
    engagement: 67
  },
  {
    id: '5',
    text: 'The website is confusing and hard to navigate. Took me forever to find what I was looking for.',
    sentiment: -0.4,
    platform: 'Review Site',
    author: 'user_feedback',
    timestamp: '2024-01-15T06:00:00Z',
    keywords: ['website', 'navigation'],
    engagement: 8
  },
  {
    id: '6',
    text: 'It\'s okay, nothing special. Average experience overall.',
    sentiment: 0.05,
    platform: 'Facebook',
    author: 'neutral_user1',
    timestamp: '2024-01-14T15:20:00Z',
    keywords: ['average', 'okay'],
    engagement: 5
  },
  {
    id: '7',
    text: 'Received the product. It works as described.',
    sentiment: -0.05,
    platform: 'Twitter',
    author: '@product_reviewer',
    timestamp: '2024-01-14T14:10:00Z',
    keywords: ['product', 'works'],
    engagement: 3
  },
  {
    id: '8',
    text: 'This is terrible! Complete waste of money and time!',
    sentiment: -0.9,
    platform: 'Instagram',
    author: '@angry_customer',
    timestamp: '2024-01-14T13:00:00Z',
    keywords: ['terrible', 'waste'],
    engagement: 34
  },
  {
    id: '9',
    text: 'Standard quality. Met my basic expectations.',
    sentiment: 0.1,
    platform: 'Facebook',
    author: 'neutral_user2',
    timestamp: '2024-01-14T12:30:00Z',
    keywords: ['standard', 'expectations'],
    engagement: 7
  },
  {
    id: '10',
    text: 'Pretty bad experience. Would not buy again.',
    sentiment: -0.5,
    platform: 'Review Site',
    author: 'disappointed_buyer',
    timestamp: '2024-01-14T11:00:00Z',
    keywords: ['bad', 'experience'],
    engagement: 15
  },
  {
    id: '11',
    text: 'Amazing! Best purchase I\'ve made this year! Highly recommended!',
    sentiment: 0.95,
    platform: 'Twitter',
    author: '@enthusiast',
    timestamp: '2024-01-14T10:00:00Z',
    keywords: ['amazing', 'best', 'recommend'],
    engagement: 89
  },
  {
    id: '12',
    text: 'No strong feelings either way. It does what it says.',
    sentiment: 0.0,
    platform: 'Instagram',
    author: 'neutral_reviewer',
    timestamp: '2024-01-14T09:30:00Z',
    keywords: ['neutral', 'does'],
    engagement: 2
  },
  {
    id: '13',
    text: 'Poor quality control. Multiple defects found.',
    sentiment: -0.7,
    platform: 'Review Site',
    author: 'quality_checker',
    timestamp: '2024-01-14T08:00:00Z',
    keywords: ['poor', 'quality', 'defects'],
    engagement: 28
  },
  {
    id: '14',
    text: 'Absolutely fantastic! Exceeded all my expectations!',
    sentiment: 0.85,
    platform: 'Facebook',
    author: 'happy_customer2',
    timestamp: '2024-01-14T07:00:00Z',
    keywords: ['fantastic', 'exceeded'],
    engagement: 52
  },
  {
    id: '15',
    text: 'Meh. Not impressed but not disappointed either.',
    sentiment: -0.1,
    platform: 'Twitter',
    author: '@meh_reviewer',
    timestamp: '2024-01-14T06:00:00Z',
    keywords: ['meh', 'not impressed'],
    engagement: 4
  }
];

interface FetchedComment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: number;
}

export function SentimentDashboard({ onboardingData, onShowPricing, onBack }: SentimentDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sentimentFilter, setSentimentFilter] = useState('all');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAutoAnalyzing, setIsAutoAnalyzing] = useState(false);
  const [hasEmojis, setHasEmojis] = useState(false);
  const [fetchedComments, setFetchedComments] = useState<FetchedComment[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const filteredMentions = useMemo(() => {
    return mockMentions.filter(mention => {
      const matchesSearch = mention.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mention.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlatform = platformFilter === 'all' || mention.platform === platformFilter;
      const matchesSentiment = sentimentFilter === 'all' || 
                              (sentimentFilter === 'positive' && mention.sentiment > 0.2) ||
                              (sentimentFilter === 'negative' && mention.sentiment < -0.2) ||
                              (sentimentFilter === 'neutral' && mention.sentiment >= -0.2 && mention.sentiment <= 0.2);
      
      return matchesSearch && matchesPlatform && matchesSentiment;
    });
  }, [searchTerm, platformFilter, sentimentFilter]);

  const sentimentStats = useMemo(() => {
    const total = filteredMentions.length;
    const positive = filteredMentions.filter(m => m.sentiment > 0.2).length;
    const negative = filteredMentions.filter(m => m.sentiment < -0.2).length;
    const neutral = total - positive - negative;
    const avgSentiment = filteredMentions.reduce((sum, m) => sum + m.sentiment, 0) / total;
    
    return { total, positive, negative, neutral, avgSentiment };
  }, [filteredMentions]);

  const getSentimentLabel = (score: number) => {
    if (score > 0.2) return 'Positive';
    if (score < -0.2) return 'Negative';
    return 'Neutral';
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.2) return 'bg-green-500';
    if (score < -0.2) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  const handleCommentsFetched = (comments: FetchedComment[]) => {
    setFetchedComments(comments);
    setShowAnalytics(true);
    
    // Also analyze the fetched comments
    const analyses = comments.map(comment => analyzeTextWithEmojis(comment.text));
    const avgScore = analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length;
    const hasAnyEmojis = analyses.some(a => a.hasEmojis);
    
    const positiveCount = analyses.filter(a => a.sentiment === 'positive').length;
    const negativeCount = analyses.filter(a => a.sentiment === 'negative').length;
    
    let overallSentiment: 'positive' | 'negative' | 'neutral';
    if (positiveCount > negativeCount) {
      overallSentiment = 'positive';
    } else if (negativeCount > positiveCount) {
      overallSentiment = 'negative';
    } else {
      overallSentiment = 'neutral';
    }

    setHasEmojis(hasAnyEmojis);
    
    const emotions = [
      { emotion: 'Joy', score: overallSentiment === 'positive' ? avgScore * 100 : 30 },
      { emotion: 'Trust', score: overallSentiment === 'positive' ? 75 : 40 },
      { emotion: 'Anticipation', score: 65 },
      { emotion: 'Surprise', score: overallSentiment === 'negative' ? 55 : 35 },
      { emotion: 'Sadness', score: overallSentiment === 'negative' ? avgScore * 100 : 20 },
    ];

    setAnalysisResult({
      sentiment: overallSentiment,
      score: avgScore,
      keywords: ['engagement', 'social', 'content', 'audience', 'reaction'],
      emotions
    });
  };

  // Auto-analyze onboarding data
  useEffect(() => {
    if (onboardingData && !analysisResult) {
      setIsAutoAnalyzing(true);
      
      // Process based on analysis mode
      setTimeout(() => {
        let contentToAnalyze = '';
        let commentsToAnalyze: string[] = [];

        if (onboardingData.analysisMode === 'upload-media') {
          contentToAnalyze = onboardingData.postDescription || 'User uploaded media content';
        } else if (onboardingData.analysisMode === 'fetch-comments') {
          // Simulate fetched comments
          commentsToAnalyze = [
            'Love this! 😍 Amazing content',
            'Great post! Keep it up 👏',
            'Not really my thing 😕',
            'Beautiful work! ✨❤️',
            'This is terrible 😠'
          ];
        } else if (onboardingData.analysisMode === 'manual-entry') {
          if (onboardingData.manualComments) {
            commentsToAnalyze = onboardingData.manualComments.split('\n').filter(c => c.trim());
          }
        }

        // If we have comments, analyze them
        if (commentsToAnalyze.length > 0) {
          const analyses = commentsToAnalyze.map(comment => analyzeTextWithEmojis(comment));
          const avgScore = analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length;
          const hasAnyEmojis = analyses.some(a => a.hasEmojis);
          
          const positiveCount = analyses.filter(a => a.sentiment === 'positive').length;
          const negativeCount = analyses.filter(a => a.sentiment === 'negative').length;
          
          let overallSentiment: 'positive' | 'negative' | 'neutral';
          if (positiveCount > negativeCount) {
            overallSentiment = 'positive';
          } else if (negativeCount > positiveCount) {
            overallSentiment = 'negative';
          } else {
            overallSentiment = 'neutral';
          }

          setHasEmojis(hasAnyEmojis);
          
          const emotions = [
            { emotion: 'Joy', score: overallSentiment === 'positive' ? avgScore * 100 : 30 },
            { emotion: 'Trust', score: overallSentiment === 'positive' ? 75 : 40 },
            { emotion: 'Anticipation', score: 65 },
            { emotion: 'Surprise', score: overallSentiment === 'negative' ? 55 : 35 },
            { emotion: 'Sadness', score: overallSentiment === 'negative' ? avgScore * 100 : 20 },
          ];

          setAnalysisResult({
            sentiment: overallSentiment,
            score: avgScore,
            keywords: ['engagement', 'social', 'content', 'audience', 'reaction'],
            emotions
          });
        } else if (contentToAnalyze) {
          // Analyze post description
          const analysis = analyzeTextWithEmojis(contentToAnalyze);
          setHasEmojis(analysis.hasEmojis);

          const words = contentToAnalyze.split(/\s+/);
          const keywords = words.filter(w => w.length > 5).slice(0, 5);

          const emotions = [
            { emotion: 'Joy', score: analysis.sentiment === 'positive' ? analysis.score * 100 : 30 },
            { emotion: 'Trust', score: analysis.sentiment === 'positive' ? 75 : 40 },
            { emotion: 'Anticipation', score: 65 },
            { emotion: 'Surprise', score: analysis.sentiment === 'negative' ? 55 : 35 },
            { emotion: 'Sadness', score: analysis.sentiment === 'negative' ? analysis.score * 100 : 20 },
          ];

          setAnalysisResult({
            sentiment: analysis.sentiment,
            score: analysis.score,
            keywords: keywords.length > 0 ? keywords : ['content', 'post', 'media'],
            emotions
          });
        }

        setIsAutoAnalyzing(false);
      }, 2500);
    }
  }, [onboardingData, analysisResult]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="p-6 space-y-6 max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="outline"
                  size="icon"
                  className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h2>AI-Powered Sentiment Analysis</h2>
                {onboardingData?.username && (
                  <p className="text-sm text-muted-foreground">Welcome, @{onboardingData.username}</p>
                )}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">
            Get AI-driven recommendations to maximize your social media engagement
          </p>
        </motion.div>

        {/* Auto Analysis Banner */}
        {isAutoAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-4 flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <p>Analyzing your post with AI... Please wait</p>
          </motion.div>
        )}

        {/* Social Media API Connector - show only for fetch-comments mode */}
        {onboardingData?.analysisMode === 'fetch-comments' && !showAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SocialMediaAPIConnector
              platform={onboardingData.platform}
              username={onboardingData.username}
              onFetchComplete={handleCommentsFetched}
            />
          </motion.div>
        )}

        {/* Comment Analytics Dashboard - show after fetching comments */}
        {showAnalytics && fetchedComments.length > 0 && (
          <>
            <Tabs defaultValue="analytics" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="analytics">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics & Charts
                </TabsTrigger>
                <TabsTrigger value="recommendations">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Visual Recommendations
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6 mt-6">
                <CommentAnalyticsDashboard
                  comments={fetchedComments}
                  platform={onboardingData?.platform || 'instagram'}
                />
              </TabsContent>

              <TabsContent value="recommendations" className="mt-6">
                {analysisResult && fetchedComments.length > 0 && (() => {
                  const analyses = fetchedComments.map(c => analyzeTextWithEmojis(c.text));
                  const positiveCount = analyses.filter(a => a.sentiment === 'positive').length;
                  const negativeCount = analyses.filter(a => a.sentiment === 'negative').length;
                  const neutralCount = analyses.filter(a => a.sentiment === 'neutral').length;
                  const total = analyses.length;
                  
                  return (
                    <VisualContentRecommendations
                      platform={onboardingData?.platform || 'instagram'}
                      positivePercent={(positiveCount / total) * 100}
                      negativePercent={(negativeCount / total) * 100}
                      neutralPercent={(neutralCount / total) * 100}
                    />
                  );
                })()}
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* AI Analysis Section - show for other modes */}
        {!showAnalytics && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Show auto-analysis card when analyzing */}
            {isAutoAnalyzing && onboardingData && (
              <div className="lg:col-span-3">
                <AutoAnalysisCard postContent={
                  onboardingData.postDescription || 
                  onboardingData.manualComments ||
                  `Analyzing ${onboardingData.analysisMode === 'upload-media' ? 'uploaded media' : onboardingData.analysisMode === 'fetch-comments' ? 'fetched comments' : 'manual comments'}`
                } />
              </div>
            )}

            {/* Show manual analyzer when not auto-analyzing */}
            {!isAutoAnalyzing && (
              <div className="lg:col-span-1">
                <CommentAnalyzer onAnalysisComplete={handleAnalysisComplete} />
              </div>
            )}
            
            {analysisResult && !isAutoAnalyzing && (
              <>
                <div className="lg:col-span-1">
                  <SentimentVisualization3D
                    sentiment={analysisResult.sentiment}
                    score={analysisResult.score}
                    emotions={analysisResult.emotions}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <EnhancedRecommendationEngine
                    sentiment={analysisResult.sentiment}
                    score={analysisResult.score}
                    platform={onboardingData?.platform || 'instagram'}
                    analysisMode={onboardingData?.analysisMode || 'manual-entry'}
                    hasEmojis={hasEmojis}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Feature Showcase - only show if no analysis is happening */}
        {!isAutoAnalyzing && !analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FeatureShowcase />
          </motion.div>
        )}

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Mentions</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sentimentStats.total}</div>
              <p className="text-xs text-muted-foreground">
                Last 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-green-500/20 shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positive</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{sentimentStats.positive}</div>
              <p className="text-xs text-muted-foreground">
                {sentimentStats.total > 0 ? Math.round((sentimentStats.positive / sentimentStats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-red-500/20 shadow-lg hover:shadow-xl hover:shadow-red-500/10 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negative</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{sentimentStats.negative}</div>
              <p className="text-xs text-muted-foreground">
                {sentimentStats.total > 0 ? Math.round((sentimentStats.negative / sentimentStats.total) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/50 border-accent/20 shadow-lg hover:shadow-xl hover:shadow-accent/10 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Sentiment</CardTitle>
              <Heart className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sentimentStats.total > 0 ? sentimentStats.avgSentiment.toFixed(2) : '0.00'}
              </div>
              <p className="text-xs text-muted-foreground">
                {getSentimentLabel(sentimentStats.avgSentiment)} overall
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Input
                placeholder="Search mentions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs bg-background/50 border-primary/20"
              />
              
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-40 bg-background/50 border-primary/20">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Review Site">Review Site</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                <SelectTrigger className="w-40 bg-background/50 border-primary/20">
                  <SelectValue placeholder="Sentiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sentiment</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-card/50 border border-primary/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="mentions">Mentions</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SentimentChart mentions={filteredMentions} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <PlatformBreakdown mentions={filteredMentions} />
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="mentions" className="space-y-4">
              <MentionsTable mentions={filteredMentions} />
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Sentiment Trends</CardTitle>
                  <CardDescription>
                    Sentiment analysis over time (coming soon)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                      <p>Trend analysis will be available with more data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}