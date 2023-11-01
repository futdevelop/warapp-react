import React, { useEffect, useState } from 'react'

import WarInfo from "./components/warInfo/WarInfo";
import Header from "./components/Header/Header";
import Footer from './components/Footer/Footer';

const App = () => {
  const [userValue, setUserValue] = useState();

  const updateData = value => {
    setUserValue(value);
  }

  // useEffect(() => {
  //   console.log(userValue);
  // }, [userValue])

  return (
      <div className="app">
            <Header userValue={userValue}/>
            <WarInfo userValue={userValue} />
            <Footer updateData={updateData} />
      </div>
  )
}

export default App;