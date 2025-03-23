import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	counter: 0,
	showCounter: true,
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		inc(state, action) {
			state.counter += action.payload;
		},
		dec(state, action) {
			state.counter -= action.payload;
		},
		toggle(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

// the better pattern is to NOT destructure counterActions immediately
// since there will be code suggestion prompt us the actions in counter
// when we type `counterActions.`
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
