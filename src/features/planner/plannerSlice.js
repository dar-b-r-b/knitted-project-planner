import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    projectList: [
      {
        id: "ib645hg76",
        name: "Baguette Jacket",
        author: "Soumine KIM",
        yarns: "Como Grande",
        deadline: "2 June",
        status: "запланировано", // запланировано, в процессе, связано
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
      console.log(action.payload);
      const projectIndex = state.projectList.findIndex((p) => p.id === id);
      if (projectIndex !== -1) {
        state.projectList[projectIndex] = project;
      }
    },

    //filterProjects: (state,action) => { }
  },
});
export const { addProject, deleteProject, editProject } = plannerSlice.actions;
export default plannerSlice.reducer;
