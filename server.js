var mongoose = require( 'mongoose' );
var express  = require( 'express' );
var bp       = require('body-parser');
var path     = require( 'path' );
var root     = __dirname;
var port     = process.env.PORT || 8000;
var app      = express();

app.use(bp.json())
app.use(bp.urlencoded())
app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'bower_components' )));
require("./server/config/routes.js")(app);

var server = app.listen( port, function() {
  console.log( `server running on port ${ port }` );
});



var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("WE ARE USING SOCKETS!");
  console.log(socket.id);

  socket.on("data_updated", function (urlname){
    console.log("DATA:::::::", urlname);
    socket.broadcast.emit('updated_data', urlname);
  });
});
