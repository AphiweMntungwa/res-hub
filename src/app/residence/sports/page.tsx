import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export default function SportsPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sports
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome to the Sports page. Here you will find information about residence sports activities, teams, and schedules.
                </Typography>
                <Box sx={{ mt: 4, height: 200, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Sports content coming soon...
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
