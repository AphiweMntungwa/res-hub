"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Card, Alert, Typography } from '@mui/material';

import { socket, sendMessage, onMessage, joinRoom, leaveRoom } from '@/socket';
import axiosInstance, { axiosExpressInstance } from '@/lib/axiosInstance';
import FormatTimestamp from '@/lib/DateConverter';

interface Message {
    MessageId: string;
    SenderId: string;
    ReceiverId: string;
    Content: string;
    Timestamp: string;
    FirstName: string;
    IsRead: boolean;
}

export default function ChatSpace({ receiverId }: { receiverId: string }) {
    const [message, writeMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState<Message[]>([]);
    const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

    function handleSubmit(content: string): void {
        if (!content.trim()) return;
        sendMessage(receiverId, content);
        writeMessage("");
    }

    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageList]);

    React.useEffect(() => {
        const markMessagesAsRead = async () => {
            const hasUnreadMessages = messageList.some(msg => !msg.IsRead);
            if (hasUnreadMessages) {
                try {
                    await axiosInstance.get(`/Messages/mark-as-read/${receiverId}`);
                } catch (error) {
                    console.error("Failed to mark messages as read:", error);
                }
            }
        };
        markMessagesAsRead();
    }, [messageList, receiverId]);

    React.useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosExpressInstance.get(`/messages`, { params: { receiverId } });
                setMessageList(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [receiverId]);

    React.useEffect(() => {
        const handleMessage = (data: Message) => {
            setMessageList(oldMessages => {
                if (oldMessages.length > 0 && oldMessages[oldMessages.length - 1].MessageId === data.MessageId) {
                    return oldMessages;
                }
                return [...oldMessages, data];
            });
        };

        onMessage(handleMessage);

        const handleConnect = () => joinRoom(receiverId);
        socket.on('connect', handleConnect);
        socket.on('message', handleMessage);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('message', handleMessage);
            leaveRoom(receiverId);
        };
    }, [receiverId]);

    return (
        <Grid container direction="column" sx={{ height: "100vh", display: "flex" }}>
            <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: 2 }}>
                {messageList.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ marginTop: "20%" }}>
                        No messages yet. Start the conversation!
                    </Typography>
                ) : (
                    messageList.map((message, index) => {
                        const isLastMessage = index === messageList.length - 1;
                        const isUnread = !message.IsRead;
                        const shouldShowDivider = isUnread && message.ReceiverId !== receiverId && !messageList.slice(0, index).some(msg => !msg.IsRead);

                        return (
                            <React.Fragment key={message.MessageId}>
                                {shouldShowDivider && <Divider>Unread</Divider>}
                                <Alert
                                    ref={isLastMessage ? chatContainerRef : null}
                                    icon={false}
                                    sx={{
                                        maxWidth: "75%",
                                        minWidth: "30%",
                                        alignSelf: message.SenderId === receiverId ? 'flex-start' : 'flex-end',
                                        backgroundColor: message.SenderId === receiverId ? '#f5f5f5' : '#e0f7fa',
                                        borderRadius: 2,
                                        padding: 1.5,
                                        marginBottom: 1,
                                    }}
                                >
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {message.FirstName}
                                    </Typography>
                                    <Typography variant="body1">{message.Content}</Typography>
                                    <Typography sx={{ fontSize: 10 }} color="text.secondary">
                                        {FormatTimestamp(message.Timestamp)}
                                    </Typography>
                                </Alert>
                            </React.Fragment>
                        );
                    })
                )}
            </Card>
            <Paper
                component="form"
                onSubmit={e => { e.preventDefault(); handleSubmit(message); }}
                sx={{
                    p: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    width: "100%",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
                    backgroundColor: "white"
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Type a message..."
                    autoFocus
                    inputProps={{ 'aria-label': 'write message' }}
                    onChange={e => writeMessage(e.target.value)}
                    value={message}
                    onKeyDown={e => e.key === "Enter" && !e.shiftKey ? handleSubmit(message) : null}
                />
                <IconButton
                    onClick={() => handleSubmit(message)}
                    color="primary"
                    sx={{ p: '10px' }}
                    aria-label="send"
                >
                    <SendIcon />
                </IconButton>
            </Paper>
        </Grid>
    );
}
