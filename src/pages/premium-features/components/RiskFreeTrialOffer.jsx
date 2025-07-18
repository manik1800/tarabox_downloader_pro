import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RiskFreeTrialOffer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTrialSignup = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const benefits = [
    {
      icon: "Crown",
      title: "Full Premium Access",
      description: "Try all premium features for 7 days"
    },
    {
      icon: "CreditCard",
      title: "No Credit Card Required",
      description: "Start your trial without any payment info"
    },
    {
      icon: "Shield",
      title: "Cancel Anytime",
      description: "No commitment, cancel with one click"
    },
    {
      icon: "Headphones",
      title: "Priority Support",
      description: "Get help from our premium support team"
    }
  ];

  const guarantees = [
    "30-day money-back guarantee",
    "No hidden fees or charges",
    "Instant activation",
    "Keep your download history",
    "Seamless upgrade/downgrade"
  ];

  if (showSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Trial Activated!</h2>
          <p className="text-muted-foreground mb-6">
            Check your email for setup instructions. Your 7-day premium trial starts now.
          </p>
          <div className="bg-success/10 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Icon name="Clock" size={16} color="var(--color-success)" />
              <span className="text-sm font-medium text-success">Trial Period</span>
            </div>
            <div className="text-lg font-semibold text-success">7 Days Remaining</div>
            <div className="text-xs text-success/80">Expires on July 25, 2025</div>
          </div>
          <Button variant="default" className="bg-brand-primary hover:bg-brand-primary/90">
            <Icon name="Download" size={16} className="mr-2" />
            Start Downloading
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl shadow-brand text-white overflow-hidden">
      <div className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-4">
            <Icon name="Sparkles" size={16} color="white" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Start Your 7-Day Free Trial</h2>
          <p className="text-white/90 text-lg">
            Experience the full power of TaraBox Premium with zero risk
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trial Signup Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Get Started in 30 Seconds</h3>
            
            <form onSubmit={handleTrialSignup} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                />
              </div>
              
              <Button
                type="submit"
                fullWidth
                loading={isSubmitting}
                className="bg-white text-brand-primary hover:bg-white/90 font-semibold"
              >
                <Icon name="Crown" size={16} className="mr-2" />
                Start Free Trial
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-white/80">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">What You Get</h3>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={benefit.icon} size={16} color="white" />
                </div>
                <div>
                  <div className="font-medium">{benefit.title}</div>
                  <div className="text-sm text-white/80">{benefit.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <h3 className="text-lg font-semibold mb-4 text-center">Our Guarantees</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={16} color="white" />
                <span className="text-sm">{guarantee}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="white" />
              <span>50,000+ active users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} color="white" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Download" size={16} color="white" />
              <span>10M+ downloads</span>
            </div>
          </div>
        </div>

        {/* Urgency Element */}
        <div className="mt-6 bg-white/10 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Clock" size={16} color="white" />
            <span className="text-sm font-medium">Limited Time</span>
          </div>
          <p className="text-sm text-white/90">
            Join 2,847 users who started their trial this week
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskFreeTrialOffer;