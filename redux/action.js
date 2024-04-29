import axios from "axios";
import { serverUrl } from "./store";
import {
    addTaskFail,
    addTaskRequest,
    addTaskSuccess,
    changePasswordFail,
    changePasswordRequest,
    changePasswordSuccess,
    completeTaskFail,
    completeTaskRequest,
    completeTaskSuccess,
    deleteTaskFail,
    deleteTaskRequest,
    deleteTaskSuccess,
    forgetPasswordFail,
    forgetPasswordRequest,
    forgetPasswordSuccess,
    loadUserFail,
    loadUserRequest,
    loadUserSuccess,
    loginFail,
    loginRequest,
    loginSuccess,
    logoutFail,
    logoutRequest,
    otpVerificationFail,
    otpVerificationRequest,
    otpVerificationSuccess,
    registerFail,
    registerRequest,
    registerSuccess,
    resetPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
} from "./reducer";

// =================
// Register a user
// =================
export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch(registerRequest());
        const { data } = await axios.post(`${serverUrl}/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while update profile", error);
    }
};
// =================
// login
// =================
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await axios.post(
            `${serverUrl}/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error?.response?.data?.message || "some thing went wrong"));
        console.log("Some thing went wrong while login", error);
    }
};
// =================
// Update Profile
// =================
export const updateProfile = (formData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const { data } = await axios.put(`${serverUrl}/update-profile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch(updateProfileSuccess(data.message));
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while update profile", error);
    }
};
// =================
// Change Password
// =================
export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch(changePasswordRequest());
        const { data } = await axios.put(
            `${serverUrl}/update-password`,
            { oldPassword, newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(data);
        dispatch(changePasswordSuccess(data?.message));
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while change password", error);
    }
};
// =================
// Otp verification
// =================
export const otpVerification = (otp) => async (dispatch) => {
    try {
        dispatch(otpVerificationRequest());
        const { data } = await axios.post(
            `${serverUrl}/verify`,
            { otp },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch(otpVerificationSuccess(data?.message));
    } catch (error) {
        dispatch(otpVerificationFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while otp verification", error);
    }
};
// =================
// Forget password
// =================
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgetPasswordRequest());
        const { data } = await axios.post(
            `${serverUrl}/forget-password`,
            { email },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch(forgetPasswordSuccess(data?.message));
    } catch (error) {
        dispatch(forgetPasswordFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while forget password", error);
    }
};
// =================
// Reset password
// =================
export const resetPassword = (otp, newPassword) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest());
        const { data } = await axios.put(
            `${serverUrl}/reset-password`,
            { otp, newPassword },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch(resetPasswordSuccess(data?.message));
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while reset password", error);
    }
};
// =================
// Logout
// =================
export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutRequest());
        const { data } = await axios.get(`${serverUrl}/logout`);
        dispatch(loginSuccess(data.message));
    } catch (error) {
        dispatch(logoutFail(error?.response?.data?.message || "some thing went wrong"));
        console.log("Some thing went wrong while logout", error);
    }
};

// =================
// load user profile
// =================
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get(`${serverUrl}/me`);
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error?.response?.data?.message || "some thing went wrong"));
        console.log("Some thing went wrong while loading user", error);
    }
};

// =================
// Add Task Action
// =================

export const addTask = (title, description) => async (dispatch) => {
    try {
        dispatch(addTaskRequest());
        const { data } = await axios.post(
            `${serverUrl}/new-task`,
            { title, description },
            { headers: { "Content-Type": "application/json" } }
        );
        dispatch(addTaskSuccess(data.message));
    } catch (error) {
        dispatch(addTaskFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while adding task", error);
    }
};

// ====================
// Complete Task Action
// ====================

export const completeTask = (taskId) => async (dispatch) => {
    try {
        dispatch(completeTaskRequest());
        const { data } = await axios.get(`${serverUrl}/task/${taskId}`);
        dispatch(completeTaskSuccess(data.message));
    } catch (error) {
        dispatch(completeTaskFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while updating task", error);
    }
};

// ====================
// Complete Task Action
// ====================

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        dispatch(deleteTaskRequest());
        const { data } = await axios.delete(`${serverUrl}/task/${taskId}`);
        dispatch(deleteTaskSuccess(data.message));
    } catch (error) {
        dispatch(deleteTaskFail(error.response.data.message || "some thing went wrong"));
        console.log("Some thing went wrong while adding task", error);
    }
};
