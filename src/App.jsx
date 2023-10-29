import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import useWarStatusService from "./WarStatusService";
import statsData from "./constans";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [dayOfWar, setDayOfWar] = useState(0);
  const [date, setDate] = useState(0);
  const [data, setData] = useState({});

    const { getWarInfo, getWarStatistics } = useWarStatusService();

    useEffect(() => {
      getWarInfo()
        .then(res => setDayOfWar(res.data.data.current_day))

      getWarInfo()
        .then(res => setDate(res.data.data.current_date));

      getWarStatistics()
        .then(res => setData(res));
    }, [])

    return (
      <div className="app">
        <div className="top">
          <p>Генеральний штаб ЗС України інформує</p>
          <h1>Загальні бойові втрати російського окупанта</h1>
          <div className="block-info">
            <p className="block-info-date">{`Станом на ${date}`}</p>
            <p className="block-info-day">{`${dayOfWar}-й день війни`}</p>
            <div>
            </div>
          </div>
        </div>
        <div className="stat-blocks">
            {statsData.map((statData, index) => {
              const keys = Object.keys(data);
              console.log(keys)
              return (
                <div className="stat-block">
                  <img className='stat-block-icon' src={statData.img} alt="" />
                  <div>
                    <p className="stat-block__num">
                      {data[keys[index]] === 4 ? 1 : data[keys[index]]}
                    </p>
                    <p className="stat-block__name">{statData.name}</p>
                  </div>
                </div>
              )
            })}
            <div className="stat-block block-donate">
              <h2>Хочеш збільшити стату?</h2>
              <div className="stat-block-donate">
                <a href="https://savelife.in.ua/en/donate-en/" target="_blank"><p>Повернись живим</p></a>
              </div>
            </div>
        </div>
      </div>
    );
}

export default App;