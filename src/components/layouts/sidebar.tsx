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
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Avatar } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

import Link from 'next/link';
import axiosInstance from "@/lib/axiosInstance";
import { useDispatch, useSelector } from 'react-redux';
import { socket, joinPersonalRoom, leavePersonalRoom, disconnectSocket, onMessageNotification } from '@/socket';

import { RootState } from '@/lib/store';
import { addMessageNotification, clearMessageNotifications, resetNotificationCount } from '@/lib/features/messagesSlice';
import NotificationsPopper from '../pages/p-sidebar/NotificationsPopper';
import ProfilePopper from '../pages/p-sidebar/ProfilePopper';

interface UserMessageNotification {
  FirstName: string;
  ReceiverId: string;
}


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
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.messages?.notifications);
  const [open, setOpen] = React.useState(false);
  const [openNotifyPopper, setOpenNotifyPopper] = React.useState(false);
  const [openProfilePopper, setOpenProfilePopper] = React.useState(false);

  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const anchorRefProfile = React.useRef<HTMLButtonElement | null>(null);

  const handleTooltipProfileClose = (event: Event | React.SyntheticEvent<Element, Event>) => {
    setOpenProfilePopper(false);
  };

  const handleTooltipOpen = () => {
    setOpenProfilePopper(true);
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    if (anchorRefProfile.current && anchorRefProfile.current.contains(event.target as Node)) {
      return;
    }
    setOpenNotifyPopper(false)
    setOpenProfilePopper(false)

  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


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
    if (!socket.connected) {
      socket.connect();
    }

    const handleMessageNotification = (user: UserMessageNotification) => {
      console.log('here is the user', user)
      dispatch(addMessageNotification({ name: user.FirstName, count: 1 }));
    };

    onMessageNotification(handleMessageNotification);

    const handleConnect = () => {
      joinPersonalRoom();
    };

    socket.on('connect', handleConnect);

    return () => {
      socket.disconnect();
    };

  }, []);


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

  React.useEffect(() => {
    if (notifications.length) {
      setOpen(true)
    }
  }, [notifications])

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
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <span> {userInfo?.residenceName}</span>
            </Typography>

            <Typography component="span" sx={{ paddingTop: 1, display: { xs: 'block', sm: 'none' } }} gutterBottom>
              {userInfo?.fullName}
            </Typography>

            <div className='flex items-center py-2' style={{ marginLeft: 'auto' }}>
              <IconButton>
                <NotificationsActiveOutlinedIcon sx={{ color: 'white' }} />
              </IconButton>
              <IconButton>
                <MailOutlinedIcon sx={{ color: 'white' }} />
              </IconButton>
              <ProfilePopper open={openProfilePopper} handleClickAway={handleClickAway} handleTooltipClose={handleTooltipProfileClose}>
                <IconButton onClick={handleTooltipOpen}>
                  <AccountCircleOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
              </ProfilePopper>
              <Typography component="span" sx={{ paddingTop: 1.3, display: { xs: 'none', md: 'block' } }} gutterBottom>
                {userInfo?.fullName}
              </Typography>
            </div>
            <NotificationsPopper open={openNotifyPopper} handleClickAway={handleClickAway} anchorEl={anchorRef.current} />

          </Toolbar>
        </AppBar>
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={notifications.length ? notifications[0].message : "You have New Messages"}
        />
      </React.Fragment>
    </div>
  );
}
