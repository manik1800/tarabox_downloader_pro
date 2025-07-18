import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PremiumFeatures = ({ userPlan = 'free', onUpgrade }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const premiumFeatures = [
    {
      id: 'parallel-downloads',
      title: 'Parallel Downloads',
      description: 'Download up to 10 files simultaneously',
      icon: 'Zap',
      available: userPlan !== 'free',
      highlight: true
    },
    {
      id: 'priority-queue',
      title: 'Priority Queue',
      description: 'Jump ahead in download queues',
      icon: 'ArrowUp',
      available: userPlan === 'premium' || userPlan === 'pro',
      highlight: false
    },
    {
      id: 'bandwidth-boost',
      title: 'Bandwidth Boost',
      description: '300% faster download speeds',
      icon: 'Gauge',
      available: userPlan !== 'free',
      highlight: true
    },
    {
      id: 'cloud-sync',
      title: 'Cloud Sync',
      description: 'Sync downloads across devices',
      icon: 'Cloud',
      available: userPlan === 'pro',
      highlight: false
    },
    {
      id: 'api-access',
      title: 'API Access',
      description: 'Integrate with your applications',
      icon: 'Code',
      available: userPlan === 'pro',
      highlight: false
    },
    {
      id: 'bulk-operations',
      title: 'Bulk Operations',
      description: 'Process hundreds of URLs at once',
      icon: 'Layers',
      available: userPlan !== 'free',
      highlight: true
    }
  ];

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['3 concurrent downloads', 'Basic speed', 'Standard support'],
      current: userPlan === 'free'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      features: ['10 concurrent downloads', '300% faster speeds', 'Priority support', 'No ads'],
      current: userPlan === 'premium',
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99',
      period: 'month',
      features: ['Unlimited downloads', 'Maximum speeds', 'API access', 'Cloud sync', 'Priority queue'],
      current: userPlan === 'pro'
    }
  ];

  const usageStats = {
    downloadsUsed: 47,
    downloadsLimit: userPlan === 'free' ? 100 : userPlan === 'premium' ? 1000 : 'unlimited',
    speedBoost: userPlan === 'free' ? 1 : userPlan === 'premium' ? 3 : 5,
    concurrentLimit: userPlan === 'free' ? 3 : userPlan === 'premium' ? 10 : 'unlimited'
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Status */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Current Plan</h3>
            <p className="text-muted-foreground">
              You're on the <span className="font-medium capitalize">{userPlan}</span> plan
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            userPlan === 'free' ? 'bg-gray-100 text-gray-700' :
            userPlan === 'premium'? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
          }`}>
            {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Downloads Used</span>
              <Icon name="Download" size={16} className="text-blue-600" />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {usageStats.downloadsUsed}
              {typeof usageStats.downloadsLimit === 'number' && (
                <span className="text-sm text-muted-foreground">/{usageStats.downloadsLimit}</span>
              )}
            </div>
            {typeof usageStats.downloadsLimit === 'number' && (
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(usageStats.downloadsUsed / usageStats.downloadsLimit) * 100}%` }}
                />
              </div>
            )}
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Speed Boost</span>
              <Icon name="Zap" size={16} className="text-yellow-600" />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {usageStats.speedBoost}x faster
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Concurrent Downloads</span>
              <Icon name="Layers" size={16} className="text-green-600" />
            </div>
            <div className="text-lg font-semibold text-foreground">
              {usageStats.concurrentLimit === 'unlimited' ? 'Unlimited' : usageStats.concurrentLimit}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Premium Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {premiumFeatures.map(feature => (
            <div
              key={feature.id}
              className={`relative p-4 rounded-lg border transition-all ${
                feature.available
                  ? 'border-green-200 bg-green-50' :'border-border bg-muted/30'
              } ${feature.highlight ? 'ring-2 ring-brand-primary/20' : ''}`}
            >
              {feature.highlight && !feature.available && (
                <div className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  feature.available
                    ? 'bg-green-100 text-green-600' :'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={feature.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="mt-2">
                    {feature.available ? (
                      <div className="flex items-center text-green-600 text-sm">
                        <Icon name="Check" size={14} className="mr-1" />
                        Available
                      </div>
                    ) : (
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Icon name="Lock" size={14} className="mr-1" />
                        Upgrade required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade CTA */}
      {userPlan === 'free' && (
        <div className="bg-gradient-brand rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Unlock Premium Features</h3>
              <p className="text-white/90 mb-4">
                Get 300% faster downloads, unlimited concurrent downloads, and priority support
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Icon name="Zap" size={16} className="mr-1" />
                  300% faster speeds
                </div>
                <div className="flex items-center">
                  <Icon name="Layers" size={16} className="mr-1" />
                  10 concurrent downloads
                </div>
                <div className="flex items-center">
                  <Icon name="Shield" size={16} className="mr-1" />
                  Priority support
                </div>
              </div>
            </div>
            <div className="text-right">
              <Button
                variant="secondary"
                onClick={() => setShowUpgradeModal(true)}
                className="bg-white text-brand-primary hover:bg-white/90"
              >
                <Icon name="Crown" size={16} className="mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Choose Your Plan</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                Unlock the full potential of TaraBox Downloader Pro
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map(plan => (
                  <div
                    key={plan.id}
                    className={`relative p-6 rounded-lg border-2 transition-all ${
                      plan.popular
                        ? 'border-brand-primary bg-brand-primary/5'
                        : plan.current
                        ? 'border-green-500 bg-green-50' :'border-border'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Icon name="Check" size={16} className="text-green-600 mr-2 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                      fullWidth
                      onClick={() => {
                        if (!plan.current) {
                          onUpgrade(plan.id);
                          setShowUpgradeModal(false);
                        }
                      }}
                      disabled={plan.current}
                      className={plan.popular ? "bg-brand-primary hover:bg-brand-primary/90" : ""}
                    >
                      {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  All plans include 30-day money-back guarantee • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumFeatures;