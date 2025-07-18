import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Download Center', path: '/download-center', icon: 'Download' },
    { name: 'Premium Features', path: '/premium-features', icon: 'Crown' },
    { name: 'Knowledge Base', path: '/knowledge-base', icon: 'BookOpen' },
    { name: 'API Docs', path: '/api-documentation', icon: 'Code' },
    { name: 'Dashboard', path: '/account-dashboard', icon: 'User' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-elevation-2 border-b border-border' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/homepage" 
            className="flex items-center space-x-3 group"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center shadow-brand group-hover:shadow-elevation-3 transition-all duration-300 group-hover:scale-105">
                <Icon name="Download" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-secondary rounded-full flex items-center justify-center">
                <Icon name="Zap" size={10} color="white" strokeWidth={3} />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient-brand">TaraBox</h1>
              <p className="text-xs text-muted-foreground font-medium -mt-1">Downloader Pro</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-250 hover:bg-muted/50 ${
                  isActivePath(item.path)
                    ? 'text-brand-primary bg-brand-primary/10 shadow-sm'
                    : 'text-foreground hover:text-brand-primary'
                }`}
              >
                <Icon 
                  name={item.icon} 
                  size={16} 
                  color={isActivePath(item.path) ? 'var(--color-brand-primary)' : 'currentColor'} 
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Icon name="Bell" size={16} className="mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="LogIn" size={16} className="mr-2" />
              Sign In
            </Button>
            <Button variant="default" size="sm" className="bg-brand-primary hover:bg-brand-primary/90">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Go Premium
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted/50 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              className="transition-transform duration-200"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-spring ${
            isMobileMenuOpen 
              ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-4 py-4 bg-white/95 backdrop-blur-md border-t border-border">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'text-brand-primary bg-brand-primary/10 shadow-sm'
                      : 'text-foreground hover:bg-muted/50 hover:text-brand-primary'
                  }`}
                >
                  <Icon 
                    name={item.icon} 
                    size={18} 
                    color={isActivePath(item.path) ? 'var(--color-brand-primary)' : 'currentColor'} 
                  />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <Button variant="ghost" fullWidth className="justify-start text-muted-foreground">
                <Icon name="Bell" size={16} className="mr-3" />
                Notifications
              </Button>
              <Button variant="outline" fullWidth className="justify-start">
                <Icon name="LogIn" size={16} className="mr-3" />
                Sign In
              </Button>
              <Button variant="default" fullWidth className="justify-start bg-brand-primary hover:bg-brand-primary/90">
                <Icon name="Sparkles" size={16} className="mr-3" />
                Go Premium
              </Button>
            </div>

            {/* Mobile Brand Info */}
            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                Download without limits • 300% faster speeds
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-slow"></div>
                  <span className="text-xs text-success font-medium">Online</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  2.3M+ downloads today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;