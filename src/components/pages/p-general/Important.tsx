"use client"
import React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import TabGroup from './Tabs';

interface ImportantProps {
    // You can define any props if needed
}

const important: React.FC<ImportantProps> = (props) => {
    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item sm={12} md={12}>
                    <TabGroup />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default important;
