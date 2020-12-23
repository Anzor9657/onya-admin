import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUsers = createAsyncThunk('users/getUsers', async ({ page, perPage }) => {
	const response = await axios.post('', {
		operationName: 'adminGetAllUsers',
		variables: {
			page,
			perPage
		},
		query: `
			query
				adminGetAllUsers($page: Int, $perPage: Int, $search: String) {
					adminGetAllUsers(page: $page, perPage: $perPage, filters: {search: $search}) {
						paginatorInfo { currentPage perPage total }
						data { id name last_name email avatar created_at company_name company_abn company_web_site }
					}
				}`
	});
	const {
		data: { adminGetAllUsers }
	} = await response.data;

	return adminGetAllUsers;
});

const initialState = {
	users: [],
	pagination: null
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[getUsers.fulfilled]: (state, action) => {
			state.users = action.payload.data;
			state.pagination = action.payload.paginatorInfo;
		}
	}
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
