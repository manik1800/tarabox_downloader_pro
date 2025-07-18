import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatsCard from './components/StatsCard';
import RecentDownloads from './components/RecentDownloads';
import UsageChart from './components/UsageChart';
import PremiumStatus from './components/PremiumStatus';
import QuickActions from './components/QuickActions';
import NotificationCenter from './components/NotificationCenter';

const AccountDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const userInfo = {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    joinDate: "2024-03-15",
    lastLogin: "2025-07-18T01:15:00"
  };

  const dashboardStats = [
    {
      title: "Total Downloads",
      value: "247",
      subtitle: "This month",
      icon: "Download",
      trend: "up",
      trendValue: "+23%",
      color: "brand-primary"
    },
    {
      title: "Data Transferred",
      value: "18.2 GB",
      subtitle: "Bandwidth used",
      icon: "HardDrive",
      trend: "up",
      trendValue: "+15%",
      color: "brand-secondary"
    },
    {
      title: "Time Saved",
      value: "329 min",
      subtitle: "vs standard downloads",
      icon: "Clock",
      trend: "up",
      trendValue: "+42%",
      color: "success"
    },
    {
      title: "Success Rate",
      value: "98.7%",
      subtitle: "Download completion",
      icon: "CheckCircle",
      trend: "up",
      trendValue: "+2.1%",
      color: "warning"
    }
  ];

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'downloads', label: 'Downloads', icon: 'Download' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'premium', label: 'Premium', icon: 'Crown' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <UsageChart />
                <RecentDownloads />
              </div>
              <div className="space-y-8">
                <QuickActions />
              </div>
            </div>
          </div>
        );
      
      case 'downloads':
        return (
          <div className="space-y-8">
            <RecentDownloads />
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
            <UsageChart />
          </div>
        );
      
      case 'premium':
        return (
          <div className="space-y-8">
            <PremiumStatus />
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-8">
            <NotificationCenter />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={userInfo.avatar} 
                    alt={userInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome back, {userInfo.name.split(' ')[0]}!
                  </h1>
                  <p className="text-muted-foreground">
                    Last login: {formatLastLogin(userInfo.lastLogin)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  <Link to="/download-center">New Download</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-brand-primary text-brand-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in-50 duration-200">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* Quick Access Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="lg"
          className="rounded-full shadow-lg bg-brand-primary hover:bg-brand-primary/90 w-14 h-14 p-0"
        >
          <Link to="/download-center">
            <Icon name="Plus" size={24} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AccountDashboard;