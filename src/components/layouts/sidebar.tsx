'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axiosInstance from "@/lib/axiosInstance";

interface UserInfo {
  email: string;
  id: string;
  residenceId: number;
  residenceName: string;
  userName: string;
  fullName: string;
}

export default function TemporaryDrawer() {
  const [userInfo, setUserInfo] = React.useState<UserInfo>();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, left: open });
      };



  React.useEffect(() => {
    console.log("this is how persisstent it is:")
    async function execute() {

      async function fetchMe(): Promise<any> {
        try {
          const response = await axiosInstance.get(`/StudentResident/Me`);
          return response.data;
        } catch (error) {
          return error;
        }
      }

      const response = await fetchMe();
      setUserInfo(response);
      sessionStorage.setItem('userInfo', JSON.stringify(response));
    }
    execute()

  }, [])

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['General', 'Inbox', 'Buses', 'Events', 'Sports'].map((text, index) => (
          <Link key={text} href={`/residence/${text.toLowerCase()}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <Badge badgeContent={4} color="primary"><MailIcon /></Badge>}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Businesses', 'Roles', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <AppBar component="nav">
          <Toolbar>
            <IconButton onClick={toggleDrawer(true)} color="inherit"
              aria-label="open drawer">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={48} d="M88 152h336M88 256h336M88 360h336"></path></svg>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { sm: 'block' } }}
            >
              <span> {userInfo?.residenceName}</span>
            </Typography>
            <div className='flex flex-col py-2'>
              <Typography component="span">
                {userInfo?.email}
              </Typography>

              <Typography component="span" gutterBottom>
                {userInfo?.fullName}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
