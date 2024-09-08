"use client"
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, List, ListItem, Button, CardActions, IconButton, Divider } from '@mui/material';
import BusDialog from './AddBus';
import EditBusDialog from './EditBusDialog';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axiosInstance from '@/lib/axiosInstance';
import DeleteDialog from './DeleteBusDialog';

interface Bus {
    busId: number;
    busNumber: string;
    lastUpdated: string; // Use string to match the serialized date format, or use Date if you parse it.
    residenceId: number;
    lastUpdatedByUserId: string;
    busDriver?: string;  // Optional bus driver name
    busDriverPhoneNumber?: string;  // Optional bus driver phone number
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
    busData: Bus[]
    // You can define any props if needed
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
                const response = await axiosInstance.get('/bus')
                setLocalBusData(response.data.$values)
                setRefreshTrigger(false)
            }
            getRefreshBuses()
        }

    }, [refreshTrigger])

    const handleOpenDeleteDialog = (busId: number) => {
        setSelectedBusId(busId);
        setDialogDeleteOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDialogDeleteOpen(false);
        setSelectedBusId(null);
    };

    const handleDeleteBus = async (busId: number | null) => {
        console.log(busId)
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

    const handleClickEditOpen = () => {
        setDialogEditOpen(true);
    };

    const handleCloseEdit = () => {
        setDialogEditOpen(false);
    };


    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Alert severity="info">
                        <Typography component='header'>
                            Last Updated By:
                        </Typography>
                    </Alert>
                </Grid>

                {localBusData.map((bus) => (
                    <Grid key={bus.busId} item xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
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
                                    <ListItem className='px-0'>
                                        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                                            Bus Schedule:
                                        </Typography>
                                    </ListItem>

                                    {bus.departureTimes.$values.map((time: any) => {
                                        const directionValue = getDirectionFromValue(time.direction);
                                        return (
                                            <ListItem className='px-0' key={time.departureTimeId}>
                                                <Typography variant="body1" color="textSecondary">
                                                    {directionValue}
                                                </Typography>
                                                <Divider sx={{ backgroundColor: 'blue' }} className='mx-3' orientation="vertical" variant="middle" flexItem />
                                                <Typography variant="body2" color="textSecondary">
                                                    {time.time}
                                                </Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => handleClickEditOpen()} aria-label="add to favorites">
                                    <EditOutlinedIcon color='primary' />
                                </IconButton>
                                <IconButton onClick={() => handleOpenDeleteDialog(bus.busId)} aria-label="share">
                                    <DeleteOutlineOutlinedIcon color='warning' />
                                </IconButton>
                            </CardActions>
                        </Card>
                        <EditBusDialog busData={bus} setRefreshTrigger={setRefreshTrigger} open={dialogEditOpen} handleClose={handleCloseEdit} />
                    </Grid>
                ))}
                <DeleteDialog
                    open={dialogDeleteOpen}
                    busId={selectedBusId}
                    onClose={handleCloseDeleteDialog}
                    onDelete={handleDeleteBus}
                />
                <Grid item xs={12} sm={12} md={12}>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        Add New Bus
                    </Button>
                </Grid>
                <BusDialog setRefreshTrigger={setRefreshTrigger} open={dialogOpen} handleClose={handleClose} />
            </Grid>


        </React.Fragment>
    );
};

export default Buses;
