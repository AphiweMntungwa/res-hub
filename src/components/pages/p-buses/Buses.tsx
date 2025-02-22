"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, List, ListItem, Button, CardActions, IconButton, Divider, Box } from '@mui/material';
import BusDialog from './AddBus';
import EditBusDialog from './EditBusDialog';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HomeIcon from '@mui/icons-material/Home';
import axiosInstance from '@/lib/axiosInstance';
import DeleteDialog from './DeleteBusDialog';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';

interface Bus {
    busId: number;
    busNumber: string;
    lastUpdated: string;
    residenceId: number;
    lastUpdatedByUserId: string;
    busDriver?: string;
    busDriverPhoneNumber?: string;
    departureTimes: DepartureTime;
}

enum Direction {
    FromResidence = 1,
    ToResidence = 2
}

interface DepartureTime {
    $values: [{
        departureTimeId: number;
        time: string;
        direction: Direction;
        busId: number;
    }];
}

interface BusesProps {
    busData: Bus[];
}

function getDirectionIcon(value: number) {
    switch (value) {
        case Direction.FromResidence:
            return <DirectionsBusIcon sx={{ color: '#1976d2', mr: 1 }} />;
        case Direction.ToResidence:
            return <HomeIcon sx={{ color: '#d32f2f', mr: 1 }} />;
        default:
            throw new Error('Invalid direction value');
    }
}

function getDirectionFromValue(value: number) {
    switch (value) {
        case Direction.FromResidence:
            return 'Trip To School';
        case Direction.ToResidence:
            return 'Trip To Residence';
        default:
            throw new Error('Invalid direction value');
    }
}

const Buses: React.FC<BusesProps> = ({ busData }) => {
    const [localBusData, setLocalBusData] = React.useState(busData);
    const [refreshTrigger, setRefreshTrigger] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogEditOpen, setDialogEditOpen] = React.useState(false);
    const [dialogDeleteOpen, setDialogDeleteOpen] = React.useState(false);
    const [selectedBusId, setSelectedBusId] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (refreshTrigger) {
            const getRefreshBuses = async () => {
                const response = await axiosInstance.get('/bus');
                setLocalBusData(response.data.$values);
                setRefreshTrigger(false);
            };
            getRefreshBuses();
        }
    }, [refreshTrigger]);

    const handleOpenDeleteDialog = (busId: number) => {
        setSelectedBusId(busId);
        setDialogDeleteOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDialogDeleteOpen(false);
        setSelectedBusId(null);
    };

    const handleDeleteBus = async (busId: number | null) => {
        try {
            await axiosInstance.delete(`/bus/${busId}`);
            setRefreshTrigger(true);
            handleCloseDeleteDialog();
        } catch (error) {
            console.error("Error deleting bus", error);
        }
    };

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleClickEditOpen = (busId: number) => {
        setSelectedBusId(busId);
        setDialogEditOpen(true);
    };

    const handleCloseEdit = () => {
        setDialogEditOpen(false);
        setSelectedBusId(null);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                        <Typography component='header'>
                            Last Updated By:
                        </Typography>
                        <IconButton onClick={handleClickOpen} sx={{ borderLeft: '1px solid #ddd', ml: 2 }}>
                            <AddTaskOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Grid>
                {localBusData.map((bus) => (
                    <Grid key={bus.busId} item xs={12} sm={6} md={4}>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <Card variant="outlined" sx={{ mb: 2, borderRadius: '16px', overflow: 'hidden' }}>
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                        Bus Number: {bus.busNumber}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        Driver: {bus.busDriver}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Driver Phone: {bus.busDriverPhoneNumber}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Residence ID: {bus.residenceId}
                                    </Typography>
                                    <List>
                                        {bus.departureTimes.$values.map((time: any) => (
                                            <ListItem className='px-0' key={time.departureTimeId}>
                                                {getDirectionIcon(time.direction)}
                                                <Typography variant="body2" color="textSecondary">
                                                    {time.time} - {getDirectionFromValue(time.direction)}
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', gap: 1 }}>
                                    <motion.button
                                        whileHover={{ width: '100%' }}
                                        className='flex-1 p-2 rounded-md border border-blue-500 flex justify-center items-center transition-all'
                                        onClick={() => handleClickEditOpen(bus.busId)} // Trigger edit dialog
                                    >
                                        <EditOutlinedIcon sx={{ color: '#1976d2' }} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ width: '100%' }}
                                        className='flex-1 p-2 rounded-md border border-red-500 flex justify-center items-center transition-all'
                                        onClick={() => handleOpenDeleteDialog(bus.busId)} // Trigger delete dialog
                                    >
                                        <DeleteOutlineOutlinedIcon sx={{ color: '#d32f2f' }} />
                                    </motion.button>
                                </CardActions>
                            </Card>
                        </motion.div>
                        <EditBusDialog busData={bus} setRefreshTrigger={setRefreshTrigger} open={dialogEditOpen} handleClose={handleCloseEdit} />
                    </Grid>
                ))}
                <DeleteDialog open={dialogDeleteOpen} busId={selectedBusId} onClose={handleCloseDeleteDialog} onDelete={handleDeleteBus} />
                <BusDialog setRefreshTrigger={setRefreshTrigger} open={dialogOpen} handleClose={handleClose} />
            </Grid>
        </React.Fragment>
    );
};

export default Buses;
