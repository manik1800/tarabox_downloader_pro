import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

import UrlInput from './components/UrlInput';
import DownloadQueue from './components/DownloadQueue';
import DownloadStats from './components/DownloadStats';
import AdvancedControls from './components/AdvancedControls';
import QuickActions from './components/QuickActions';
import PremiumFeatures from './components/PremiumFeatures';

const DownloadCenter = () => {
  const [downloads, setDownloads] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('queue');
  const [settings, setSettings] = useState({
    maxConcurrentDownloads: 3,
    maxBandwidth: 0,
    downloadPath: '/Downloads',
    autoRetry: true,
    retryAttempts: 3,
    enableScheduling: false,
    scheduledTime: '02:00',
    enableNotifications: true,
    autoExtract: false,
    deleteAfterExtract: false,
    priorityMode: 'fifo'
  });

  // Mock downloads data
  useEffect(() => {
    const mockDownloads = [
      {
        id: 1,
        fileName: 'Project_Files_2024.zip',
        sourceUrl: 'https://drive.google.com/file/d/1234567890/view',
        status: 'downloading',
        progress: 67,
        totalSize: 524288000, // 500MB
        downloadedSize: 351272960, // 335MB
        speed: 2097152, // 2MB/s
        eta: 82, // seconds
        createdAt: new Date(Date.now() - 300000), // 5 minutes ago
        completedAt: null
      },
      {
        id: 2,
        fileName: 'Video_Tutorial_HD.mp4',
        sourceUrl: 'https://dropbox.com/s/abcdef123456/video.mp4',
        status: 'completed',
        progress: 100,
        totalSize: 1073741824, // 1GB
        downloadedSize: 1073741824, // 1GB
        speed: 0,
        eta: 0,
        createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
        completedAt: new Date(Date.now() - 600000) // 10 minutes ago
      },
      {
        id: 3,
        fileName: 'Software_Installer.exe',
        sourceUrl: 'https://mega.nz/file/xyz789abc',
        status: 'paused',
        progress: 23,
        totalSize: 157286400, // 150MB
        downloadedSize: 36175872, // 34.5MB
        speed: 0,
        eta: 0,
        createdAt: new Date(Date.now() - 900000), // 15 minutes ago
        completedAt: null
      },
      {
        id: 4,
        fileName: 'Document_Archive.rar',
        sourceUrl: 'https://mediafire.com/file/def456ghi/archive.rar',
        status: 'failed',
        progress: 0,
        totalSize: 209715200, // 200MB
        downloadedSize: 0,
        speed: 0,
        eta: 0,
        createdAt: new Date(Date.now() - 1200000), // 20 minutes ago
        completedAt: null,
        error: 'Connection timeout'
      },
      {
        id: 5,
        fileName: 'Music_Collection.zip',
        sourceUrl: 'https://onedrive.live.com/download?cid=123&resid=456',
        status: 'queued',
        progress: 0,
        totalSize: 314572800, // 300MB
        downloadedSize: 0,
        speed: 0,
        eta: 0,
        createdAt: new Date(Date.now() - 60000), // 1 minute ago
        completedAt: null
      }
    ];

    setDownloads(mockDownloads);
  }, []);

  const handleAddDownload = async (url) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create new download entry
    const newDownload = {
      id: Date.now(),
      fileName: `Download_${Date.now()}.file`,
      sourceUrl: url,
      status: 'queued',
      progress: 0,
      totalSize: Math.floor(Math.random() * 1000000000) + 10000000, // Random size between 10MB-1GB
      downloadedSize: 0,
      speed: 0,
      eta: 0,
      createdAt: new Date(),
      completedAt: null
    };

    setDownloads(prev => [newDownload, ...prev]);
    setIsProcessing(false);

    // Simulate starting download after a short delay
    setTimeout(() => {
      setDownloads(prev => prev.map(d => 
        d.id === newDownload.id 
          ? { ...d, status: 'downloading', speed: Math.floor(Math.random() * 5000000) + 500000 }
          : d
      ));
    }, 2000);
  };

  const handleDownloadAction = (action, downloadId) => {
    setDownloads(prev => prev.map(download => {
      if (download.id === downloadId) {
        switch (action) {
          case 'pause':
            return { ...download, status: 'paused', speed: 0, eta: 0 };
          case 'resume':
            return { 
              ...download, 
              status: 'downloading', 
              speed: Math.floor(Math.random() * 5000000) + 500000,
              eta: Math.floor((download.totalSize - download.downloadedSize) / 2000000)
            };
          case 'cancel':
            return { ...download, status: 'failed', speed: 0, eta: 0 };
          case 'retry':
            return { 
              ...download, 
              status: 'downloading', 
              progress: 0, 
              downloadedSize: 0,
              speed: Math.floor(Math.random() * 5000000) + 500000
            };
          case 'remove':
            return null;
          default:
            return download;
        }
      }
      return download;
    }).filter(Boolean));
  };

  const handleBatchAction = (action, downloadIds) => {
    downloadIds.forEach(id => {
      handleDownloadAction(action, id);
    });
  };

  const handleExport = (exportType) => {
    console.log('Exporting:', exportType);
    // Implement export functionality
  };

  const handleImport = (content, fileType) => {
    console.log('Importing:', content, fileType);
    // Implement import functionality
  };

  const handleUpgrade = (planId) => {
    console.log('Upgrading to:', planId);
    // Implement upgrade functionality
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const tabs = [
    { id: 'queue', label: 'Download Queue', icon: 'List', count: downloads.length },
    { id: 'stats', label: 'Statistics', icon: 'BarChart3', count: null },
    { id: 'controls', label: 'Advanced Controls', icon: 'Settings', count: null },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap', count: null },
    { id: 'premium', label: 'Premium Features', icon: 'Crown', count: null }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-brand text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Download Center</h1>
              <p className="text-xl text-white/90 mb-6">
                Manage all your downloads in one powerful interface
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm">
                <div className="flex items-center">
                  <Icon name="Zap" size={16} className="mr-2" />
                  300% faster speeds
                </div>
                <div className="flex items-center">
                  <Icon name="Shield" size={16} className="mr-2" />
                  Secure downloads
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Resume support
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* URL Input */}
                <UrlInput 
                  onAddDownload={handleAddDownload}
                  isProcessing={isProcessing}
                />

                {/* Navigation Links */}
                <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Quick Navigation</h3>
                  <nav className="space-y-1">
                    <Link
                      to="/homepage"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <Icon name="Home" size={16} />
                      <span>Homepage</span>
                    </Link>
                    <Link
                      to="/premium-features"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <Icon name="Crown" size={16} />
                      <span>Premium Features</span>
                    </Link>
                    <Link
                      to="/knowledge-base"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <Icon name="BookOpen" size={16} />
                      <span>Knowledge Base</span>
                    </Link>
                    <Link
                      to="/account-dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <Icon name="User" size={16} />
                      <span>Account Dashboard</span>
                    </Link>
                  </nav>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Service Status</span>
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                        Online
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Downloads</span>
                      <span className="font-medium text-foreground">
                        {downloads.filter(d => d.status === 'downloading').length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Queue Length</span>
                      <span className="font-medium text-foreground">{downloads.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Tab Navigation */}
              <div className="bg-white rounded-lg shadow-sm border border-border mb-6">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-brand-primary text-brand-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                        }`}
                      >
                        <Icon name={tab.icon} size={16} />
                        <span>{tab.label}</span>
                        {tab.count !== null && (
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activeTab === tab.id
                              ? 'bg-brand-primary/10 text-brand-primary' :'bg-muted text-muted-foreground'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'queue' && (
                    <DownloadQueue
                      downloads={downloads}
                      onPause={(id) => handleDownloadAction('pause', id)}
                      onResume={(id) => handleDownloadAction('resume', id)}
                      onCancel={(id) => handleDownloadAction('cancel', id)}
                      onRetry={(id) => handleDownloadAction('retry', id)}
                      onRemove={(id) => handleDownloadAction('remove', id)}
                    />
                  )}

                  {activeTab === 'stats' && (
                    <DownloadStats downloads={downloads} />
                  )}

                  {activeTab === 'controls' && (
                    <AdvancedControls
                      currentSettings={settings}
                      onSettingsChange={handleSettingsChange}
                    />
                  )}

                  {activeTab === 'actions' && (
                    <QuickActions
                      downloads={downloads}
                      onBatchAction={handleBatchAction}
                      onExport={handleExport}
                      onImport={handleImport}
                    />
                  )}

                  {activeTab === 'premium' && (
                    <PremiumFeatures
                      userPlan="free"
                      onUpgrade={handleUpgrade}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadCenter;