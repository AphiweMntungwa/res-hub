"use client"
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface BusesProps {
    // You can define any props if needed
}

const Buses: React.FC<BusesProps> = (props) => {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                        <Typography variant='h6'>
                            Bus admin is user 3
                        </Typography>
                    </Alert>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                        Bus times are:
                    </Alert>
                </Grid>
                <Grid item xs={12} sm={6} md={4}><Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
                    Bus times are:
                </Alert>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Bus times are:
                    </Alert>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Buses;
