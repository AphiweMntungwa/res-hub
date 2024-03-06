"use client"

import * as React from 'react';
import Grid from '@mui/material/Grid';
import { io } from 'socket.io-client';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const socket = io("http://localhost:3001");

export default function ChatSpace({
    userChat
}: {
    userChat: string
}) {
    const [message, writeMessage] = React.useState("")
    const [messageList, setMessageList] = React.useState<string[]>(["one"])

    function handleSubmit(message: string): void {
        socket.emit("send-message", message)
        writeMessage("")
    }

    React.useEffect(() => {
        socket.on('receive-message', (data) => {
            setMessageList(oldMessage => [...oldMessage, data])
        })
    }, [socket])

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
                        <IconButton onKeyDown={e => e.key === "Enter" ? handleSubmit(message) : ""} onClick={(e) => handleSubmit(message)} color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12} display="flex" flexDirection="column" justifyContent="center">
                    {messageList.map(singleMessage =>
                        <div>
                            <h4>{singleMessage}</h4>
                            <Divider orientation="horizontal" />
                        </div>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}