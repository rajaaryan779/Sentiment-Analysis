import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface AutoAnalysisCardProps {
  postContent: string;
}

export function AutoAnalysisCard({ postContent }: AutoAnalysisCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-primary/30 shadow-[0_8px_32px_rgba(239,68,68,0.2)] backdrop-blur-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <h3 className="text-lg">Your Post Being Analyzed</h3>
          </div>

          <div className="p-4 bg-background/30 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground line-clamp-4">{postContent}</p>
          </div>

          <div className="space-y-2">
            {['Analyzing sentiment patterns', 'Extracting keywords', 'Generating recommendations'].map(
              (step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="flex items-center gap-2"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </motion.div>
                  <span className="text-sm">{step}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}