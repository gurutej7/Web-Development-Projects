import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
	cartItems: cartItems,
	amount: 1,
	total: 0,
	isLoading: true,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			state.cartItems = [];

			// what ever we are returning in the resucers this will become the entire value of the initialState
			// return {};
		},

		removeItem: (state, action) => {
			// console.log(action);
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => itemId !== item.id);
		},

		increase: (state, { payload }) => {
			// console.log(payload);
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount + 1;
		},

		decrease: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},

		calculateTotals: (state) => {
			let amount = 0,
				total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount; // no. of items of this type
				total += item.amount * item.price;
			});

			state.amount = amount;
			state.total = total;
		},
	},
});

// console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
	cartSlice.actions;

export default cartSlice.reducer;
