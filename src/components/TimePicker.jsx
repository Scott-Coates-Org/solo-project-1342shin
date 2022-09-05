import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export function TimePicker(props) {

  return (
    <div style={{ margin: 20 }}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={props.label}
        value={props.value}
        onChange={(newValue) => {
          props.setTime(newValue);
          //console.log(newValue)
          //console.log(props.value)
        }}
      />
    </LocalizationProvider></div>
  );
}