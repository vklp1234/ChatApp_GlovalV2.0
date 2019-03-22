var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
users = [];
connections = [];
idarr = [];

server.listen(process.env.PORT || 3000);
console.log('Server runing .....');
app.get('/',function (req,res) {
    res.sendFile(__dirname + '/index.html');
});
io.sockets.on('connection',function (socket) {
   //connected
    connections.push(socket);
    console.log('connected: %s sockets connected ',connections.length,socket.id);



    //disconnect
    socket.on('disconnect',function (data) {
        connections.slice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets connected',connections.length);
        idarr.push(socket.id);
        console.log(socket.username);
        users.splice(users.indexOf(socket.username),1);
        console.log(users);
        updateUsernames2();
    });

    //sending message
    socket.on('send message',function (data) {

       io.sockets.emit('new message',{msg: data,user: socket.username});
    });


    // new user
    socket.on('new user',function (data, callback) {

        callback(true);
        socket.username = data;
        users.push(socket.username);


        console.log(idarr);
        updateUsernames();

    });
    // remove user
   /* socket.on('remove user',function (data, callback) {

        callback(true);
        socket.username = data;
        var store_data = idarr.indexOf();
        console.log(store_data);
        users.splice(users.indexOf(store_data),1);

        updateUsernames2();

    });*/


    function updateUsernames() {

        console.log('hi1');
        io.sockets.emit('get user', users);

    }
    function updateUsernames2() {
        console.log('hi1');
        io.sockets.emit('get user',users);
    }

});