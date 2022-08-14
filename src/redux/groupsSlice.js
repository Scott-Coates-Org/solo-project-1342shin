import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "group 1 title",
  },
  { id: 2, title: "me" },
];

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
   
  },
});

// Action creators are generated for each case reducer function
export const {  } = groupsSlice.actions;
export const selectGroups = (state) => state.groups

export default groupsSlice.reducer;
