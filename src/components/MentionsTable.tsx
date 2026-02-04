import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ExternalLink, MessageSquare } from 'lucide-react';

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

interface MentionsTableProps {
  mentions: Mention[];
}

export function MentionsTable({ mentions }: MentionsTableProps) {
  const getSentimentLabel = (score: number) => {
    if (score > 0.2) return 'Positive';
    if (score < -0.2) return 'Negative';
    return 'Neutral';
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.2) return 'bg-green-100 text-green-800 border-green-200';
    if (score < -0.2) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Mentions</CardTitle>
        <CardDescription>
          Latest brand mentions across all platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mentions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No mentions found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                mentions.map((mention) => (
                  <TableRow key={mention.id}>
                    <TableCell className="max-w-xs">
                      <div className="space-y-1">
                        <p className="text-sm">{truncateText(mention.text)}</p>
                        <div className="flex flex-wrap gap-1">
                          {mention.keywords.slice(0, 3).map((keyword) => (
                            <Badge key={keyword} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-sm">{mention.author}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{mention.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getSentimentColor(mention.sentiment)}>
                          {getSentimentLabel(mention.sentiment)}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {mention.sentiment > 0 ? '+' : ''}{mention.sentiment.toFixed(2)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{mention.engagement}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(mention.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}