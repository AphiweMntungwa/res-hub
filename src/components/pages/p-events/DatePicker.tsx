import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface DatePickerProps {
  dateOfEventValue: Dayjs | null;
  setDateOfEventValue: (value: Dayjs | null) => void;
}

const ControlledComponent: React.FC<DatePickerProps> = ({ setDateOfEventValue, dateOfEventValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker disablePast value={dateOfEventValue} onChange={(newValue) => setDateOfEventValue(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default ControlledComponent;