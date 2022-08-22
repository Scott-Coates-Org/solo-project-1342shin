import { createSlice } from "@reduxjs/toolkit";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";

const date =new Date()


const initialState = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: Date(),
    end_time: Date(),
    canMove: true,
    canResize: true,
    canChangeGroup: false,
  },
  
];

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
  },
});

// Action creators are generated for each case reducer function
export const {  } = itemsSlice.actions;
export const selectItems = (state) => state.items

export default itemsSlice.reducer;