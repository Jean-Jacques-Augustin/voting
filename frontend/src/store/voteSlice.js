import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	votes: {},
};

const voteSlice = createSlice({
	name: "vote",
	initialState,
	reducers: {
		addVote: (state, action) => {
			const candidateId = action.payload;
			state.votes[candidateId] = (state.votes[candidateId] || 0) + 1;
		},
		removeVote: (state, action) => {
			const candidateId = action.payload;
			if (state.votes[candidateId]) {
				state.votes[candidateId] -= 1;
				if (state.votes[candidateId] === 0) {
					delete state.votes[candidateId];
				}
			}
		},
	},
});

export const { addVote, removeVote } = voteSlice.actions;
export default voteSlice.reducer;
