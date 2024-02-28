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

export default function ChatSpace({
    userChat
}: {
    userChat: string
}) {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center">
                    {userChat}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}