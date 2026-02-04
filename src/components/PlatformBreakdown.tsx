import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

interface PlatformBreakdownProps {
  mentions: Mention[];
}

export function PlatformBreakdown({ mentions }: PlatformBreakdownProps) {
  // Group mentions by platform and sentiment
  const platformData = mentions.reduce((acc, mention) => {
    const platform = mention.platform;
    if (!acc[platform]) {
      acc[platform] = { positive: 0, neutral: 0, negative: 0 };
    }
    
    if (mention.sentiment > 0.2) {
      acc[platform].positive++;
    } else if (mention.sentiment < -0.2) {
      acc[platform].negative++;
    } else {
      acc[platform].neutral++;
    }
    
    return acc;
  }, {} as Record<string, { positive: number; neutral: number; negative: number }>);

  const chartData = Object.entries(platformData).map(([platform, counts]) => ({
    platform: platform.length > 10 ? platform.substring(0, 10) + '...' : platform,
    fullPlatform: platform,
    positive: counts.positive,
    neutral: counts.neutral,
    negative: counts.negative,
    total: counts.positive + counts.neutral + counts.negative
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{data.fullPlatform}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-2">
              <span className="text-green-600">Positive:</span>
              <span>{data.positive}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-yellow-600">Neutral:</span>
              <span>{data.neutral}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-red-600">Negative:</span>
              <span>{data.negative}</span>
            </div>
            <div className="flex justify-between gap-2 border-t pt-1 mt-1">
              <span className="font-medium">Total:</span>
              <span className="font-medium">{data.total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Breakdown</CardTitle>
        <CardDescription>
          Sentiment distribution across different platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(239, 68, 68, 0.1)" />
              <XAxis 
                dataKey="platform" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="square"
              />
              <Bar dataKey="positive" stackId="a" fill="#22c55e" name="Positive" radius={[0, 0, 0, 0]} />
              <Bar dataKey="neutral" stackId="a" fill="#eab308" name="Neutral" radius={[0, 0, 0, 0]} />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {chartData.length === 0 && (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>No data available for the selected filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}