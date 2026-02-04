import { Card } from './ui/card';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SentimentVisualization3DProps {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  emotions: { emotion: string; score: number }[];
}

export function SentimentVisualization3D({ sentiment, score, emotions }: SentimentVisualization3DProps) {
  const sentimentConfig = {
    positive: {
      color: 'from-emerald-500 to-green-400',
      bgGlow: 'shadow-[0_0_60px_rgba(34,197,94,0.5)]',
      icon: TrendingUp,
      label: 'Positive',
      rotation: 15,
    },
    negative: {
      color: 'from-primary to-red-600',
      bgGlow: 'shadow-[0_0_60px_rgba(239,68,68,0.5)]',
      icon: TrendingDown,
      label: 'Negative',
      rotation: -15,
    },
    neutral: {
      color: 'from-amber-500 to-yellow-500',
      bgGlow: 'shadow-[0_0_60px_rgba(245,158,11,0.5)]',
      icon: Minus,
      label: 'Neutral',
      rotation: 0,
    },
  };

  const config = sentimentConfig[sentiment];
  const Icon = config.icon;
  const percentage = Math.round(score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="relative"
      style={{ perspective: '1500px' }}
    >
      <Card className="p-8 bg-gradient-to-br from-card via-card to-card/50 border-primary/20 shadow-[0_8px_32px_rgba(99,102,241,0.15)] backdrop-blur-sm overflow-hidden">
        {/* Background animated gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(239,68,68,0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(220,38,38,0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(239,68,68,0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Main 3D sentiment sphere */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className="relative w-48 h-48 mb-8"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* Outer glow ring */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.color} opacity-20 blur-2xl ${config.bgGlow}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Main sphere */}
            <motion.div
              className={`absolute inset-4 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center shadow-2xl`}
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${config.rotation}deg)`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/30 to-transparent" />
              
              <motion.div
                className="relative z-10 text-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon className="w-16 h-16 text-white mb-2 mx-auto drop-shadow-lg" />
                <div className="text-4xl font-bold text-white drop-shadow-lg">{percentage}%</div>
              </motion.div>
            </motion.div>

            {/* Orbiting particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${config.color}`}
                style={{
                  top: '50%',
                  left: '50%',
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotateZ: [0, 360],
                  x: [0, 80 * Math.cos((i * 120 * Math.PI) / 180), 0],
                  y: [0, 80 * Math.sin((i * 120 * Math.PI) / 180), 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>

          {/* Sentiment label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <h3 className="text-2xl font-semibold mb-1">{config.label} Sentiment</h3>
            <p className="text-muted-foreground">Overall sentiment score</p>
          </motion.div>

          {/* Emotion bars */}
          <div className="w-full space-y-3">
            {emotions.map((emotion, index) => (
              <motion.div
                key={emotion.emotion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{emotion.emotion}</span>
                  <span className="text-sm text-muted-foreground">{Math.round(emotion.score)}%</span>
                </div>
                <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${emotion.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}