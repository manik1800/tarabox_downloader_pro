import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      icon: 'Zap',
      title: 'Lightning Fast Downloads',
      description: 'Experience download speeds up to 10x faster than standard cloud downloads with our optimized connection technology.',
      benefits: ['Multi-threaded downloading', 'CDN acceleration', 'Bandwidth optimization'],
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: 'Infinity',
      title: 'No Size Restrictions',
      description: 'Download files of any size without artificial limitations. From documents to 4K videos, handle everything seamlessly.',
      benefits: ['Unlimited file sizes', 'Large folder support', 'Resume interrupted downloads'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: 'Layers',
      title: 'Batch Processing',
      description: 'Queue multiple downloads, process entire folders, and manage hundreds of files with intelligent batch operations.',
      benefits: ['Queue management', 'Folder synchronization', 'Automated processing'],
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const additionalFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security protocols'
    },
    {
      icon: 'Smartphone',
      title: 'Cross-Platform',
      description: 'Works on desktop, mobile, and tablet devices'
    },
    {
      icon: 'Clock',
      title: 'Smart Scheduling',
      description: 'Schedule downloads for optimal bandwidth usage'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      description: 'Track download history and performance metrics'
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Share download queues and manage team access'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Expert support whenever you need assistance'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful Features for{' '}
            <span className="text-gradient-brand">Digital Freedom</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the next generation of cloud downloading with features designed to eliminate frustration and maximize efficiency.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-white rounded-2xl p-8 border ${feature.borderColor} hover:shadow-brand transition-all duration-300 hover:-translate-y-2 group`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={feature.icon} size={32} className={feature.color} />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center text-sm">
                    <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="bg-white rounded-2xl p-8 border border-border shadow-elevation-2">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Everything You Need in One Platform
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon} size={20} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Performance That Speaks for Itself</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">10x</div>
              <div className="text-sm opacity-90">Faster Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-sm opacity-90">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50GB+</div>
              <div className="text-sm opacity-90">Max File Size</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;