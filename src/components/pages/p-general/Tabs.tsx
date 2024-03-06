import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabGroupProps {
    // You can define any props if needed
}

const TabGroup: React.FC<TabGroupProps> = (props) => {
    const [value, setValue] = React.useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                <Tab value="posts" label="Posts" />
                <Tab value="buses" label="Buses" />
                <Tab value="l&f" label="Lost & Found" />
                <Tab value="events" label="Events" />
            </Tabs>
        </Box>
    );
};

export default TabGroup;
