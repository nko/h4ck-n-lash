var sys = require('sys');
var connect = require('./vendor/connect/lib/connect');

var server = connect.createServer(
	connect.logger({ format: ':method :url' }),
	connect.bodyDecoder(),
	connect.staticProvider('./client')
);
var port = process.env.NODE_PORT || 80;
server.listen(parseInt(port));
sys.log('Web server listening on port ' + port);
