import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: '',
	email: '',
	accessToken: '',
	isLogged:false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload.displayName
			state.email = action.payload.email
			state.accessToken = action.payload.accessToken
		},
		logout: (state) => {
			console.log(`${state.user} logged out`)
			state.user = ''
			state.email = ''
			state.accessToken = ''

		},
	},
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer

export const selectAuth = (state) => state.auth
