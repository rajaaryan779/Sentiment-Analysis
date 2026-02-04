import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

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

interface SentimentChartProps {
  mentions: Mention[];
}

export function SentimentChart({ mentions }: SentimentChartProps) {
  const positiveCount = mentions.filter(m => m.sentiment > 0.2).length;
  const neutralCount = mentions.filter(m => m.sentiment >= -0.2 && m.sentiment <= 0.2).length;
  const negativeCount = mentions.filter(m => m.sentiment < -0.2).length;
  
  const sentimentData = [
    {
      name: 'Positive',
      value: positiveCount || 0.1, // Show minimal slice if 0
      actualValue: positiveCount,
      color: '#22c55e'
    },
    {
      name: 'Neutral', 
      value: neutralCount || 0.1, // Show minimal slice if 0
      actualValue: neutralCount,
      color: '#eab308'
    },
    {
      name: 'Negative',
      value: negativeCount || 0.1, // Show minimal slice if 0
      actualValue: negativeCount,
      color: '#ef4444'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = mentions.length;
      const actualValue = data.payload.actualValue;
      const percentage = total > 0 ? Math.round((actualValue / total) * 100) : 0;
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {actualValue} mentions ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Distribution</CardTitle>
        <CardDescription>
          Breakdown of sentiment across all mentions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, payload }) => payload.actualValue > 0 ? `${name}: ${payload.actualValue}` : ''}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value, entry: any) => {
                  const item = sentimentData.find(d => d.name === value);
                  return `${value} (${item?.actualValue || 0})`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}