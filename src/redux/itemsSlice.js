import { createSlice } from "@reduxjs/toolkit";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";

const initialState = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: new Date(),
    end_time: addHours(new Date(), 1),
    canMove: true,
    canResize: true,
    canChangeGroup: false,
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: addHours(new Date(), 2),
    end_time: addHours(new Date(), 3),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: addHours(new Date(), 3),
    end_time: addHours(new Date(), 5),
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
