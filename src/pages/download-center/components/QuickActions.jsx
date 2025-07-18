import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ downloads, onBatchAction, onExport, onImport }) => {
  const [selectedDownloads, setSelectedDownloads] = useState([]);
  const [showBatchMenu, setShowBatchMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const activeDownloads = downloads.filter(d => d.status === 'downloading');
  const pausedDownloads = downloads.filter(d => d.status === 'paused');
  const completedDownloads = downloads.filter(d => d.status === 'completed');
  const failedDownloads = downloads.filter(d => d.status === 'failed');

  const batchActions = [
    {
      id: 'pause-all',
      label: 'Pause All Active',
      icon: 'Pause',
      color: 'text-yellow-600',
      disabled: activeDownloads.length === 0,
      action: () => onBatchAction('pause', activeDownloads.map(d => d.id))
    },
    {
      id: 'resume-all',
      label: 'Resume All Paused',
      icon: 'Play',
      color: 'text-green-600',
      disabled: pausedDownloads.length === 0,
      action: () => onBatchAction('resume', pausedDownloads.map(d => d.id))
    },
    {
      id: 'retry-failed',
      label: 'Retry All Failed',
      icon: 'RotateCcw',
      color: 'text-blue-600',
      disabled: failedDownloads.length === 0,
      action: () => onBatchAction('retry', failedDownloads.map(d => d.id))
    },
    {
      id: 'clear-completed',
      label: 'Clear Completed',
      icon: 'Trash2',
      color: 'text-red-600',
      disabled: completedDownloads.length === 0,
      action: () => onBatchAction('remove', completedDownloads.map(d => d.id))
    }
  ];

  const exportOptions = [
    {
      id: 'export-urls',
      label: 'Export URLs',
      icon: 'Link',
      description: 'Export download URLs as text file'
    },
    {
      id: 'export-completed',
      label: 'Export Completed List',
      icon: 'CheckCircle',
      description: 'Export list of completed downloads'
    },
    {
      id: 'export-settings',
      label: 'Export Settings',
      icon: 'Settings',
      description: 'Export current configuration'
    },
    {
      id: 'export-all',
      label: 'Export Everything',
      icon: 'Package',
      description: 'Complete backup of downloads and settings'
    }
  ];

  const quickStats = [
    {
      label: 'Active',
      value: activeDownloads.length,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Paused',
      value: pausedDownloads.length,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Completed',
      value: completedDownloads.length,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Failed',
      value: failedDownloads.length,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          onImport(content, file.type);
        } catch (error) {
          console.error('Failed to import file:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} className="mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Batch Actions */}
        <div className="relative">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowBatchMenu(!showBatchMenu)}
            className="justify-start"
          >
            <Icon name="Layers" size={16} className="mr-2" />
            Batch Actions
            <Icon name="ChevronDown" size={16} className="ml-auto" />
          </Button>
          
          {showBatchMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10">
              {batchActions.map(action => (
                <button
                  key={action.id}
                  onClick={() => {
                    action.action();
                    setShowBatchMenu(false);
                  }}
                  disabled={action.disabled}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    action.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Icon name={action.icon} size={16} className={action.color} />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Import */}
        <div>
          <input
            type="file"
            id="import-file"
            accept=".txt,.json,.csv"
            onChange={handleFileImport}
            className="hidden"
          />
          <Button
            variant="outline"
            fullWidth
            onClick={() => document.getElementById('import-file').click()}
            className="justify-start"
          >
            <Icon name="Upload" size={16} className="mr-2" />
            Import URLs
          </Button>
        </div>

        {/* Export */}
        <div className="relative">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="justify-start"
          >
            <Icon name="Download" size={16} className="mr-2" />
            Export Data
            <Icon name="ChevronDown" size={16} className="ml-auto" />
          </Button>
          
          {showExportMenu && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg shadow-lg z-10">
              {exportOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    onExport(option.id);
                    setShowExportMenu(false);
                  }}
                  className="w-full flex items-start space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <Icon name={option.icon} size={16} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear All */}
        <Button
          variant="outline"
          fullWidth
          onClick={() => onBatchAction('clear-all', downloads.map(d => d.id))}
          className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          Clear All
        </Button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3">Keyboard Shortcuts</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Pause/Resume</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">Space</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Select All</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">Ctrl+A</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Delete Selected</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">Del</kbd>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Refresh Queue</span>
            <kbd className="px-2 py-1 bg-background border border-border rounded text-foreground">F5</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;