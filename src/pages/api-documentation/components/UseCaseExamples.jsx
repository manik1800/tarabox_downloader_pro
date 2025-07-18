import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UseCaseExamples = () => {
  const [selectedUseCase, setSelectedUseCase] = useState('backup');

  const useCases = [
    {
      id: 'backup',
      title: 'Automated Backup Processing',
      description: 'Automatically download and backup files from cloud storage services',
      icon: 'Shield',
      complexity: 'Intermediate',
      tags: ['Automation', 'Backup', 'Scheduling']
    },
    {
      id: 'content',
      title: 'Content Management Workflow',
      description: 'Streamline content creation workflows with automated file processing',
      icon: 'FileText',
      complexity: 'Advanced',
      tags: ['CMS', 'Workflow', 'Processing']
    },
    {
      id: 'batch',
      title: 'Batch File Operations',
      description: 'Process multiple files simultaneously for bulk operations',
      icon: 'Layers',
      complexity: 'Beginner',
      tags: ['Bulk', 'Processing', 'Efficiency']
    },
    {
      id: 'media',
      title: 'Media Processing Pipeline',
      description: 'Build automated media processing and conversion pipelines',
      icon: 'Video',
      complexity: 'Advanced',
      tags: ['Media', 'Pipeline', 'Conversion']
    },
    {
      id: 'sync',
      title: 'Cross-Platform Sync',
      description: 'Synchronize files across multiple cloud storage platforms',
      icon: 'RefreshCw',
      complexity: 'Intermediate',
      tags: ['Sync', 'Multi-platform', 'Integration']
    },
    {
      id: 'analytics',
      title: 'Download Analytics Dashboard',
      description: 'Track and analyze download patterns and usage metrics',
      icon: 'BarChart3',
      complexity: 'Intermediate',
      tags: ['Analytics', 'Dashboard', 'Metrics']
    }
  ];

  const codeExamples = {
    backup: {
      description: `This example shows how to create an automated backup system that monitors cloud storage folders and downloads files for local backup. The system uses webhooks for real-time notifications and implements retry logic for failed downloads.`,
      
      architecture: `┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Cloud Storage │───▶│   TaraBox API   │───▶│  Local Backup   │
│   (Google Drive)│    │                 │    │    Storage      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         └─────────────▶│   Webhook       │◀─────────────┘
                        │   Handler       │
                        └─────────────────┘`,

      code: `// Automated Backup System
const express = require('express');
const cron = require('node-cron');
const TaraBox = require('@tarabox/sdk');
const fs = require('fs').promises;
const path = require('path');

class BackupManager {
  constructor(apiKey, backupPath) {
    this.client = new TaraBox({ apiKey });
    this.backupPath = backupPath;
    this.app = express();
    this.setupWebhook();
    this.setupScheduler();
  }

  // Monitor cloud storage folders
  async scanForNewFiles() {
    const folders = [
      'https://drive.google.com/drive/folders/abc123',
      'https://dropbox.com/sh/xyz789',
      'https://onedrive.live.com/gallery/def456'
    ];

    for (const folder of folders) {
      try {
        console.log(\`Scanning folder: \${folder}\`);
        
        // Get folder contents
        const contents = await this.client.folders.list(folder);
        
        // Filter new files (not already backed up)
        const newFiles = await this.filterNewFiles(contents.files);
        
        if (newFiles.length > 0) {
          console.log(\`Found \${newFiles.length} new files to backup\`);
          await this.initiateBackup(newFiles);
        }
      } catch (error) {
        console.error(\`Error scanning folder \${folder}:\`, error.message);
      }
    }
  }

  async filterNewFiles(files) {
    const backupIndex = await this.loadBackupIndex();
    return files.filter(file => !backupIndex.includes(file.id));
  }

  async initiateBackup(files) {
    const batchRequest = {
      urls: files.map(file => ({
        url: file.download_url,
        filename: file.name,
        metadata: {
          original_path: file.path,
          file_id: file.id,
          backup_date: new Date().toISOString()
        }
      })),
      webhook_url: 'https://your-server.com/webhook/backup'
    };

    try {
      const response = await this.client.batch.download(batchRequest);
      console.log(\`Backup batch initiated: \${response.batch_id}\`);
      
      // Store batch info for tracking
      await this.storeBatchInfo(response.batch_id, files);
    } catch (error) {
      console.error('Failed to initiate backup:', error.message);
      // Implement retry logic
      await this.retryBackup(files);
    }
  }

  setupWebhook() {
    this.app.use(express.json());
    
    this.app.post('/webhook/backup', async (req, res) => {
      const { event, download_id, batch_id, status } = req.body;
      
      switch (event) {
        case 'download.completed':
          await this.handleCompletedDownload(download_id, req.body);
          break;
          
        case 'batch.completed':
          await this.handleCompletedBatch(batch_id, req.body);
          break;
          
        case 'download.failed':
          await this.handleFailedDownload(download_id, req.body);
          break;
      }
      
      res.status(200).json({ received: true });
    });
  }

  async handleCompletedDownload(downloadId, data) {
    try {
      // Download file to local backup storage
      const response = await fetch(data.download_url);
      const buffer = await response.buffer();
      
      const filename = data.metadata?.filename || \`backup_\${downloadId}\`;
      const filepath = path.join(this.backupPath, filename);
      
      await fs.writeFile(filepath, buffer);
      console.log(\`File backed up: \${filepath}\`);
      
      // Update backup index
      await this.updateBackupIndex(data.metadata?.file_id, filepath);
      
      // Verify backup integrity
      await this.verifyBackup(filepath, data.metadata?.original_size);
      
    } catch (error) {
      console.error(\`Failed to save backup for \${downloadId}:\`, error.message);
    }
  }

  setupScheduler() {
    // Run backup scan every 6 hours
    cron.schedule('0 */6 * * *', () => {
      console.log('Starting scheduled backup scan...');
      this.scanForNewFiles();
    });
    
    // Weekly backup verification
    cron.schedule('0 2 * * 0', () => {
      console.log('Starting weekly backup verification...');
      this.verifyAllBackups();
    });
  }

  async verifyAllBackups() {
    const backupIndex = await this.loadBackupIndex();
    let verified = 0;
    let failed = 0;
    
    for (const [fileId, filepath] of Object.entries(backupIndex)) {
      try {
        const exists = await fs.access(filepath).then(() => true).catch(() => false);
        if (exists) {
          verified++;
        } else {
          failed++;
          console.warn(\`Missing backup file: \${filepath}\`);
          // Re-initiate backup for missing files
          await this.rebackupMissingFile(fileId);
        }
      } catch (error) {
        failed++;
        console.error(\`Error verifying \${filepath}:\`, error.message);
      }
    }
    
    console.log(\`Backup verification complete: \${verified} verified, \${failed} failed\`);
  }
}

// Initialize and start backup manager
const backupManager = new BackupManager(
  process.env.TARABOX_API_KEY,
  '/path/to/backup/storage'
);

backupManager.app.listen(3000, () => {
  console.log('Backup manager webhook server running on port 3000');
});

// Start initial scan
backupManager.scanForNewFiles();`
    },

    content: {
      description: `A comprehensive content management workflow that automatically processes uploaded files, converts formats, generates thumbnails, and distributes content across multiple platforms. This example integrates with popular CMS platforms and includes content optimization features.`,
      
      architecture: `┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File Upload   │───▶│   TaraBox API   │───▶│   Processing    │
│   (CMS/Portal)  │    │                 │    │    Pipeline     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌─────────────────┐    ┌─────────────────┐
         └─────────────▶│   Metadata      │───▶│   Distribution  │
                        │   Extraction    │    │    Channels     │
                        └─────────────────┘    └─────────────────┘`,

      code: `// Content Management Workflow
const TaraBox = require('@tarabox/sdk');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

class ContentWorkflow {
  constructor(config) {
    this.tarabox = new TaraBox({ apiKey: config.taraboxApiKey });
    this.s3 = new S3Client({ region: config.awsRegion });
    this.config = config;
  }

  async processContentUpload(uploadData) {
    const { url, contentType, metadata } = uploadData;
    
    try {
      // Step 1: Download original file
      console.log('Downloading original content...');
      const download = await this.tarabox.downloads.create({
        url: url,
        quality: 'original',
        metadata: {
          content_type: contentType,
          workflow_id: metadata.workflowId,
          author: metadata.author
        }
      });

      // Step 2: Wait for download completion
      const result = await this.tarabox.downloads.wait(download.id);
      
      // Step 3: Process based on content type
      const processedContent = await this.processContent(result, contentType);
      
      // Step 4: Generate variants and thumbnails
      const variants = await this.generateVariants(processedContent, contentType);
      
      // Step 5: Extract metadata
      const extractedMetadata = await this.extractMetadata(processedContent);
      
      // Step 6: Upload to distribution channels
      const distributionResults = await this.distributeContent(variants, extractedMetadata);
      
      // Step 7: Update CMS
      await this.updateCMS(metadata.workflowId, distributionResults);
      
      return {
        success: true,
        workflow_id: metadata.workflowId,
        variants: variants,
        distribution: distributionResults
      };
      
    } catch (error) {
      console.error('Content workflow failed:', error.message);
      await this.handleWorkflowError(metadata.workflowId, error);
      throw error;
    }
  }

  async processContent(downloadResult, contentType) {
    const tempPath = \`/tmp/\${downloadResult.download_id}\`;
    
    // Download file locally for processing
    const response = await fetch(downloadResult.download_url);
    const buffer = await response.buffer();
    await fs.writeFile(tempPath, buffer);
    
    switch (contentType) {
      case 'image':
        return await this.processImage(tempPath);
      case 'video':
        return await this.processVideo(tempPath);
      case 'document':
        return await this.processDocument(tempPath);
      default:
        return { original: tempPath };
    }
  }

  async processImage(imagePath) {
    const processed = {};
    
    // Optimize original
    processed.optimized = await sharp(imagePath)
      .jpeg({ quality: 85, progressive: true })
      .toFile(\`\${imagePath}_optimized.jpg\`);
    
    // Generate responsive sizes
    const sizes = [
      { name: 'thumbnail', width: 150, height: 150 },
      { name: 'small', width: 400, height: null },
      { name: 'medium', width: 800, height: null },
      { name: 'large', width: 1200, height: null }
    ];
    
    for (const size of sizes) {
      const resizer = sharp(imagePath).resize(size.width, size.height, {
        fit: 'inside',
        withoutEnlargement: true
      });
      
      processed[size.name] = await resizer
        .jpeg({ quality: 80 })
        .toFile(\`\${imagePath}_\${size.name}.jpg\`);
    }
    
    // Generate WebP versions
    for (const size of sizes) {
      processed[\`\${size.name}_webp\`] = await sharp(imagePath)
        .resize(size.width, size.height, { fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(\`\${imagePath}_\${size.name}.webp\`);
    }
    
    return processed;
  }

  async processVideo(videoPath) {
    const processed = {};
    
    return new Promise((resolve, reject) => {
      // Generate thumbnail
      ffmpeg(videoPath)
        .screenshots({
          timestamps: ['10%', '50%', '90%'],
          filename: 'thumb_%i.jpg',
          folder: '/tmp/thumbnails'
        })
        .on('end', async () => {
          // Generate different quality versions
          const qualities = [
            { name: '720p', size: '1280x720', bitrate: '2500k' },
            { name: '480p', size: '854x480', bitrate: '1000k' },
            { name: '360p', size: '640x360', bitrate: '500k' }
          ];
          
          for (const quality of qualities) {
            const outputPath = \`\${videoPath}_\${quality.name}.mp4\`;
            
            await new Promise((resolveQuality) => {
              ffmpeg(videoPath)
                .size(quality.size)
                .videoBitrate(quality.bitrate)
                .audioCodec('aac')
                .videoCodec('libx264')
                .format('mp4')
                .save(outputPath)
                .on('end', () => {
                  processed[quality.name] = outputPath;
                  resolveQuality();
                });
            });
          }
          
          resolve(processed);
        })
        .on('error', reject);
    });
  }

  async generateVariants(processedContent, contentType) {
    const variants = [];
    
    for (const [variantName, filePath] of Object.entries(processedContent)) {
      // Upload to CDN
      const cdnUrl = await this.uploadToCDN(filePath, variantName);
      
      variants.push({
        name: variantName,
        url: cdnUrl,
        type: contentType,
        size: await this.getFileSize(filePath)
      });
    }
    
    return variants;
  }

  async distributeContent(variants, metadata) {
    const distribution = {};
    
    // Distribute to different channels based on content type
    const channels = this.config.distributionChannels;
    
    for (const channel of channels) {
      try {
        switch (channel.type) {
          case 'cdn':
            distribution[channel.name] = await this.distributeToCDN(variants, channel);
            break;
          case 'social':
            distribution[channel.name] = await this.distributeToSocial(variants, channel, metadata);
            break;
          case 'cms':
            distribution[channel.name] = await this.distributeToCMS(variants, channel, metadata);
            break;
        }
      } catch (error) {
        console.error(\`Distribution to \${channel.name} failed:\`, error.message);
        distribution[channel.name] = { error: error.message };
      }
    }
    
    return distribution;
  }

  async updateCMS(workflowId, distributionResults) {
    // Update your CMS with the processed content URLs
    const cmsData = {
      workflow_id: workflowId,
      status: 'completed',
      variants: distributionResults,
      processed_at: new Date().toISOString()
    };
    
    // Example: Update WordPress via REST API
    await fetch(\`\${this.config.cmsUrl}/wp-json/wp/v2/media/\${workflowId}\`, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${this.config.cmsToken}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cmsData)
    });
  }
}

// Usage example
const workflow = new ContentWorkflow({
  taraboxApiKey: process.env.TARABOX_API_KEY,
  awsRegion: 'us-east-1',
  cmsUrl: 'https://your-cms.com',
  cmsToken: process.env.CMS_TOKEN,
  distributionChannels: [
    { type: 'cdn', name: 'cloudfront', config: {...} },
    { type: 'social', name: 'instagram', config: {...} },
    { type: 'cms', name: 'wordpress', config: {...} }
  ]
});

// Process uploaded content
workflow.processContentUpload({
  url: 'https://drive.google.com/file/d/abc123/view',
  contentType: 'image',
  metadata: {
    workflowId: 'wf_12345',
    author: 'john.doe@example.com',
    tags: ['product', 'photography', 'ecommerce']
  }
});`
    },

    batch: {
      description: `Efficient batch processing system for handling multiple file operations simultaneously. This example demonstrates how to process large volumes of files with proper queue management, progress tracking, and error handling.`,
      
      architecture: `┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File Queue    │───▶│   Batch Manager │───▶│   Processing    │
│   (Redis/DB)    │    │                 │    │    Workers      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌─────────────────┐    ┌─────────────────┐
         └─────────────▶│   Progress      │───▶│   Results       │
                        │   Tracking      │    │   Storage       │
                        └─────────────────┘    └─────────────────┘`,

      code: `// Batch File Processing System
const TaraBox = require('@tarabox/sdk');
const Redis = require('redis');
const { Worker, Queue } = require('bullmq');

class BatchProcessor {
  constructor(config) {
    this.tarabox = new TaraBox({ apiKey: config.apiKey });
    this.redis = Redis.createClient(config.redisUrl);
    this.batchQueue = new Queue('batch-processing', { connection: this.redis });
    this.setupWorkers();
  }

  async processBatch(files, options = {}) {
    const batchId = \`batch_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    
    // Validate files
    const validFiles = await this.validateFiles(files);
    if (validFiles.length === 0) {
      throw new Error('No valid files to process');
    }

    // Create batch record
    const batch = {
      id: batchId,
      total_files: validFiles.length,
      processed_files: 0,
      failed_files: 0,
      status: 'queued',
      created_at: new Date().toISOString(),
      options: options
    };

    await this.redis.hset(\`batch:\${batchId}\`, batch);

    // Split files into chunks for parallel processing
    const chunkSize = options.chunkSize || 10;
    const chunks = this.chunkArray(validFiles, chunkSize);

    console.log(\`Processing batch \${batchId} with \${chunks.length} chunks\`);

    // Queue chunks for processing
    for (let i = 0; i < chunks.length; i++) {
      await this.batchQueue.add('process-chunk', {
        batchId: batchId,
        chunkIndex: i,
        files: chunks[i],
        options: options
      }, {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000
        }
      });
    }

    return {
      batch_id: batchId,
      total_files: validFiles.length,
      chunks: chunks.length,
      status: 'queued'
    };
  }

  setupWorkers() {
    // Main processing worker
    const worker = new Worker('batch-processing', async (job) => {
      const { batchId, chunkIndex, files, options } = job.data;
      
      console.log(\`Processing chunk \${chunkIndex} for batch \${batchId}\`);
      
      try {
        // Process files in this chunk
        const results = await this.processChunk(files, options, (progress) => {
          job.updateProgress(progress);
        });
        
        // Update batch progress
        await this.updateBatchProgress(batchId, results);
        
        return results;
      } catch (error) {
        console.error(\`Chunk \${chunkIndex} failed:\`, error.message);
        await this.handleChunkError(batchId, chunkIndex, error);
        throw error;
      }
    }, { connection: this.redis });

    worker.on('completed', (job) => {
      console.log(\`Chunk completed: \${job.id}\`);
    });

    worker.on('failed', (job, err) => {
      console.error(\`Chunk failed: \${job.id}\`, err.message);
    });
  }

  async processChunk(files, options, progressCallback) {
    const results = [];
    
    // Create TaraBox batch request
    const batchRequest = {
      urls: files.map(file => ({
        url: file.url,
        quality: options.quality || 'high',
        format: options.format || 'original',
        metadata: {
          original_filename: file.name,
          user_id: file.userId,
          batch_processing: true
        }
      })),
      webhook_url: \`\${options.webhookUrl}/batch-webhook\`
    };

    try {
      // Initiate batch download
      const batchResponse = await this.tarabox.batch.download(batchRequest);
      
      // Monitor progress
      let completed = false;
      while (!completed) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const status = await this.tarabox.batch.status(batchResponse.batch_id);
        
        const progress = (status.completed_files / status.total_files) * 100;
        progressCallback(progress);
        
        if (status.status === 'completed' || status.status === 'failed') {
          completed = true;
          
          // Process individual download results
          for (const download of status.downloads) {
            results.push({
              original_url: download.original_url,
              download_id: download.download_id,
              status: download.status,
              download_url: download.download_url,
              error: download.error
            });
          }
        }
      }
      
      return results;
    } catch (error) {
      console.error('Batch processing error:', error.message);
      throw error;
    }
  }

  async updateBatchProgress(batchId, chunkResults) {
    const batch = await this.redis.hgetall(\`batch:\${batchId}\`);
    
    const processedCount = chunkResults.filter(r => r.status === 'completed').length;
    const failedCount = chunkResults.filter(r => r.status === 'failed').length;
    
    const updates = {
      processed_files: parseInt(batch.processed_files) + processedCount,
      failed_files: parseInt(batch.failed_files) + failedCount,
      updated_at: new Date().toISOString()
    };
    
    // Check if batch is complete
    const totalProcessed = updates.processed_files + updates.failed_files;
    if (totalProcessed >= parseInt(batch.total_files)) {
      updates.status = 'completed';
      updates.completed_at = new Date().toISOString();
      
      // Trigger completion webhook
      await this.triggerCompletionWebhook(batchId, updates);
    }
    
    await this.redis.hset(\`batch:\${batchId}\`, updates);
    
    // Store individual results
    for (const result of chunkResults) {
      await this.redis.lpush(\`batch:\${batchId}:results\`, JSON.stringify(result));
    }
  }

  async getBatchStatus(batchId) {
    const batch = await this.redis.hgetall(\`batch:\${batchId}\`);
    
    if (!batch.id) {
      throw new Error('Batch not found');
    }
    
    // Get recent results
    const recentResults = await this.redis.lrange(\`batch:\${batchId}:results\`, 0, 9);
    
    return {
      ...batch,
      recent_results: recentResults.map(r => JSON.parse(r))
    };
  }

  async getAllBatches(userId, limit = 20) {
    const batches = [];
    const keys = await this.redis.keys('batch:*');
    
    for (const key of keys.slice(0, limit)) {
      if (!key.includes(':results')) {
        const batch = await this.redis.hgetall(key);
        if (batch.id) {
          batches.push(batch);
        }
      }
    }
    
    return batches.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  async validateFiles(files) {
    const validFiles = [];
    
    for (const file of files) {
      try {
        // Basic validation
        if (!file.url || !file.name) {
          console.warn(\`Skipping invalid file: \${JSON.stringify(file)}\`);
          continue;
        }
        
        // URL validation
        const url = new URL(file.url);
        if (!['http:', 'https:'].includes(url.protocol)) {
          console.warn(\`Skipping file with invalid protocol: \${file.url}\`);
          continue;
        }
        
        validFiles.push(file);
      } catch (error) {
        console.warn(\`Skipping invalid file URL: \${file.url}\`);
      }
    }
    
    return validFiles;
  }
}

// Usage example
const processor = new BatchProcessor({
  apiKey: process.env.TARABOX_API_KEY,
  redisUrl: process.env.REDIS_URL
});

// Process a batch of files
const files = [
  { url: 'https://drive.google.com/file/d/abc123', name: 'document1.pdf', userId: 'user123' },
  { url: 'https://dropbox.com/s/xyz789', name: 'image1.jpg', userId: 'user123' },
  { url: 'https://onedrive.live.com/download?id=def456', name: 'video1.mp4', userId: 'user123' }
  // ... more files
];

processor.processBatch(files, {
  quality: 'high',
  format: 'original',
  chunkSize: 5,
  webhookUrl: 'https://your-app.com'
}).then(result => {
  console.log('Batch processing initiated:', result);
}).catch(error => {
  console.error('Batch processing failed:', error.message);
});`
    },

    media: {
      description: `Advanced media processing pipeline that handles video transcoding, audio extraction, thumbnail generation, and format conversion. Includes support for multiple output formats and quality levels with automated optimization.`,
      
      architecture: `┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Media Input   │───▶│   TaraBox API   │───▶│   Transcoding   │
│   (Various)     │    │                 │    │    Pipeline     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌─────────────────┐    ┌─────────────────┐
         └─────────────▶│   Metadata      │───▶│   Distribution  │
                        │   Analysis      │    │    & Storage    │
                        └─────────────────┘    └─────────────────┘`,

      code: `// Media Processing Pipeline
const TaraBox = require('@tarabox/sdk');
const ffmpeg = require('fluent-ffmpeg');
const AWS = require('aws-sdk');

class MediaPipeline {
  constructor(config) {
    this.tarabox = new TaraBox({ apiKey: config.taraboxApiKey });
    this.s3 = new AWS.S3(config.aws);
    this.config = config;
  }

  async processMedia(mediaUrl, options = {}) {
    const jobId = \`job_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    
    try {
      console.log(\`Starting media processing job: \${jobId}\`);
      
      // Step 1: Download original media
      const download = await this.downloadMedia(mediaUrl, jobId);
      
      // Step 2: Analyze media properties
      const mediaInfo = await this.analyzeMedia(download.localPath);
      
      // Step 3: Generate processing plan
      const processingPlan = this.createProcessingPlan(mediaInfo, options);
      
      // Step 4: Execute processing pipeline
      const results = await this.executeProcessingPlan(processingPlan, download.localPath, jobId);
      
      // Step 5: Upload processed files
      const uploadResults = await this.uploadProcessedFiles(results, jobId);
      
      // Step 6: Generate delivery manifest
      const manifest = this.generateDeliveryManifest(uploadResults, mediaInfo);
      
      return {
        job_id: jobId,
        status: 'completed',
        original_media: mediaInfo,
        processed_variants: uploadResults,
        delivery_manifest: manifest
      };
      
    } catch (error) {
      console.error(\`Media processing job \${jobId} failed:\`, error.message);
      throw error;
    }
  }

  async downloadMedia(mediaUrl, jobId) {
    console.log('Downloading original media...');
    
    const download = await this.tarabox.downloads.create({
      url: mediaUrl,
      quality: 'original',
      metadata: { job_id: jobId }
    });

    const result = await this.tarabox.downloads.wait(download.id);
    
    // Download to local processing directory
    const localPath = \`/tmp/media_\${jobId}_original\`;
    const response = await fetch(result.download_url);
    const buffer = await response.buffer();
    await fs.writeFile(localPath, buffer);
    
    return { localPath, downloadInfo: result };
  }

  async analyzeMedia(filePath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
          return;
        }
        
        const videoStream = metadata.streams.find(s => s.codec_type === 'video');
        const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
        
        resolve({
          duration: metadata.format.duration,
          size: metadata.format.size,
          bitrate: metadata.format.bit_rate,
          format: metadata.format.format_name,
          video: videoStream ? {
            codec: videoStream.codec_name,
            width: videoStream.width,
            height: videoStream.height,
            fps: eval(videoStream.r_frame_rate),
            bitrate: videoStream.bit_rate
          } : null,
          audio: audioStream ? {
            codec: audioStream.codec_name,
            sample_rate: audioStream.sample_rate,
            channels: audioStream.channels,
            bitrate: audioStream.bit_rate
          } : null
        });
      });
    });
  }

  createProcessingPlan(mediaInfo, options) {
    const plan = {
      thumbnails: [],
      videoVariants: [],
      audioVariants: [],
      metadata: {}
    };

    // Generate thumbnails at different timestamps
    const thumbnailTimes = options.thumbnailTimes || ['10%', '25%', '50%', '75%', '90%'];
    plan.thumbnails = thumbnailTimes.map((time, index) => ({
      timestamp: time,
      filename: \`thumb_\${index + 1}.jpg\`,
      width: 1280,
      height: 720
    }));

    // Video processing variants
    if (mediaInfo.video) {
      const videoQualities = options.videoQualities || [
        { name: '1080p', width: 1920, height: 1080, bitrate: '5000k' },
        { name: '720p', width: 1280, height: 720, bitrate: '2500k' },
        { name: '480p', width: 854, height: 480, bitrate: '1000k' },
        { name: '360p', width: 640, height: 360, bitrate: '500k' }
      ];

      plan.videoVariants = videoQualities
        .filter(q => q.width <= mediaInfo.video.width) // Don't upscale
        .map(quality => ({
          ...quality,
          filename: \`video_\${quality.name}.mp4\`,
          codec: 'libx264',
          audioCodec: 'aac'
        }));
    }

    // Audio extraction and variants
    if (mediaInfo.audio) {
      const audioQualities = options.audioQualities || [
        { name: 'high', bitrate: '320k', format: 'mp3' },
        { name: 'medium', bitrate: '192k', format: 'mp3' },
        { name: 'low', bitrate: '128k', format: 'mp3' }
      ];

      plan.audioVariants = audioQualities.map(quality => ({
        ...quality,
        filename: \`audio_\${quality.name}.\${quality.format}\`
      }));
    }

    return plan;
  }

  async executeProcessingPlan(plan, inputPath, jobId) {
    const results = {
      thumbnails: [],
      videos: [],
      audio: []
    };

    // Generate thumbnails
    for (const thumb of plan.thumbnails) {
      const outputPath = \`/tmp/\${jobId}_\${thumb.filename}\`;
      
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .seekInput(thumb.timestamp)
          .frames(1)
          .size(\`\${thumb.width}x\${thumb.height}\`)
          .output(outputPath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
      
      results.thumbnails.push({
        ...thumb,
        path: outputPath
      });
    }

    // Process video variants
    for (const variant of plan.videoVariants) {
      const outputPath = \`/tmp/\${jobId}_\${variant.filename}\`;
      
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .size(\`\${variant.width}x\${variant.height}\`)
          .videoBitrate(variant.bitrate)
          .videoCodec(variant.codec)
          .audioCodec(variant.audioCodec)
          .format('mp4')
          .output(outputPath)
          .on('end', resolve)
          .on('error', reject)
          .on('progress', (progress) => {
            console.log(\`Processing \${variant.name}: \${progress.percent}%\`);
          })
          .run();
      });
      
      results.videos.push({
        ...variant,
        path: outputPath
      });
    }

    // Process audio variants
    for (const variant of plan.audioVariants) {
      const outputPath = \`/tmp/\${jobId}_\${variant.filename}\`;
      
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .audioBitrate(variant.bitrate)
          .format(variant.format)
          .output(outputPath)
          .on('end', resolve)
          .on('error', reject)
          .run();
      });
      
      results.audio.push({
        ...variant,
        path: outputPath
      });
    }

    return results;
  }

  async uploadProcessedFiles(results, jobId) {
    const uploadResults = {
      thumbnails: [],
      videos: [],
      audio: []
    };

    // Upload thumbnails
    for (const thumb of results.thumbnails) {
      const key = \`media/\${jobId}/thumbnails/\${thumb.filename}\`;
      const url = await this.uploadToS3(thumb.path, key);
      uploadResults.thumbnails.push({
        ...thumb,
        url: url,
        key: key
      });
    }

    // Upload video variants
    for (const video of results.videos) {
      const key = \`media/\${jobId}/videos/\${video.filename}\`;
      const url = await this.uploadToS3(video.path, key);
      uploadResults.videos.push({
        ...video,
        url: url,
        key: key
      });
    }

    // Upload audio variants
    for (const audio of results.audio) {
      const key = \`media/\${jobId}/audio/\${audio.filename}\`;
      const url = await this.uploadToS3(audio.path, key);
      uploadResults.audio.push({
        ...audio,
        url: url,
        key: key
      });
    }

    return uploadResults;
  }

  generateDeliveryManifest(uploadResults, mediaInfo) {
    return {
      version: '1.0',
      type: 'media-delivery-manifest',
      original: {
        duration: mediaInfo.duration,
        size: mediaInfo.size,
        format: mediaInfo.format
      },
      variants: {
        video: uploadResults.videos.map(v => ({
          quality: v.name,
          url: v.url,
          width: v.width,
          height: v.height,
          bitrate: v.bitrate
        })),
        audio: uploadResults.audio.map(a => ({
          quality: a.name,
          url: a.url,
          bitrate: a.bitrate,
          format: a.format
        })),
        thumbnails: uploadResults.thumbnails.map(t => ({
          timestamp: t.timestamp,
          url: t.url,
          width: t.width,
          height: t.height
        }))
      },
      adaptive_streaming: {
        hls_playlist: \`\${this.config.cdnUrl}/media/\${uploadResults.videos[0].key.split('/')[1]}/playlist.m3u8\`,
        dash_manifest: \`\${this.config.cdnUrl}/media/\${uploadResults.videos[0].key.split('/')[1]}/manifest.mpd\`
      }
    };
  }
}

// Usage
const pipeline = new MediaPipeline({
  taraboxApiKey: process.env.TARABOX_API_KEY,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  },
  cdnUrl: 'https://cdn.example.com'
});

pipeline.processMedia('https://drive.google.com/file/d/video123', {
  videoQualities: [
    { name: '1080p', width: 1920, height: 1080, bitrate: '5000k' },
    { name: '720p', width: 1280, height: 720, bitrate: '2500k' }
  ],
  audioQualities: [
    { name: 'high', bitrate: '320k', format: 'mp3' }
  ]
});`
    },

    sync: {
      description: `Cross-platform synchronization system that keeps files in sync across multiple cloud storage services. Features conflict resolution, bidirectional sync, and real-time change detection.`,
      
      architecture: `┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Platform A    │───▶│   Sync Engine   │───▶│   Platform B    │
│  (Google Drive) │    │                 │    │   (Dropbox)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       │
         │              ┌─────────────────┐              │
         └─────────────▶│   Conflict      │◀─────────────┘
                        │   Resolution    │
                        └─────────────────┘`,

      code: `// Cross-Platform Sync System
const TaraBox = require('@tarabox/sdk');
const crypto = require('crypto');

class CrossPlatformSync {
  constructor(config) {
    this.tarabox = new TaraBox({ apiKey: config.apiKey });
    this.platforms = config.platforms;
    this.syncRules = config.syncRules;
    this.conflictResolver = new ConflictResolver();
  }

  async initializeSync() {
    console.log('Initializing cross-platform sync...');
    
    // Create sync state for each platform
    for (const platform of this.platforms) {
      await this.initializePlatform(platform);
    }
    
    // Start monitoring for changes
    this.startChangeMonitoring();
  }

  async syncPlatforms() {
    console.log('Starting sync cycle...');
    
    try {
      // Get current state of all platforms
      const platformStates = await this.getAllPlatformStates();
      
      // Detect changes since last sync
      const changes = await this.detectChanges(platformStates);
      
      if (changes.length === 0) {
        console.log('No changes detected');
        return;
      }
      
      console.log(\`Detected \${changes.length} changes\`);
      
      // Resolve conflicts
      const resolvedChanges = await this.resolveConflicts(changes);
      
      // Apply changes to target platforms
      await this.applyChanges(resolvedChanges);
      
      // Update sync state
      await this.updateSyncState(platformStates);
      
      console.log('Sync cycle completed successfully');
      
    } catch (error) {
      console.error('Sync cycle failed:', error.message);
      throw error;
    }
  }

  async getAllPlatformStates() {
    const states = {};
    
    for (const platform of this.platforms) {
      try {
        console.log(\`Getting state for \${platform.name}...\`);
        states[platform.id] = await this.getPlatformState(platform);
      } catch (error) {
        console.error(\`Failed to get state for \${platform.name}:\`, error.message);
        states[platform.id] = { error: error.message };
      }
    }
    
    return states;
  }

  async getPlatformState(platform) {
    // Get list of files from platform
    const files = await this.tarabox.platforms.listFiles(platform.id, {
      recursive: true,
      include_metadata: true
    });
    
    // Create file map with checksums
    const fileMap = {};
    
    for (const file of files) {
      const checksum = await this.calculateFileChecksum(file);
      fileMap[file.path] = {
        id: file.id,
        name: file.name,
        path: file.path,
        size: file.size,
        modified: file.modified_time,
        checksum: checksum,
        platform: platform.id
      };
    }
    
    return {
      platform: platform.id,
      files: fileMap,
      last_sync: new Date().toISOString()
    };
  }

  async detectChanges(currentStates) {
    const changes = [];
    const lastSyncStates = await this.loadLastSyncStates();
    
    for (const [platformId, currentState] of Object.entries(currentStates)) {
      if (currentState.error) continue;
      
      const lastState = lastSyncStates[platformId] || { files: {} };
      
      // Detect new files
      for (const [path, file] of Object.entries(currentState.files)) {
        if (!lastState.files[path]) {
          changes.push({
            type: 'created',
            platform: platformId,
            path: path,
            file: file
          });
        } else if (file.checksum !== lastState.files[path].checksum) {
          changes.push({
            type: 'modified',
            platform: platformId,
            path: path,
            file: file,
            previous: lastState.files[path]
          });
        }
      }
      
      // Detect deleted files
      for (const [path, file] of Object.entries(lastState.files)) {
        if (!currentState.files[path]) {
          changes.push({
            type: 'deleted',
            platform: platformId,
            path: path,
            file: file
          });
        }
      }
    }
    
    return changes;
  }

  async resolveConflicts(changes) {
    const resolvedChanges = [];
    const conflictGroups = this.groupConflicts(changes);
    
    for (const group of conflictGroups) {
      if (group.length === 1) {
        // No conflict, add as-is
        resolvedChanges.push(group[0]);
      } else {
        // Resolve conflict
        const resolution = await this.conflictResolver.resolve(group);
        resolvedChanges.push(...resolution);
      }
    }
    
    return resolvedChanges;
  }

  groupConflicts(changes) {
    const groups = {};
    
    for (const change of changes) {
      const key = change.path;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(change);
    }
    
    return Object.values(groups);
  }

  async applyChanges(changes) {
    for (const change of changes) {
      try {
        await this.applyChange(change);
      } catch (error) {
        console.error(\`Failed to apply change \${change.type} for \${change.path}:\`, error.message);
      }
    }
  }

  async applyChange(change) {
    const targetPlatforms = this.getTargetPlatforms(change.platform);
    
    switch (change.type) {
      case 'created': case'modified':
        await this.syncFileToTargets(change.file, targetPlatforms);
        break;
        
      case 'deleted':
        await this.deleteFileFromTargets(change.path, targetPlatforms);
        break;
    }
  }

  async syncFileToTargets(file, targetPlatforms) {
    // Download file from source platform
    const download = await this.tarabox.downloads.create({
      url: file.download_url,
      quality: 'original'
    });
    
    const result = await this.tarabox.downloads.wait(download.id);
    
    // Upload to target platforms
    for (const targetPlatform of targetPlatforms) {
      try {
        await this.uploadToTarget(result.download_url, file.path, targetPlatform);
        console.log(\`Synced \${file.path} to \${targetPlatform.name}\`);
      } catch (error) {
        console.error(\`Failed to sync \${file.path} to \${targetPlatform.name}:\`, error.message);
      }
    }
  }

  getTargetPlatforms(sourcePlatformId) {
    return this.platforms.filter(p => p.id !== sourcePlatformId);
  }

  startChangeMonitoring() {
    // Monitor platforms for real-time changes
    setInterval(async () => {
      try {
        await this.syncPlatforms();
      } catch (error) {
        console.error('Scheduled sync failed:', error.message);
      }
    }, this.syncRules.interval || 300000); // Default 5 minutes
  }
}

class ConflictResolver {
  async resolve(conflictGroup) {
    // Sort by modification time (newest first)
    const sorted = conflictGroup.sort((a, b) => 
      new Date(b.file.modified) - new Date(a.file.modified)
    );
    
    const winner = sorted[0];
    const losers = sorted.slice(1);
    
    console.log(\`Resolving conflict for \${winner.path}: choosing newest version from \${winner.platform}\`);
    
    // Create backup copies of losing versions
    const resolutions = [winner];
    
    for (const loser of losers) {
      const backupPath = \`\${loser.path}.conflict.\${Date.now()}\`;
      resolutions.push({
        ...loser,
        path: backupPath,
        type: 'created' // Create backup
      });
    }
    
    return resolutions;
  }
}

// Usage
const syncSystem = new CrossPlatformSync({
  apiKey: process.env.TARABOX_API_KEY,
  platforms: [
    {
      id: 'gdrive_main',
      name: 'Google Drive',
      type: 'google_drive',
      credentials: {...}
    },
    {
      id: 'dropbox_backup',
      name: 'Dropbox',
      type: 'dropbox',
      credentials: {...}
    },
    {
      id: 'onedrive_archive',
      name: 'OneDrive',
      type: 'onedrive',
      credentials: {...}
    }
  ],
  syncRules: {
    interval: 300000, // 5 minutes
    conflictResolution: 'newest_wins',
    excludePatterns: ['*.tmp', '.DS_Store']
  }
});

syncSystem.initializeSync();`
    },

    analytics: {
      description: `Comprehensive analytics dashboard that tracks download patterns, usage metrics, and performance statistics. Includes real-time monitoring, custom reports, and data visualization components.`,
      
      architecture: `┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Events    │───▶│   Data Pipeline │───▶│   Analytics DB  │
│   (Downloads)   │    │                 │    │   (Time Series) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              ┌─────────────────┐    ┌─────────────────┐
         └─────────────▶│   Real-time     │───▶│   Dashboard     │
                        │   Processing    │    │   & Reports     │
                        └─────────────────┘    └─────────────────┘`,

      code: `// Download Analytics Dashboard
const TaraBox = require('@tarabox/sdk');
const InfluxDB = require('influxdb-nodejs');
const express = require('express');

class AnalyticsDashboard {
  constructor(config) {
    this.tarabox = new TaraBox({ apiKey: config.apiKey });
    this.influx = InfluxDB(config.influxUrl);
    this.app = express();
    this.setupRoutes();
    this.startDataCollection();
  }

  async trackDownload(downloadData) {
    const point = {
      measurement: 'downloads',
      tags: {
        user_id: downloadData.userId,
        platform: downloadData.platform,
        quality: downloadData.quality,
        format: downloadData.format
      },
      fields: {
        file_size: downloadData.fileSize,
        download_time: downloadData.downloadTime,
        success: downloadData.success ? 1 : 0
      },
      timestamp: new Date()
    };
    
    await this.influx.write('downloads').point(point);
  }

  async getDownloadStats(timeRange = '24h', userId = null) {
    let query = \`
      SELECT 
        COUNT(*) as total_downloads,
        SUM(file_size) as total_bytes,
        AVG(download_time) as avg_download_time,
        SUM(success) as successful_downloads
      FROM downloads 
      WHERE time >= now() - \${timeRange}
    \`;
    
    if (userId) {
      query += \` AND user_id = '\${userId}'\`;
    }
    
    const result = await this.influx.query(query);
    return result[0] || {};
  }

  async getPopularPlatforms(timeRange = '7d') {
    const query = \`
      SELECT 
        platform,
        COUNT(*) as download_count,
        SUM(file_size) as total_bytes
      FROM downloads 
      WHERE time >= now() - \${timeRange}
      GROUP BY platform
      ORDER BY download_count DESC
      LIMIT 10
    \`;
    
    return await this.influx.query(query);
  }

  async getHourlyTrends(timeRange = '24h') {
    const query = \`
      SELECT 
        MEAN(file_size) as avg_file_size,
        COUNT(*) as download_count,
        SUM(success) as successful_downloads
      FROM downloads 
      WHERE time >= now() - \${timeRange}
      GROUP BY time(1h)
      ORDER BY time
    \`;
    
    return await this.influx.query(query);
  }

  async getUserAnalytics(userId, timeRange = '30d') {
    const queries = {
      overview: \`
        SELECT 
          COUNT(*) as total_downloads,
          SUM(file_size) as total_bytes,
          AVG(download_time) as avg_download_time,
          (SUM(success) * 100.0 / COUNT(*)) as success_rate
        FROM downloads 
        WHERE user_id = '\${userId}' AND time >= now() - \${timeRange}
      \`,
      
      byPlatform: \`
        SELECT 
          platform,
          COUNT(*) as count,
          SUM(file_size) as bytes
        FROM downloads 
        WHERE user_id = '\${userId}' AND time >= now() - \${timeRange}
        GROUP BY platform
      \`,
      
      byQuality: \`
        SELECT 
          quality,
          COUNT(*) as count
        FROM downloads 
        WHERE user_id = '\${userId}' AND time >= now() - \${timeRange}
        GROUP BY quality
      \`,
      
      dailyActivity: \`
        SELECT 
          COUNT(*) as downloads,
          SUM(file_size) as bytes
        FROM downloads 
        WHERE user_id = '\${userId}' AND time >= now() - \${timeRange}
        GROUP BY time(1d)
        ORDER BY time
      \`
    };
    
    const results = {};
    for (const [key, query] of Object.entries(queries)) {
      results[key] = await this.influx.query(query);
    }
    
    return results;
  }

  async getSystemPerformance(timeRange = '1h') {
    const query = \`
      SELECT 
        MEAN(download_time) as avg_response_time,
        PERCENTILE(download_time, 95) as p95_response_time,
        (SUM(success) * 100.0 / COUNT(*)) as success_rate,
        COUNT(*) as total_requests
      FROM downloads 
      WHERE time >= now() - \${timeRange}
      GROUP BY time(5m)
      ORDER BY time
    \`;
    
    return await this.influx.query(query);
  }

  async generateReport(reportType, params = {}) {
    const reports = {
      daily: () => this.generateDailyReport(params),
      weekly: () => this.generateWeeklyReport(params),
      monthly: () => this.generateMonthlyReport(params),
      user: () => this.generateUserReport(params.userId, params),
      platform: () => this.generatePlatformReport(params.platform, params)
    };
    
    if (!reports[reportType]) {
      throw new Error(\`Unknown report type: \${reportType}\`);
    }
    
    return await reports[reportType]();
  }

  async generateDailyReport(params) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const [
      overview,
      platforms,
      hourlyTrends,
      topUsers,
      errors
    ] = await Promise.all([
      this.getDownloadStats('24h'),
      this.getPopularPlatforms('24h'),
      this.getHourlyTrends('24h'),
      this.getTopUsers('24h'),
      this.getErrorAnalysis('24h')
    ]);
    
    return {
      date: yesterday.toISOString().split('T')[0],
      overview: {
        total_downloads: overview.total_downloads || 0,
        total_bytes: this.formatBytes(overview.total_bytes || 0),
        avg_download_time: Math.round(overview.avg_download_time || 0),
        success_rate: Math.round((overview.successful_downloads / overview.total_downloads) * 100) || 0
      },
      platforms: platforms.map(p => ({
        name: p.platform,
        downloads: p.download_count,
        bytes: this.formatBytes(p.total_bytes)
      })),
      hourly_trends: hourlyTrends,
      top_users: topUsers,
      errors: errors
    };
  }

  setupRoutes() {
    this.app.use(express.json());
    
    // Real-time stats endpoint
    this.app.get('/api/stats/realtime', async (req, res) => {
      try {
        const stats = await this.getDownloadStats('1h');
        const performance = await this.getSystemPerformance('1h');
        
        res.json({
          downloads: stats,
          performance: performance
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // User analytics endpoint
    this.app.get('/api/analytics/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        const { timeRange = '30d' } = req.query;
        
        const analytics = await this.getUserAnalytics(userId, timeRange);
        res.json(analytics);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Platform analytics endpoint
    this.app.get('/api/analytics/platforms', async (req, res) => {
      try {
        const { timeRange = '7d' } = req.query;
        const platforms = await this.getPopularPlatforms(timeRange);
        res.json(platforms);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Generate report endpoint
    this.app.post('/api/reports/:type', async (req, res) => {
      try {
        const { type } = req.params;
        const report = await this.generateReport(type, req.body);
        res.json(report);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
    // Webhook for real-time tracking
    this.app.post('/webhook/analytics', async (req, res) => {
      try {
        const { event, download_id, user_id, metadata } = req.body;
        
        if (event === 'download.completed' || event === 'download.failed') {
          await this.trackDownload({
            downloadId: download_id,
            userId: user_id,
            platform: metadata?.platform,
            quality: metadata?.quality,
            format: metadata?.format,
            fileSize: metadata?.file_size,
            downloadTime: metadata?.download_time,
            success: event === 'download.completed'
          });
        }
        
        res.json({ received: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  startDataCollection() {
    // Collect system metrics every minute
    setInterval(async () => {
      try {
        await this.collectSystemMetrics();
      } catch (error) {
        console.error('Failed to collect system metrics:', error.message);
      }
    }, 60000);
    
    // Generate daily reports
    setInterval(async () => {
      try {
        const report = await this.generateDailyReport();
        await this.saveDailyReport(report);
      } catch (error) {
        console.error('Failed to generate daily report:', error.message);
      }
    }, 24 * 60 * 60 * 1000); // Daily
  }

  async collectSystemMetrics() {
    // Get current API usage
    const usage = await this.tarabox.usage.current();
    
    const point = {
      measurement: 'system_metrics',
      fields: {
        api_calls_remaining: usage.api_calls_remaining,
        downloads_remaining: usage.downloads_remaining,
        bandwidth_remaining: usage.bandwidth_remaining,
        active_downloads: usage.active_downloads
      },
      timestamp: new Date()
    };
    
    await this.influx.write('system_metrics').point(point);
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Usage
const analytics = new AnalyticsDashboard({
  apiKey: process.env.TARABOX_API_KEY,
  influxUrl: process.env.INFLUX_URL
});

analytics.app.listen(3000, () => {
  console.log('Analytics dashboard running on port 3000');
});`
    }
  };

  const currentUseCase = useCases.find(uc => uc.id === selectedUseCase);
  const currentExample = codeExamples[selectedUseCase];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-gradient-to-r from-brand-primary/5 to-brand-accent/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Use Case Examples</h2>
            <p className="text-sm text-muted-foreground">Real-world integration scenarios and implementations</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Use Case Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              onClick={() => setSelectedUseCase(useCase.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedUseCase === useCase.id
                  ? 'border-brand-primary bg-brand-primary/5 shadow-brand'
                  : 'border-border hover:border-brand-primary/50 hover:bg-muted/30'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedUseCase === useCase.id ? 'bg-brand-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={useCase.icon} size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{useCase.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      useCase.complexity === 'Beginner' ? 'bg-success/10 text-success' :
                      useCase.complexity === 'Intermediate'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {useCase.complexity}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{useCase.description}</p>
              <div className="flex flex-wrap gap-1">
                {useCase.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-muted/50 text-xs text-muted-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Use Case Details */}
        {currentUseCase && currentExample && (
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-muted/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">{currentUseCase.title}</h3>
              <p className="text-muted-foreground mb-4">{currentExample.description}</p>
              
              {/* Architecture Diagram */}
              {currentExample.architecture && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">System Architecture:</h4>
                  <div className="bg-slate-900 rounded-lg p-4">
                    <pre className="text-sm text-slate-100 font-mono overflow-x-auto">
                      <code>{currentExample.architecture}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Implementation Code */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">Complete Implementation:</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(currentExample.code)}
                  iconName="Copy"
                  iconPosition="left"
                >
                  Copy Code
                </Button>
              </div>
              
              <div className="bg-slate-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-slate-400 font-mono">
                      {currentUseCase.title} - Implementation
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      currentUseCase.complexity === 'Beginner' ? 'bg-success/20 text-success' :
                      currentUseCase.complexity === 'Intermediate'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                    }`}>
                      {currentUseCase.complexity}
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <pre className="p-4 text-sm text-slate-100 min-h-[600px]">
                    <code>{currentExample.code}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Key Features & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <Icon name="CheckCircle" size={16} className="text-success mr-2" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {currentUseCase.tags.map((tag, index) => (
                    <li key={index} className="flex items-center">
                      <Icon name="ArrowRight" size={12} className="text-brand-primary mr-2" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <Icon name="Zap" size={16} className="text-brand-primary mr-2" />
                  Implementation Tips
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <Icon name="Dot" size={12} className="text-brand-primary mr-2 mt-1" />
                    Start with a small test dataset before scaling
                  </li>
                  <li className="flex items-start">
                    <Icon name="Dot" size={12} className="text-brand-primary mr-2 mt-1" />
                    Implement proper error handling and retry logic
                  </li>
                  <li className="flex items-start">
                    <Icon name="Dot" size={12} className="text-brand-primary mr-2 mt-1" />
                    Use webhooks for real-time status updates
                  </li>
                  <li className="flex items-start">
                    <Icon name="Dot" size={12} className="text-brand-primary mr-2 mt-1" />
                    Monitor API usage to stay within rate limits
                  </li>
                </ul>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-lg p-6 border border-brand-primary/20">
              <div className="flex items-start space-x-3">
                <Icon name="Rocket" size={20} className="text-brand-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">Ready to implement this use case?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    This example provides a complete foundation that you can customize for your specific needs. 
                    Consider the complexity level and ensure you have the necessary infrastructure in place.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="left"
                      className="bg-brand-primary hover:bg-brand-primary/90"
                    >
                      View Full Documentation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageCircle"
                      iconPosition="left"
                    >
                      Get Support
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Github"
                      iconPosition="left"
                    >
                      View on GitHub
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UseCaseExamples;