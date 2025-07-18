import React from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import FeatureComparisonTable from './components/FeatureComparisonTable';
import PremiumFeatureCategories from './components/PremiumFeatureCategories';
import InteractiveDemo from './components/InteractiveDemo';
import PricingTiers from './components/PricingTiers';
import CustomerSuccessStories from './components/CustomerSuccessStories';
import RiskFreeTrialOffer from './components/RiskFreeTrialOffer';

const PremiumFeatures = () => {
  const painPoints = [
    {
      icon: "Turtle",
      title: "Slow Download Speeds",
      description: "Waiting hours for files that should take minutes",
      solution: "Up to 10x faster with parallel downloading"
    },
    {
      icon: "Ban",
      title: "File Size Restrictions",
      description: "Unable to download large files over 2GB",
      solution: "No limits on file size or type"
    },
    {
      icon: "Clock",
      title: "Time-Consuming Process",
      description: "Manual downloads one by one waste precious time",
      solution: "Batch processing up to 1000 URLs at once"
    },
    {
      icon: "AlertTriangle",
      title: "Failed Downloads",
      description: "Connection issues force you to start over",
      solution: "Smart resume and retry mechanisms"
    }
  ];

  const beforeAfterScenarios = [
    {
      scenario: "Content Creator Workflow",
      before: {
        time: "6 hours",
        description: "Download 50 video files one by one, frequent failures",
        frustration: "High stress, missed deadlines"
      },
      after: {
        time: "45 minutes",
        description: "Batch process all URLs, parallel downloads",
        satisfaction: "Relaxed workflow, early delivery"
      }
    },
    {
      scenario: "Business Data Migration",
      before: {
        time: "2 days",
        description: "Manual downloads, team coordination issues",
        frustration: "Weekend overtime, client delays"
      },
      after: {
        time: "4 hours",
        description: "Automated API integration, scheduled downloads",
        satisfaction: "Seamless process, happy clients"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary rounded-full px-4 py-2 mb-6">
              <Icon name="Crown" size={16} />
              <span className="text-sm font-medium">Premium Features</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Download Without Limits
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Transform your download experience with professional-grade features designed for power users, 
              content creators, and businesses who demand speed, reliability, and control.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">7-day free trial</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="Shield" size={16} />
                <span className="text-sm font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 text-success">
                <Icon name="RefreshCw" size={16} />
                <span className="text-sm font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Pain Points */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={point.icon} size={24} color="#EF4444" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{point.description}</p>
                <div className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} color="var(--color-success)" className="mt-0.5" />
                  <span className="text-sm text-success font-medium">{point.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureComparisonTable />
        </div>
      </section>

      {/* Before/After Scenarios */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Real Impact, Real Results</h2>
            <p className="text-lg text-muted-foreground">See the dramatic difference premium features make</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {beforeAfterScenarios.map((scenario, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-semibold text-foreground">{scenario.scenario}</h3>
                </div>
                <div className="grid md:grid-cols-2">
                  {/* Before */}
                  <div className="p-6 bg-red-50 border-r border-border">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="X" size={16} color="#EF4444" />
                      <span className="font-medium text-red-700">Before Premium</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} color="#EF4444" />
                        <span className="text-sm text-red-700 font-medium">{scenario.before.time}</span>
                      </div>
                      <p className="text-sm text-red-600">{scenario.before.description}</p>
                      <div className="flex items-center space-x-2">
                        <Icon name="Frown" size={14} color="#EF4444" />
                        <span className="text-sm text-red-600">{scenario.before.frustration}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* After */}
                  <div className="p-6 bg-green-50">
                    <div className="flex items-center space-x-2 mb-4">
                      <Icon name="Check" size={16} color="var(--color-success)" />
                      <span className="font-medium text-success">With Premium</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="Zap" size={14} color="var(--color-success)" />
                        <span className="text-sm text-success font-medium">{scenario.after.time}</span>
                      </div>
                      <p className="text-sm text-green-600">{scenario.after.description}</p>
                      <div className="flex items-center space-x-2">
                        <Icon name="Smile" size={14} color="var(--color-success)" />
                        <span className="text-sm text-green-600">{scenario.after.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Feature Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFeatureCategories />
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InteractiveDemo />
        </div>
      </section>

      {/* Customer Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CustomerSuccessStories />
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTiers />
        </div>
      </section>

      {/* Risk-Free Trial Offer */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RiskFreeTrialOffer />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about premium features</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How much faster are premium downloads?",
                answer: "Premium users experience up to 10x faster download speeds through parallel downloading, bandwidth optimization, and CDN acceleration. The exact speed improvement depends on your internet connection and file source."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time with just one click. There are no cancellation fees, and you'll continue to have access to premium features until the end of your billing period."
              },
              {
                question: "What happens to my download history if I downgrade?",
                answer: "Your download history is preserved when you downgrade, but free accounts can only view the last 10 downloads. If you upgrade again, your full history will be restored."
              },
              {
                question: "Is there a limit to how many files I can download?",
                answer: "Premium accounts have no limits on the number of files, file sizes, or total data downloaded. You can download as much as you need without restrictions."
              },
              {
                question: "How does the API access work?",
                answer: "Professional and Enterprise plans include full REST API access with comprehensive documentation. You can integrate TaraBox into your workflows, automate downloads, and build custom solutions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-foreground text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Downloads?</h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of professionals who've already upgraded their workflow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="white" />
              <span className="text-sm">50,000+ active users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} color="white" />
              <span className="text-sm">4.9/5 average rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={16} color="white" />
              <span className="text-sm">10M+ successful downloads</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PremiumFeatures;