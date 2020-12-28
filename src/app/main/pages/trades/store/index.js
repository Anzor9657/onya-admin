import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTrades = createAsyncThunk('trades/getTrades', async () => {
	const response = await axios.post('', {
		operationName: 'adminGetAllTrades',
		variables: {},
		query: `
			query
				adminGetAllTrades {
					adminGetAllTrades{
						id
						title
					}
				}`
	});
	const {
		data: { adminGetAllTrades }
	} = await response.data;

	return adminGetAllTrades;
});

export const addTrade = createAsyncThunk('trades/addTrade', async ({ title }) => {
	const response = await axios.post('', {
		operationName: 'adminAddTrade',
		query: `
			mutation adminAddTrade($title: String!) {
  			adminAddTrade(input: {title: $title}) { id title }
		}`,
		variables: { title }
	});

	const {
		data: { adminAddTrade }
	} = await response.data;

	return adminAddTrade;
});

export const editTrade = createAsyncThunk('trades/editTrade', async data => {
	const response = await axios.post('', {
		operationName: 'adminUpdateTrade',
		variables: data,
		query: `mutation adminUpdateTrade(
							$id: Int
							$title: String!
						) {
						adminUpdateTrade(
							input: {
								id: $id
								title: $title
							}
						) {
						id
						title
					}
				}`
	});

	const {
		data: { adminUpdateTrade }
	} = await response.data;

	return adminUpdateTrade;
});

export const removeTrade = createAsyncThunk('trades/removeTrade', async ({ id }) => {
	await axios.post('', {
		operationName: 'adminRemoveTrade',
		variables: { id },
		query: `mutation adminRemoveTrade ($id: Int!) {
							adminRemoveTrade (id: $id)
						}`
	});

	return id;
});

const initialState = {
	trades: [],
	modal: { isOpen: false, type: null, trade: null },
	search: ''
};

const tradesSlice = createSlice({
	name: 'trades',
	initialState,
	reducers: {
		openDialog: (state, action) => {
			state.modal = {
				isOpen: true,
				type: action.payload.type,
				trade: action.payload.trade
			};
		},
		closeDialog: state => {
			state.modal = {
				isOpen: false
			};
		},
		setSearchText: (state, action) => {
			state.search = action.payload;
		}
	},
	extraReducers: {
		[getTrades.fulfilled]: (state, action) => {
			state.trades = action.payload || [];
		},
		[addTrade.fulfilled]: (state, action) => {
			state.trades.push(action.payload);
		},
		[editTrade.fulfilled]: (state, action) => {
			if (action.payload) {
				state.trades.forEach(trade => {
					if (trade.id === action.payload.id) {
						trade.title = action.payload.title;
					}
				});
			}
		},
		[removeTrade.fulfilled]: (state, action) => {
			state.trades = state.trades.filter(trade => trade.id !== action.payload);
		}
	}
});

export const { openDialog, closeDialog, setSearchText } = tradesSlice.actions;

export default tradesSlice.reducer;
