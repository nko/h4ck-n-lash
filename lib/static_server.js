var connect = require('../vendor/connect/lib/connect');

exports.start = function( static_port ){
  static_server = connect.createServer(
    connect.logger({ format: ':method :url' }),
    connect.bodyDecoder(),
    connect.staticProvider('./client')
  );

  static_port = process.env.NODE_PORT || 80;
  static_server.listen(parseInt(static_port));
  sys.log('Static server listening on port ' + static_port);

}
