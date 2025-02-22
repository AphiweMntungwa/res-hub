import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, Typography, TextField, Grid, Button } from '@mui/material';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CustomTimePicker from './CustomTimePicker';
import axiosInstance from '@/lib/axiosInstance';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean;
    handleClose: () => void;
    setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
    busData: Bus;
}

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

interface FormValues {
    busNumber: string;
    fromTimes: (Dayjs | null)[];
    toTimes: (Dayjs | null)[];
    busDriver?: string;
    busDriverPhoneNumber?: string;
}

const validationSchema = Yup.object().shape({
    busNumber: Yup.string().required('Bus Number is required'),
    fromTimes: Yup.array().of(Yup.date().required('From time is required')).min(1, 'At least one from time is required'),
    toTimes: Yup.array().of(Yup.date().required('To time is required')).min(1, 'At least one to time is required'),
    busDriver: Yup.string(),
    busDriverPhoneNumber: Yup.string()
});

const EditBusDialog: React.FC<Props> = ({ open, handleClose, setRefreshTrigger, busData }) => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
        defaultValues: busData,
        resolver: yupResolver(validationSchema)
    });

    const { fields: fromFields, append: appendFrom, remove: removeFrom } = useFieldArray({
        control,
        name: 'fromTimes'
    });

    const { fields: toFields, append: appendTo, remove: removeTo } = useFieldArray({
        control,
        name: 'toTimes'
    });

    React.useEffect(() => {
        const fromTimes = busData.departureTimes.$values
            .filter(departure => departure.direction === Direction.FromResidence)
            .map(departure => dayjs(departure.time));

        const toTimes = busData.departureTimes.$values
            .filter(departure => departure.direction === Direction.ToResidence)
            .map(departure => dayjs(departure.time));

        setValue('fromTimes', fromTimes);
        setValue('toTimes', toTimes);
    }, [busData, setValue]);

    const onSubmit = async (data: FormValues) => {
        const updatedBus = {
            busNumber: data.busNumber,
            fromTimes: data.fromTimes.map(time => time?.toISOString() || ''),
            toTimes: data.toTimes.map(time => time?.toISOString() || ''),
            busDriver: data.busDriver,
            busDriverPhoneNumber: data.busDriverPhoneNumber
        };

        try {
            await axiosInstance.put(`/bus/${busData.busId}`, updatedBus);
            handleClose();
            setRefreshTrigger(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" fullScreen TransitionComponent={Transition}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Edit Bus Schedule
                <IconButton edge="end" color="inherit" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="busNumber"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Bus Number"
                                {...field}
                                fullWidth
                                margin="normal"
                                error={!!errors.busNumber}
                                helperText={errors.busNumber?.message}
                            />
                        )}
                    />

                    <Typography variant="subtitle1">Residence To School Trip Times</Typography>
                    {fromFields.map((field, index) => (
                        <Grid container spacing={2} key={field.id} alignItems="center">
                            <Grid item xs={11}>
                                <Controller
                                    name={`fromTimes[${index}]`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTimePicker
                                            label={`From Time ${index + 1}`}
                                            {...field}
                                            error={!!errors.fromTimes?.[index]}
                                            helperText={errors.fromTimes?.[index]?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={() => removeFrom(index)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => appendFrom(null)}
                    >
                        Add Another From Time
                    </Button>

                    <Typography variant="subtitle1">School To Residence Trip Times</Typography>
                    {toFields.map((field, index) => (
                        <Grid container spacing={2} key={field.id} alignItems="center">
                            <Grid item xs={11}>
                                <Controller
                                    name={`toTimes[${index}]`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomTimePicker
                                            label={`To Time ${index + 1}`}
                                            {...field}
                                            error={!!errors.toTimes?.[index]}
                                            helperText={errors.toTimes?.[index]?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={() => removeTo(index)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => appendTo(null)}
                    >
                        Add Another To Time
                    </Button>

                    <Controller
                        name="busDriver"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Bus Driver (optional)"
                                {...field}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Controller
                        name="busDriverPhoneNumber"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Bus Driver Phone Number (optional)"
                                {...field}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Update Bus</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBusDialog;
