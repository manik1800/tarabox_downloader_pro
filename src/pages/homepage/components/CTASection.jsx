import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for occasional downloads',
      features: [
        '5 downloads per day',
        'Standard speed',
        'Basic support',
        'Single file downloads'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline',
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Ideal for professionals and creators',
      features: [
        'Unlimited downloads',
        '10x faster speeds',
        'Batch processing',
        'Priority support',
        'Mobile apps',
        'Resume downloads'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'default',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$49.99',
      period: 'per month',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team management',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-secondary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Download{' '}
            <span className="text-brand-secondary">Without Limits</span>?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join over 50,000 professionals who have transformed their workflow with TaraBox. Start your free trial today and experience the difference.
          </p>

          {/* Email Subscription */}
          <div className="max-w-md mx-auto mb-8">
            {!isSubscribed ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/70 h-12"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleSubscribe}
                  className="h-12 px-8 bg-white text-brand-primary hover:bg-white/90"
                >
                  <Icon name="Mail" size={18} className="mr-2" />
                  Get Updates
                </Button>
              </div>
            ) : (
              <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex items-center justify-center space-x-2">
                  <Icon name="CheckCircle" size={20} className="text-brand-secondary" />
                  <span className="font-medium">Thanks! We'll keep you updated.</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-brand-primary hover:bg-white/90 px-8"
            >
              <Icon name="Play" size={18} className="mr-2" />
              Watch Demo
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10 px-8"
            >
              <Icon name="Download" size={18} className="mr-2" />
              Try Now Free
            </Button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Choose Your Plan
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border ${
                  plan.popular 
                    ? 'border-brand-secondary shadow-2xl scale-105' 
                    : 'border-white/20'
                } hover:bg-white/15 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-secondary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
                  <div className="mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-white/70 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-white/80 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} className="text-brand-secondary flex-shrink-0" />
                      <span className="text-sm text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.buttonVariant}
                  fullWidth
                  className={`h-12 ${
                    plan.buttonVariant === 'default' ?'bg-brand-secondary hover:bg-brand-secondary/90' 
                      : plan.buttonVariant === 'outline' ?'border-white/30 text-white hover:bg-white/10' :'bg-white text-brand-primary hover:bg-white/90'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-white/80 mb-6">Trusted by professionals worldwide</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center opacity-70">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">50K+</div>
              <div className="text-sm text-white/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">2.3M+</div>
              <div className="text-sm text-white/70">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-sm text-white/70">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-sm text-white/70">Support</div>
            </div>
          </div>

          <div className="mt-8 text-sm text-white/70">
            <p>No credit card required • 7-day free trial • Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;