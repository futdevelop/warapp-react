import React, { useEffect } from 'react'
import statsData from "../../constants/index";
import { useTranslation } from 'react-i18next';
import { fetchWarStats } from "./warInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import DumbWarInfo from '../../components/DumbWarInfo/DumbWarInfo';

import './warinfo.scss';

const WarInfo = () => {
	const data = useSelector(state => state.warInfo.dataStats);
	const dataLoaded = useSelector(state => state.warInfo.dataLoaded);
  	const dataForToday = useSelector(state => state.warInfo.dataForToday);

  	const { t } = useTranslation();
  	const dispatch = useDispatch(); 

  	useEffect(() => {
		!dataLoaded &&	dispatch(fetchWarStats());
  	}, [])	

		return (
			<DumbWarInfo 
				statsData={statsData}
				data={data}
				dataForToday={dataForToday}
				t={t}
			/>
		)
	}

export default WarInfo;