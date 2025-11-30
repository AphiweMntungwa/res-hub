
import * as React from 'react';
import { IconButton, Popper } from '@mui/material';
import { Card, CardContent, Typography, CardActions, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface MessageNotification {
    name: string;
    count: number;
    message: string;
}

interface PopperComponentProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClickAway: (event: MouseEvent | TouchEvent) => void;
    notifications: MessageNotification[];
}

const NotificationsPopper: React.FC<PopperComponentProps> = ({ open, anchorEl, handleClickAway, notifications }) => {
    const arrowRef = React.useRef(null);

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom"
                disablePortal={true}
                modifiers={[
                    {
                        name: 'flip',
                        enabled: true,
                        options: {
                            altBoundary: true,
                            rootBoundary: 'document',
                            padding: 8,
                        },
                    },
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: true,
                            tether: true,
                            rootBoundary: 'viewport',
                            padding: 8,
                        },
                    },
                    {
                        name: 'arrow',
                        enabled: true,
                        options: {
                            element: arrowRef.current,
                        },
                    },
                ]}
            >
                <Card sx={{ minWidth: 300, maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                            Notifications
                        </Typography>
                        <Divider />
                        {notifications && notifications.length > 0 ? (
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {notifications.map((notif, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={notif.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {notif.message}
                                                        </Typography>
                                                        {notif.count > 1 && ` (${notif.count})`}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        ) : (
                            <Typography sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
                                No new notifications
                            </Typography>
                        )}
                    </CardContent>
                </Card>
                <span
                    ref={arrowRef}
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white',
                        position: 'absolute',
                        top: '-7px',
                        left: 'calc(50% - 8px)',
                        borderRadius: '2px',
                    }}
                />
            </Popper>
        </ClickAwayListener>
    );
};

export default NotificationsPopper;