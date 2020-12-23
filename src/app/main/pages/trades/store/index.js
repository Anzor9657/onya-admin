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

const initialState = {
	trades: []
};

const tradesSlice = createSlice({
	name: 'trades',
	initialState,
	reducers: {},
	extraReducers: {
		[getTrades.fulfilled]: (state, action) => {
			state.trades = action.payload;
		}
	}
});

// export const {} = usersSlice.actions;

export default tradesSlice.reducer;
