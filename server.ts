const http = require('http');

http
  .createServer((req: any, res: any) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
  })
  .listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

console.log('This is data ');

function add() {
  console.log('yrd');

  console.log('yes');

  console.log('Nothing');

  console.log('nnnnnnnnnnnnnnnnnn');
}
