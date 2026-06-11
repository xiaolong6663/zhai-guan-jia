const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ics': 'text/calendar; charset=utf-8',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  // 安全检查：防止目录遍历
  if (urlPath.includes('..')) { res.writeHead(403); res.end(); return; }
  let filePath = path.join(ROOT, urlPath);
  if (filePath.endsWith('/') || urlPath === '/') filePath = path.join(ROOT, '债管家-pro.html');
  if (!path.extname(filePath)) filePath += '.html';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p><a href="/债管家-pro.html">打开债管家 Pro</a></p>');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8888, '0.0.0.0', () => {
  console.log('债管家服务器已启动!');
  console.log('iPhone 访问: http://192.168.1.3:8888/债管家-pro.html');
  console.log('电脑访问: http://localhost:8888/债管家-pro.html');
});
