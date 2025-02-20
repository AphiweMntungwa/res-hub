"use client"
import React, { useState, lazy, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import { Card, CardContent, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import IconButton from '@mui/material/IconButton';

interface Event {
    id: number;
    eventName: string;
    description: string;
    type: number;
    dateOfEvent: string;
    residenceId: number;
}

const AlertDialogSlideAddEvent = lazy(() => import('@/components/pages/p-events/Dialogs').then(module => ({ default: module.AlertDialogSlideAddEvent })));

const Events: React.FC<{ events: Event[] }> = (props) => {
    const [localEvents, setLocalEvents] = useState(props.events);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const refresh = searchParams.get('refresh');

    const handleClickOpen = () => setOpenDialog(true);
    const handleClose = () => setOpenDialog(false);

    const handleNavigateToDetails = (id: number) => {
        router.push(`events/${id}`);
    };

    React.useEffect(() => {
        if (refreshTrigger || refresh === 'true') {
            const getRefreshEvents = async () => {
                const response = await axiosInstance.get(`/Events`);
                setLocalEvents(response.data.$values);
                setRefreshTrigger(false);
                router.replace('/residence/events');
            };
            getRefreshEvents();
        }
    }, [refreshTrigger]);

    return (
        <React.Fragment>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} textAlign="right">
                    <IconButton onClick={handleClickOpen}>
                        <AddTaskOutlinedIcon fontSize="large" />
                    </IconButton>
                </Grid>
                {localEvents.map(e => (
                    <Grid item key={e.id} xs={12} sm={6} md={4}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card sx={{ borderRadius: 3, boxShadow: 3, cursor: "pointer" }} onClick={() => handleNavigateToDetails(e.id)}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {e.eventName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {e.description}
                                    </Typography>
                                    <Typography variant="caption" display="block" mt={1}>
                                        {new Date(e.dateOfEvent).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        View Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
            <Suspense fallback={<div>Loading...</div>}>
                {openDialog && (
                    <AlertDialogSlideAddEvent setRefreshTrigger={setRefreshTrigger} open={openDialog} handleClose={handleClose} />
                )}
            </Suspense>
        </React.Fragment>
    );
};

export default Events;
