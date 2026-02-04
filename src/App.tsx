import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { EnhancedOnboardingFlow } from './components/EnhancedOnboardingFlow';
import { SentimentDashboard } from './components/SentimentDashboard';
import { PricingSection } from './components/PricingSection';
import { Header } from './components/Header';
import { FloatingParticles } from './components/FloatingParticles';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { ScrollArea } from './components/ui/scroll-area';

interface OnboardingData {
  platform: string;
  username: string;
  analysisMode: 'upload-media' | 'fetch-comments' | 'manual-entry';
  mediaFile?: File;
  commentsFile?: File;
  manualComments?: string;
  postDescription?: string;
}

interface User {
  email: string;
  isAuthenticated: boolean;
  onboardingData?: OnboardingData;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPricing, setShowPricing] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setUser({
      email,
      isAuthenticated: true
    });
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUser(prev => prev ? { ...prev, onboardingData: data } : null);
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowOnboarding(false);
  };

  const handleRestartOnboarding = () => {
    setShowOnboarding(true);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!user?.isAuthenticated) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <FloatingParticles />
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
          <FloatingParticles />
          <EnhancedOnboardingFlow onComplete={handleOnboardingComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <FloatingParticles />
        <Header
          userEmail={user.email}
          username={user.onboardingData?.username}
          onLogout={handleLogout}
          isDark={isDarkMode}
          onThemeToggle={toggleTheme}
          onPricingClick={() => setShowPricing(true)}
          onRestartOnboarding={handleRestartOnboarding}
        />
        <SentimentDashboard
          onboardingData={user.onboardingData}
          onShowPricing={() => setShowPricing(true)}
          onBack={handleRestartOnboarding}
        />

        {/* Pricing Modal */}
        <Dialog open={showPricing} onOpenChange={setShowPricing}>
          <DialogContent className="max-w-6xl max-h-[90vh] p-0 bg-background border-primary/20 shadow-2xl shadow-primary/20">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Choose Your Plan
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-80px)]">
              <PricingSection />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}