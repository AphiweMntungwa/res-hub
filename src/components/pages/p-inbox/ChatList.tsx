"use client"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { axiosExpressInstance } from '@/lib/axiosInstance';

interface ChatUser {
    FirstName: string;
    Id: string;
    LastName: string;
    ResidenceId: number;
    RoomNumber: number;
    StudentNumber: string;
}

export default function ChatList() {

    const [recentChats, setRecentChats] = React.useState<ChatUser[]>([]);

    React.useEffect(() => {
        const fetchRecentChats = async () => {
            try {
                const response = await axiosExpressInstance.get("/recent-chats");
                console.log(response.data); // Handle the response data
                setRecentChats(response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching recent chats:', error);
            }
        };

        fetchRecentChats();

    }, [])

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <List subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            User Chats
                        </ListSubheader>
                    } sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
                        {recentChats.map(user => {
                            return (
                                <Link href={`inbox/${user.Id}`} key={user.Id}>
                                    <ListItem >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={user.FirstName + " " + user.LastName} secondary="Jan 9, 2014" />
                                    </ListItem>
                                </Link>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}