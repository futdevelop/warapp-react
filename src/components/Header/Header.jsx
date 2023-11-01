import React, { useEffect, useState } from "react";
import useWarStatusService from "../../WarStatusService";

const Header = ({ userValue, loading }) => {
  const [dayOfWar, setDayOfWar] = useState(0);
  const [date, setDate] = useState('');
  const [valueDate, setValueDate] = useState('');

    const { getWarInfo, getWarStatistics } = useWarStatusService();

    useEffect(() => {
      setValueDate(userValue);
    }, [userValue])

    useEffect(() => {
      if(valueDate !== undefined && valueDate !== '') {
        getWarStatistics(valueDate)
          .then(res =>  {
            setDayOfWar(res.day);
            setDate(valueDate);
          })
      }
    }, [valueDate])

    useEffect(() => {
      getWarInfo()
        .then(res =>  {
          setDayOfWar(res.current_day);
          setDate(res.current_date);
        })
    }, []) 

    if(!loading) {
			return (
				<header className="header">
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
				</header>
      )
    }
}

export default Header;