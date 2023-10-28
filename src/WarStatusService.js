import axios from 'axios'; 

const WarStatusService = () => {
	axios.get('https://russianwarship.rip/api/v2/statistics')
		.then(res => console.log(res.data.data.records));
}

export default WarStatusService;

