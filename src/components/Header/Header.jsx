import React, { useEffect, useState } from "react";
import useWarStatusService from "../../WarStatusService";
import BeatLoader from "react-spinners/BeatLoader";


const Header = () => {
  const [dayOfWar, setDayOfWar] = useState(0);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);

    const { getWarInfo } = useWarStatusService();

    useEffect(() => {
      getWarInfo()
        .then(res =>  {
			 setLoading(!loading)
          setDayOfWar(res.current_day);
          setDate(res.current_date);
        })
    }, []) 

        if(loading) {
			return (
          <div className='loading-header'>
            <BeatLoader
              color={'#fff'}
              loading={loading}
              className='loading'
              size={1}
              aria-label="Loading Spinner"
              data-testid="loader"/>
          </div>
        )} else {
			return (
				<div className="header">
					<div className="header-logo">
						<img className='img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Security_Service_of_Ukraine_Emblem.svg/1200px-Security_Service_of_Ukraine_Emblem.svg.png" alt="defense-ua" />
					</div>
					<div className="header-info">
						<p>Генеральний штаб ЗС України інформує</p>
						<h1>Загальні бойові втрати російського окупанта</h1>
					</div>

						<div className="header-dynamic-info dynamic-info">
							<p className="dynamic-info-date">{date ? date : 'XXXX-XX-XX'}</p>
							<p className="dynamic-info-day"><span className="dynamic-info-dayofwar">{dayOfWar}</span>-й день війни</p>
					</div>
				</div>
        )}


}

export default Header;