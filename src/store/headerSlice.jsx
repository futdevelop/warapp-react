import { createSlice } from '@reduxjs/toolkit';
import useWarStatusApi from '../hooks/useWarStatusApi.js';

const initialState = {
	statusLoading: 'idle',
	dataLoaded: false,
	date: 0,
	day: 0
}

export const fetchWarInfo = () => (dispatch) => {
   const { getWarInfo } = useWarStatusApi();
			dispatch(dataFetching());
			getWarInfo()
				 .then(data => dispatch(dataFetched(data)))
				 .catch(() => dispatch(dataFetchedError()))
}

const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		dataFetching: state => {
			state.statusLoading = 'loading';
		},
		dataFetched: (state, action) => {
			state.statusLoading = 'idle';
			state.day = action.payload.current_day;
			state.date = action.payload.current_date;
			state.dataLoaded = true;
		},
		dataFetchedError: state => {
			state.statusLoading = 'error'
		},
		updateData: (state, action) => {
			state.date = action.payload.date;
			state.day = action.payload.day;
		},
	},
})

const { actions, reducer } = headerSlice; 
export default reducer;

export const {
	dataFetching,
	dataFetched,
	dataFetchedError,
	updateData
} = actions;