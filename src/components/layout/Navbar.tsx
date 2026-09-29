import React, { useState } from 'react';
import {
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
  Bot,
  Sparkles,
  User,
  LogOut,
  Settings,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { useStudio, PageView } from '../../context/StudioContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    currentUser,
    isAuthLoading,
    setIsAuthModalOpen,
    setAuthModalInitialMode,
    setIsProfileModalOpen,
    setIsAIAdvisorOpen,
    isOwnerAuthenticated,
    logout,
    theme
  } = useStudio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks: { label: string; page: PageView; sectionId?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services', sectionId: 'services-section' },
    { label: 'Estimator', page: 'estimator' },
    { label: 'Portfolio', page: 'portfolio', sectionId: 'portfolio-section' },
    { label: 'Pricing', page: 'pricing', sectionId: 'pricing-section' },
    { label: 'Insights', page: 'blog' },
    { label: 'Contact', page: 'contact', sectionId: 'contact-section' }
  ];

  const handleNavClick = (page: PageView, sectionId?: string) => {
    navigateTo(page, sectionId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const handleOpenProfile = () => {
    setUserDropdownOpen(false);
    setIsProfileModalOpen(true);
  };

  const handleSignOut = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group flex items-center gap-1.5 sm:gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg py-1 px-1 cursor-pointer shrink-0"
          aria-label="Ozero Digital Studio - Back to Home"
        >
          <span className="text-base sm:text-xl font-bold font-display tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            Ozero Digital Studio
          </span>
        </button>

        {/* Zone 2: Clean text navigation links for desktop */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300" aria-label="Main Navigation">
          {navLinks.map(link => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page, link.sectionId)}
                className={`relative py-1 transition-colors hover:text-white whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded cursor-pointer ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI Project Advisor Trigger */}
          <button
            onClick={() => setIsAIAdvisorOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/50 transition-colors shadow-sm cursor-pointer"
            title="Open AI Project Scoping Advisor"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Scoping Advisor</span>
          </button>

          <ThemeToggle />

          {/* Authentication State Management */}
          {isAuthLoading ? (
            <div className="w-24 h-8 bg-slate-800/60 rounded-xl animate-pulse" />
          ) : currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                  currentUser.role === 'owner'
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                    : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50'
                }`}
              >
                {currentUser.role === 'owner' ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Owner Console</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="truncate max-w-[90px]">{currentUser.name.split(' ')[0]}</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-800 text-xs">
                    <p className="font-semibold text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate font-mono">{currentUser.email}</p>
                  </div>

                  <div className="py-1 space-y-0.5">
                    {currentUser.role === 'owner' ? (
                      <button
                        onClick={() => handleNavClick('admin')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Owner Studio Dashboard</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleNavClick('portal')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Client Project Portal</span>
                      </button>
                    )}

                    <button
                      onClick={handleOpenProfile}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Account Settings & Profile</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-800">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setAuthModalInitialMode('signin');
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => navigateTo('welcome')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-colors cursor-pointer"
              >
                <span>Client Hub</span>
              </button>
            </div>
          )}

          {/* Primary CTA */}
          <Button
            size="sm"
            variant="primary"
            actionName="Nav CTA Click: Start a Project"
            onClick={() => handleNavClick('contact', 'enquiry-form-section')}
            iconRight={<ArrowUpRight className="w-4 h-4" />}
            className="hidden sm:inline-flex"
          >
            Start Project
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="xl:hidden p-2 text-slate-400 hover:text-white rounded-xl border border-slate-800 bg-slate-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/98 px-3 sm:px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Navigation Links Grid with 44px min-height */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1 pb-2 border-b border-slate-800/80">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.page, link.sectionId)}
                  className={`text-left px-3.5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-cyan-400 font-semibold border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900/70 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          {/* Mobile Theme & Quick Mode Control */}
          <div className="flex items-center justify-between px-3.5 py-2.5 min-h-[44px] rounded-xl bg-slate-900/70 border border-slate-800/80 text-xs sm:text-sm">
            <span className="text-slate-300 font-medium">Display Appearance</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono capitalize">{theme} Mode</span>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            {currentUser ? (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-semibold truncate max-w-[200px]">{currentUser.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold">{currentUser.role}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo(currentUser.role === 'owner' ? 'admin' : 'portal');
                    }}
                    className="min-h-[40px] py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 text-center cursor-pointer transition-colors"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="min-h-[40px] py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 text-center cursor-pointer transition-colors"
                  >
                    Profile Settings
                  </button>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full min-h-[38px] py-2 text-xs font-semibold text-rose-400 text-center hover:bg-rose-950/30 rounded-lg cursor-pointer transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalInitialMode('signin');
                    setIsAuthModalOpen(true);
                  }}
                  className="min-h-[44px] py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200 text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalInitialMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="min-h-[44px] py-2.5 px-3 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 text-xs sm:text-sm font-semibold text-cyan-300 text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Create Account</span>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAIAdvisorOpen(true);
              }}
              className="w-full min-h-[44px] py-2.5 px-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-cyan-900/50 transition-colors"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Launch AI Project Scoping Advisor</span>
            </button>

            <Button
              size="md"
              variant="primary"
              actionName="Mobile Drawer CTA: Start a Project"
              onClick={() => handleNavClick('contact', 'enquiry-form-section')}
              iconRight={<ArrowUpRight className="w-4 h-4" />}
              className="w-full"
            >
              Start a Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
