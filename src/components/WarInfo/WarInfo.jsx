import React, { useState, useEffect } from 'react'
import statsData from "../../constants/index";
import { useTranslation } from 'react-i18next';
import { fetchWarStats } from "./warInfoSlice";
import { useDispatch, useSelector } from "react-redux";

import './warinfo.scss';

const WarInfo = () => {
	// const data = useSelector(state => state.warInfo.dataStats);
   const data = useSelector(state => {
		window.localStorage.setItem('data', JSON.stringify(state.warInfo.dataStats));
		if(window.localStorage.getItem('data')) {
			return JSON.parse(window.localStorage.getItem('data'));
		} else {
			window.localStorage.setItem('data', JSON.stringify(state.warInfo.dataStats));
			return state.warInfo.dataStats;
		}
	});
	
		const dataLoaded = useSelector(state => state.warInfo.dataLoaded);
  		const dataForToday = useSelector(state => state.warInfo.dataForToday);

  const { t } = useTranslation();
  const dispatch = useDispatch(); 

  useEffect(() => {
	!dataLoaded &&	dispatch(fetchWarStats());
  }, [])	

		return (
			<div className="war-info">
				{statsData.map((statData, index) => {
					const keys = Object.keys(data);
					return (
						<div key={index} className="war-info__block war-block">
							<img className='war-block__img' src={statData.img} alt="image" />
							<div className='war-block__content'>
								<p className="war-block__content-num">
									{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}
								</p>
								<p className="war-block__content-name">
									{t(`${statData.name}`)}
								</p>
							</div>
					</div>
					)
				})}
			</div>		
		)
	}

export default WarInfo;