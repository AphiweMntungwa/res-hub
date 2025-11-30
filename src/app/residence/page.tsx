'use client'

import React from 'react';
import { Grid, Paper, Typography, Box, Button, Card, CardContent, CardActions } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EventIcon from '@mui/icons-material/Event';
import QuickreplyIcon from '@mui/icons-material/Quickreply';

export default function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="div">
        Residence Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="h5" gutterBottom>
              Welcome back!
            </Typography>
            <Typography variant="body1">
              Here is what's happening in your residence today.
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Announcements */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AnnouncementIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Recent Announcements
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                - Water maintenance scheduled for tomorrow at 10 AM.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                - Community meeting this Friday in the common room.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View All</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Upcoming Events
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                - Movie Night: Saturday, 8 PM
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                - Study Group: Wednesday, 6 PM
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Calendar</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <QuickreplyIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Quick Actions
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="outlined">Report Issue</Button>
              <Button variant="outlined">Book Facility</Button>
              <Button variant="outlined">Contact Admin</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
