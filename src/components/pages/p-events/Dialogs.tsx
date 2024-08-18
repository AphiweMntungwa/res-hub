import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import { TransitionProps } from '@mui/material/transitions';
import { Dayjs } from 'dayjs';
import axiosInstance from '@/lib/axiosInstance';

interface Props {
    open: boolean;
    handleClose: () => void;
}

interface Event {
    eventName: string;
    dateOfEvent: any;
    type: string;
    description: string;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DatePicker: any = React.lazy(() => import('@/components/pages/p-events/DatePicker'));

const typeOptions = [
    { label: 'Sports', id: 0 },
    { label: 'Recreation', id: 1 },
    { label: 'Formal', id: 2 },
    { label: 'Religious', id: 3 }
]

export const AlertDialogSlideAddEvent: React.FC<Props> = ({ open, handleClose }) => {
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [eventTypeVal, setEventTypeValue] = React.useState<any | null>(typeOptions[0]);
    const [dateOfEventValue, setDateOfEventValue] = React.useState<Dayjs | null>(null);


    const handleSubmitAddEvent = async (event: Event) => {
        try {
            const response = await axiosInstance.post('/Events', event);
            console.log(response);
            handleClose();
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add A New Event"}</DialogTitle>

                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <DatePicker dateOfEventValue={dateOfEventValue} setDateOfEventValue={setDateOfEventValue} />
                    </React.Suspense>

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={eventTypeVal}
                        onChange={(event: any, newValue: string | null) => {
                            setEventTypeValue(newValue);
                        }}
                        options={typeOptions}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField
                            {...params}
                            id="outlined-uncontrolled"
                            label="Type Of Event"
                        />}
                    />
                    <TextField
                        id="outlined-controlled"
                        label="Name Of Event"
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <TextField
                        id="outlined-controlled"
                        label="Description Of Event"
                        value={desc}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDesc(event.target.value);
                        }}
                    />
                </Box>
                <DialogActions>
                    <Button onClick={() => {
                        const newEvent: Event = {
                            eventName: name,
                            dateOfEvent: dateOfEventValue,
                            type: eventTypeVal.id,
                            description: desc
                        };
                        handleSubmitAddEvent(newEvent);
                    }
                    }>
                        Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
