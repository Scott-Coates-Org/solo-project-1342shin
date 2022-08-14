import { TimePicker } from "./TimePicker";
import React from 'react'


export const AddItem = () => {
  const [start, setStart] = React.useState(new Date())
  const [end, setEnd] = React.useState(new Date())

    return (
      <div>
        <TimePicker label='from' value={start} setTime={setStart} />
        <TimePicker label='to' value={end} setTime={setEnd}/>
       <button>Add</button>
      </div>
    );
  };