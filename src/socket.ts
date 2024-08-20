import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? "" : 'http://localhost:3001';

export const socket = io(URL, {
  autoConnect: false, // Connect only when required
  withCredentials: true, // Allow credentials if necessary
});

// Join a room
export const joinRoom = (roomId: string) => {
    console.log('at least we got here', roomId)
  socket.emit('join-room', roomId);
};

// Leave a room
export const leaveRoom = (roomId: string) => {
  socket.emit('leave-room', roomId);
};

// Send a message
export const sendMessage = (roomId: string, message: string) => {
  socket.emit('send-message', { roomId, message });
};

// Listen for messages
export const onMessage = (callback: (message: string) => void) => {
  socket.on('receive-message', callback);
};

// Disconnect from socket
export const disconnectSocket = () => {
  socket.disconnect();
};
