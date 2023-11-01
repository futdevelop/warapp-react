import React, { useState, useEffect } from 'react'
import useWarStatusService from "../../WarStatusService";
import statsData from "../../constants/index";
import BeatLoader from "react-spinners/BeatLoader";


const WarInfo = ({ userValue, handleLoading }) => {
  const [data, setData] = useState({});
  const [dataForToday, setDataForToday] = useState({});
  const [loading, setLoading] = useState(true);
  const [valueDate, setValueDate] = useState('');

  const { getWarStatistics } = useWarStatusService();

	useEffect(() => {
		setValueDate(userValue);
	}, [userValue])

    useEffect(() => {
      handleLoading(loading)
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

		if(loading) {
		return (
			<div className='loading-war-info'>
			<BeatLoader
				color={'#414A4E'}
				loading={loading}
				className='loading'
				size={40}
				aria-label="Loading Spinner"
				data-testid="loader"/>
			</div>
        )} else {
			return (
				<div className="war-info">
					{statsData.map((statData, index) => {
						const keys = Object.keys(data);
						return (
							<div key={index} className="war-info-block info-block">
							<img className='info-block-icon' src={statData.img} alt="" />
							<div>
								<p className="info-block-stat">{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}</p>
							<p className="info-block-name">{statData.name}</p>
							</div>
						</div>
						)
					})}
				</div>				
			)
				}
	}

export default WarInfo;