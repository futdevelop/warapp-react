import React, { useEffect, useState } from 'react'

import WarInfo from "./components/warInfo/WarInfo";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';

const App = () => {
  const [userValue, setUserValue] = useState();
  const [isLoaded, setIsLoaded] = useState(true);

  const updateData = value => setUserValue(value);

  const handleLoading = value => setIsLoaded(value);

  return (
      <div className="app">
            <Header userValue={userValue} loading={isLoaded}/>
            <WarInfo userValue={userValue} handleLoading={handleLoading} />
            <Footer updateData={updateData} loading={isLoaded}/>
      </div>
  )
}

export default App;