import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

export default function SettingsPage() {
    return (
        <Box sx={{ p: 3 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your account settings and preferences here.
                </Typography>
                <Box sx={{ mt: 4, height: 200, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Settings content coming soon...
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
