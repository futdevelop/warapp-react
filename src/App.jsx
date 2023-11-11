import React, { useEffect, useState } from 'react';

import WarInfo from "./components/warInfo/WarInfo";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';
import Language from './components/LanguageComp/Language';
import Modal from './components/modal/Modal';

const App = () => {
  const [userValue, setUserValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [statusLoadingWarInfo, setStatusLoadingWarInfo] = useState(true);
  const [statusLoadingHeader, setStatusLoadingHeader] = useState(true);
  const [statusLoadingFooter, setStatusLoadingFooter] = useState(false);
  const [date, setDate] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const setDateApp = date => setDate(date);

  const toggleModal = value => setIsOpenModal(value)

  useEffect(() => {
    const body = document.querySelector('body');
    body ? body.style.overflow = isOpenModal ? 'hidden' : 'auto' : null;
  }, [isOpenModal])

  return (
      <div className='app'>
        <Language isLoaded={isLoaded} />
        <Header userValue={userValue} handleHeaderLoading={handleHeaderLoading} isLoaded={isLoaded} setDateApp={setDateApp}/>
        <WarInfo userValue={userValue} handleWarInfoLoading={handleWarInfoLoading} isLoaded={isLoaded} />
        <Footer updateData={updateData} handleFooterLoading={handleFooterLoading} isLoaded={isLoaded} date={date} />
        <Modal isLoaded={isLoaded} toggleModal={toggleModal} />
      </div>
  )
}

export default App;