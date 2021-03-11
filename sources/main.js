const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//const mysql_class = require('./mysql_conn');
//const sql = new mysql_class();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, function(){
    console.log('socket io server listen on port 3000');
});

// connection -> callback function
// io = total socket
// socket = personal socket
io.on('connection', function(socket){

    socket.on('login', function(data){
        console.log('login');

        socket.name = data.name;
        socket.user_id = data.user_id;

        // 접속해있는 모든 소켓에 전송
        io.emit('login', data.name);
    });

    socket.on('chat', function(data){
        console.log('Message from %s: %s', socket.name, data.msg);

        var msg = {
            from : {
                name : socket.name,
                user_id : socket.user_id
            },
            msg : data.msg
        }

        socket.broadcast.emit('chat', msg);
    });

    // socket.on('req_login', function(data){
    //     // confirm user_id and user_pw in database
    //     rows = sql.query('call search_user(${data.name}, ${data.pw});');
    // });

    socket.on('forceDisconnect', function(){
        socket.disconnect();
    });

    socket.on('disconnect', function(){
        console.log('user disconnect : ' + socket.name);
    });
});