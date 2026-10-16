import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Proxy for URA DataService Invoke
  app.post('/api/ura/invoke', async (req: Request, res: Response) => {
    const startTime = Date.now();
    try {
      const {
        service = 'PMI_Resi_Developer_Sales',
        refPeriod = '0926',
        accessKey,
        token,
        batch
      } = req.body;

      if (!accessKey || !token) {
        return res.status(400).json({
          status: 'Error',
          message: 'Missing AccessKey or Token headers in request body',
          latencyMs: Date.now() - startTime
        });
      }

      const params = new URLSearchParams();
      params.append('service', service);
      if (refPeriod) params.append('refPeriod', refPeriod);
      if (batch) params.append('batch', String(batch));

      const targetUrl = `https://eservice.ura.gov.sg/uraDataService/invokeUraDS/v1?${params.toString()}`;

      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'AccessKey': accessKey,
          'Token': token,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const responseText = await response.text();
      let responseJson: unknown = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        responseJson = { raw: responseText };
      }

      const latencyMs = Date.now() - startTime;

      res.status(response.status).json({
        httpStatus: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseJson,
        latencyMs,
        targetUrl
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'Error',
        message: error?.message || 'Internal proxy error communicating with URA API',
        latencyMs: Date.now() - startTime
      });
    }
  });

  // API Proxy for URA Daily Token Generation
  app.post('/api/ura/token', async (req: Request, res: Response) => {
    const startTime = Date.now();
    try {
      const { accessKey } = req.body;
      if (!accessKey) {
        return res.status(400).json({
          status: 'Error',
          message: 'AccessKey is required to generate a daily token'
        });
      }

      const response = await fetch('https://www.ura.gov.sg/uraDataService/insertNewToken.v1.gca', {
        method: 'GET',
        headers: {
          'AccessKey': accessKey,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const text = await response.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      res.status(response.status).json({
        httpStatus: response.status,
        data,
        latencyMs: Date.now() - startTime
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'Error',
        message: error?.message || 'Failed to request daily token from URA',
        latencyMs: Date.now() - startTime
      });
    }
  });

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
