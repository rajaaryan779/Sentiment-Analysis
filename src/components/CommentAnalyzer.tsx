import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp } from 'lucide-react';

interface AnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  keywords: string[];
  emotions: { emotion: string; score: number }[];
}

interface CommentAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export function CommentAnalyzer({ onAnalysisComplete }: CommentAnalyzerProps) {
  const [comments, setComments] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeComments = async () => {
    if (!comments.trim()) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Mock sentiment analysis
      const positiveWords = ['love', 'great', 'amazing', 'awesome', 'excellent', 'beautiful', 'wonderful'];
      const negativeWords = ['hate', 'bad', 'terrible', 'awful', 'worst', 'horrible', 'disappointing'];
      
      const lowerComments = comments.toLowerCase();
      const positiveCount = positiveWords.filter(word => lowerComments.includes(word)).length;
      const negativeCount = negativeWords.filter(word => lowerComments.includes(word)).length;
      
      let sentiment: 'positive' | 'negative' | 'neutral';
      let score: number;
      
      if (positiveCount > negativeCount) {
        sentiment = 'positive';
        score = Math.min(0.5 + (positiveCount * 0.15), 0.95);
      } else if (negativeCount > positiveCount) {
        sentiment = 'negative';
        score = Math.max(0.5 - (negativeCount * 0.15), 0.05);
      } else {
        sentiment = 'neutral';
        score = 0.5;
      }

      const words = comments.split(/\s+/);
      const keywords = words
        .filter(w => w.length > 5)
        .slice(0, 5)
        .map(w => w.replace(/[^a-zA-Z]/g, ''));

      const emotions = [
        { emotion: 'Joy', score: sentiment === 'positive' ? score * 100 : 30 },
        { emotion: 'Trust', score: sentiment === 'positive' ? 75 : 40 },
        { emotion: 'Anticipation', score: 65 },
        { emotion: 'Surprise', score: sentiment === 'negative' ? 55 : 35 },
        { emotion: 'Sadness', score: sentiment === 'negative' ? score * 100 : 20 },
      ];

      const result: AnalysisResult = {
        sentiment,
        score,
        keywords,
        emotions,
      };

      onAnalysisComplete(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-primary/20 shadow-[0_8px_32px_rgba(99,102,241,0.15)] backdrop-blur-sm">
        <motion.div
          className="space-y-4"
          whileHover={{ rotateX: 1, rotateY: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg">AI Comment Analysis</h3>
          </div>
          
          <Textarea
            placeholder="Paste social media comments here for analysis..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[120px] bg-background/50 border-primary/20 focus:border-primary/40 resize-none"
          />
          
          <Button 
            onClick={analyzeComments}
            disabled={isAnalyzing || !comments.trim()}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <TrendingUp className="w-4 h-4" />
                </motion.div>
                Analyzing...
              </span>
            ) : (
              'Analyze Comments'
            )}
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
}