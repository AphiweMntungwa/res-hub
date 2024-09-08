import React, { forwardRef } from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

interface TimePickerProps {
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
    label: string;
}

const CustomTimePicker = forwardRef<HTMLInputElement, TimePickerProps>(function CustomTimePicker(
    { value, onChange, label, ...props },
    ref
) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                {...props}
                ref={ref} // Forward the ref here
                value={value}
                onChange={onChange}
                components={{
                    TextField: (params: any) => <TextField {...params} label={label} />
                }}
            />
        </LocalizationProvider>
    );
});

export default CustomTimePicker;
