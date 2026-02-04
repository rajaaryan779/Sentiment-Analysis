import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Lightbulb, Target, Clock, Image as ImageIcon, Zap } from 'lucide-react';

interface Recommendation {
  id: string;
  type: 'timing' | 'content' | 'visual' | 'engagement';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  icon: any;
}

interface RecommendationEngineProps {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
}

export function RecommendationEngine({ sentiment, score }: RecommendationEngineProps) {
  const generateRecommendations = (): Recommendation[] => {
    const baseRecommendations: Recommendation[] = [];

    if (sentiment === 'positive') {
      baseRecommendations.push(
        {
          id: '1',
          type: 'timing',
          title: 'Post During Peak Engagement Hours',
          description: 'Your audience responds well to your content. Schedule posts between 6-9 PM for maximum reach.',
          impact: 'high',
          icon: Clock,
        },
        {
          id: '2',
          type: 'content',
          title: 'Amplify Success Stories',
          description: 'Share more behind-the-scenes content and customer testimonials. Your audience loves authentic stories.',
          impact: 'high',
          icon: Target,
        },
        {
          id: '3',
          type: 'visual',
          title: 'Use Bright, Vibrant Colors',
          description: 'Photos with warm tones and high contrast generate 40% more engagement from your audience.',
          impact: 'medium',
          icon: ImageIcon,
        },
        {
          id: '4',
          type: 'engagement',
          title: 'Interactive Content Works',
          description: 'Add polls, questions, and calls-to-action. Your engaged audience wants to participate.',
          impact: 'high',
          icon: Zap,
        }
      );
    } else if (sentiment === 'negative') {
      baseRecommendations.push(
        {
          id: '1',
          type: 'content',
          title: 'Address Concerns Directly',
          description: 'Create content that addresses common pain points. Show you\'re listening and taking action.',
          impact: 'high',
          icon: Target,
        },
        {
          id: '2',
          type: 'visual',
          title: 'Build Trust with Transparency',
          description: 'Share process videos and team introductions. Humanize your brand to rebuild connection.',
          impact: 'high',
          icon: ImageIcon,
        },
        {
          id: '3',
          type: 'engagement',
          title: 'Increase Response Rate',
          description: 'Respond to comments within 2 hours. Show your audience they\'re heard and valued.',
          impact: 'medium',
          icon: Zap,
        },
        {
          id: '4',
          type: 'timing',
          title: 'Consistent Posting Schedule',
          description: 'Maintain regular posting at 10 AM and 7 PM to rebuild audience trust and routine.',
          impact: 'medium',
          icon: Clock,
        }
      );
    } else {
      baseRecommendations.push(
        {
          id: '1',
          type: 'engagement',
          title: 'Spark More Conversation',
          description: 'Ask thought-provoking questions and create content that encourages audience participation.',
          impact: 'high',
          icon: Zap,
        },
        {
          id: '2',
          type: 'visual',
          title: 'Experiment with Formats',
          description: 'Try carousel posts, reels, and stories. Test what resonates with your audience.',
          impact: 'medium',
          icon: ImageIcon,
        },
        {
          id: '3',
          type: 'content',
          title: 'Define Your Voice',
          description: 'Develop a stronger brand personality. Be more opinionated and authentic in your messaging.',
          impact: 'high',
          icon: Target,
        },
        {
          id: '4',
          type: 'timing',
          title: 'Optimize Posting Times',
          description: 'Test posting at different times. Track when you get the most engagement and adjust.',
          impact: 'medium',
          icon: Clock,
        }
      );
    }

    return baseRecommendations;
  };

  const recommendations = generateRecommendations();

  const impactColors = {
    high: 'bg-green-500/20 text-green-400 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-primary/20 shadow-[0_8px_32px_rgba(99,102,241,0.15)] backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5 text-accent" />
          <h3 className="text-lg">AI-Powered Recommendations</h3>
        </div>

        <div className="grid gap-4">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Card className="p-4 bg-background/30 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/20 relative overflow-hidden group">
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div
                      className="p-2 rounded-lg bg-primary/10 border border-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge className={`${impactColors[rec.impact]} text-xs`}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}