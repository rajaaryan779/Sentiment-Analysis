import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'motion/react';
import { Sparkles, LogOut, Settings, User, CreditCard, RefreshCw } from 'lucide-react';

interface HeaderProps {
  userEmail: string;
  username?: string;
  onLogout: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onPricingClick?: () => void;
  onRestartOnboarding?: () => void;
}

export function Header({ userEmail, username, onLogout, isDark, onThemeToggle, onPricingClick, onRestartOnboarding }: HeaderProps) {
  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-primary/20 bg-card/80 backdrop-blur-lg supports-[backdrop-filter]:bg-card/60 shadow-lg shadow-primary/10 sticky top-0 z-50"
    >
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="h-7 w-7 text-primary" />
          </motion.div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SentiAI
            </h1>
            {username && (
              <p className="text-xs text-muted-foreground">{username}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onPricingClick}
            className="border-primary/30 hover:border-primary/50 hover:bg-primary/10"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade
          </Button>
          
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(userEmail)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Account</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              {onRestartOnboarding && (
                <DropdownMenuItem onClick={onRestartOnboarding}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  <span>Change Settings</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}