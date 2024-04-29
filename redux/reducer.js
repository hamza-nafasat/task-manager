import { createSlice } from "@reduxjs/toolkit";

// =============================================
// user auth reducers
// =============================================
export const authReducer = createSlice({
    name: "authReducer",
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
        message: null,
    },
    reducers: {
        // ==========================
        // user login actions
        // ==========================
        registerRequest: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        registerFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        // ==========================
        // user login actions
        // ==========================
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        // ==========================
        // load user actions
        // ==========================
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        // ---------------------------
        // Update profile
        // ---------------------------
        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ---------------------------
        // Change password
        // ---------------------------
        changePasswordRequest: (state) => {
            state.loading = true;
        },
        changePasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        changePasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ---------------------------
        // Change password
        // ---------------------------
        otpVerificationRequest: (state) => {
            state.loading = true;
        },
        otpVerificationSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        otpVerificationFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ---------------------------
        // Logout user
        // ---------------------------
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // =============================
        // clear message and clear error
        // =============================
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
});
export const {
    loginRequest,
    loginSuccess,
    loginFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    clearError,
    clearMessage,
    logoutFail,
    logoutRequest,
    logoutSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    changePasswordFail,
    changePasswordRequest,
    changePasswordSuccess,
    registerFail,
    registerRequest,
    registerSuccess,
    otpVerificationFail,
    otpVerificationRequest,
    otpVerificationSuccess,
} = authReducer.actions;

// =============================================
// Task messages reducers
// =============================================

export const messageReducer = createSlice({
    name: "messageReducer",
    initialState: {
        loading: false,
        message: null,
        error: null,
    },
    reducers: {
        // ----------------------------
        // add task
        // ----------------------------
        addTaskRequest: (state) => {
            state.loading = true;
        },
        addTaskSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        addTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ----------------------------
        // update task
        // ----------------------------
        completeTaskRequest: (state) => {
            state.loading = true;
        },
        completeTaskSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        completeTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ----------------------------
        // delete task
        // ----------------------------
        deleteTaskRequest: (state) => {
            state.loading = true;
        },
        deleteTaskSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        deleteTaskFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ---------------------------
        // Forget password
        // ---------------------------
        forgetPasswordRequest: (state) => {
            state.loading = true;
        },
        forgetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        forgetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ---------------------------
        // Reset password
        // ---------------------------
        resetPasswordRequest: (state) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ----------------------------
        // clear message and clear error
        // ----------------------------
        clearTaskError: (state) => {
            state.error = null;
        },
        clearTaskMessage: (state) => {
            state.message = null;
        },
    },
});

export const {
    addTaskRequest,
    addTaskSuccess,
    addTaskFail,
    completeTaskFail,
    completeTaskRequest,
    completeTaskSuccess,
    deleteTaskFail,
    deleteTaskRequest,
    deleteTaskSuccess,
    clearTaskError,
    clearTaskMessage,
    forgetPasswordFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
} = messageReducer.actions;
