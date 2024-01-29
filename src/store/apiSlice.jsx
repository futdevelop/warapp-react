import { createSlice } from '@reduxjs/toolkit'
import useWarStatusApi from '../hooks/useWarStatusApi.js'

const initialState = {
  statusLoading: 'idle',
  dataLoaded: false,
  date: 0,
  day: 0,
  stats: {},
  statsForToday: {},
}

export const fetchWarStats = data => dispatch => {
  const { getWarStatistics } = useWarStatusApi()
  dispatch(dataFetching())
  getWarStatistics(data ? data : null)
    .then(data => dispatch(dataFetched(data)))
    .catch(() => dispatch(dataFetchedError()))
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    dataFetching: state => {
      state.statusLoading = 'loading'
    },
    dataFetched: (state, action) => {
      state.statusLoading = 'idle'
      state.day = action.payload.day
      state.date = action.payload.date
      state.stats = action.payload.stats
      state.statsForToday = action.payload.increase
      state.dataLoaded = true
    },
    dataFetchedError: state => {
      state.statusLoading = 'error'
    },
  },
})

const { actions, reducer } = apiSlice
export default reducer

export const { dataFetching, dataFetched, dataFetchedError } = actions
