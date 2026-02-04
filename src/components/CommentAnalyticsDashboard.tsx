import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, MessageSquare, Users, ThumbsUp, ThumbsDown, Minus, Sparkles, Target } from 'lucide-react';
import { analyzeTextWithEmojis } from './EmojiSentimentAnalyzer';

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: number;
}

interface CommentAnalyticsDashboardProps {
  comments: Comment[];
  platform: string;
}

export function CommentAnalyticsDashboard({ comments, platform }: CommentAnalyticsDashboardProps) {
  const analysis = useMemo(() => {
    // Analyze each comment
    const analyzedComments = comments.map(comment => ({
      ...comment,
      analysis: analyzeTextWithEmojis(comment.text)
    }));

    // Count sentiments
    const positive = analyzedComments.filter(c => c.analysis.sentiment === 'positive').length;
    const negative = analyzedComments.filter(c => c.analysis.sentiment === 'negative').length;
    const neutral = analyzedComments.filter(c => c.analysis.sentiment === 'neutral').length;
    const total = comments.length;

    // Calculate percentages
    const positivePercent = (positive / total) * 100;
    const negativePercent = (negative / total) * 100;
    const neutralPercent = (neutral / total) * 100;

    // Time-based analysis
    const commentsByTime = analyzedComments.reduce((acc, comment) => {
      const date = new Date(comment.timestamp);
      const dayKey = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      if (!acc[dayKey]) {
        acc[dayKey] = { date: dayKey, positive: 0, negative: 0, neutral: 0 };
      }
      
      acc[dayKey][comment.analysis.sentiment]++;
      return acc;
    }, {} as Record<string, any>);

    const timeSeriesData = Object.values(commentsByTime);

    // Engagement metrics
    const avgLikes = comments.reduce((sum, c) => sum + c.likes, 0) / total;
    const avgReplies = comments.reduce((sum, c) => sum + c.replies, 0) / total;
    const totalEngagement = comments.reduce((sum, c) => sum + c.likes + c.replies, 0);

    // Emoji usage
    const commentsWithEmojis = analyzedComments.filter(c => c.analysis.hasEmojis).length;
    const emojiUsagePercent = (commentsWithEmojis / total) * 100;

    // Top performing comments
    const topPositive = analyzedComments
      .filter(c => c.analysis.sentiment === 'positive')
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);

    const topNegative = analyzedComments
      .filter(c => c.analysis.sentiment === 'negative')
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 3);

    return {
      total,
      positive,
      negative,
      neutral,
      positivePercent,
      negativePercent,
      neutralPercent,
      timeSeriesData,
      avgLikes,
      avgReplies,
      totalEngagement,
      emojiUsagePercent,
      topPositive,
      topNegative,
      analyzedComments
    };
  }, [comments]);

  const pieData = [
    { name: 'Positive', value: analysis.positive || 0.1, actualValue: analysis.positive, color: '#22c55e' },
    { name: 'Neutral', value: analysis.neutral || 0.1, actualValue: analysis.neutral, color: '#eab308' },
    { name: 'Negative', value: analysis.negative || 0.1, actualValue: analysis.negative, color: '#ef4444' }
  ];

  const radarData = [
    { category: 'Engagement', value: Math.min((analysis.avgLikes / 10) * 100, 100) },
    { category: 'Positivity', value: analysis.positivePercent },
    { category: 'Reply Rate', value: Math.min((analysis.avgReplies / 5) * 100, 100) },
    { category: 'Emoji Usage', value: analysis.emojiUsagePercent },
    { category: 'Overall Health', value: (analysis.positivePercent - analysis.negativePercent + 100) / 2 }
  ];

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === 'positive') return <ThumbsUp className="w-4 h-4 text-green-500" />;
    if (sentiment === 'negative') return <ThumbsDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                  <h3 className="text-3xl font-bold text-green-500">{analysis.positive}</h3>
                  <p className="text-xs text-muted-foreground">{analysis.positivePercent.toFixed(1)}%</p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <ThumbsUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Neutral</p>
                  <h3 className="text-3xl font-bold text-yellow-500">{analysis.neutral}</h3>
                  <p className="text-xs text-muted-foreground">{analysis.neutralPercent.toFixed(1)}%</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-500/20">
                  <Minus className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Negative</p>
                  <h3 className="text-3xl font-bold text-red-500">{analysis.negative}</h3>
                  <p className="text-xs text-muted-foreground">{analysis.negativePercent.toFixed(1)}%</p>
                </div>
                <div className="p-3 rounded-full bg-red-500/20">
                  <ThumbsDown className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Comments</p>
                  <h3 className="text-3xl font-bold text-primary">{analysis.total}</h3>
                  <p className="text-xs text-muted-foreground">{analysis.totalEngagement} engagements</p>
                </div>
                <div className="p-3 rounded-full bg-primary/20">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sentiment Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/20">
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Breakdown of comment sentiments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, payload }) => `${name}: ${payload.actualValue}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => [
                      `${props.payload.actualValue} comments`, 
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Radar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/20">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Overall content health analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(239, 68, 68, 0.2)" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: 'currentColor', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'currentColor' }} />
                  <Radar name="Performance" dataKey="value" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Time Series Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/20">
          <CardHeader>
            <CardTitle>Sentiment Over Time</CardTitle>
            <CardDescription>Track how sentiment changes across your posts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analysis.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(239, 68, 68, 0.1)" />
                <XAxis dataKey="date" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="neutral" stroke="#eab308" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Comments Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Positive Comments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-green-500/5 to-card border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Top Positive Comments
              </CardTitle>
              <CardDescription>Most engaged positive feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.topPositive.map((comment, index) => (
                <div key={comment.id} className="p-3 rounded-lg bg-background/50 border border-green-500/20">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                      #{index + 1}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      {comment.likes}
                    </div>
                  </div>
                  <p className="text-sm mb-2">{comment.text}</p>
                  <p className="text-xs text-muted-foreground">{comment.author}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Negative Comments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-gradient-to-br from-red-500/5 to-card border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Negative feedback to address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.topNegative.length > 0 ? (
                analysis.topNegative.map((comment, index) => (
                  <div key={comment.id} className="p-3 rounded-lg bg-background/50 border border-red-500/20">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-red-500/20 text-red-500">
                        #{index + 1}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ThumbsUp className="w-3 h-3" />
                        {comment.likes}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{comment.text}</p>
                    <p className="text-xs text-muted-foreground">{comment.author}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-medium">Great news!</p>
                  <p className="text-sm">No significant negative comments found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Engagement Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Engagement Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Average Likes</p>
                <p className="text-3xl font-bold text-primary">{analysis.avgLikes.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">per comment</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Average Replies</p>
                <p className="text-3xl font-bold text-primary">{analysis.avgReplies.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground mt-1">per comment</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Emoji Usage</p>
                <p className="text-3xl font-bold text-primary">{analysis.emojiUsagePercent.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground mt-1">of comments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}