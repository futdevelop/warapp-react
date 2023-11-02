import React, { useState, useEffect } from 'react'
import useWarStatusService from "../../WarStatusService";
import statsData from "../../constants/index";
import PulseLoader from "react-spinners/PulseLoader";

const WarInfo = ({ userValue, isLoaded, handleWarInfoLoading }) => {
  const [data, setData] = useState({});
  const [dataForToday, setDataForToday] = useState({});
  const [loading, setLoading] = useState(true);
  const [valueDate, setValueDate] = useState('');

  const { getWarStatistics } = useWarStatusService();

	useEffect(() => {
		setValueDate(userValue);
	}, [userValue])

    useEffect(() => {
		if(loading == false) {
			handleWarInfoLoading(loading);
		}
    }, [loading])

		useEffect(() => {
			if(valueDate !== undefined) {
				if(valueDate[4] == '-' && valueDate[7] == '-') {
				setLoading(true);
					getWarStatistics(valueDate)
						.then(res => {
							setLoading(false)
							setData(res.stats);
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
				setData(res.stats);
				setDataForToday(res.increase);
			});
  }, [])	

		if(isLoaded) {
		return (
			<div className="flex justify-center items-center flex-wrap bg-[inherit] pb-[40px]">
				{statsData.map((statData, index) => {
					const keys = Object.keys(data);
					return (
						<div key={index} className="war-info-block select-none w-[32%] bg-[inherit] border-b-[1px] border-r-[1px] border-black flex items-center justify-start pl-[10px] h-[130px]">
						<img className='w-[100px] mr-[30px]' src={statData.img} alt="" />
						<div>
							<p className="font-bold text-[26px] m-0 text-[#414a4e] ">{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}</p>
						<p className="font-normal text-[22px] m-0 text-[#71797E]">{statData.name}</p>
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