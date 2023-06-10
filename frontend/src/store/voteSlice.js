import { createSlice } from "@reduxjs/toolkit";

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    votes: [],
  },
  reducers: {
    addVote: (state, action) => {
      state.votes.push(action.payload);
    },
    removeVote: (state, action) => {
      const index = state.votes.findIndex((vote) => vote.id === action.payload);
      if (index !== -1) {
        state.votes.splice(index, 1);
      }
    },
  },
});

export const { addVote, removeVote } = voteSlice.actions;

export default voteSlice.reducer;