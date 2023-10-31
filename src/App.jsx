import React, { useState } from 'react'

import WarInfo from "./components/warInfo/WarInfo";
import Header from "./components/Header/Header";
// import PacmanLoader from "react-spinners/PacmanLoader";

const App = () => {
  // const [loading, setLoading] = useState(true);

  // const toggleLoading = () => {
  //   console.log('success')
  //   setLoading(!loading);
  // }

    return (
      <div className="app">
        {/* {loading ? (
          <div className='loading'>
            <PacmanLoader
              color={'#414A4E'}
              loading={loading}
              className='loading'
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"/>
          </div>
        ) : (
          <> */}
            <Header />
            <WarInfo />
          {/* </>
        )} */}
      </div>
    );
}

export default App;