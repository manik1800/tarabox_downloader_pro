import React from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonSection = () => {
  const comparisonData = [
    {
      feature: 'Download Speed',
      standard: '1-5 MB/s',
      tarabox: 'Up to 50 MB/s',
      improvement: '10x faster',
      icon: 'Zap'
    },
    {
      feature: 'File Size Limit',
      standard: '2GB - 15GB',
      tarabox: 'Unlimited',
      improvement: 'No restrictions',
      icon: 'Infinity'
    },
    {
      feature: 'Simultaneous Downloads',
      standard: '1-3 files',
      tarabox: 'Unlimited',
      improvement: 'Batch processing',
      icon: 'Layers'
    },
    {
      feature: 'Resume Downloads',
      standard: 'Limited support',
      tarabox: 'Always available',
      improvement: 'Never lose progress',
      icon: 'RotateCcw'
    },
    {
      feature: 'Folder Downloads',
      standard: 'Manual zip creation',
      tarabox: 'Direct folder sync',
      improvement: 'One-click folders',
      icon: 'Folder'
    },
    {
      feature: 'Wait Times',
      standard: '30s - 5min delays',
      tarabox: 'Instant start',
      improvement: 'Zero wait time',
      icon: 'Clock'
    },
    {
      feature: 'Bandwidth Usage',
      standard: 'Inefficient',
      tarabox: 'Optimized',
      improvement: 'Smart compression',
      icon: 'Activity'
    },
    {
      feature: 'Mobile Support',
      standard: 'Basic web only',
      tarabox: 'Native apps',
      improvement: 'Full mobile experience',
      icon: 'Smartphone'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose{' '}
            <span className="text-gradient-brand">TaraBox</span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See how TaraBox transforms your cloud downloading experience compared to standard cloud storage limitations.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-brand border border-border overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold">Feature Comparison</h3>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-lg">Standard Cloud Downloads</h4>
                <p className="text-sm opacity-90">Traditional method</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-lg">TaraBox Pro</h4>
                <p className="text-sm opacity-90">Optimized solution</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-lg">Improvement</h4>
                <p className="text-sm opacity-90">Your benefit</p>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {comparisonData.map((item, index) => (
              <div
                key={item.feature}
                className={`p-6 hover:bg-muted/30 transition-colors duration-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-muted/10'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                  {/* Feature Name */}
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon} size={20} className="text-brand-primary" />
                    </div>
                    <span className="font-semibold text-foreground">{item.feature}</span>
                  </div>

                  {/* Standard */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg">
                      <Icon name="X" size={16} />
                      <span className="text-sm font-medium">{item.standard}</span>
                    </div>
                  </div>

                  {/* TaraBox */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                      <Icon name="Check" size={16} />
                      <span className="text-sm font-medium">{item.tarabox}</span>
                    </div>
                  </div>

                  {/* Improvement */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-3 py-2 rounded-lg">
                      <Icon name="TrendingUp" size={16} />
                      <span className="text-sm font-medium">{item.improvement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 border border-border shadow-elevation-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join over 50,000 users who have already transformed their cloud downloading experience. Start your free trial today and see the improvements for yourself.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Sparkles" size={20} />
                  <span className="font-semibold">Start Free Trial</span>
                </div>
              </div>
              
              <div className="text-muted-foreground text-sm">
                No credit card required • 7-day free trial • Cancel anytime
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <div className="text-3xl font-bold text-success mb-2">300%</div>
            <div className="text-sm text-muted-foreground">Average Speed Increase</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <div className="text-3xl font-bold text-brand-primary mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Time Saved Per Download</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <div className="text-3xl font-bold text-brand-secondary mb-2">0</div>
            <div className="text-sm text-muted-foreground">Failed Downloads</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;