import { configureStore } from "@reduxjs/toolkit";
import { authReducer, messageReducer } from "./reducer";

export const serverUrl = "https://todo-mobile-app-server.onrender.com/api/v1";

const store = configureStore({
    reducer: {
        [authReducer.name]: authReducer.reducer,
        [messageReducer.name]: messageReducer.reducer,
    },
});

export default store;
