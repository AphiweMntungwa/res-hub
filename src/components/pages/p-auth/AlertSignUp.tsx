import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    isOpen: boolean;
    resId: string;
}

export default function AlertSignUp({ isOpen, resId }: AlertDialogProps) {
    const handleProceed = () => {
        // Redirect with a full-page refresh
        window.location.href = `/residence?resId=${resId}`; // Replace with your desired path
    };

    return (
        <Dialog
            open={isOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"You are Successfully Registered"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Proceed To the Reshub system?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleProceed} autoFocus>
                    Proceed
                </Button>
            </DialogActions>
        </Dialog>
    );
}
