import { configureStore } from '@reduxjs/toolkit';
import header from '../components/Header/headerSlice';
import warInfo from '../components/warInfo/warInfoSlice';

const stringMiddleware = store => next => action => {
		if(typeof action === 'string') {
			return next({
				type: action
			})
		} 
		return next(action)
}

const saveToLocalStorage = state => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = configureStore({
	reducer: {header, warInfo},
	preloadedState: loadFromLocalStorage(),
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV != 'production'
})

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;