import statsData from '../../constants/index';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import WarInfo from '../../components/WarInfo';
import { apiSlice } from '../../store/selectors';

const WarInfoContainer = () => {
	const { stats, statsForToday } = useSelector(apiSlice);
	const { t } = useTranslation();

	return (
		<WarInfo
			statsData={statsData}
			stats={stats}
			statsForToday={statsForToday}
			t={t}
		/>
	);
};

export default WarInfoContainer;
