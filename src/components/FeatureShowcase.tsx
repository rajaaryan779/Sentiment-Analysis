import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Brain, TrendingUp, Target, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze sentiment patterns in real-time',
    gradient: 'from-primary to-accent',
  },
  {
    icon: TrendingUp,
    title: 'Smart Predictions',
    description: 'Predict audience reactions before you post with 95% accuracy',
    gradient: 'from-accent to-red-600',
  },
  {
    icon: Target,
    title: 'Targeted Recommendations',
    description: 'Get personalized content strategies based on your unique audience',
    gradient: 'from-red-600 to-red-800',
  },
  {
    icon: Zap,
    title: 'Instant Insights',
    description: 'Real-time analytics and actionable insights delivered instantly',
    gradient: 'from-red-800 to-primary',
  },
];

export function FeatureShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-primary/20 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all h-full relative overflow-hidden group">
              {/* Animated gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                initial={{ scale: 0, rotate: 0 }}
                whileHover={{ scale: 1.5, rotate: 180 }}
                transition={{ duration: 0.6 }}
              />

              <div className="relative z-10 space-y-3">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>

                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}