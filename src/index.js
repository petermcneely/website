import { Server } from 'node-static';
import { createServer } from 'http';

var fileServer = new(Server)('public', { cache: 7200 });

createServer((request, response) => {
  fileServer.serve(request, response, (err, res) => {
    if (err && err.status === 404) {
      if (request.url === '/resume.html' || request.url === '/resume') {
        fileServer.serveFile('/resume.pdf', 200, {}, request, response);
      }
      else if (request.url === '/index') {
        fileServer.serveFile('/index.html', 200, {}, request, response);
      }
      else {
        fileServer.serveFile('/404.html', 404, {}, request, response);
      }
    } else if (err && err.status === 500) {
      fileServer.serveFile('/500.html', 500, {}, request, response);
    }
  });
}).listen(8080);