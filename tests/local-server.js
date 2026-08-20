const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'frontend', 'dist');
const apiHandler = require(path.join(__dirname, '..', 'api', 'cotacao.js'));

const mimeTypes = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.ico': 'image/x-icon',
};

function serveStatic(req, res) {
  let filePath = path.join(distDir, req.url.split('?')[0]);
  if (req.url === '/' || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function collectBody(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => (raw += chunk));
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch { resolve({}); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/cotacao')) {
    const body = await collectBody(req);
    const vercelRes = {
      _status: 200,
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      status(code) { this._status = code; return this; },
      json(payload) {
        res.writeHead(this._status, { 'Content-Type': 'application/json', ...this.headers });
        res.end(JSON.stringify(payload));
      },
      end() {
        res.writeHead(this._status, this.headers);
        res.end();
      },
    };
    await apiHandler({ method: req.method, body }, vercelRes);
    return;
  }
  serveStatic(req, res);
});

const PORT = 4321;
server.listen(PORT, () => console.log(`Local Vercel-like server on http://localhost:${PORT}`));
