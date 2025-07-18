import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SDKLibraries = () => {
  const [selectedSDK, setSelectedSDK] = useState('javascript');

  const sdks = [
    {
      id: 'javascript',
      name: 'JavaScript/Node.js',
      icon: 'Code',
      version: '2.1.0',
      downloads: '45.2K',
      description: 'Official JavaScript SDK for browser and Node.js environments',
      features: ['Promise-based API', 'TypeScript support', 'Automatic retries', 'Progress tracking'],
      installation: 'npm install @tarabox/sdk',
      github: 'https://github.com/tarabox/sdk-javascript',
      docs: 'https://docs.tarabox.com/sdk/javascript'
    },
    {
      id: 'python',
      name: 'Python',
      icon: 'FileCode',
      version: '1.8.3',
      downloads: '32.1K',
      description: 'Python SDK with async/await support and comprehensive error handling',
      features: ['Async/await support', 'Type hints', 'Batch operations', 'CLI tools'],
      installation: 'pip install tarabox-sdk',
      github: 'https://github.com/tarabox/sdk-python',
      docs: 'https://docs.tarabox.com/sdk/python'
    },
    {
      id: 'php',
      name: 'PHP',
      icon: 'Code2',
      version: '1.5.2',
      downloads: '18.7K',
      description: 'PHP SDK compatible with PHP 7.4+ and modern frameworks',
      features: ['PSR-4 autoloading', 'Laravel integration', 'Guzzle HTTP client', 'Webhook helpers'],
      installation: 'composer require tarabox/sdk',
      github: 'https://github.com/tarabox/sdk-php',
      docs: 'https://docs.tarabox.com/sdk/php'
    },
    {
      id: 'go',
      name: 'Go',
      icon: 'Terminal',
      version: '1.3.1',
      downloads: '12.4K',
      description: 'Lightweight Go SDK with excellent performance and minimal dependencies',
      features: ['Context support', 'Concurrent downloads', 'Zero dependencies', 'Built-in retry logic'],
      installation: 'go get github.com/tarabox/sdk-go',
      github: 'https://github.com/tarabox/sdk-go',
      docs: 'https://docs.tarabox.com/sdk/go'
    },
    {
      id: 'ruby',
      name: 'Ruby',
      icon: 'Gem',
      version: '1.2.0',
      downloads: '8.9K',
      description: 'Ruby gem with Rails integration and ActiveJob support',
      features: ['Rails integration', 'ActiveJob support', 'RSpec helpers', 'Flexible configuration'],
      installation: 'gem install tarabox-sdk',
      github: 'https://github.com/tarabox/sdk-ruby',
      docs: 'https://docs.tarabox.com/sdk/ruby'
    },
    {
      id: 'java',
      name: 'Java',
      icon: 'Coffee',
      version: '1.1.0',
      downloads: '6.3K',
      description: 'Java SDK with Spring Boot integration and reactive support',
      features: ['Spring Boot starter', 'Reactive streams', 'Maven/Gradle support', 'Comprehensive logging'],
      installation: 'implementation "com.tarabox:sdk:1.1.0"',
      github: 'https://github.com/tarabox/sdk-java',
      docs: 'https://docs.tarabox.com/sdk/java'
    }
  ];

  const codeExamples = {
    javascript: `// Install
npm install @tarabox/sdk

// Basic usage
import TaraBox from '@tarabox/sdk';

const client = new TaraBox({
  apiKey: 'your_api_key',
  timeout: 30000
});

// Download a file
const download = await client.downloads.create({
  url: 'https://example.com/file.zip',
  quality: 'high'
});

console.log('Download ID:', download.id);

// Track progress
client.downloads.onProgress(download.id, (progress) => {
  console.log(\`Progress: \${progress.percentage}%\`);
});

// Wait for completion
const result = await client.downloads.wait(download.id);
console.log('Download URL:', result.downloadUrl);`,

    python: `# Install
pip install tarabox-sdk

# Basic usage
import asyncio
from tarabox import TaraBoxClient

async def main():
    client = TaraBoxClient(api_key='your_api_key')
    
    # Download a file
    download = await client.downloads.create(
        url='https://example.com/file.zip',
        quality='high'
    )
    
    print(f'Download ID: {download.id}')
    
    # Track progress
    async for progress in client.downloads.track_progress(download.id):
        print(f'Progress: {progress.percentage}%')
        if progress.completed:
            break
    
    # Get final result
    result = await client.downloads.get(download.id)
    print(f'Download URL: {result.download_url}')

asyncio.run(main())`,

    php: `<?php
// Install
// composer require tarabox/sdk

use TaraBox\\Client;
use TaraBox\\Models\\Download;

$client = new Client([
    'api_key' => 'your_api_key',
    'timeout' => 30
]);

// Download a file
$download = $client->downloads()->create([
    'url' => 'https://example.com/file.zip',
    'quality' => 'high'
]);

echo "Download ID: " . $download->getId() . "\\n";

// Track progress
$client->downloads()->trackProgress($download->getId(), function($progress) {
    echo "Progress: " . $progress->getPercentage() . "%\\n";
});

// Get final result
$result = $client->downloads()->get($download->getId());
echo "Download URL: " . $result->getDownloadUrl() . "\\n";`,

    go: `// Install
// go get github.com/tarabox/sdk-go

package main

import (
    "context" "fmt" "log" "github.com/tarabox/sdk-go"
)

func main() {
    client := tarabox.NewClient("your_api_key")
    
    ctx := context.Background()
    
    // Download a file
    download, err := client.Downloads.Create(ctx, &tarabox.DownloadRequest{
        URL:     "https://example.com/file.zip",
        Quality: "high",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Download ID: %s\\n", download.ID)
    
    // Track progress
    progressCh := client.Downloads.TrackProgress(ctx, download.ID)
    for progress := range progressCh {
        fmt.Printf("Progress: %d%%\\n", progress.Percentage)
        if progress.Completed {
            break
        }
    }
    
    // Get final result
    result, err := client.Downloads.Get(ctx, download.ID)
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Download URL: %s\\n", result.DownloadURL)
}`,

    ruby: `# Install
# gem install tarabox-sdk

require 'tarabox'

client = TaraBox::Client.new(api_key: 'your_api_key')

# Download a file
download = client.downloads.create(
  url: 'https://example.com/file.zip',
  quality: 'high'
)

puts "Download ID: #{download.id}"

# Track progress
client.downloads.track_progress(download.id) do |progress|
  puts "Progress: #{progress.percentage}%"
end

# Get final result
result = client.downloads.get(download.id)
puts "Download URL: #{result.download_url}"`,

    java: `// Install (Gradle)
// implementation "com.tarabox:sdk:1.1.0"

import com.tarabox.TaraBoxClient;
import com.tarabox.models.Download;
import com.tarabox.models.DownloadRequest;

public class Example {
    public static void main(String[] args) {
        TaraBoxClient client = new TaraBoxClient("your_api_key");
        
        // Download a file
        DownloadRequest request = DownloadRequest.builder()
            .url("https://example.com/file.zip")
            .quality("high")
            .build();
            
        Download download = client.downloads().create(request);
        System.out.println("Download ID: " + download.getId());
        
        // Track progress
        client.downloads().trackProgress(download.getId(), progress -> {
            System.out.println("Progress: " + progress.getPercentage() + "%");
        });
        
        // Get final result
        Download result = client.downloads().get(download.getId());
        System.out.println("Download URL: " + result.getDownloadUrl());
    }
}`
  };

  const currentSDK = sdks.find(sdk => sdk.id === selectedSDK);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-brand-primary/5 to-brand-accent/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
            <Icon name="Package" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">SDKs & Libraries</h2>
            <p className="text-sm text-muted-foreground">Official SDKs for popular programming languages</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* SDK Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sdks.map((sdk) => (
            <div
              key={sdk.id}
              onClick={() => setSelectedSDK(sdk.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedSDK === sdk.id
                  ? 'border-brand-primary bg-brand-primary/5 shadow-brand'
                  : 'border-border hover:border-brand-primary/50 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedSDK === sdk.id ? 'bg-brand-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={sdk.icon} size={16} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{sdk.name}</h3>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>v{sdk.version}</span>
                    <span>•</span>
                    <span>{sdk.downloads} downloads</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{sdk.description}</p>
              <div className="flex flex-wrap gap-1">
                {sdk.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded"
                  >
                    {feature}
                  </span>
                ))}
                {sdk.features.length > 2 && (
                  <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded">
                    +{sdk.features.length - 2} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected SDK Details */}
        {currentSDK && (
          <div className="space-y-6">
            {/* SDK Info */}
            <div className="bg-muted/20 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{currentSDK.name} SDK</h3>
                  <p className="text-muted-foreground mb-4">{currentSDK.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Tag" size={14} className="text-brand-primary" />
                      <span className="text-foreground font-medium">Version {currentSDK.version}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Download" size={14} className="text-brand-primary" />
                      <span className="text-foreground font-medium">{currentSDK.downloads} downloads</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(currentSDK.github, '_blank')}
                    iconName="Github"
                    iconPosition="left"
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.open(currentSDK.docs, '_blank')}
                    iconName="ExternalLink"
                    iconPosition="left"
                    className="bg-brand-primary hover:bg-brand-primary/90"
                  >
                    Docs
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentSDK.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Installation */}
              <div>
                <h4 className="font-medium text-foreground mb-2">Installation:</h4>
                <div className="bg-slate-900 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-mono">TERMINAL</span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => navigator.clipboard.writeText(currentSDK.installation)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Icon name="Copy" size={12} />
                    </Button>
                  </div>
                  <code className="text-sm text-slate-100">{currentSDK.installation}</code>
                </div>
              </div>
            </div>

            {/* Code Example */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Quick Start Example:</h4>
              <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-slate-400 font-mono">
                      {currentSDK.name} Example
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => navigator.clipboard.writeText(codeExamples[selectedSDK])}
                    className="text-slate-400 hover:text-white"
                  >
                    <Icon name="Copy" size={14} className="mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <pre className="p-4 text-sm text-slate-100 min-h-[300px]">
                    <code>{codeExamples[selectedSDK]}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={16} className="text-brand-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-2">Need Help?</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Check out the <a href={currentSDK.docs} className="text-brand-primary hover:underline">complete documentation</a></li>
                    <li>• Browse <a href={currentSDK.github} className="text-brand-primary hover:underline">source code and examples</a> on GitHub</li>
                    <li>• Join our <a href="#" className="text-brand-primary hover:underline">developer community</a> for support</li>
                    <li>• Report issues or request features on our <a href="#" className="text-brand-primary hover:underline">issue tracker</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SDKLibraries;