import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [joined, setJoined] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on('userList', (list) => {
            setUsers(list);
        });

        return () => {
            socket.off('message');
            socket.off('userList');
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleJoin = () => {
        if (username) {
            socket.emit('join', username);
            setJoined(true);
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message);
            setMessage('');
        }
    };

    if (!joined) {
        return (
            <div>
                <h2>请输入用户名加入聊天室</h2>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={handleJoin}>加入</button>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div
                style={{ flex: 1, borderRight: '1px solid #ddd', padding: 20 }}
            >
                <h3>在线用户</h3>
                <ul>
                    {users.map((user, i) => (
                        <li key={i}>{user}</li>
                    ))}
                </ul>
            </div>
            <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                    {messages.map((msg, i) => (
                        <div key={i}>
                            <b>{msg.user}：</b>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form
                    onSubmit={sendMessage}
                    style={{ display: 'flex', padding: 20 }}
                >
                    <input
                        style={{ flex: 1 }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="输入消息"
                    />
                    <button type="submit">发送</button>
                </form>
            </div>
        </div>
    );
}

export default ChatRoom;
