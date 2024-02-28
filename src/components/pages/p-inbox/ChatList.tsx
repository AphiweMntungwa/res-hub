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

export default function ChatList() {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center">
                    <List subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            User Chats
                        </ListSubheader>
                    } sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
                        {['User 1', 'User 2', 'User 3', 'User 4', 'User 5'].map(user => {
                            return (
                                <ListItem key={user}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={user} secondary="Jan 9, 2014" />
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}