const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function(){
    console.log('socket io server listen on port 3000');
});

// connection -> callback function
io.on('connection', function(socket){
    socket.on('req_login', function(){
        // confirm user_id and user_pw in database
    });
});