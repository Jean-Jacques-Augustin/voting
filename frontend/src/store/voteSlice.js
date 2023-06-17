import { createSlice } from "@reduxjs/toolkit";

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    votes: [],
  },
  reducers: {
    addVote: (state, action) => {
      const existingVote = state.votes.find((vote) => vote.id === action.payload.id);
      if (!existingVote) {
        state.votes.push(action.payload);
      }
    },
    removeVote: (state, action) => {
      const index = state.votes.findIndex((vote) => vote.id === action.payload);
      if (index !== -1) {
        state.votes.splice(index, 1);
      }
    },
    selectVoteById: (state, action) => {
      return state.votes.find((vote) => vote.id === action.payload);
    }
  },
});

export const { addVote, removeVote, selectVoteById} = voteSlice.actions;

export default voteSlice.reducer;