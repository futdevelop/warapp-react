import React, { useEffect, useState } from 'react'

import WarInfo from "./components/warInfo/WarInfo";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Language from './components/LanguageComp/Language';

const App = () => {
  const [userValue, setUserValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusLoadingWarInfo, setStatusLoadingWarInfo] = useState(true);
  const [statusLoadingHeader, setStatusLoadingHeader] = useState(true);
  const [statusLoadingFooter, setStatusLoadingFooter] = useState(false);
  const [date, setDate] = useState();

  const updateData = value => setUserValue(value);

  const handleWarInfoLoading = value => {
      setStatusLoadingWarInfo(value)
      setStatusLoadingFooter(false);
  };

  const handleHeaderLoading = value => setStatusLoadingHeader(value);

  const handleFooterLoading = value => setStatusLoadingFooter(value);

  useEffect(() => {
      if(!statusLoadingWarInfo && !statusLoadingHeader && !statusLoadingFooter) {
          setIsLoaded(true);
      }
      if(statusLoadingFooter) {
        setIsLoaded(false)
      }
  }, [statusLoadingWarInfo, statusLoadingHeader, statusLoadingFooter]);

  const setDateApp = (date) => {
    setDate(date);
  }

  return (
      <div className="app">
        <Language isLoaded={isLoaded} />
        <Header userValue={userValue} handleHeaderLoading={handleHeaderLoading} isLoaded={isLoaded} setDateApp={setDateApp}/>
        <WarInfo userValue={userValue} handleWarInfoLoading={handleWarInfoLoading} isLoaded={isLoaded} />
        <Footer updateData={updateData} handleFooterLoading={handleFooterLoading} isLoaded={isLoaded} date={date} />
      </div>
  )
}

export default App;