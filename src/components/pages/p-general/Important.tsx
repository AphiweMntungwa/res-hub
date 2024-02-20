"use client"
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';

interface ImportantProps {
    // You can define any props if needed
}

const important: React.FC<ImportantProps> = (props) => {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
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

export default important;
