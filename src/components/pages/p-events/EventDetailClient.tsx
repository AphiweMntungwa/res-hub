"use client"
import React, { useState, lazy, Suspense } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteEventDialog from './DeleteEventDialog';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';



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

const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MM/DD/YYYY, hh:mm:ss A'); // Format the date as you want
};


const EventDetailClient: React.FC<EventProps> = ({ event }) => {
    const [localEvent, setLocalEvent] = useState(event);
    const [refreshTrigger, setRefreshTrigger] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const router = useRouter();


    const handleDeleteClickOpen = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleDelete = async (eventId: number) => {
        try {
            await axiosInstance.delete(`/events/${eventId}`); 
            router.push('/residence/events'); 
        } catch (error) {
            console.error('Error deleting event:', error);
            // Handle error (e.g., show an error message)
        }
    };

    React.useEffect(() => {
        if (refreshTrigger) {
            const getRefreshEvents = async () => {
                const response = await axiosInstance.get(`/Events/${localEvent.id}`)
                setLocalEvent(response.data)
                setRefreshTrigger(false)
            }
            getRefreshEvents()
        }

    }, [refreshTrigger])

    const date = new Date(localEvent.dateOfEvent);

    return (
        <React.Fragment>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2">
                        Name of Event:
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {localEvent.eventName}
                    </Typography>
                    <Typography variant="subtitle2" >
                        Type of Event:
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {eventTypes[localEvent.type]}
                    </Typography>

                    <Typography variant="subtitle2" >
                        Date of event:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {formatDate(date.toLocaleString())}
                    </Typography>
                    <Typography variant="subtitle2">
                        Event Description:
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {localEvent.description}
                    </Typography>
                    <IconButton aria-label="edit">
                        <EditOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton  onClick={() => handleDeleteClickOpen()} aria-label="delete">
                        <DeleteOutlineOutlinedIcon color="warning" />
                    </IconButton>
                </Box>
            </Box>
            <DeleteEventDialog
                open={openDeleteDialog}
                onClose={handleDeleteClose}
                eventId={localEvent.id}
                onDelete={handleDelete}
            />
        </React.Fragment>
    );
};

export default EventDetailClient;
