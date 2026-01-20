const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // 开发阶段允许所有源
    },
});

let users = {}; // 存储用户信息

io.on('connection', (socket) => {
    console.log('新用户连接:', socket.id);

    // 用户加入
    socket.on('join', (username) => {
        users[socket.id] = username;
        io.emit('userList', Object.values(users)); // 通知所有人用户列表
        socket.broadcast.emit('message', {
            user: '系统',
            text: `${username} 加入了聊天室`,
        });
    });

    // 接收并广播消息
    socket.on('sendMessage', (message) => {
        const username = users[socket.id];
        io.emit('message', { user: username, text: message });
    });

    // 用户离开
    socket.on('disconnect', () => {
        const username = users[socket.id];
        delete users[socket.id];
        io.emit('userList', Object.values(users));
        io.emit('message', {
            user: '系统',
            text: `${username} 离开了聊天室`,
        });
    });
});

server.listen(5001, () => {
    console.log('服务器已启动，端口5001');
});
