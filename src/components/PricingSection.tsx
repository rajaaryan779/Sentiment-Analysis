import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, Crown } from 'lucide-react';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: any;
  gradient: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 499,
    period: 'month',
    description: 'Perfect for individuals and small creators',
    icon: Sparkles,
    gradient: 'from-gray-600 to-gray-800',
    features: [
      '50 post analyses per month',
      'Basic sentiment tracking',
      'Email support',
      '7-day data retention',
      'Single user account',
    ],
  },
  {
    name: 'Pro',
    price: 1499,
    period: 'month',
    description: 'For growing brands and influencers',
    icon: Zap,
    gradient: 'from-primary to-accent',
    popular: true,
    features: [
      'Unlimited post analyses',
      'Advanced AI recommendations',
      'Priority support',
      '90-day data retention',
      'Up to 5 user accounts',
      'Competitor analysis',
      'Custom reports',
    ],
  },
  {
    name: 'Enterprise',
    price: 4999,
    period: 'month',
    description: 'For agencies and large organizations',
    icon: Crown,
    gradient: 'from-yellow-600 to-orange-600',
    features: [
      'Unlimited everything',
      'Dedicated account manager',
      '24/7 premium support',
      'Lifetime data retention',
      'Unlimited user accounts',
      'API access',
      'White-label options',
      'Custom integrations',
    ],
  },
];

export function PricingSection() {
  return (
    <div className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Unlock the full potential of AI-powered sentiment analysis. All plans include a 14-day free trial.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {pricingTiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              className={`relative ${tier.popular ? 'md:-mt-4' : ''}`}
            >
              {tier.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                >
                  <Badge className="bg-gradient-to-r from-primary to-accent border-0 text-white px-4 py-1 shadow-lg shadow-primary/50">
                    Most Popular
                  </Badge>
                </motion.div>
              )}

              <Card
                className={`p-8 h-full bg-gradient-to-br from-card via-card to-card/50 border-2 ${
                  tier.popular ? 'border-primary/50 shadow-[0_20px_70px_rgba(239,68,68,0.4)]' : 'border-primary/20 shadow-[0_10px_40px_rgba(239,68,68,0.2)]'
                } backdrop-blur-md hover:border-primary/60 transition-all`}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg`}
                    animate={{
                      rotateY: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Name */}
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-muted-foreground">₹</span>
                    <span className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {tier.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full h-12 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {tier.popular ? 'Start Free Trial' : 'Get Started'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">Trusted by 10,000+ creators and brands</p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {['Secure Payment', '14-Day Free Trial', 'Cancel Anytime', 'Money-Back Guarantee'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              {badge}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}