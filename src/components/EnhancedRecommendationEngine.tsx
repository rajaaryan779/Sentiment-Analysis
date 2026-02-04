import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Lightbulb, TrendingUp, Target, Clock, Users, MessageSquare, Hash, Image as ImageIcon, Sparkles } from 'lucide-react';

interface EnhancedRecommendationEngineProps {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  platform: string;
  analysisMode: string;
  hasEmojis?: boolean;
}

export function EnhancedRecommendationEngine({
  sentiment,
  score,
  platform,
  analysisMode,
  hasEmojis
}: EnhancedRecommendationEngineProps) {
  
  const getRecommendations = () => {
    const base = {
      positive: {
        title: '🎉 Great Content Potential!',
        color: 'from-green-500 to-emerald-500',
        icon: TrendingUp,
        strategies: [
          {
            category: 'Timing',
            icon: Clock,
            tip: 'Post during peak hours (6-9 PM) when your audience is most active',
            impact: 'high'
          },
          {
            category: 'Hashtags',
            icon: Hash,
            tip: `Use trending ${platform} hashtags related to your content theme`,
            impact: 'high'
          },
          {
            category: 'Engagement',
            icon: Users,
            tip: 'Ask a question in your caption to encourage comments',
            impact: 'medium'
          },
          {
            category: 'Visuals',
            icon: ImageIcon,
            tip: 'Your content resonates well! Consider creating a carousel post',
            impact: 'medium'
          }
        ]
      },
      negative: {
        title: '⚠️ Content Optimization Needed',
        color: 'from-red-500 to-orange-500',
        icon: Target,
        strategies: [
          {
            category: 'Content Reframe',
            icon: Sparkles,
            tip: 'Reframe your message to focus on positive aspects and solutions',
            impact: 'high'
          },
          {
            category: 'Authenticity',
            icon: MessageSquare,
            tip: 'Share a personal story or behind-the-scenes content to connect emotionally',
            impact: 'high'
          },
          {
            category: 'Visual Appeal',
            icon: ImageIcon,
            tip: 'Consider brighter colors and more engaging imagery',
            impact: 'medium'
          },
          {
            category: 'Timing',
            icon: Clock,
            tip: 'Wait for a better moment - avoid posting during low-engagement periods',
            impact: 'medium'
          }
        ]
      },
      neutral: {
        title: '💡 Room for Improvement',
        color: 'from-yellow-500 to-amber-500',
        icon: Lightbulb,
        strategies: [
          {
            category: 'Add Emotion',
            icon: Sparkles,
            tip: 'Include more emotional triggers and compelling storytelling',
            impact: 'high'
          },
          {
            category: 'Call-to-Action',
            icon: Users,
            tip: 'Add a clear call-to-action to drive engagement',
            impact: 'high'
          },
          {
            category: 'Hashtags',
            icon: Hash,
            tip: 'Expand your reach with 10-15 relevant hashtags',
            impact: 'medium'
          },
          {
            category: 'Visuals',
            icon: ImageIcon,
            tip: 'Make your visual content pop with contrast and bold elements',
            impact: 'medium'
          }
        ]
      }
    };

    return base[sentiment];
  };

  const getPlatformSpecificTips = () => {
    const tips: Record<string, string[]> = {
      instagram: [
        'Use Instagram Stories to tease your main post',
        'Leverage Reels for 10x more reach',
        'Save as a highlight if it performs well',
        'Engage with similar accounts to boost visibility'
      ],
      twitter: [
        'Thread your thoughts for better engagement',
        'Reply to trending topics related to your content',
        'Use 2-3 hashtags maximum',
        'Post during commute hours (7-9 AM, 5-7 PM)'
      ],
      facebook: [
        'Go live before posting for algorithm boost',
        'Tag relevant pages and people',
        'Use Facebook Groups to share',
        'Enable reactions and comments'
      ],
      linkedin: [
        'Write in a professional yet personal tone',
        'Use line breaks for readability',
        'Tag industry leaders for visibility',
        'Post on Tuesday-Thursday mornings'
      ],
      youtube: [
        'Create an eye-catching thumbnail',
        'Front-load your video with hooks',
        'Use end screens for more engagement',
        'Pin a comment to start discussion'
      ]
    };

    return tips[platform] || tips.instagram;
  };

  const getEmojiTips = () => {
    if (!hasEmojis) {
      return [
        '😊 Add emojis to your caption for 15% more engagement',
        '🎨 Use emojis as visual breaks in longer captions',
        '✨ Emoji in the first line increases click-through rates'
      ];
    }
    return [
      '🔥 Great emoji usage! Keep it consistent',
      '💯 Your emoji game is strong - audiences love it',
      '⭐ Emojis are boosting your engagement potential'
    ];
  };

  const recommendations = getRecommendations();
  const platformTips = getPlatformSpecificTips();
  const emojiTips = getEmojiTips();
  const Icon = recommendations.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-primary/30 shadow-[0_8px_32px_rgba(239,68,68,0.2)] backdrop-blur-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-br ${recommendations.color} shadow-lg`}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{recommendations.title}</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered recommendations to maximize your {platform} engagement
              </p>
            </div>
            <Badge className={`bg-gradient-to-r ${recommendations.color} border-0 text-white`}>
              {Math.round(score * 100)}% Score
            </Badge>
          </div>

          {/* Main Strategies */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Content Strategy
            </h4>
            {recommendations.strategies.map((strategy, index) => {
              const StrategyIcon = strategy.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 bg-background/30 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        className="p-2 rounded-lg bg-primary/10 border border-primary/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <StrategyIcon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium">{strategy.category}</h5>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              strategy.impact === 'high'
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted'
                            }`}
                          >
                            {strategy.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{strategy.tip}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Platform-Specific Tips */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              {platform.charAt(0).toUpperCase() + platform.slice(1)}-Specific Tips
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {platformTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emoji Tips */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Emoji Strategy
            </h4>
            <div className="space-y-2">
              {emojiTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {tip}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Best Time to Post */}
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Optimal Posting Time</p>
                <p className="text-sm text-muted-foreground">
                  Based on {platform} trends: {
                    platform === 'instagram' ? '6-9 PM weekdays' :
                    platform === 'twitter' ? '8-10 AM or 6-9 PM' :
                    platform === 'linkedin' ? 'Tuesday-Thursday, 7-9 AM' :
                    platform === 'facebook' ? '1-4 PM weekdays' :
                    '2-4 PM weekends'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </motion.div>
  );
}