"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Card, Alert, CardContent, Typography, CardHeader, Button } from '@mui/material';

import { socket, sendMessage, onMessage, joinRoom, leaveRoom, disconnectSocket } from '@/socket';
import { axiosExpressInstance } from '@/lib/axiosInstance';
import FormatTimestamp from '@/lib/DateConverter';

interface Message {
    MessageId: string;
    SenderId: string;
    ReceiverId: string;
    Content: string;
    Timestamp: string;
    FirstName: string;
}

export default function ChatSpace({
    receiverId
}: {
    receiverId: string
}) {
    const [message, writeMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState<Message[]>([]);
    const chatContainerRef = React.useRef<HTMLDivElement | null>(null);

    function handleSubmit(message: string): void {
        sendMessage(receiverId, message); // Use the modular sendMessage function
        writeMessage("");
    }

    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);

    React.useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosExpressInstance.get(`/messages`, {
                    params: {
                        receiverId
                    }
                });
                console.log(response.data)
                setMessageList(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [receiverId]);

    React.useEffect(() => {

        if (!socket.connected) {
            console.log('lkjfs')
            socket.connect();
        }

        // Define handlers for socket events
        const handleMessage = (data: string) => {
            // setMessageList(oldMessage => [...oldMessage, data]);
        };

        onMessage(handleMessage);

        const handleConnect = () => {
            console.log('Connected:', socket.id);
            joinRoom(receiverId); // Join the chat room when the component mounts
        };

        // Setup socket event listeners
        socket.on('connect', handleConnect);
        socket.on('message', handleMessage);

        // Cleanup on component unmount
        return () => {
            socket.off('connect', handleConnect);
            socket.off('message', handleMessage);
            leaveRoom(receiverId);
            socket.disconnect();
        };

    }, []);

    return (
        <React.Fragment>
            <Grid container ref={chatContainerRef}>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <Paper
                        component="form"
                        sx={{
                            p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, position: "fixed",
                            bottom: 0,
                            textAlign: "center",
                            padding: "10px"
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Message"
                            autoFocus
                            inputProps={{ 'aria-label': 'write message' }}
                            onChange={e => writeMessage(e.target.value)}
                            value={message}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton
                            onKeyDown={e => e.key === "Enter" ? handleSubmit(message) : ""}
                            onClick={() => handleSubmit(message)}
                            color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Card  sx={{ paddingBlock: "84px", width: "100%", minWidth: 275, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {messageList.map((message) => (
                        <Alert key={message.MessageId} icon={false} sx={{
                            marginInline: '3px',
                            width: "80%",
                            alignSelf: message.SenderId === receiverId ? 'flex-start' : 'flex-end',
                            backgroundColor: message.SenderId === receiverId ? '#f5f5f5' : '#e0f7fa'
                        }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {message.FirstName}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {message.Content}
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary" >
                                { FormatTimestamp( message.Timestamp)}
                            </Typography>
                        </Alert>

                    ))}
                </Card>
            </Grid>
        </React.Fragment>
    )
}
