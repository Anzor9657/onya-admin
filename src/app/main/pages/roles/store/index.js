import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRoles = createAsyncThunk('roles/getRoles', async () => {
	const response = await axios.post('', {
		operationName: 'adminGetRoles',
		variables: {},
		query: `
			query adminGetRoles {
				adminGetRoles {
					id
					name
					readable_name
					description
					permissions {
						id
						name
					}
				}
			}`
	});
	const {
		data: { adminGetRoles }
	} = await response.data;

	return adminGetRoles;
});

const initialState = {
	roles: []
};

const rolesSlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {},
	extraReducers: {
		[getRoles.fulfilled]: (state, action) => {
			state.roles = action.payload || [];
		}
	}
});

export default rolesSlice.reducer;
