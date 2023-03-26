import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode"

const API_URL = "http://localhost:10000/api";

const initialState = {
    token: localStorage.getItem("token"),
    name: '',
    email: '',
    address: '',
    cnp: '',
    _id: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false
}

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const token = await axios.post("http://localhost:10000/api/register", {
                name: user.name,
                email: user.email,
                password: user.password,
                address: user.address,
                cnp: user.cnp,
                _id: user.id
            });

            localStorage.setItem("token", token.data);
            return token.data;

        } catch (err) {
            console.log("User already exists!");
            return rejectWithValue(err.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${API_URL}/login`, {
                email: user.email,
                password: user.password,
            });

            localStorage.setItem("token", token.data);
            return token.data;
        } catch (err) {
            console.log("Invalid email or password!");
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadUser(state, action) {
            const token = state.token;

            if (token) {
                const user = jwtDecode(token);

                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    cnp: user.cnp,
                    _id: user.id,
                    userLoaded: true
                };
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem("token");

            return {
                ...state,
                token: '',
                name: '',
                email: '',
                address: '',
                cnp: '',
                _id: '',
                registerStatus: '',
                registerError: '',
                loginStatus: '',
                loginError: '',
                userLoaded: false
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            return { ...state, registerStatus: "pending" };
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwt_decode(action.payload);

                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    cnp: user.cnp,
                    _id: user._id,
                    registerStatus: "success",
                };
            }
            else return state;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            };
        });

        //* PENDING!!

        builder.addCase(loginUser.pending, (state) => {
            return { ...state, loginStatus: "pending" };
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwt_decode(action.payload);

                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    cnp: user.cnp,
                    _id: user._id,
                    loginStatus: "success",
                };
            }
            else return state;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload
            };
        });
    }
});

export default authSlice.reducer;
export const { loadUser, logoutUser } = authSlice.actions;