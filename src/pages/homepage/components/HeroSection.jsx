import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [downloadStats, setDownloadStats] = useState({
    filesDownloaded: 2347892,
    speedIncrease: 312,
    activeUsers: 15847
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setDownloadStats(prev => ({
        filesDownloaded: prev.filesDownloaded + Math.floor(Math.random() * 5) + 1,
        speedIncrease: 300 + Math.floor(Math.random() * 50),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Validate URL input
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    setIsValidUrl(urlInput.length > 0 && urlPattern.test(urlInput));
  }, [urlInput]);

  const handleDownload = () => {
    if (isValidUrl) {
      // Simulate download process
      console.log('Starting download for:', urlInput);
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrlInput(text);
    } catch (err) {
      console.log('Failed to read clipboard');
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Download{' '}
            <span className="text-gradient-brand">Without Limits</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your cloud storage experience with lightning-fast downloads, no size restrictions, and seamless batch processing. Your files, your speed, your control.
          </p>
        </div>

        {/* URL Input Section */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-brand border border-white/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="Paste your cloud storage link here..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="text-base h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePasteFromClipboard}
                  className="h-12 px-4"
                >
                  <Icon name="Clipboard" size={18} />
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  onClick={handleDownload}
                  disabled={!isValidUrl}
                  className="h-12 px-8 bg-brand-primary hover:bg-brand-primary/90"
                >
                  <Icon name="Download" size={18} className="mr-2" />
                  Download Now
                </Button>
              </div>
            </div>
            
            {urlInput && (
              <div className="mt-3 flex items-center justify-center">
                <div className={`flex items-center space-x-2 text-sm ${isValidUrl ? 'text-success' : 'text-warning'}`}>
                  <Icon name={isValidUrl ? "CheckCircle" : "AlertCircle"} size={16} />
                  <span>{isValidUrl ? 'Valid URL detected' : 'Please enter a valid URL'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Download" size={24} className="text-brand-primary mr-2" />
                <span className="text-2xl font-bold text-foreground">
                  {downloadStats.filesDownloaded.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Files downloaded today</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Zap" size={24} className="text-brand-secondary mr-2" />
                <span className="text-2xl font-bold text-foreground">
                  {downloadStats.speedIncrease}%
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Average speed increase</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Users" size={24} className="text-brand-accent mr-2" />
                <span className="text-2xl font-bold text-foreground">
                  {downloadStats.activeUsers.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Active users right now</p>
            </div>
          </div>
        </div>

        {/* Quick Features */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>100% Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-brand-primary" />
            <span>No Wait Time</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Infinity" size={16} className="text-brand-secondary" />
            <span>Unlimited Downloads</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={16} className="text-brand-accent" />
            <span>All Devices</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;