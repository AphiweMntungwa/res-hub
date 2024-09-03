
import * as React from 'react';
import { axiosExpressInstance } from '@/lib/axiosInstance';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { IconButton, Popper } from '@mui/material';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface PopperComponentProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClickAway: (event: MouseEvent | TouchEvent) => void;
}

const NotificationsPopper: React.FC<PopperComponentProps> = ({ open, anchorEl, handleClickAway }) => {
    const arrowRef = React.useRef(null);

    React.useEffect(()=>{
        console.log(open)
    }, [open])
    
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
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Word of the Day
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <span
                    ref={arrowRef}
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: '8px solid transparent',
                        borderRight: '8px solid transparent',
                        borderBottom: '8px solid white', // Change the color to white
                        position: 'absolute',
                        top: '-7px', // Adjust the position for a smoother appearance
                        left: 'calc(50% - 8px)',
                        borderRadius: '2px', // Add a slight border-radius for smoother edges
                    }}
                />
            </Popper>
        </ClickAwayListener>
    );
};

export default NotificationsPopper;