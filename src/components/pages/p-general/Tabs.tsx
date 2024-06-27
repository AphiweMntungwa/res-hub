import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabGroupProps {
    // You can define any props if needed
}

const TabGroup: React.FC<TabGroupProps> = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Posts" />
                <Tab label="Buses" />
                <Tab label="Lost & Found" />
                <Tab  label="Events" />
            </Tabs>
        </Box>
    );
};

export default TabGroup;
