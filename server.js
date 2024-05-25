var http = require('http');
var fs = require('fs');
var popup = fs.readFileSync('popup.html');
const PORT = 3000

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(popup);
}).listen(PORT);
console.log('server listening on port: ' + PORT);