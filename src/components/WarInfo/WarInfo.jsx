import React, { useState, useEffect } from 'react'
import useWarStatusService from "../../Service/WarStatusService";
import statsData from "../../constants/index";
import PulseLoader from "react-spinners/PulseLoader";
import { useTranslation } from 'react-i18next';

const WarInfo = ({ userValue, isLoaded, handleWarInfoLoading, setDataForTodayApp }) => {
  const [data, setData] = useState({});
  const [dataForToday, setDataForToday] = useState({});
  const [loading, setLoading] = useState(true);
  const [valueDate, setValueDate] = useState('');

  const { getWarStatistics } = useWarStatusService();
  const { t } = useTranslation();


	useEffect(() => {
		dataForToday && setDataForTodayApp(dataForToday);
	}, [dataForToday])

	useEffect(() => {
		setValueDate(userValue);
	}, [userValue])

    useEffect(() => {
		if(loading == false) {
			handleWarInfoLoading(loading)
		}}, [loading])

		useEffect(() => {
			if(valueDate !== undefined) {
				if(valueDate[4] == '-' && valueDate[7] == '-') {
				setLoading(true);
					getWarStatistics(valueDate)
						.then(res => {
							setLoading(false)
							window.localStorage.setItem('data', JSON.stringify(res.stats));
							if(window.localStorage.getItem('data') !== res.stats) {
								const ressult = window.localStorage.getItem('data');
								setData(JSON.parse(ressult));
								window.localStorage.setItem('data', JSON.stringify(res.stats));
							} else {
								setData(res.stats);
							}
							setDataForToday(res.increase);
						})
						.catch((e) => {
							console.log(e)
							setLoading(false)
						})
				}
			}
		}, [valueDate])

  useEffect(() => {
		getWarStatistics()
			.then(res => {
			 	setLoading(false)
				if(window.localStorage.getItem('data')) {
					const ressult = window.localStorage.getItem('data');
					setData(JSON.parse(ressult));
				} else {
 					window.localStorage.setItem('data', JSON.stringify(res.stats));
					setData(res.stats);
				}
				setDataForToday(res.increase);
			});
  }, [])	

		if(isLoaded) {
		return (
			<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center bg-[inherit] pb-[40px]">
				{statsData.map((statData, index) => {
					const keys = Object.keys(data);
					return (
						<div key={index} className="war-info-block sm:pl-[10px] pl-[10%] select-none bg-[inherit] border-b-[1px] border-r-[1px] border-black flex items-center sm:justify-start justify-start h-[130px]">
							<img className='2xl:w-[100px] xl:w-[90px] lg:w-[85px] w-[100px] 2xl:mr-[30px] xl:mr-[20px] md:mr-[20px] mr-[30px]' src={statData.img} alt="" />
						<div>
							<p className="font-bold 2xl:text-[26px] xl:text-[24px] lg:text-[22px] md:text-[20px] text-[18px] m-0 text-[#414a4e]">{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}</p>
						<p className="font-normal 2xl:text-[22px] xl:text-[20px] text-[18px] m-0 text-[#71797E]">
							{t(`${statData.name}`)}
							</p>
						</div>
					</div>
					)
				})}
			</div>		
        )} else {
			return (
				<div className='flex justify-center items-center w-[100%] h-[700px]'>
					<PulseLoader
						color={'#414A4E'}
						loading={loading}
						className='loading'
						size={30}
						aria-label="Loading Spinner"
						data-testid="loader"/>
				</div>
			)
				}
	}

export default WarInfo;