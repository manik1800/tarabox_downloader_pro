import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveDemo = () => {
  const [activeDemo, setActiveDemo] = useState('batch');
  const [batchUrls, setBatchUrls] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const demos = {
    batch: {
      title: "Batch URL Processor",
      description: "Experience how easy it is to process multiple URLs at once",
      icon: "Package"
    },
    scheduler: {
      title: "Download Scheduler",
      description: "Schedule downloads for optimal timing",
      icon: "Clock"
    },
    analytics: {
      title: "Usage Analytics",
      description: "View detailed insights into your download patterns",
      icon: "BarChart3"
    }
  };

  const sampleUrls = [
    "https://example.com/file1.zip",
    "https://example.com/file2.pdf",
    "https://example.com/file3.mp4",
    "https://example.com/file4.docx",
    "https://example.com/file5.xlsx"
  ];

  const handleBatchProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const loadSampleUrls = () => {
    setBatchUrls(sampleUrls.join('\n'));
  };

  const analyticsData = [
    { label: "Total Downloads", value: "2,847", change: "+12%", icon: "Download" },
    { label: "Data Saved", value: "1.2 TB", change: "+8%", icon: "HardDrive" },
    { label: "Time Saved", value: "47 hrs", change: "+15%", icon: "Clock" },
    { label: "Success Rate", value: "99.2%", change: "+0.3%", icon: "CheckCircle" }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">Interactive Feature Demos</h2>
        <p className="text-muted-foreground">Try out premium features before you upgrade</p>
      </div>

      {/* Demo Selector */}
      <div className="flex border-b border-border">
        {Object.entries(demos).map(([key, demo]) => (
          <button
            key={key}
            onClick={() => setActiveDemo(key)}
            className={`flex-1 p-4 text-center transition-all duration-200 ${
              activeDemo === key
                ? 'bg-brand-primary text-white' :'text-muted-foreground hover:text-foreground hover:bg-muted/20'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon 
                name={demo.icon} 
                size={18} 
                color={activeDemo === key ? 'white' : 'currentColor'} 
              />
              <span className="font-medium hidden sm:inline">{demo.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="p-6">
        {activeDemo === 'batch' && (
          <div className="space-y-6">
            <div className="text-center">
              <Icon name="Package" size={48} color="var(--color-brand-primary)" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{demos.batch.title}</h3>
              <p className="text-muted-foreground">{demos.batch.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Paste your URLs (one per line)</label>
                <Button variant="outline" size="sm" onClick={loadSampleUrls}>
                  <Icon name="FileText" size={14} className="mr-2" />
                  Load Sample
                </Button>
              </div>
              
              <textarea
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                placeholder="https://example.com/file1.zip&#10;https://example.com/file2.pdf&#10;https://example.com/file3.mp4"
                className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {batchUrls.split('\n').filter(url => url.trim()).length} URLs detected
                </div>
                <Button 
                  variant="default" 
                  onClick={handleBatchProcess}
                  loading={isProcessing}
                  disabled={!batchUrls.trim()}
                  className="bg-brand-primary hover:bg-brand-primary/90"
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Process Batch
                </Button>
              </div>

              {isProcessing && (
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">Processing URLs...</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-brand-primary h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeDemo === 'scheduler' && (
          <div className="space-y-6">
            <div className="text-center">
              <Icon name="Clock" size={48} color="var(--color-brand-primary)" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{demos.scheduler.title}</h3>
              <p className="text-muted-foreground">{demos.scheduler.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Download URL"
                  type="url"
                  placeholder="https://example.com/largefile.zip"
                  value="https://example.com/largefile.zip"
                />
                <Input
                  label="Schedule Time"
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Quick Schedule Options</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">Tonight 2 AM</Button>
                    <Button variant="outline" size="sm">Weekend</Button>
                    <Button variant="outline" size="sm">Off-peak Hours</Button>
                    <Button variant="outline" size="sm">Custom Time</Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3">Scheduled Downloads</h4>
                <div className="space-y-3">
                  {[
                    { file: "project-files.zip", time: "Tonight 2:00 AM", status: "scheduled" },
                    { file: "backup-data.tar", time: "Tomorrow 1:00 AM", status: "scheduled" },
                    { file: "media-collection.zip", time: "Weekend", status: "pending" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex items-center space-x-2">
                        <Icon name="File" size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm text-foreground">{item.file}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDemo === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center">
              <Icon name="BarChart3" size={48} color="var(--color-brand-primary)" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{demos.analytics.title}</h3>
              <p className="text-muted-foreground">{demos.analytics.description}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {analyticsData.map((stat, index) => (
                <div key={index} className="bg-muted/20 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name={stat.icon} size={20} color="var(--color-brand-primary)" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                  <div className="flex items-center justify-center space-x-1">
                    <Icon name="TrendingUp" size={12} color="var(--color-success)" />
                    <span className="text-xs text-success font-medium">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/20 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">Download Activity (Last 7 Days)</h4>
              <div className="h-32 bg-white rounded border flex items-end justify-between p-4">
                {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="w-6 bg-brand-primary rounded-t"
                      style={{height: `${height}%`}}
                    ></div>
                    <span className="text-xs text-muted-foreground">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDemo;