import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { projectList } from "../../prolectList";

export const plannerSlice = createSlice({
  name: "planner",
  initialState: {
    projectList,
  },
  reducers: {
    addProject: (state, action) => {
      console.log(uuidv4());
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
