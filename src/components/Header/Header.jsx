import React, { useEffect, useState } from "react";
import useWarStatusService from "../../WarStatusService";

const Header = ({ userValue, isLoaded, handleHeaderLoading }) => {
  const [dayOfWar, setDayOfWar] = useState(0);
  const [date, setDate] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [loading, setLoading] = useState(true);

    const { getWarInfo, getWarStatistics } = useWarStatusService();

    useEffect(() => {
      setValueDate(userValue);
    }, [userValue])

    useEffect(() => {
        if(loading == false) {
          handleHeaderLoading(loading);
        }
    }, [loading])

    useEffect(() => {
      if(valueDate !== undefined && valueDate !== '') {
        getWarStatistics(valueDate)
          .then(res =>  {
            setDayOfWar(res.day);
            setDate(valueDate);
            setLoading(false)
          })
      }
    }, [valueDate])

    useEffect(() => {
      getWarInfo()
        .then(res =>  {
          setDayOfWar(res.current_day);
          setDate(res.current_date);
          setLoading(false)
        })
    }, [])

    if(isLoaded) {
			return (
				<header className="bg-[#414A4E] text-[#fff] flex items-center p-[20px] px-[70px]">
        <div className="flex w-[60%] items-center">
            <div className="flex justify-center items-center w-[10%] h-[80%] mr-[50px]">
              <img className='img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Security_Service_of_Ukraine_Emblem.svg/1200px-Security_Service_of_Ukraine_Emblem.svg.png" alt="defense-ua" />
            </div>
            <div className="font-bold">
              <p className="text-[18px]">Генеральний штаб ЗС України інформує</p>
              <h1 className="text-[30px]">Загальні бойові втрати російського окупанта</h1>
            </div>
        </div>
						<div className="flex flex-col items-end text-[22px] font-bold w-[40%] pr-[50px]">
							<p className="mb-[10px]">{date}</p>
							<p className="m-[0px]"><span className="text-[red]">{dayOfWar}</span>-й день війни</p>
					</div>
				</header>
      )
    }
}

export default Header;