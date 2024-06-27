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

interface Props {
    open: boolean;
    handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DatePicker = React.lazy(() => import('@/components/pages/p-events/DatePicker'));

const typeOptions = [
    { label: 'Sports', id: 0 },
    { label: 'Recreation', id: 1 },
    { label: 'Formal', id: 2 },
    { label: 'Religious', id: 3 }
]

export const AlertDialogSlideAddEvent: React.FC<Props> = ({ open, handleClose }) => {
    const [name, setName] = React.useState('');


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
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
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
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <DatePicker />
                    </React.Suspense>
                </Box>

                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
