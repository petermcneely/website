import { Server } from 'node-static';
import { createServer } from 'http';

var fileServer = new(Server)('public', { cache: 7200 });

createServer((request, response) => {
  fileServer.serve(request, response, (err, _) => {
    if (err) {
      console.error(err);
    }
  });
}).listen(8080);

console.log("Starting website");