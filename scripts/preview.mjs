import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

// Serve only an explicit allowlist; never expose the project directory or secrets.
const assets = new Map([
  ['/', [new URL('../standalone/dev-id-dashboard.html', import.meta.url), 'text/html; charset=utf-8']],
  ['/standalone/dev-id-dashboard.html', [new URL('../standalone/dev-id-dashboard.html', import.meta.url), 'text/html; charset=utf-8']],
  ['/referencia-visual.jpg', [new URL('../referencia-visual.jpg', import.meta.url), 'image/jpeg']],
]);
const port = Number(process.env.PORT ?? 5173);
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error('PORT must be an integer between 0 and 65535.');
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (pathname === '/actions' || pathname === '/standalone/actions') {
    // The export depended on a service from its original authoring environment.
    // An explicit error activates its existing local task fallback. No data is saved.
    response.writeHead(501, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Preview only: task persistence is not configured.' }));
    return;
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }
  const asset = assets.get(pathname);
  if (!asset) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  try {
    const body = await readFile(asset[0]);
    response.writeHead(200, { 'Content-Type': asset[1], 'Content-Length': body.length });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    console.error('Cannot read preview asset:', error.message);
    response.writeHead(500);
    response.end('Preview asset unavailable');
  }
});

server.on('error', (error) => {
  console.error(`Preview could not start: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`DEV ID preview: http://127.0.0.1:${server.address().port}`);
  console.log('Demo template. Tasks reset on reload; authentication and integrations are not connected.');
});
