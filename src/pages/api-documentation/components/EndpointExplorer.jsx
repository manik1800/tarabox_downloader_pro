import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EndpointExplorer = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('download');
  const [requestData, setRequestData] = useState({
    url: 'https://example.com/file.zip',
    quality: 'high',
    format: 'original'
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('request');

  const endpoints = [
    {
      value: 'download',
      label: 'POST /v1/download',
      description: 'Initiate a file download',
      method: 'POST',
      path: '/v1/download'
    },
    {
      value: 'status',
      label: 'GET /v1/download/{id}/status',
      description: 'Check download status',
      method: 'GET',
      path: '/v1/download/{id}/status'
    },
    {
      value: 'batch',
      label: 'POST /v1/batch/download',
      description: 'Batch download multiple files',
      method: 'POST',
      path: '/v1/batch/download'
    },
    {
      value: 'platforms',
      label: 'GET /v1/platforms',
      description: 'List supported platforms',
      method: 'GET',
      path: '/v1/platforms'
    }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low Quality' },
    { value: 'medium', label: 'Medium Quality' },
    { value: 'high', label: 'High Quality' },
    { value: 'original', label: 'Original Quality' }
  ];

  const formatOptions = [
    { value: 'original', label: 'Original Format' },
    { value: 'mp4', label: 'MP4 Video' },
    { value: 'mp3', label: 'MP3 Audio' },
    { value: 'zip', label: 'ZIP Archive' }
  ];

  const mockResponses = {
    download: {
      success: true,
      download_id: "dl_abc123xyz",
      status: "processing",
      download_url: "https://cdn.tarabox.com/downloads/abc123xyz.zip",
      expires_at: "2025-07-18T02:28:43Z",
      metadata: {
        original_size: "256MB",
        compressed_size: "198MB",
        format: "zip",
        quality: "high"
      },
      estimated_time: "2-3 minutes"
    },
    status: {
      success: true,
      download_id: "dl_abc123xyz",
      status: "completed",
      progress: 100,
      download_url: "https://cdn.tarabox.com/downloads/abc123xyz.zip",
      file_size: "198MB",
      completed_at: "2025-07-18T01:31:15Z"
    },
    batch: {
      success: true,
      batch_id: "batch_xyz789",
      status: "processing",
      total_files: 5,
      completed_files: 2,
      failed_files: 0,
      downloads: [
        {
          download_id: "dl_001",
          status: "completed",
          download_url: "https://cdn.tarabox.com/downloads/001.zip"
        },
        {
          download_id: "dl_002",
          status: "processing",
          progress: 65
        }
      ]
    },
    platforms: {
      success: true,
      platforms: [
        {
          name: "Google Drive",
          code: "gdrive",
          supported_formats: ["video", "audio", "document", "archive"],
          max_file_size: "15GB"
        },
        {
          name: "Dropbox",
          code: "dropbox",
          supported_formats: ["video", "audio", "document", "image"],
          max_file_size: "2GB"
        }
      ]
    }
  };

  const handleTryIt = async () => {
    setLoading(true);
    setActiveTab('response');
    
    // Simulate API call
    setTimeout(() => {
      setResponse(mockResponses[selectedEndpoint]);
      setLoading(false);
    }, 1500);
  };

  const currentEndpoint = endpoints.find(ep => ep.value === selectedEndpoint);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-brand-secondary/5 to-brand-primary/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-secondary rounded-lg flex items-center justify-center">
            <Icon name="Code2" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">API Explorer</h2>
            <p className="text-sm text-muted-foreground">Test endpoints directly in your browser</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Endpoint Selection */}
        <div className="mb-6">
          <Select
            label="Select Endpoint"
            options={endpoints}
            value={selectedEndpoint}
            onChange={setSelectedEndpoint}
            className="mb-4"
          />
          
          {currentEndpoint && (
            <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentEndpoint.method === 'GET' ?'bg-green-100 text-green-700' :'bg-blue-100 text-blue-700'
              }`}>
                {currentEndpoint.method}
              </div>
              <code className="text-sm font-mono text-foreground">
                https://api.tarabox.com{currentEndpoint.path}
              </code>
              <p className="text-sm text-muted-foreground flex-1">
                {currentEndpoint.description}
              </p>
            </div>
          )}
        </div>

        {/* Request/Response Tabs */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="flex border-b border-border bg-muted/20">
            <button
              onClick={() => setActiveTab('request')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'request' ?'bg-white text-brand-primary border-b-2 border-brand-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Send" size={16} className="mr-2 inline" />
              Request
            </button>
            <button
              onClick={() => setActiveTab('response')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'response' ?'bg-white text-brand-primary border-b-2 border-brand-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="FileText" size={16} className="mr-2 inline" />
              Response
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'request' && (
              <div className="space-y-4">
                {selectedEndpoint === 'download' && (
                  <>
                    <Input
                      label="File URL"
                      type="url"
                      value={requestData.url}
                      onChange={(e) => setRequestData({...requestData, url: e.target.value})}
                      placeholder="https://example.com/file.zip"
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Quality"
                        options={qualityOptions}
                        value={requestData.quality}
                        onChange={(value) => setRequestData({...requestData, quality: value})}
                      />
                      <Select
                        label="Format"
                        options={formatOptions}
                        value={requestData.format}
                        onChange={(value) => setRequestData({...requestData, format: value})}
                      />
                    </div>
                  </>
                )}

                {selectedEndpoint === 'status' && (
                  <Input
                    label="Download ID"
                    value="dl_abc123xyz"
                    placeholder="Enter download ID"
                    required
                  />
                )}

                <div className="pt-4">
                  <Button
                    variant="default"
                    onClick={handleTryIt}
                    loading={loading}
                    iconName="Play"
                    iconPosition="left"
                    className="bg-brand-primary hover:bg-brand-primary/90"
                  >
                    Try It Out
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'response' && (
              <div>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Making API request...</p>
                    </div>
                  </div>
                ) : response ? (
                  <div className="bg-slate-900 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-400">200 OK</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(response, null, 2))}
                        className="text-slate-400 hover:text-white"
                      >
                        <Icon name="Copy" size={14} />
                      </Button>
                    </div>
                    <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
                      <code>{JSON.stringify(response, null, 2)}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Code2" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Click "Try It Out" to see the API response</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointExplorer;