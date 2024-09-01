"use client"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { axiosExpressInstance } from '@/lib/axiosInstance';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { IconButton } from '@mui/material';

const ChatListDialog: any = React.lazy(() => import('@/components/pages/p-inbox/NewChatDialog'));


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
    const [open, setOpen] = React.useState<boolean>(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    {/* <React.Suspense fallback={<div>Loading...</div>}> */}
                    <ChatListDialog open={open} onClose={handleClose} />
                    {/* </React.Suspense> */}
                    <List subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Recent Chats
                        </ListSubheader>
                    } sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
                        <ListItemButton onClick={handleClickOpen}>
                            <ListItemIcon>
                                <PersonAddAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add New Chats" />
                        </ListItemButton>
                        {recentChats.map(user => {
                            return (
                                <ListItem key={user.Id}>
                                    <IconButton>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </IconButton>
                                    <Link href={`inbox/${user.Id}`} >
                                        <ListItemText primary={user.FirstName + " " + user.LastName} secondary="Jan 9, 2014" />
                                    </Link>
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}