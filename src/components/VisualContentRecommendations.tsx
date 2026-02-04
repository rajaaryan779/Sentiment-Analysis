import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import {
  Palette,
  Image as ImageIcon,
  Type,
  Layout,
  Sparkles,
  Eye,
  TrendingUp,
  Camera,
  Smile,
  Hash,
  Clock,
  Users,
  Target,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface VisualContentRecommendationsProps {
  platform: string;
  positivePercent: number;
  negativePercent: number;
  neutralPercent: number;
}

export function VisualContentRecommendations({
  platform,
  positivePercent,
  negativePercent,
  neutralPercent
}: VisualContentRecommendationsProps) {
  const overallScore = positivePercent - negativePercent;

  const getColorRecommendations = () => {
    const baseRecommendations = [
      {
        category: 'High-Performing Colors',
        colors: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#95E1D3', '#F38181'],
        description: 'Vibrant, energetic colors that drive engagement',
        impact: 'high'
      },
      {
        category: 'Professional Palette',
        colors: ['#2C3E50', '#3498DB', '#E74C3C', '#ECF0F1', '#95A5A6'],
        description: 'Corporate-friendly colors for brand credibility',
        impact: 'medium'
      },
      {
        category: 'Warm & Inviting',
        colors: ['#FF9A76', '#FFEAA7', '#55E6C1', '#FDA7DF', '#F8B500'],
        description: 'Creates emotional connection and warmth',
        impact: 'high'
      }
    ];

    return baseRecommendations;
  };

  const getCompositionTips = () => {
    if (overallScore > 40) {
      return [
        {
          title: 'Keep Your Winning Formula',
          icon: CheckCircle2,
          color: 'text-green-500',
          tips: [
            'Your content is performing well! Maintain current visual style',
            'Continue using bright, clear imagery',
            'Keep text minimal and impactful',
            'Use rule of thirds for subject placement'
          ]
        },
        {
          title: 'Amplify Success',
          icon: TrendingUp,
          color: 'text-blue-500',
          tips: [
            'Experiment with video content for even higher engagement',
            'Add subtle animations or motion graphics',
            'Create carousel posts to increase time spent',
            'Use consistent branding elements'
          ]
        }
      ];
    } else if (overallScore < 0) {
      return [
        {
          title: 'Urgent Improvements Needed',
          icon: XCircle,
          color: 'text-red-500',
          tips: [
            'Avoid cluttered, busy compositions',
            'Use higher quality, well-lit images',
            'Simplify your message - less is more',
            'Ensure good contrast between text and background'
          ]
        },
        {
          title: 'Content Strategy Overhaul',
          icon: AlertTriangle,
          color: 'text-orange-500',
          tips: [
            'Research trending content in your niche',
            'Study competitors\' successful posts',
            'A/B test different visual styles',
            'Consider hiring a professional photographer'
          ]
        }
      ];
    } else {
      return [
        {
          title: 'Optimization Opportunities',
          icon: Target,
          color: 'text-yellow-500',
          tips: [
            'Experiment with bolder colors',
            'Try different composition styles',
            'Add more human elements to photos',
            'Test vertical vs. horizontal formats'
          ]
        },
        {
          title: 'Engagement Boosters',
          icon: Sparkles,
          color: 'text-purple-500',
          tips: [
            'Include faces in 60% of your posts',
            'Use storytelling through image sequences',
            'Add context with location tags',
            'Incorporate trending visual themes'
          ]
        }
      ];
    }
  };

  const getPlatformSpecificVisuals = () => {
    const recommendations: Record<string, any> = {
      instagram: {
        aspectRatios: ['1:1 (Feed posts)', '4:5 (Portrait)', '9:16 (Stories/Reels)'],
        bestPractices: [
          'Use high-resolution images (1080x1080 minimum)',
          'Reels with trending audio get 3x more reach',
          'Carousel posts get 1.4x more engagement',
          'Stories with polls increase interaction by 40%'
        ],
        visualStyle: 'Bright, aesthetic, lifestyle-focused imagery'
      },
      twitter: {
        aspectRatios: ['16:9 (Landscape)', '2:1 (Header)', '1:1 (Square)'],
        bestPractices: [
          'GIFs and memes perform exceptionally well',
          'Infographics with data get high shares',
          'Short video clips (under 2:20) are ideal',
          'Images with faces get 38% more likes'
        ],
        visualStyle: 'Quick-to-consume, impactful visuals'
      },
      facebook: {
        aspectRatios: ['1.91:1 (Link posts)', '4:5 (Feed)', '9:16 (Stories)'],
        bestPractices: [
          'Videos get 135% more organic reach than photos',
          'Live videos get 6x more interactions',
          'Text overlay should cover less than 20%',
          'Emotional content (joy, awe) performs best'
        ],
        visualStyle: 'Authentic, relatable, story-driven content'
      },
      youtube: {
        aspectRatios: ['16:9 (Main video)', '1:1 (Shorts)', 'Custom thumbnail'],
        bestPractices: [
          'Thumbnails with faces get 34% more clicks',
          'Use contrasting colors in thumbnails',
          'Add text overlay on thumbnails',
          'First 3 seconds determine 80% of retention'
        ],
        visualStyle: 'Eye-catching thumbnails, professional production'
      },
      linkedin: {
        aspectRatios: ['1.91:1 (Link sharing)', '1:1 (Square)', '4:5 (Vertical)'],
        bestPractices: [
          'Professional headshots increase trust',
          'Data visualizations get 3x more engagement',
          'Behind-the-scenes content performs well',
          'Document-style posts are trending'
        ],
        visualStyle: 'Professional, informative, data-driven'
      }
    };

    return recommendations[platform] || recommendations.instagram;
  };

  const getDosDonts = () => {
    return {
      dos: [
        { text: 'Use natural lighting for photos', icon: Camera },
        { text: 'Include emojis in captions (but not overdoing it)', icon: Smile },
        { text: 'Post during peak engagement hours', icon: Clock },
        { text: 'Respond to comments within first hour', icon: Users },
        { text: 'Use 3-5 relevant hashtags', icon: Hash },
        { text: 'Tell stories, not just sell', icon: Sparkles },
        { text: 'Showcase user-generated content', icon: ImageIcon },
        { text: 'Maintain consistent visual branding', icon: Palette }
      ],
      donts: [
        { text: 'Don\'t use low-quality or pixelated images', icon: XCircle },
        { text: 'Avoid stock photos that look staged', icon: XCircle },
        { text: 'Don\'t overuse filters or heavy editing', icon: XCircle },
        { text: 'Avoid cluttered compositions', icon: XCircle },
        { text: 'Don\'t ignore negative comments', icon: XCircle },
        { text: 'Avoid posting without a caption', icon: XCircle },
        { text: 'Don\'t use too many hashtags (looks spammy)', icon: XCircle },
        { text: 'Avoid inconsistent posting schedule', icon: XCircle }
      ]
    };
  };

  const colorPalettes = getColorRecommendations();
  const compositionTips = getCompositionTips();
  const platformVisuals = getPlatformSpecificVisuals();
  const dosDonts = getDosDonts();

  return (
    <div className="space-y-6">
      {/* Header with Score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Visual Content Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Based on analysis of your {platform} comments
                </p>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${overallScore > 40 ? 'text-green-500' : overallScore < 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                  {overallScore > 0 ? '+' : ''}{overallScore.toFixed(0)}
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          <TabsTrigger value="colors">
            <Palette className="w-4 h-4 mr-2" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="composition">
            <Layout className="w-4 h-4 mr-2" />
            Composition
          </TabsTrigger>
          <TabsTrigger value="platform">
            <Eye className="w-4 h-4 mr-2" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="dos-donts">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Do's & Don'ts
          </TabsTrigger>
          <TabsTrigger value="examples">
            <ImageIcon className="w-4 h-4 mr-2" />
            Examples
          </TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-4">
          {colorPalettes.map((palette, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{palette.category}</CardTitle>
                    <Badge variant={palette.impact === 'high' ? 'default' : 'secondary'}>
                      {palette.impact} impact
                    </Badge>
                  </div>
                  <CardDescription>{palette.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {palette.colors.map((color, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        className="group relative"
                      >
                        <div
                          className="w-16 h-16 rounded-lg cursor-pointer shadow-lg transition-transform"
                          style={{ backgroundColor: color }}
                        />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs whitespace-nowrap border border-primary/20">
                          {color}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* Composition Tab */}
        <TabsContent value="composition" className="space-y-4">
          {compositionTips.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className={`w-5 h-5 ${section.color}`} />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </TabsContent>

        {/* Platform-Specific Tab */}
        <TabsContent value="platform" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20">
              <CardHeader>
                <CardTitle className="capitalize">{platform} Visual Guidelines</CardTitle>
                <CardDescription>Optimized for maximum {platform} engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Layout className="w-4 h-4 text-primary" />
                    Recommended Aspect Ratios
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {platformVisuals.aspectRatios.map((ratio: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {ratio}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Best Practices
                  </h4>
                  <ul className="space-y-2">
                    {platformVisuals.bestPractices.map((practice: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm">
                    <strong>Visual Style:</strong> {platformVisuals.visualStyle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Do's and Don'ts Tab */}
        <TabsContent value="dos-donts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-gradient-to-br from-green-500/5 to-card border-green-500/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 className="w-5 h-5" />
                    Do This
                  </CardTitle>
                  <CardDescription>Proven strategies for success</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dosDonts.dos.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/15 transition-colors">
                          <Icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="bg-gradient-to-br from-red-500/5 to-card border-red-500/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <XCircle className="w-5 h-5" />
                    Avoid This
                  </CardTitle>
                  <CardDescription>Common mistakes to prevent</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dosDonts.donts.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/15 transition-colors">
                          <Icon className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span className="text-sm">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-4">
          <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/20">
            <CardHeader>
              <CardTitle>Content Strategy Examples</CardTitle>
              <CardDescription>Real-world scenarios and solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h4 className="font-semibold mb-2">🎨 Example: Diwali Festival Post</h4>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-primary">Scenario:</strong> Celebrity posting traditional Diwali celebration photos</p>
                  <p><strong className="text-green-500">What Worked:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Warm orange and gold color palette</li>
                    <li>• Authentic family moments vs. staged shots</li>
                    <li>• Close-up of diyas with bokeh effect</li>
                    <li>• Caption with cultural context and emojis 🪔✨</li>
                  </ul>
                  <p><strong className="text-red-500">Avoid:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Over-filtered, unrealistic colors</li>
                    <li>• Generic "Happy Diwali" without personal touch</li>
                    <li>• Cluttered frames with too many elements</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h4 className="font-semibold mb-2">📸 Example: Behind-the-Scenes Content</h4>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-primary">Strategy:</strong> Show the process, not just the end result</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Use carousel to show transformation</li>
                    <li>• Natural, unpolished shots feel authentic</li>
                    <li>• Add text overlay with interesting facts</li>
                    <li>• Ask followers questions to drive comments</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <h4 className="font-semibold mb-2">🎬 Example: Video Content</h4>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-primary">Best Practices:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• Hook viewers in first 3 seconds</li>
                    <li>• Add captions (80% watch without sound)</li>
                    <li>• Use trending music/audio when relevant</li>
                    <li>• Keep it under 60 seconds for maximum retention</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-primary to-accent text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Ready to Create Better Content?</h3>
                <p className="text-white/80">
                  Apply these recommendations to your next {platform} post
                </p>
              </div>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}