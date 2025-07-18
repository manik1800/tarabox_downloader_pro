import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureComparisonTable = () => {
  const comparisonData = [
    {
      feature: "Download Speed",
      free: "Standard speed",
      premium: "Up to 10x faster",
      icon: "Zap"
    },
    {
      feature: "Simultaneous Downloads",
      free: "1 at a time",
      premium: "Unlimited parallel",
      icon: "Download"
    },
    {
      feature: "File Size Limit",
      free: "2GB per file",
      premium: "No limits",
      icon: "HardDrive"
    },
    {
      feature: "Batch Processing",
      free: "Not available",
      premium: "Up to 1000 URLs",
      icon: "Package"
    },
    {
      feature: "Download History",
      free: "Last 10 downloads",
      premium: "Unlimited history",
      icon: "History"
    },
    {
      feature: "API Access",
      free: "Not available",
      premium: "Full API access",
      icon: "Code"
    },
    {
      feature: "Priority Support",
      free: "Community support",
      premium: "24/7 priority support",
      icon: "Headphones"
    },
    {
      feature: "Ad-Free Experience",
      free: "With ads",
      premium: "Completely ad-free",
      icon: "Shield"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="bg-gradient-brand p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Free vs Premium Comparison</h2>
        <p className="text-white/90">See what you're missing with our premium features</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">Feature</th>
              <th className="text-center p-4 font-semibold text-muted-foreground">Free Plan</th>
              <th className="text-center p-4 font-semibold text-brand-primary">Premium Plan</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, index) => (
              <tr key={index} className="border-t border-border hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={item.icon} size={16} color="var(--color-brand-primary)" />
                    </div>
                    <span className="font-medium text-foreground">{item.feature}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-muted-foreground">{item.free}</span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Check" size={16} color="var(--color-success)" />
                    <span className="text-success font-medium">{item.premium}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-muted/20 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <p className="text-sm text-muted-foreground">Ready to unlock all features?</p>
            <p className="text-lg font-semibold text-foreground">Start your 7-day free trial today</p>
          </div>
          <Button variant="default" className="bg-brand-primary hover:bg-brand-primary/90">
            <Icon name="Crown" size={16} className="mr-2" />
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparisonTable;