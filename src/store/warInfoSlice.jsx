import { createSlice } from '@reduxjs/toolkit';
import useWarStatusApi from '../hooks/useWarStatusApi.js';
import { updateData } from '../store/headerSlice.jsx';

const initialState = {
	statusLoading: 'idle',
	dataStats: {},
	dataLoaded: false,
	dataForToday: {},
}

export const fetchWarStats = () => (dispatch) => {
	const { getWarStatistics } = useWarStatusApi();
	 dispatch(dataFetching());
	 getWarStatistics()
		  .then(data => {
				dispatch(dataFetched(data))
			})
		  .catch(() => dispatch(dataFetchedError()))
}

export const fetchWarStatsByDate = (date) => (dispatch) => {
   const { getWarStatistics } = useWarStatusApi();
    dispatch(dataFetching());
    getWarStatistics(date)
        .then(data => {
			   dispatch(updateData(data))
				dispatch(dataFetched(data))
			})
        .catch(() => dispatch(dataFetchedError()))
}

const warInfoSlice = createSlice({
	name: 'warInfo',
	initialState,
	reducers: {
		dataFetching: state => {
			state.statusLoading = 'loading';
		},
		dataFetched: (state, action) => {
			state.statusLoading = 'idle';
			state.dataLoaded = true;
			state.dataStats = action.payload.stats;
			state.dataForToday = action.payload.increase;
		},
		dataFetchedError: state => {
			state.statusLoading = 'error'
		},
	},
})

const { actions, reducer } = warInfoSlice; 
export default reducer;

export const {
	dataFetching,
	dataFetched,
	dataFetchedError
} = actions;