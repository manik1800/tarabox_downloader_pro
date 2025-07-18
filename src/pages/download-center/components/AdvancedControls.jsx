import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvancedControls = ({ onSettingsChange, currentSettings }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState({
    maxConcurrentDownloads: currentSettings?.maxConcurrentDownloads || 3,
    maxBandwidth: currentSettings?.maxBandwidth || 0, // 0 means unlimited
    downloadPath: currentSettings?.downloadPath || '/Downloads',
    autoRetry: currentSettings?.autoRetry || true,
    retryAttempts: currentSettings?.retryAttempts || 3,
    enableScheduling: currentSettings?.enableScheduling || false,
    scheduledTime: currentSettings?.scheduledTime || '02:00',
    enableNotifications: currentSettings?.enableNotifications || true,
    autoExtract: currentSettings?.autoExtract || false,
    deleteAfterExtract: currentSettings?.deleteAfterExtract || false,
    priorityMode: currentSettings?.priorityMode || 'fifo', // fifo, lifo, size
    ...currentSettings
  });

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const formatBandwidth = (mbps) => {
    if (mbps === 0) return 'Unlimited';
    if (mbps < 1) return `${(mbps * 1000).toFixed(0)} KB/s`;
    return `${mbps.toFixed(1)} MB/s`;
  };

  const presetBandwidths = [
    { label: 'Unlimited', value: 0 },
    { label: '1 MB/s', value: 1 },
    { label: '5 MB/s', value: 5 },
    { label: '10 MB/s', value: 10 },
    { label: '25 MB/s', value: 25 },
    { label: '50 MB/s', value: 50 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={20} className="text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Advanced Controls</h3>
          </div>
          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={20}
            className="text-muted-foreground"
          />
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Performance Settings */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Performance Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Concurrent Downloads */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Max Concurrent Downloads
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={settings.maxConcurrentDownloads}
                    onChange={(e) => handleSettingChange('maxConcurrentDownloads', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-foreground w-8">
                    {settings.maxConcurrentDownloads}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Higher values may impact system performance
                </p>
              </div>

              {/* Bandwidth Limit */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bandwidth Limit
                </label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.5"
                      value={settings.maxBandwidth}
                      onChange={(e) => handleSettingChange('maxBandwidth', parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-foreground w-20">
                      {formatBandwidth(settings.maxBandwidth)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {presetBandwidths.map(preset => (
                      <button
                        key={preset.value}
                        onClick={() => handleSettingChange('maxBandwidth', preset.value)}
                        className={`px-2 py-1 text-xs rounded ${
                          settings.maxBandwidth === preset.value
                            ? 'bg-brand-primary text-white' :'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Behavior */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Download Behavior</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority Mode */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Download Priority
                </label>
                <select
                  value={settings.priorityMode}
                  onChange={(e) => handleSettingChange('priorityMode', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="fifo">First In, First Out</option>
                  <option value="lifo">Last In, First Out</option>
                  <option value="size">Smallest Files First</option>
                  <option value="manual">Manual Priority</option>
                </select>
              </div>

              {/* Download Path */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Download Location
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={settings.downloadPath}
                    onChange={(e) => handleSettingChange('downloadPath', e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-l-md bg-background"
                    placeholder="/Downloads"
                  />
                  <Button variant="outline" className="rounded-l-none">
                    <Icon name="Folder" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Retry Settings */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Error Handling</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Auto Retry Failed Downloads</label>
                  <p className="text-xs text-muted-foreground">Automatically retry failed downloads</p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoRetry', !settings.autoRetry)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoRetry ? 'bg-brand-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoRetry ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {settings.autoRetry && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Retry Attempts
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={settings.retryAttempts}
                      onChange={(e) => handleSettingChange('retryAttempts', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-foreground w-8">
                      {settings.retryAttempts}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Scheduling</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Enable Download Scheduling</label>
                  <p className="text-xs text-muted-foreground">Schedule downloads for off-peak hours</p>
                </div>
                <button
                  onClick={() => handleSettingChange('enableScheduling', !settings.enableScheduling)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableScheduling ? 'bg-brand-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableScheduling ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {settings.enableScheduling && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Scheduled Start Time
                  </label>
                  <input
                    type="time"
                    value={settings.scheduledTime}
                    onChange={(e) => handleSettingChange('scheduledTime', e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Notifications & Automation */}
          <div>
            <h4 className="text-md font-medium text-foreground mb-4">Notifications & Automation</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Desktop Notifications</label>
                  <p className="text-xs text-muted-foreground">Get notified when downloads complete</p>
                </div>
                <button
                  onClick={() => handleSettingChange('enableNotifications', !settings.enableNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableNotifications ? 'bg-brand-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Auto-Extract Archives</label>
                  <p className="text-xs text-muted-foreground">Automatically extract ZIP, RAR files</p>
                </div>
                <button
                  onClick={() => handleSettingChange('autoExtract', !settings.autoExtract)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoExtract ? 'bg-brand-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoExtract ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {settings.autoExtract && (
                <div className="flex items-center justify-between ml-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">Delete Archive After Extraction</label>
                    <p className="text-xs text-muted-foreground">Save disk space by removing archives</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('deleteAfterExtract', !settings.deleteAfterExtract)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.deleteAfterExtract ? 'bg-brand-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.deleteAfterExtract ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button variant="outline">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Reset to Defaults
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Icon name="Save" size={16} className="mr-2" />
                Save Profile
              </Button>
              <Button variant="default" className="bg-brand-primary hover:bg-brand-primary/90">
                <Icon name="Check" size={16} className="mr-2" />
                Apply Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedControls;