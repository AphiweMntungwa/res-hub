import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
            }}
        >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading...
            </Typography>
        </Box>
    );
}
