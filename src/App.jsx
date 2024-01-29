import { useCallback, useEffect } from 'react';
import WarInfo from './containers/WarInfoContainer';
import Header from './containers/HeaderContainer';
import Footer from './containers/FooterContainer';
import { useSelector, useDispatch } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { fetchWarStats } from './store/apiSlice';
import { apiSlice } from './store/selectors';

const App = () => {
	const { dataLoaded, statusLoading } = useSelector(apiSlice);

	console.log('render');
	const dispatch = useDispatch();
	
	useEffect(() => {
		!dataLoaded && dispatch(fetchWarStats());
	}, [dataLoaded, dispatch]);

	if (statusLoading === 'idle') {
		return (
			<div className='app'>
				<Header />
				<WarInfo />
				<Footer />
			</div>
		);
	} else if (statusLoading === 'loading') {
		return (
			<div className='war-info__loading'>
				<PulseLoader
					color={'#414A4E'}
					className='loading'
					size={30}
					aria-label='Loading Spinner'
					data-testid='loader'
				/>
			</div>
		);
	} else
		return (
			<>
				<h1>Error</h1>
			</>
		);
};

export default App;
