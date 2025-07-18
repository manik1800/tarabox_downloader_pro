import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingTiers = () => {
  const [billingCycle, setBillingCycle] = useState('annual');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for occasional users",
      monthlyPrice: 9.99,
      annualPrice: 7.99,
      features: [
        "5x faster downloads",
        "Up to 5 simultaneous downloads",
        "50GB file size limit",
        "Basic batch processing (10 URLs)",
        "Download history (100 items)",
        "Email support",
        "Ad-free experience"
      ],
      recommended: false,
      color: "border-border",
      buttonVariant: "outline"
    },
    {
      name: "Professional",
      description: "Most popular for power users",
      monthlyPrice: 19.99,
      annualPrice: 15.99,
      features: [
        "10x faster downloads",
        "Unlimited simultaneous downloads",
        "Unlimited file size",
        "Advanced batch processing (500 URLs)",
        "Unlimited download history",
        "Scheduled downloads",
        "Basic API access (1000 calls/month)",
        "Priority email support",
        "Usage analytics"
      ],
      recommended: true,
      color: "border-brand-primary",
      buttonVariant: "default"
    },
    {
      name: "Enterprise",
      description: "For teams and businesses",
      monthlyPrice: 49.99,
      annualPrice: 39.99,
      features: [
        "Maximum speed optimization",
        "Unlimited everything",
        "Team collaboration tools",
        "Advanced batch processing (1000+ URLs)",
        "Full API access (unlimited)",
        "Custom integrations",
        "24/7 phone & chat support",
        "Advanced analytics & reporting",
        "Custom branding",
        "SLA guarantee"
      ],
      recommended: false,
      color: "border-purple-500",
      buttonVariant: "outline"
    }
  ];

  const getPrice = (plan) => {
    return billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice * 12;
    const savings = monthlyCost - annualCost;
    return Math.round(savings);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground mb-6">Start with a 7-day free trial, cancel anytime</p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-muted/30 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              billingCycle === 'monthly' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              billingCycle === 'annual' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Annual
            <span className="ml-2 px-2 py-1 bg-success text-white text-xs rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl border-2 ${plan.color} p-6 ${
                plan.recommended ? 'shadow-brand scale-105' : 'shadow-sm'
              } transition-all duration-300 hover:shadow-lg`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">${getPrice(plan)}</span>
                  <span className="text-muted-foreground">/{billingCycle === 'annual' ? 'month' : 'month'}</span>
                </div>

                {billingCycle === 'annual' && (
                  <div className="text-sm text-success font-medium">
                    Save ${getSavings(plan)} per year
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
                fullWidth
                className={plan.recommended ? 'bg-brand-primary hover:bg-brand-primary/90' : ''}
              >
                <Icon name="Crown" size={16} className="mr-2" />
                Start Free Trial
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">
                No credit card required • Cancel anytime
              </p>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <Icon name="Shield" size={16} />
            <span className="text-sm font-medium">30-day money-back guarantee</span>
          </div>
        </div>

        {/* Usage Recommendations */}
        <div className="mt-8 bg-muted/20 rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4 text-center">Not sure which plan is right for you?</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <Icon name="User" size={24} color="var(--color-brand-primary)" className="mx-auto mb-2" />
              <div className="font-medium text-foreground">Casual Users</div>
              <div className="text-muted-foreground">1-10 downloads/week</div>
              <div className="text-brand-primary font-medium">→ Starter Plan</div>
            </div>
            <div className="text-center">
              <Icon name="Users" size={24} color="var(--color-brand-primary)" className="mx-auto mb-2" />
              <div className="font-medium text-foreground">Power Users</div>
              <div className="text-muted-foreground">10+ downloads/day</div>
              <div className="text-brand-primary font-medium">→ Professional Plan</div>
            </div>
            <div className="text-center">
              <Icon name="Building" size={24} color="var(--color-brand-primary)" className="mx-auto mb-2" />
              <div className="font-medium text-foreground">Teams & Business</div>
              <div className="text-muted-foreground">Multiple users, API needs</div>
              <div className="text-brand-primary font-medium">→ Enterprise Plan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTiers;