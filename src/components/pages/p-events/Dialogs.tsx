import React from 'react'; 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { TransitionProps } from '@mui/material/transitions';
import { Dayjs } from 'dayjs';
import axiosInstance from '@/lib/axiosInstance';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    open: boolean;
    handleClose: () => void;
    setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
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
];

export const AlertDialogSlideAddEvent: React.FC<Props> = ({ open, handleClose, setRefreshTrigger }) => {
    const [name, setName] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [eventTypeVal, setEventTypeValue] = React.useState<any | null>(typeOptions[0]);
    const [dateOfEventValue, setDateOfEventValue] = React.useState<Dayjs | null>(null);

    const handleSubmitAddEvent = async (event: Event) => {
        try {
            await axiosInstance.post('/Events', event);
            handleClose();
            setRefreshTrigger(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Add A New Event
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                        noValidate
                        autoComplete="off"
                    >
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={eventTypeVal}
                            onChange={(event: any, newValue: any) => {
                                setEventTypeValue(newValue);
                            }}
                            options={typeOptions}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Type Of Event" />}
                        />
                        <TextField
                            label="Name Of Event"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <TextField
                            label="Description Of Event"
                            value={desc}
                            onChange={(event) => setDesc(event.target.value)}
                        />
                          <React.Suspense fallback={<div>Loading...</div>}>
                            <DatePicker dateOfEventValue={dateOfEventValue} setDateOfEventValue={setDateOfEventValue} />
                        </React.Suspense>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        const newEvent: Event = {
                            eventName: name,
                            dateOfEvent: dateOfEventValue,
                            type: eventTypeVal.id,
                            description: desc
                        };
                        handleSubmitAddEvent(newEvent);
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
