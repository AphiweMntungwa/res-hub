
import * as React from 'react';
import { axiosExpressInstance } from '@/lib/axiosInstance';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { IconButton, Popper } from '@mui/material';
import { Card, CardContent, Typography, CardActions, Button, Tooltip } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface PopperComponentProps {
    open: boolean;
    handleTooltipClose: (event: Event | React.SyntheticEvent<Element, Event>) => void;
    handleClickAway: (event: MouseEvent | TouchEvent) => void;
    children: any;
}

const ProfilePopper: React.FC<PopperComponentProps> = ({ open, handleTooltipClose, handleClickAway, children }) => {

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Tooltip
                    PopperProps={{
                        disablePortal: true,
                    }}
                    arrow
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title="Add"
                >
                    {children}
                </Tooltip>
            </div>
        </ClickAwayListener>
    );
};

export default ProfilePopper;