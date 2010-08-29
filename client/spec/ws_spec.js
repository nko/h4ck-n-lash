//REMOVE THIS 'x' to run this spec
xdescribe('Connecting to the server',function(){
  beforeEach(function() {
    restore_websockets_code();
  });

  it('should be able to connect to the server', function(){

    var connected = false;
    $('body').bind('ws_connect',function(){
      connected = true;
    });

    var ws = create_websocket('ws://127.0.0.1:8001');    
    waits(50); 
    runs( function() {
      expect(connected).toBeTruthy();
      ws.close();
    });
  });
  it('should recieve message from other players', function(){
 
    var message = false;
    $('body').bind('ws_message',function( event, msg){
      message = msg;
    });

    var ws_1 = create_websocket('ws://127.0.0.1:8001');    
    var ws_2 = create_websocket('ws://127.0.0.1:8001');
 
    waits(50); 
    runs( function(){
       ws_1.send('foo');
    });

    waits(50); 
    runs( function() {
      expect(message).toEqual('foo');
    });
   
  });
});
