import WarInfo from "./containers/WarInfoContainer";
import Header from "./containers/HeaderContainer";
import Footer from './containers/FooterContainer';
import { useSelector } from 'react-redux';
import PulseLoader from "react-spinners/PulseLoader";

const App = () => {
  const loadingStatusHeader = useSelector(state => state.header.statusLoading);
  const loadingStatusWarInfo = useSelector(state => state.warInfo.statusLoading);
  console.log('render')

  if(loadingStatusWarInfo === 'idle' && loadingStatusHeader === 'idle') {
      return(
        <div className='app'>
          <Header />
          <WarInfo />
          <Footer />
        </div>
      )
  } else {
      return (
          <div className='war-info__loading'>
            <PulseLoader
              color={'#414A4E'}
              className='loading'
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"/>
          </div>
      )}
    }


export default App;