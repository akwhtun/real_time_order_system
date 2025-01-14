import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/api'); // Adjust to your server's address

socket.on('connect', () => {
    console.log('Connected to Socket.io server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.io server');
});
