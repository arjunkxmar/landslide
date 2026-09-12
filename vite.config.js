import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { generateGeminiChatResponse } from './server/geminiService.js';

export default defineConfig(({ mode }) => {
  // Load all environment variables from .env (including non-VITE_ variables like GEMINI_API_KEY)
  const env = loadEnv(mode, process.cwd(), '');

  const createChatMiddleware = () => {
    return (req, res, next) => {
      // Normalize URL (strip query parameters if any)
      const urlPath = req.url ? req.url.split('?')[0] : '';
      if (urlPath === '/api/chat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
            
            const result = await generateGeminiChatResponse({
              message: parsed.message,
              context: parsed.context,
              history: parsed.history,
              apiKey
            });

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = result.success ? 200 : (result.error?.includes('not configured') ? 400 : 500);
            res.end(JSON.stringify(result));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end(JSON.stringify({ 
              success: false, 
              error: 'Invalid request payload or JSON parse error.' 
            }));
          }
        });
        return;
      }
      next();
    };
  };

  return {
    plugins: [
      react(),
      {
        name: 'gemini-api-endpoint',
        configureServer(server) {
          server.middlewares.use(createChatMiddleware());
        },
        configurePreviewServer(server) {
          server.middlewares.use(createChatMiddleware());
        }
      }
    ],
    server: {
      port: 5173,
      open: false
    }
  };
});
