import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { motion, AnimatePresence } from 'motion/react';
import { User, FileText, Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (username: string, postContent: string) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleNext = () => {
    if (step === 1 && username.trim()) {
      setStep(2);
    } else if (step === 2 && postContent.trim()) {
      onComplete(username, postContent);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated 3D background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ perspective: '1000px' }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, rotateY: -90, z: -100 }}
          animate={{ opacity: 1, rotateY: 0, z: 0 }}
          exit={{ opacity: 0, rotateY: 90, z: -100 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative z-10 w-full max-w-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="p-8 bg-gradient-to-br from-card via-card to-card/50 border-primary/30 shadow-[0_20px_70px_rgba(239,68,68,0.3)] backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="space-y-6"
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {[1, 2].map((s) => (
                  <motion.div
                    key={s}
                    className={`h-1 rounded-full transition-all ${
                      s === step ? 'w-16 bg-primary' : 'w-8 bg-muted'
                    }`}
                    animate={s === step ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                ))}
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <User className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Welcome to SentiAI
                    </h2>
                    <p className="text-muted-foreground">
                      Let's start by getting to know you
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="username" className="text-base">
                      What's your social media username or handle?
                    </Label>
                    <Input
                      id="username"
                      placeholder="@your_handle"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 text-lg bg-background/50 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                  </div>

                  <Button
                    onClick={handleNext}
                    disabled={!username.trim()}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 text-lg group"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <FileText className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Tell Us About Your Post
                    </h2>
                    <p className="text-muted-foreground">
                      Share your recent post or the type of content you want to create
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="post" className="text-base">
                      Describe your post or paste the content
                    </Label>
                    <Textarea
                      id="post"
                      placeholder="E.g., 'Just launched my new product line! Check out our eco-friendly sustainable fashion collection...'"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[150px] text-base bg-background/50 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                      autoFocus
                    />
                    <p className="text-sm text-muted-foreground">
                      Our AI will analyze this and provide personalized recommendations
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 h-12 border-primary/30 hover:bg-primary/10"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!postContent.trim()}
                      className="flex-1 h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 text-lg group"
                    >
                      <Sparkles className="mr-2 w-5 h-5" />
                      Analyze Now
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}