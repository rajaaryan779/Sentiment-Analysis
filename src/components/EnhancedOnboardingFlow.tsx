import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { motion, AnimatePresence } from 'motion/react';
import { User, FileText, Sparkles, ArrowRight, ArrowLeft, Instagram, Twitter, Facebook, Linkedin, Youtube, Upload, Link2, MessageSquare, Image as ImageIcon, Video } from 'lucide-react';
import { Badge } from './ui/badge';

interface OnboardingData {
  platform: string;
  username: string;
  analysisMode: 'upload-media' | 'fetch-comments' | 'manual-entry';
  mediaFile?: File;
  commentsFile?: File;
  manualComments?: string;
  postDescription?: string;
}

interface EnhancedOnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500' },
  { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'from-blue-400 to-blue-600' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-700' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-800' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-700' },
];

export function EnhancedOnboardingFlow({ onComplete }: EnhancedOnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [analysisMode, setAnalysisMode] = useState<'upload-media' | 'fetch-comments' | 'manual-entry'>('upload-media');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [commentsFile, setCommentsFile] = useState<File | null>(null);
  const [manualComments, setManualComments] = useState('');
  const [postDescription, setPostDescription] = useState('');

  const handleNext = () => {
    if (step === 1 && platform) {
      setStep(2);
    } else if (step === 2 && username.trim()) {
      setStep(3);
    } else if (step === 3 && analysisMode) {
      setStep(4);
    } else if (step === 4) {
      // Validate based on analysis mode
      if (analysisMode === 'upload-media' && (mediaFile || postDescription)) {
        completeOnboarding();
      } else if (analysisMode === 'fetch-comments' && username) {
        completeOnboarding();
      } else if (analysisMode === 'manual-entry' && (manualComments || commentsFile)) {
        completeOnboarding();
      }
    }
  };

  const completeOnboarding = () => {
    onComplete({
      platform,
      username,
      analysisMode,
      mediaFile: mediaFile || undefined,
      commentsFile: commentsFile || undefined,
      manualComments,
      postDescription,
    });
  };

  const handleBack = () => {
    setStep(Math.max(1, step - 1));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return platform !== '';
      case 2: return username.trim() !== '';
      case 3: return analysisMode !== '';
      case 4:
        if (analysisMode === 'upload-media') return mediaFile || postDescription;
        if (analysisMode === 'fetch-comments') return true;
        if (analysisMode === 'manual-entry') return manualComments || commentsFile;
        return false;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated 3D background elements */}
      <motion.div className="absolute top-0 left-0 w-full h-full" style={{ perspective: '1000px' }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.5, 1], x: [0, 100, 0], y: [0, -100, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1.5, 1, 1.5], x: [0, -100, 0], y: [0, 100, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, rotateY: -90, z: -100 }}
          animate={{ opacity: 1, rotateY: 0, z: 0 }}
          exit={{ opacity: 0, rotateY: 90, z: -100 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative z-10 w-full max-w-3xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Card className="p-8 bg-gradient-to-br from-card via-card to-card/50 border-primary/30 shadow-[0_20px_70px_rgba(239,68,68,0.3)] backdrop-blur-md">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <motion.div
                  key={s}
                  className={`h-1 rounded-full transition-all ${
                    s === step ? 'w-16 bg-primary' : s < step ? 'w-8 bg-primary/60' : 'w-8 bg-muted'
                  }`}
                  animate={s === step ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Step 1: Platform Selection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Choose Your Platform
                  </h2>
                  <p className="text-muted-foreground">
                    Which social media platform do you want to analyze?
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {platforms.map((p) => {
                    const Icon = p.icon;
                    return (
                      <motion.button
                        key={p.id}
                        onClick={() => setPlatform(p.id)}
                        whileHover={{ scale: 1.05, rotateY: 10 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          platform === p.id
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/30'
                            : 'border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-medium">{p.name}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Username */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <User className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Your Handle
                  </h2>
                  <p className="text-muted-foreground">
                    Enter your {platforms.find(p => p.id === platform)?.name} username
                  </p>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="username" className="text-base">Username or Handle</Label>
                  <Input
                    id="username"
                    placeholder="@your_handle"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 text-lg bg-background/50 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Analysis Mode */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    How Would You Like to Analyze?
                  </h2>
                  <p className="text-muted-foreground">
                    Choose your preferred analysis method
                  </p>
                </div>

                <RadioGroup value={analysisMode} onValueChange={(v: any) => setAnalysisMode(v)} className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    analysisMode === 'upload-media' ? 'border-primary bg-primary/10' : 'border-primary/20 hover:border-primary/40'
                  }`}>
                    <Label htmlFor="upload-media" className="flex items-start gap-4 cursor-pointer">
                      <RadioGroupItem value="upload-media" id="upload-media" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold">Upload Media for Analysis</span>
                          <Badge variant="secondary" className="ml-auto">Recommended</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Upload the photo/video you plan to post and get AI recommendations before posting
                        </p>
                      </div>
                    </Label>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    analysisMode === 'fetch-comments' ? 'border-primary bg-primary/10' : 'border-primary/20 hover:border-primary/40'
                  }`}>
                    <Label htmlFor="fetch-comments" className="flex items-start gap-4 cursor-pointer">
                      <RadioGroupItem value="fetch-comments" id="fetch-comments" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                            <Link2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold">Fetch Existing Comments</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Analyze comments from your existing posts (requires API connection)
                        </p>
                      </div>
                    </Label>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    analysisMode === 'manual-entry' ? 'border-primary bg-primary/10' : 'border-primary/20 hover:border-primary/40'
                  }`}>
                    <Label htmlFor="manual-entry" className="flex items-start gap-4 cursor-pointer">
                      <RadioGroupItem value="manual-entry" id="manual-entry" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-semibold">Manual Comment Entry</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enter comments manually or upload a file with comments (supports emojis)
                        </p>
                      </div>
                    </Label>
                  </motion.div>
                </RadioGroup>
              </motion.div>
            )}

            {/* Step 4: Data Input Based on Mode */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {analysisMode === 'upload-media' && (
                  <>
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Upload Your Media
                      </h2>
                      <p className="text-muted-foreground">
                        Share the content you want to post for AI analysis
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="media" className="text-base mb-2 block">
                          Upload Photo or Video
                        </Label>
                        <div className="relative">
                          <input
                            type="file"
                            id="media"
                            accept="image/*,video/*"
                            onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <Label
                            htmlFor="media"
                            className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 cursor-pointer transition-all bg-background/30 hover:bg-background/50"
                          >
                            {mediaFile ? (
                              <div className="text-center">
                                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-2" />
                                <p className="font-medium">{mediaFile.name}</p>
                                <p className="text-sm text-muted-foreground">Click to change</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                <p className="font-medium">Click to upload</p>
                                <p className="text-sm text-muted-foreground">PNG, JPG, MP4 up to 50MB</p>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or describe your post</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-base mb-2 block">
                          Post Description
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="E.g., 'Celebrating Diwali with traditional diyas and rangoli. Sharing the festival of lights with my community...'"
                          value={postDescription}
                          onChange={(e) => setPostDescription(e.target.value)}
                          className="min-h-[120px] bg-background/50 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </>
                )}

                {analysisMode === 'fetch-comments' && (
                  <>
                    <div className="text-center space-y-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/50"
                      >
                        <Link2 className="w-10 h-10 text-white" />
                      </motion.div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Connect Your Account
                      </h2>
                      <p className="text-muted-foreground">
                        We'll fetch comments from @{username} on {platforms.find(p => p.id === platform)?.name}
                      </p>
                    </div>

                    <Card className="p-6 bg-blue-500/10 border-blue-500/30">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-500 mt-1" />
                        <div>
                          <p className="font-medium mb-2">Demo Mode Active</p>
                          <p className="text-sm text-muted-foreground">
                            We'll simulate fetching comments from your recent posts. In production, this will connect to {platforms.find(p => p.id === platform)?.name}'s API to retrieve real comments.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </>
                )}

                {analysisMode === 'manual-entry' && (
                  <>
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Enter Comments
                      </h2>
                      <p className="text-muted-foreground">
                        Type or paste comments for analysis (emojis supported 😊)
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="comments-file" className="text-base mb-2 block">
                          Upload Comments File (Optional)
                        </Label>
                        <input
                          type="file"
                          id="comments-file"
                          accept=".txt,.csv"
                          onChange={(e) => setCommentsFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <Label
                          htmlFor="comments-file"
                          className="flex items-center justify-center h-24 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 cursor-pointer transition-all bg-background/30 hover:bg-background/50"
                        >
                          {commentsFile ? (
                            <div className="text-center">
                              <FileText className="w-8 h-8 text-primary mx-auto mb-1" />
                              <p className="text-sm font-medium">{commentsFile.name}</p>
                            </div>
                          ) : (
                            <div className="text-center">
                              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                              <p className="text-sm">Upload .txt or .csv file</p>
                            </div>
                          )}
                        </Label>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or type manually</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="manual-comments" className="text-base mb-2 block">
                          Comments (one per line)
                        </Label>
                        <Textarea
                          id="manual-comments"
                          placeholder="Amazing post! 😍&#10;Love the traditional vibes 🪔&#10;Beautiful celebration! ❤️&#10;Not a fan of this 😕"
                          value={manualComments}
                          onChange={(e) => setManualComments(e.target.value)}
                          className="min-h-[200px] font-mono text-sm bg-background/50 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          💡 Tip: Include emojis for more accurate sentiment analysis
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 h-12 border-primary/30 hover:bg-primary/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/30 text-lg group"
              >
                {step === 4 ? (
                  <>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Start Analysis
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Import CheckCircle2 at the top
import { CheckCircle2 } from 'lucide-react';