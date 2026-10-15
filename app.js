/**
 * cPanel Node.js Production Server for NUR-MAA (Vite React SPA)
 *
 * Compatible with cPanel "Setup Node.js App" (Phusion Passenger / CloudLinux)
 * Application startup file: app.js (or server.js)
 * Zero external dependencies: uses built-in Node.js modules.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Port assigned by cPanel Phusion Passenger or default to 3000
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Determine the web root (dist folder or current folder if contents of dist were uploaded directly)
const DIST_DIR = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
  ? path.join(__dirname, 'dist')
  : __dirname;

const INDEX_HTML = path.join(DIST_DIR, 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json'
};

const server = http.createServer((req, res) => {
  // Normalize URL and remove query params / hashes
  const cleanUrl = req.url.split('?')[0].split('#')[0];
  let safePath = path.normalize(decodeURIComponent(cleanUrl)).replace(/^(\.\.[/\\])+/, '');
  
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, safePath);

  // Security check: ensure path is within DIST_DIR
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    // If path is a directory, check for index.html inside it
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.stat(filePath, (fileErr, fileStats) => {
      // If the static file doesn't exist, fall back to index.html for SPA routing (React Router)
      if (fileErr || !fileStats.isFile()) {
        filePath = INDEX_HTML;
      }

      fs.readFile(filePath, (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('500 Internal Server Error: ' + readErr.message);
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        const headers = {
          'Content-Type': contentType,
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'X-XSS-Protection': '1; mode=block'
        };

        // Cache control
        if (filePath === INDEX_HTML) {
          headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        } else if (cleanUrl.startsWith('/assets/')) {
          headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        } else {
          headers['Cache-Control'] = 'public, max-age=86400';
        }

        // Gzip compression for text-based responses
        const acceptEncoding = req.headers['accept-encoding'] || '';
        const isCompressible = /text|javascript|json|xml|svg/.test(contentType);

        if (isCompressible && acceptEncoding.includes('gzip')) {
          zlib.gzip(content, (gzipErr, compressed) => {
            if (!gzipErr) {
              headers['Content-Encoding'] = 'gzip';
              headers['Content-Length'] = compressed.length;
              res.writeHead(200, headers);
              return res.end(compressed);
            }
            headers['Content-Length'] = content.length;
            res.writeHead(200, headers);
            res.end(content);
          });
        } else {
          headers['Content-Length'] = content.length;
          res.writeHead(200, headers);
          res.end(content);
        }
      });
    });
  });
});

server.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`NUR-MAA Production Server Running on cPanel`);
  console.log(`Port / Socket: ${PORT}`);
  console.log(`Serving from: ${DIST_DIR}`);
  console.log(`SPA Fallback: ${INDEX_HTML}`);
  console.log(`===============================================`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
