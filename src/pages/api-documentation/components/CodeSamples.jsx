import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeSamples = () => {
  const [activeLanguage, setActiveLanguage] = useState('javascript');
  const [copiedCode, setCopiedCode] = useState(null);

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'Code' },
    { id: 'python', name: 'Python', icon: 'FileCode' },
    { id: 'php', name: 'PHP', icon: 'Code2' },
    { id: 'curl', name: 'cURL', icon: 'Terminal' }
  ];

  const codeSamples = {
    javascript: {
      basic: `// Initialize TaraBox API client
const TaraBox = require('@tarabox/api-client');

const client = new TaraBox({
  apiKey: 'your_api_key_here',
  baseURL: 'https://api.tarabox.com/v1'
});

// Basic download
async function downloadFile(url) {
  try {
    const response = await client.download.create({
      url: url,
      quality: 'high',
      format: 'original'
    });
    
    console.log('Download initiated:', response.download_id);
    return response;
  } catch (error) {
    console.error('Download failed:', error.message);
    throw error;
  }
}

// Usage
downloadFile('https://example.com/file.zip')
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error));`,
      
      batch: `// Batch download multiple files
async function batchDownload(urls) {
  try {
    const response = await client.batch.download({
      urls: urls.map(url => ({
        url: url,
        quality: 'high',
        format: 'original'
      })),
      webhook_url: 'https://your-app.com/webhook'
    });
    
    console.log('Batch download initiated:', response.batch_id);
    
    // Monitor progress
    const interval = setInterval(async () => {
      const status = await client.batch.status(response.batch_id);
      console.log(\`Progress: \${status.completed_files}/\${status.total_files}\`);
      
      if (status.status === 'completed') {
        clearInterval(interval);
        console.log('All downloads completed!');
      }
    }, 5000);
    
    return response;
  } catch (error) {
    console.error('Batch download failed:', error.message);
    throw error;
  }
}`,

      webhook: `// Webhook handler for download notifications
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const { event, download_id, status, download_url } = req.body;
  
  switch (event) {
    case 'download.completed':
      console.log(\`Download \${download_id} completed!\`);
      console.log(\`Download URL: \${download_url}\`);
      // Process completed download
      break;
      
    case 'download.failed':
      console.log(\`Download \${download_id} failed\`);
      // Handle failed download
      break;
      
    case 'download.progress':
      console.log(\`Download \${download_id} progress: \${status.progress}%\`);
      break;
  }
  
  res.status(200).json({ received: true });
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`
    },

    python: {
      basic: `import requests
import json
from typing import Dict, Any

class TaraBoxClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.tarabox.com/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def download_file(self, url: str, quality: str = "high", format: str = "original") -> Dict[str, Any]:
        """Initiate a file download"""
        payload = {
            "url": url,
            "quality": quality,
            "format": format
        }
        
        response = requests.post(
            f"{self.base_url}/download",
            headers=self.headers,
            json=payload
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Download failed: {response.text}")

# Usage example
client = TaraBoxClient("your_api_key_here")

try:
    result = client.download_file("https://example.com/file.zip")
    print(f"Download initiated: {result['download_id']}")
except Exception as e:
    print(f"Error: {e}")`,

      batch: `import asyncio
import aiohttp
from typing import List, Dict, Any

class AsyncTaraBoxClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "https://api.tarabox.com/v1"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    async def batch_download(self, urls: List[str]) -> Dict[str, Any]:
        """Download multiple files in batch"""
        payload = {
            "urls": [{"url": url, "quality": "high"} for url in urls],
            "webhook_url": "https://your-app.com/webhook"
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{self.base_url}/batch/download",
                headers=self.headers,
                json=payload
            ) as response:
                if response.status == 200:
                    return await response.json()
                else:
                    raise Exception(f"Batch download failed: {await response.text()}")
    
    async def monitor_batch(self, batch_id: str):
        """Monitor batch download progress"""
        while True:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{self.base_url}/batch/{batch_id}/status",
                    headers=self.headers
                ) as response:
                    status = await response.json()
                    
                    print(f"Progress: {status['completed_files']}/{status['total_files']}")
                    
                    if status['status'] == 'completed':
                        print("All downloads completed!")
                        break
                    
                    await asyncio.sleep(5)

# Usage
async def main():
    client = AsyncTaraBoxClient("your_api_key_here")
    urls = [
        "https://example.com/file1.zip",
        "https://example.com/file2.mp4",
        "https://example.com/file3.pdf"
    ]
    
    result = await client.batch_download(urls)
    await client.monitor_batch(result['batch_id'])

asyncio.run(main())`,

      webhook: `from flask import Flask, request, jsonify
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

@app.route('/webhook', methods=['POST'])
def handle_webhook():
    """Handle TaraBox webhook notifications"""
    data = request.get_json()
    
    event = data.get('event')
    download_id = data.get('download_id')
    status = data.get('status')
    
    if event == 'download.completed':
        logging.info(f"Download {download_id} completed!")
        download_url = data.get('download_url')
        logging.info(f"Download URL: {download_url}")
        # Process completed download
        
    elif event == 'download.failed':
        logging.error(f"Download {download_id} failed")
        error_message = data.get('error_message')
        logging.error(f"Error: {error_message}")
        # Handle failed download
        
    elif event == 'download.progress':
        progress = status.get('progress', 0)
        logging.info(f"Download {download_id} progress: {progress}%")
    
    return jsonify({"received": True}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)`
    },

    php: {
      basic: `<?php

class TaraBoxClient {
    private $apiKey;
    private $baseUrl = 'https://api.tarabox.com/v1';
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }
    
    public function downloadFile($url, $quality = 'high', $format = 'original') {
        $payload = [
            'url' => $url,
            'quality' => $quality,
            'format' => $format
        ];
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->baseUrl . '/download',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->apiKey,
                'Content-Type: application/json'
            ]
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        } else {
            throw new Exception('Download failed: ' . $response);
        }
    }
    
    public function getDownloadStatus($downloadId) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->baseUrl . '/download/' . $downloadId . '/status',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->apiKey
            ]
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        } else {
            throw new Exception('Status check failed: ' . $response);
        }
    }
}

// Usage example
try {
    $client = new TaraBoxClient('your_api_key_here');
    $result = $client->downloadFile('https://example.com/file.zip');
    
    echo "Download initiated: " . $result['download_id'] . "\\n";
    
    // Check status
    $status = $client->getDownloadStatus($result['download_id']);
    echo "Status: " . $status['status'] . "\\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}

?>`,

      batch: `<?php

class TaraBoxBatchClient extends TaraBoxClient {
    
    public function batchDownload($urls, $webhookUrl = null) {
        $payload = [
            'urls' => array_map(function($url) {
                return ['url' => $url, 'quality' => 'high'];
            }, $urls)
        ];
        
        if ($webhookUrl) {
            $payload['webhook_url'] = $webhookUrl;
        }
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->baseUrl . '/batch/download',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->apiKey,
                'Content-Type: application/json'
            ]
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            return json_decode($response, true);
        } else {
            throw new Exception('Batch download failed: ' . $response);
        }
    }
    
    public function monitorBatch($batchId, $callback = null) {
        do {
            $status = $this->getBatchStatus($batchId);
            
            if ($callback) {
                call_user_func($callback, $status);
            } else {
                echo "Progress: {$status['completed_files']}/{$status['total_files']}\\n";
            }
            
            if ($status['status'] === 'completed') {
                echo "All downloads completed!\\n";
                break;
            }
            
            sleep(5);
        } while (true);
    }
    
    private function getBatchStatus($batchId) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $this->baseUrl . '/batch/' . $batchId . '/status',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . $this->apiKey
            ]
        ]);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
}

// Usage
$client = new TaraBoxBatchClient('your_api_key_here');
$urls = [
    'https://example.com/file1.zip',
    'https://example.com/file2.mp4',
    'https://example.com/file3.pdf'
];

$result = $client->batchDownload($urls, 'https://your-app.com/webhook');
$client->monitorBatch($result['batch_id']);

?>`,

      webhook: `<?php

// Webhook handler for TaraBox notifications
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$event = $data['event'] ?? '';
$downloadId = $data['download_id'] ?? '';
$status = $data['status'] ?? [];

switch ($event) {
    case 'download.completed':
        error_log("Download $downloadId completed!");
        $downloadUrl = $data['download_url'] ?? '';
        error_log("Download URL: $downloadUrl");
        
        // Process completed download
        processCompletedDownload($downloadId, $downloadUrl);
        break;
        
    case 'download.failed':
        error_log("Download $downloadId failed");
        $errorMessage = $data['error_message'] ?? 'Unknown error';
        error_log("Error: $errorMessage");
        
        // Handle failed download
        handleFailedDownload($downloadId, $errorMessage);
        break;
        
    case 'download.progress':
        $progress = $status['progress'] ?? 0;
        error_log("Download $downloadId progress: {$progress}%");
        
        // Update progress in database
        updateDownloadProgress($downloadId, $progress);
        break;
        
    default:
        error_log("Unknown event: $event");
}

function processCompletedDownload($downloadId, $downloadUrl) {
    // Your custom logic here
    // e.g., save to database, send notification, etc.
}

function handleFailedDownload($downloadId, $errorMessage) {
    // Your error handling logic here
    // e.g., retry, notify user, log error, etc.
}

function updateDownloadProgress($downloadId, $progress) {
    // Your progress update logic here
    // e.g., update database, send real-time updates, etc.
}

http_response_code(200);
echo json_encode(['received' => true]);

?>`
    },

    curl: {
      basic: `# Basic download request
curl -X POST https://api.tarabox.com/v1/download \\
  -H "Authorization: Bearer YOUR_API_KEY" \ -H"Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/file.zip",
    "quality": "high",
    "format": "original"
  }'

# Response:
# {
#   "success": true,
#   "download_id": "dl_abc123xyz",
#   "status": "processing",
#   "download_url": "https://cdn.tarabox.com/downloads/abc123xyz.zip",
#   "expires_at": "2025-07-18T02:28:43Z"
# }

# Check download status
curl -X GET https://api.tarabox.com/v1/download/dl_abc123xyz/status \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response:
# {
#   "success": true,
#   "download_id": "dl_abc123xyz",
#   "status": "completed",
#   "progress": 100,
#   "download_url": "https://cdn.tarabox.com/downloads/abc123xyz.zip"
# }`,

      batch: `# Batch download multiple files
curl -X POST https://api.tarabox.com/v1/batch/download \\
  -H "Authorization: Bearer YOUR_API_KEY" \ -H"Content-Type: application/json" \\
  -d '{
    "urls": [
      {
        "url": "https://example.com/file1.zip",
        "quality": "high",
        "format": "original"
      },
      {
        "url": "https://example.com/file2.mp4",
        "quality": "medium",
        "format": "mp4"
      },
      {
        "url": "https://example.com/file3.pdf",
        "quality": "original",
        "format": "original"
      }
    ],
    "webhook_url": "https://your-app.com/webhook"
  }'

# Response:
# {
#   "success": true,
#   "batch_id": "batch_xyz789",
#   "status": "processing",
#   "total_files": 3,
#   "estimated_time": "5-8 minutes"
# }

# Check batch status
curl -X GET https://api.tarabox.com/v1/batch/batch_xyz789/status \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response:
# {
#   "success": true,
#   "batch_id": "batch_xyz789",
#   "status": "processing",
#   "total_files": 3,
#   "completed_files": 2,
#   "failed_files": 0,
#   "downloads": [...]
# }`,

      webhook: `# Test webhook endpoint
curl -X POST https://your-app.com/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "event": "download.completed",
    "download_id": "dl_abc123xyz",
    "status": "completed",
    "download_url": "https://cdn.tarabox.com/downloads/abc123xyz.zip",
    "metadata": {
      "original_size": "256MB",
      "compressed_size": "198MB",
      "format": "zip"
    },
    "completed_at": "2025-07-18T01:31:15Z"
  }'

# List supported platforms
curl -X GET https://api.tarabox.com/v1/platforms \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response:
# {
#   "success": true,
#   "platforms": [
#     {
#       "name": "Google Drive",
#       "code": "gdrive",
#       "supported_formats": ["video", "audio", "document"],
#       "max_file_size": "15GB"
#     },
#     ...
#   ]
# }

# Get API usage statistics
curl -X GET https://api.tarabox.com/v1/usage \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response:
# {
#   "success": true,
#   "current_period": {
#     "downloads": 1250,
#     "data_transferred": "45.2GB",
#     "api_calls": 3420
#   },
#   "limits": {
#     "downloads": 5000,
#     "data_transfer": "100GB",
#     "api_calls": 10000
#   }
# }`
    }
  };

  const sampleTypes = [
    { id: 'basic', name: 'Basic Download', icon: 'Download' },
    { id: 'batch', name: 'Batch Processing', icon: 'Layers' },
    { id: 'webhook', name: 'Webhook Handler', icon: 'Webhook' }
  ];

  const [activeSample, setActiveSample] = useState('basic');

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(activeLanguage + activeSample);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-brand-accent/5 to-brand-primary/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center">
            <Icon name="FileCode" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Code Samples</h2>
            <p className="text-sm text-muted-foreground">Ready-to-use code in multiple languages</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Language Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLanguage(lang.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeLanguage === lang.id
                  ? 'bg-brand-primary text-white shadow-brand'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={lang.icon} size={16} />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>

        {/* Sample Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sampleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveSample(type.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeSample === type.id
                  ? 'bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={type.icon} size={14} />
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        {/* Code Display */}
        <div className="relative">
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-slate-400 font-mono">
                  {languages.find(l => l.id === activeLanguage)?.name} - {sampleTypes.find(s => s.id === activeSample)?.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copyToClipboard(codeSamples[activeLanguage][activeSample])}
                className="text-slate-400 hover:text-white"
              >
                {copiedCode === activeLanguage + activeSample ? (
                  <>
                    <Icon name="Check" size={14} className="mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Icon name="Copy" size={14} className="mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <div className="overflow-x-auto">
              <pre className="p-4 text-sm text-slate-100 min-h-[400px]">
                <code>{codeSamples[activeLanguage][activeSample]}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-brand-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Integration Tips:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Replace "YOUR_API_KEY" with your actual API key from the developer dashboard</li>
                <li>• Use webhook URLs for real-time notifications about download status</li>
                <li>• Implement proper error handling for production applications</li>
                <li>• Consider rate limiting when making multiple API calls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeSamples;