import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        num_vote: "",
        token: "",
        votes: [],
        isLogged: false,
        role: "",
        email: "",
        isVerified: false,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setNumVote: (state, action) => {
            state.num_vote = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setVotes: (state, action) => {
            state.votes = action.payload;
        },
        setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },

        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setVerified: (state, action) => {
            state.isVerified = action.payload;
        }

    },
});

export const {
    setUsername,
    setNumVote,
    setToken,
    setVotes,
    setIsLogged,
    setRole,
    setEmail,
    setVerified
} = userSlice.actions;

export default userSlice.reducer;