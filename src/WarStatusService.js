import axios from 'axios'; 

const useWarStatusService = () => {
	const _API_BASE = 'https://russianwarship.rip/api/v2';

	const getWarInfo = async () => {
		const res = await axios.get(`${_API_BASE}/war-info`)
			return res;
	}
	
	const getWarStatistics = async () => {
		const res = await axios.get(`${_API_BASE}/statistics/latest`)
			return res.data.data;
	}

	return {
		getWarInfo,
		getWarStatistics
	}

}

export default useWarStatusService;