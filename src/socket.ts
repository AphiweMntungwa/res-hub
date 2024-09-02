import { io } from 'socket.io-client';
import nookies from 'nookies';

interface Message {
    MessageId: string;
    SenderId: string;
    ReceiverId: string;
    Content: string;
    Timestamp: string;
    FirstName: string;
}

interface UserMessageNotification {
    FirstName: string;
    ReceiverId: string;
}

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

export const joinRoom = (receiverId: string, maxAttempts: number = 3) => {
    let attempts = 0;

    const attemptJoin = () => {
        attempts += 1;

        socket.emit('join-room', receiverId, (ack: boolean) => {
            if (!ack && attempts < maxAttempts) {
                console.log(`Attempt ${attempts} to join room ${receiverId} failed. Retrying...`);
                setTimeout(attemptJoin, 1000); // Retry after 1 second
            } else if (!ack) {
                console.error(`Failed to join room ${receiverId} after ${attempts} attempts.`);
            } else {
                console.log(`Successfully joined room ${receiverId}`);
            }
        });
    };

    attemptJoin();
};

export const joinPersonalRoom = () => {
    socket.emit('join-personal-room');
};

export const leaveRoom = (roomId: string) => {
    socket.emit('leave-room', roomId);
};

export const leavePersonalRoom = () => {
    socket.emit('leave-personal-room');
};

// Send a message
export const sendMessage = (receiverId: string, content: string) => {
    console.log(receiverId, content)
    socket.emit('send-message', { receiverId, content });
};

// Listen for messages
export const onMessage = (callback: (message: Message) => void) => {
    socket.on('receive-message', callback);
};

export const onMessageNotification = (callback: (user: UserMessageNotification) => void) => {
    socket.on('message-notification', callback);
};

// Disconnect from socket
export const disconnectSocket = () => {
    socket.disconnect();
};
