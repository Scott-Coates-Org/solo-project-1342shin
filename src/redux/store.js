import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import counterReducer from './counterSlice'
import groupsReducer from './groupsSlice'
import itemsReducer from './itemsSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		groups:groupsReducer,
		items:itemsReducer,

	},
})
