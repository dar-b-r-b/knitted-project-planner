import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    projectList: [
      {
        id: "ib045hg70",
        name: "Baguette Jacket",
        author: "Soumine KIM",
        yarns: "Como Grande",
        deadline: "2 June",
        status: "запланировано", // запланировано, в процессе, связано
        comment: "Ut id voluptate enim do officia",
      },
      {
        id: "ib645hg76",
        name: "Drift Jacket",
        author: "Row",
        yarns: "Como Grande",
        deadline: "2 June",
        status: "запланировано", // запланировано, в процессе, связано
        comment: "Ut id voluptate enim do officia",
      },
      {
        id: "ib045hg76",
        name: "Sailor Collar Pullover",
        author: "Soumine KIM",
        yarns: "Como Grande",
        deadline: "2 June",
        status: "в процессе", // запланировано, в процессе, связано
        comment: "Ut id voluptate enim do officia",
      },
    ],
  },
  reducers: {
    addProject: (state, action) => {
      state.projectList.push({ ...action.payload, id: uuidv4() });
    },
    deleteProject: (state, action) => {
      state.projectList.splice(
        state.projectList.findIndex((p) => p.id === action.payload),
        1
      );
    },
    editProject: (state, action) => {
      const { id, project } = action.payload;
      const projectIndex = state.projectList.findIndex((p) => p.id === id);
      if (projectIndex !== -1) {
        state.projectList[projectIndex] = project;
      }
    },
  },
});
export const { addProject, deleteProject, editProject } = plannerSlice.actions;
export default plannerSlice.reducer;
