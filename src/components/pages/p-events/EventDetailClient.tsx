"use client"
import React, { useState, lazy, Suspense } from 'react';
import { Box, Typography } from '@mui/material';

interface Event {
    id: number;
    eventName: string;
    description: string;
    type: number;
    dateOfEvent: string;
    residenceId: number;
}

interface EventProps {
    event: Event;
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

const EventDetailClient: React.FC<EventProps> = ({ event }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const date = new Date(event.dateOfEvent);

    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2">
                        Name of Event:
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {event.eventName}
                    </Typography>
                    <Typography variant="subtitle2" >
                        Type of Event:
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {eventTypes[event.type]}
                    </Typography>

                    <Typography variant="subtitle2" >
                        Date of event:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {date.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2">
                        Event Description:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {event.description}
                    </Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default EventDetailClient;
