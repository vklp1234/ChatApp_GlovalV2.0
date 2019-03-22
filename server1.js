var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
next_uid = 0;
users = {};

wsserver.on('connection', function (conn) {
        conn.user_id = ++new_uid; // you can store user-ID here
        users[conn.user_id] = { /* any user data you want */ }
        conn.on('message', function (message) {
                 console.log('message form ' + conn.user_id);
        });

        conn.on('close', function (code, reason) {
                console.log(conn.user_id + ' disconnected');
                delete users[conn.user_id];
        });
});