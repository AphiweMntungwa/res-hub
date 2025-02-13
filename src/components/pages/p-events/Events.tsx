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
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';

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
    const [localEvents, setLocalEvents] = useState(props.events);
    const [refreshTrigger, setRefreshTrigger] = React.useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const refresh = searchParams.get('refresh');

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleNavigateToDetails = (id: number) => {
        router.push(`events/${id}`);
    }

    React.useEffect(() => {
        if (refreshTrigger || refresh === 'true') {
            const getRefreshEvents = async () => {
                const response = await axiosInstance.get(`/Events`)
                setLocalEvents(response.data.$values)
                setRefreshTrigger(true)
                router.replace('/residence/events');
            }
            getRefreshEvents()
        }

    }, [refreshTrigger])

    return (
        <React.Fragment>
            <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText
                        primary="Events at Your Residence"
                    />
                    <IconButton onClick={handleClickOpen}>
                        <AddTaskOutlinedIcon />
                    </IconButton>
                </ListItem>
                {localEvents.map(e => (
                    <ListItem key={e.id}>
                        <ListItemButton onClick={() => handleNavigateToDetails(e.id)}>
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
                    </ListItem>
                ))}
            </List>
            <Suspense fallback={<div>Loading...</div>}>
                {openDialog && (
                    <AlertDialogSlideAddEvent setRefreshTrigger={setRefreshTrigger} open={openDialog} handleClose={handleClose} />
                )}
            </Suspense>
        </React.Fragment>
    );
};

export default Events;
