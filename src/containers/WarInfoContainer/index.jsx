import React, { useEffect } from 'react'
import statsData from "../../constants/index";
import { useTranslation } from 'react-i18next';
import { fetchWarStats } from "../../store/warInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import WarInfo from '../../components/WarInfo';
import { selectStats, statusLoading, increaseData } from '../../utils/selectors';

const WarInfoContainer = () => {
	const data = useSelector(selectStats);
	const dataLoaded = useSelector(statusLoading);
  	const dataForToday = useSelector(increaseData);

  	const { t } = useTranslation();
  	const dispatch = useDispatch(); 

  	useEffect(() => {
		!dataLoaded &&	dispatch(fetchWarStats());
  	}, [])	

		return (
			<WarInfo 
				statsData={statsData}
				data={data}
				dataForToday={dataForToday}
				t={t}
			/>
		)
	}

export default WarInfoContainer;