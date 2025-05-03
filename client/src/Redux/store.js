import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slices/sideBarSlice";
import authReducer from './Slices/authSlice'

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth:authReducer
  },
});

export default store;
