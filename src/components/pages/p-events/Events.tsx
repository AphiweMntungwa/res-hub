"use client"
import React, { useState, lazy, Suspense } from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Divider } from 'semantic-ui-react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'; 
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { IconButton } from '@mui/material';

interface Event {
    id: number;
    eventName: string;
    dateOfEvent: string;
    type: string;
}

interface EventProps {
    events: Event[];
}

const eventTypes = [
    'Sports',
    'Recreation',
    'Formal',
    'Religious'
];


// Function to convert date string to Date object
function convertToDate(dateString: string) {
    return new Date(dateString).getFullYear();
}

const AlertDialogSlideAddEvent = lazy(() => import('@/components/pages/p-events/Dialogs').then(module => ({ default: module.AlertDialogSlideAddEvent })));;

const Events: React.FC<EventProps> = (props) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };


    return (
        <React.Fragment>
            <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText
                        primary={"e.eventName"}
                        secondary={'convertToDate("e.dateOfEvent")'}
                    />
                    <IconButton onClick={handleClickOpen}>
                        <AddTaskOutlinedIcon />
                    </IconButton>
                </ListItem>
                {props.events.map(e => (
                    <ListItem key={e.id}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={e.eventName}
                                secondary={convertToDate(e.dateOfEvent)}
                            />
                        </ListItemButton>

                        {/* <ListItemText primary="Photos" secondary="Jan 9, 2014" /> */}
                    </ListItem>
                ))}
            </List>
            <Suspense fallback={<div>Loading...</div>}>
                {openDialog && (
                    <AlertDialogSlideAddEvent open={openDialog} handleClose={handleClose} />
                )}
            </Suspense>
        </React.Fragment>
    );
};

export default Events;
