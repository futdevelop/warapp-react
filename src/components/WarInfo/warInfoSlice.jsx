import { createSlice } from '@reduxjs/toolkit';
import warStatusService from '../../Service/WarStatusService';
import { updateData } from '../Header/headerSlice';

const initialState = {
	statusLoading: 'idle',
	dataStats: {},
	dataLoaded: false,
	dataForToday: {},
}

// Початкова загрузка данних по втратам
export const fetchWarStats = () => (dispatch) => {
	const { getWarStatistics } = warStatusService();
	 dispatch(dataFetching());
	 getWarStatistics()
		  .then(data => {
				dispatch(dataFetched(data))
			})
		  .catch(() => dispatch(dataFetchedError()))
}

// Загрузка даних по втратам по даті
export const fetchWarStatsByDate = (date) => (dispatch) => {
   const { getWarStatistics } = warStatusService();
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