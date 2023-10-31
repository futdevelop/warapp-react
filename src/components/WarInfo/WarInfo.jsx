import React, { useState, useEffect } from 'react'
import useWarStatusService from "../../WarStatusService";
import statsData from "../../constants/index";
import BeatLoader from "react-spinners/BeatLoader";


const WarInfo = () => {
  const [data, setData] = useState({});
  const [dataForToday, setDataForToday] = useState({});
  const [loading, setLoading] = useState(true);

  const { getWarStatistics } = useWarStatusService();

  useEffect(() => {
		getWarStatistics()
			.then(res => {
			 	setLoading(!loading)
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
							<div className="war-info-block info-block">
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