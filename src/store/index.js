import { configureStore } from '@reduxjs/toolkit';
import header from './headerSlice';
import warInfo from './warInfoSlice';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from '../utils/localStorageUtils';

const stringMiddleware = store => next => action => {
		if(typeof action === 'string') {
			return next({
				type: action
			})
		} 
		return next(action)
}

const store = configureStore({
	reducer: { header, warInfo },
	preloadedState: loadStateFromLocalStorage(),
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV != 'production'
})

store.subscribe(() => saveStateToLocalStorage(store.getState()));

export default store;