import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PremiumStatus = () => {
  const [userPlan] = useState({
    type: 'premium',
    name: 'Premium Pro',
    expiryDate: '2025-12-18',
    features: [
      'Unlimited downloads',
      'Priority download speeds',
      'Batch processing',
      'API access',
      'Advanced analytics',
      '24/7 support'
    ],
    usage: {
      downloads: { used: 247, limit: null },
      bandwidth: { used: 45.2, limit: null },
      apiCalls: { used: 1250, limit: 5000 }
    }
  });

  const [recommendations] = useState([
    {
      id: 1,
      title: 'API Integration',
      description: 'Automate your downloads with our REST API',
      icon: 'Code',
      action: 'Learn More',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Batch Processing',
      description: 'Process multiple files simultaneously',
      icon: 'Layers',
      action: 'Try Now',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Team Collaboration',
      description: 'Share downloads with team members',
      icon: 'Users',
      action: 'Upgrade',
      priority: 'low'
    }
  ]);

  const getDaysUntilExpiry = () => {
    const today = new Date();
    const expiry = new Date(userPlan.expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUsagePercentage = (used, limit) => {
    if (!limit) return 0;
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 70) return 'text-warning';
    return 'text-success';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-brand-primary';
      default: return 'border-l-muted';
    }
  };

  const daysUntilExpiry = getDaysUntilExpiry();

  return (
    <div className="space-y-6">
      {/* Premium Status Card */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Crown" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{userPlan.name}</h2>
              <p className="text-white/80 text-sm">Active subscription</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{daysUntilExpiry}</div>
            <div className="text-white/80 text-sm">days left</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {userPlan.features.slice(0, 6).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} color="white" />
              <span className="text-sm text-white/90">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-white/80">
            Renews on {new Date(userPlan.expiryDate).toLocaleDateString()}
          </div>
          <Button variant="secondary" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            Manage Plan
          </Button>
        </div>
      </div>

      {/* Usage Limits */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Usage Overview</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Downloads</span>
              <span className="text-sm text-muted-foreground">
                {userPlan.usage.downloads.used} / Unlimited
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full w-full"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Bandwidth</span>
              <span className="text-sm text-muted-foreground">
                {userPlan.usage.bandwidth.used} GB / Unlimited
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full w-full"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">API Calls</span>
              <span className="text-sm text-muted-foreground">
                {userPlan.usage.apiCalls.used} / {userPlan.usage.apiCalls.limit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${getUsageColor(getUsagePercentage(userPlan.usage.apiCalls.used, userPlan.usage.apiCalls.limit)) === 'text-success' ? 'bg-success' : getUsageColor(getUsagePercentage(userPlan.usage.apiCalls.used, userPlan.usage.apiCalls.limit)) === 'text-warning' ? 'bg-warning' : 'bg-error'}`}
                style={{ width: `${getUsagePercentage(userPlan.usage.apiCalls.used, userPlan.usage.apiCalls.limit)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-card rounded-xl p-6 shadow-md border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recommended for You</h3>
        
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className={`border-l-4 ${getPriorityColor(rec.priority)} bg-muted/30 p-4 rounded-r-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={rec.icon} size={20} color="var(--color-brand-primary)" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {rec.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumStatus;