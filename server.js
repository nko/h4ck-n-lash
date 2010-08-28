var sys = require('sys');
var connect = require('./vendor/connect/lib/connect');

var server = connect.createServer(
	connect.logger({ format: ':method :url' }),
	connect.bodyDecoder(),
	connect.router(function(app){
		app.get('/', function(req,res){
			res.writeHead(200);
			res.end('<div style="text-align:center;font-style:italic;font-weight:bold;font-family:verdana;color:#440000;line-height:200%;font-size:1.5em;">SERIES OF TUBES<br/>it will be epic<br/>you just wait and see...</div>');
		});
	})
);
server.listen(80);
sys.log('Web server listening on port 80');
