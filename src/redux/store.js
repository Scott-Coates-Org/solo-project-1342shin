import { configureStore } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import groupsReducer from './groupsSlice'
import itemsReducer from './itemsSlice'

export const store = configureStore({
	reducer: {
		
		auth: authReducer,
		groups:groupsReducer,
		items:itemsReducer,

	},
})
