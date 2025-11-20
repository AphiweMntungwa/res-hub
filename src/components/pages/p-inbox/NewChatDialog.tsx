import * as React from 'react';
import {
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Slide
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({ open, onClose }: FormDialogProps) {
    const [residenceUsers, setResidenceUsers] = React.useState<ChatUser[]>([]);

    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosExpressInstance.get('/residence-users');
                setResidenceUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (open) {
            fetchUsers();
        }
    }, [open]);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                Start a New Chat
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{ position: 'absolute', right: 16, top: 16 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    These are all the users in your residence, start a new chat.
                </DialogContentText>
                <List>
                    {residenceUsers.map(user => (
                        <ListItem key={user.Id} onClick={() => window.location.href = `/residence/inbox/${user.Id}`}>
                            <IconButton>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </IconButton>
                            <ListItemText
                                primary={`${user.FirstName} ${user.LastName}`}
                                secondary="Jan 9, 2014"
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}
