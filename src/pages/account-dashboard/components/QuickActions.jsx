import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = () => {
  const [quickUrl, setQuickUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickActionItems = [
    {
      id: 'download',
      title: 'Quick Download',
      description: 'Paste URL and download instantly',
      icon: 'Download',
      color: 'brand-primary',
      action: 'download'
    },
    {
      id: 'batch',
      title: 'Batch Process',
      description: 'Upload multiple URLs at once',
      icon: 'Layers',
      color: 'brand-secondary',
      action: 'batch'
    },
    {
      id: 'schedule',
      title: 'Schedule Download',
      description: 'Set downloads for later',
      icon: 'Clock',
      color: 'warning',
      action: 'schedule'
    },
    {
      id: 'api',
      title: 'API Playground',
      description: 'Test API endpoints',
      icon: 'Code',
      color: 'success',
      action: 'api'
    }
  ];

  const recentPlatforms = [
    { name: 'Google Drive', icon: 'HardDrive', count: 45 },
    { name: 'Dropbox', icon: 'Cloud', count: 32 },
    { name: 'OneDrive', icon: 'CloudDrizzle', count: 28 },
    { name: 'Box', icon: 'Package', count: 15 }
  ];

  const handleQuickDownload = async () => {
    if (!quickUrl.trim()) return;
    
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setQuickUrl('');
      console.log('Quick download initiated for:', quickUrl);
    }, 2000);
  };

  const handleQuickAction = (action) => {
    console.log('Quick action:', action);
  };

  return (
    <div className="space-y-6">
      {/* Quick Download */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Download</h3>
        
        <div className="space-y-4">
          <Input
            type="url"
            placeholder="Paste your cloud storage URL here..."
            value={quickUrl}
            onChange={(e) => setQuickUrl(e.target.value)}
            className="w-full"
          />
          
          <Button
            variant="default"
            fullWidth
            loading={isProcessing}
            disabled={!quickUrl.trim()}
            onClick={handleQuickDownload}
          >
            <Icon name="Download" size={16} className="mr-2" />
            {isProcessing ? 'Processing...' : 'Download Now'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Supports Google Drive, Dropbox, OneDrive, Box, and 15+ more platforms</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActionItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleQuickAction(item.action)}
              className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors duration-200 text-left group"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 bg-${item.color}/10 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                  <Icon name={item.icon} size={20} color={`var(--color-${item.color})`} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Platforms */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Frequently Used Platforms</h3>
        
        <div className="space-y-3">
          {recentPlatforms.map((platform, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={platform.icon} size={16} color="var(--color-brand-primary)" />
                </div>
                <span className="font-medium text-foreground">{platform.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{platform.count} downloads</span>
                <Button variant="ghost" size="sm">
                  <Icon name="ExternalLink" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workflow Optimization */}
      <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-xl p-6 border border-brand-primary/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="var(--color-brand-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Workflow Optimization</h3>
            <p className="text-sm text-muted-foreground">Based on your usage patterns</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-foreground">Enable auto-retry for failed downloads</span>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={16} color="var(--color-brand-primary)" />
              <span className="text-sm font-medium text-foreground">Set up download completion notifications</span>
            </div>
            <Button variant="outline" size="sm">
              Setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;