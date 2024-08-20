"use client";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

import { socket, sendMessage, onMessage, joinRoom, leaveRoom, disconnectSocket } from '@/socket';// Adjust the import path

export default function ChatSpace({
    userChat,
    roomId
}: {
    userChat: string,
    roomId: string
}) {
    const [message, writeMessage] = React.useState("");
    const [messageList, setMessageList] = React.useState<string[]>(["one"]);

    function handleSubmit(message: string): void {
        sendMessage(roomId, message); // Use the modular sendMessage function
        writeMessage("");
    }

    React.useEffect(() => {

        if (!socket.connected) {
            socket.connect();
        }

        // Define handlers for socket events
        const handleMessage = (data: string) => {
            setMessageList(oldMessage => [...oldMessage, data]);
        };

        onMessage(handleMessage);
        
        const handleConnect = () => {
            console.log('Connected:', socket.id);
            joinRoom(roomId); // Join the chat room when the component mounts
        };

        // Setup socket event listeners
        socket.on('connect', handleConnect);
        socket.on('message', handleMessage);

        // Cleanup on component unmount
        return () => {
            socket.off('connect', handleConnect); // Remove specific handler
            socket.off('message', handleMessage); // Remove specific handler
            leaveRoom(roomId);
            socket.disconnect();
        };

    }, [roomId]); // Depend on roomId so it will update if roomId changes

    return (
        <React.Fragment>
            <Grid container>
                <h2>{userChat}</h2>
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
                <Grid item xs={12} display="flex" flexDirection="column" justifyContent="center">
                    {messageList.map((singleMessage, index) => (
                        <div key={index}>
                            <h4>{singleMessage}</h4>
                            <Divider orientation="horizontal" />
                        </div>
                    ))}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
