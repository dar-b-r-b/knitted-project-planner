import { configureStore } from "@reduxjs/toolkit";
import plannerReducer from "../features/planner/plannerSlice";
import dialogReducer from "../features/planner/dialogSlice";
export const store = configureStore({
  reducer: {
    planner: plannerReducer,
    dialog: dialogReducer,
  },
});
