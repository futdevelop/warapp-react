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
  const [dataForToday, setDataForToday] = useState({});

    const { getWarInfo, getWarStatistics } = useWarStatusService();

    useEffect(() => {
      getWarInfo()
        .then(res => setDayOfWar(res.data.data.current_day))

      getWarInfo()
        .then(res => setDate(res.data.data.current_date));

      getWarStatistics()
        .then(res => setData(res.stats));

      getWarStatistics()
        .then(res => setDataForToday(res.increase));

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
              return (
                <div className="stat-block">
                  <img className='stat-block-icon' src={statData.img} alt="" />
                  <div>
                      <p className="stat-block__stat">{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}</p>
                    <p className="stat-block__name">{statData.name}</p>
                  </div>
                </div>
              )
            })}
        </div>

            <div className="block-donate">
              <h2>Бажаєш збільшити стату?</h2>
              <div className="block-donate-btn">
                <img src="/src/assets/charity-icons/comeBackAlive.png" alt="" />
                <a href="https://savelife.in.ua/en/donate-en/" target="_blank"><p>Повернись живим</p></a>
              </div>
            </div>
      </div>
    );
}

export default App;