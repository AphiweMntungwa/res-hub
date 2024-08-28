import { io } from 'socket.io-client';
import nookies from 'nookies';

const URL = process.env.NODE_ENV === 'production' ? "" : 'http://localhost:3001';

const cookies = nookies.get();

// Extract your JWT token from cookies
const token = cookies['jwt-token'];

export const socket = io(URL, {
    autoConnect: false, // Connect only when required
    withCredentials: true, // Allow credentials if necessary
    auth: {
        token // Send the token as part of the connection auth
    }
});

// Join a room
export const joinRoom = (receiverId: string) => {
    console.log('at least we got here', receiverId)
    socket.emit('join-room', receiverId);
};

// Leave a room
export const leaveRoom = (roomId: string) => {
    socket.emit('leave-room', roomId);
};

// Send a message
export const sendMessage = (receiverId: string, message: string) => {
    socket.emit('send-message', { receiverId, message });
};

// Listen for messages
export const onMessage = (callback: (message: string) => void) => {
    socket.on('receive-message', callback);
};

// Disconnect from socket
export const disconnectSocket = () => {
    socket.disconnect();
};
