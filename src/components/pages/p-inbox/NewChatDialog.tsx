import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { axiosExpressInstance } from '@/lib/axiosInstance';

interface FormDialogProps {
    open: boolean;
    onClose: () => void;
}

interface ChatUser {
    FirstName: string;
    Id: string;
    LastName: string;
    ResidenceId: number;
    RoomNumber: number;
    StudentNumber: string;
}


export default function FormDialog({ open, onClose }: FormDialogProps) {
    const [residenceUsers, setResidenceUsers] = React.useState<ChatUser[]>([]);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosExpressInstance.get('/residence-users');
                setResidenceUsers(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();

    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Start a New Chat</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    These are all the users in your residence, start a new chat.
                </DialogContentText>
                <List>
                    {residenceUsers.map(user => {
                        return (
                            <ListItem key={user.Id}>
                                <IconButton>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </IconButton>
                                <ListItemText onClick={() => window.location.href = `/residence/inbox/${user.Id}`} primary={user.FirstName + " " + user.LastName} secondary="Jan 9, 2014" />
                            </ListItem>
                        )
                    })}
                </List>
            </DialogContent>
        </Dialog>
    );
}
