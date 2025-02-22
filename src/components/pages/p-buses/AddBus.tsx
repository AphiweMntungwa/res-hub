import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, IconButton, Grid, Typography, Slide } from '@mui/material';
import { Dayjs } from 'dayjs';
import * as Yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTimePicker from './CustomTimePicker';
import axiosInstance from '@/lib/axiosInstance';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props, ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean;
    handleClose: () => void;
    setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
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
    busDriver: Yup.string().optional(),
    busDriverPhoneNumber: Yup.string().optional()
});

const BusDialog: React.FC<Props> = ({ open, handleClose, setRefreshTrigger }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            busNumber: '',
            fromTimes: [null],
            toTimes: [null],
            busDriver: '',
            busDriverPhoneNumber: ''
        },
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

    const onSubmit = async (data: FormValues) => {
        const newBus = {
            busNumber: data.busNumber,
            fromTimes: data.fromTimes.map(time => time?.toISOString() || ''),
            toTimes: data.toTimes.map(time => time?.toISOString() || ''),
            busDriver: data.busDriver,
            busDriverPhoneNumber: data.busDriverPhoneNumber
        };
        console.log(newBus);
        try {
            await axiosInstance.post('/bus', newBus);
            handleClose();
            setRefreshTrigger(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition}>
            <DialogTitle>
                Add New Bus Schedule
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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

                    <Controller
                        name="busDriver"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Bus Driver (Optional)"
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
                                label="Bus Driver Phone Number (Optional)"
                                {...field}
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />

                    <Typography variant="subtitle1">Residence To School Trip Times</Typography>
                    {fromFields.map((field, index) => (
                        <Grid container spacing={2} key={field.id} alignItems="center" sx={{ marginBottom: 1 }}>
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
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => appendFrom(null)}>
                        Add Time
                    </Button>

                    <Typography variant="subtitle1">School To Residence Trip Times</Typography>
                    {toFields.map((field, index) => (
                        <Grid container spacing={2} key={field.id} alignItems="center" sx={{ marginBottom: 1 }}>
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
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => appendTo(null)}>
                        Add Time
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">Add Bus</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BusDialog;
