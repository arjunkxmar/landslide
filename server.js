/**
 * Optional standalone Node.js production server for LandslideGuard AI
 * Serves static build files from dist/ and handles POST /api/chat securely
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateGeminiChatResponse } from './server/geminiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5173;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url ? req.url.split('?')[0] : '/';

  // API Route: POST /api/chat
  if (urlPath === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const result = await generateGeminiChatResponse({
          message: parsed.message,
          context: parsed.context,
          history: parsed.history,
          apiKey: process.env.GEMINI_API_KEY
        });

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = result.success ? 200 : 500;
        res.end(JSON.stringify(result));
      } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Invalid request body' }));
      }
    });
    return;
  }

  // Static File Serving
  let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found. Please run "npm run build" first.');
  }
});

server.listen(PORT, () => {
  console.log(`LandslideGuard AI production server listening at http://localhost:${PORT}`);
});
