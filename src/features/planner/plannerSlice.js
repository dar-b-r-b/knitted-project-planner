import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    projectList: [
      {
        id: 0,
        name: "Baguette Jacket",
        author: "Soumine KIM",
        yarns: "Como Grande",
        deadline: "2 June",
        status: "запланировано", // запланировано, в процессе, связано
        comment: "Ut id voluptate enim do officia",
      },
    ],
  },
  reducers: {},
});
export const {} = plannerSlice.actions;
export default plannerSlice.reducer;
