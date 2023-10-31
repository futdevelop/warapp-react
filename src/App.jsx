import React, { useEffect, useState } from "react";
import useWarStatusService from "./WarStatusService";
import statsData from "./constans/index";

const App = () => {
  const [dayOfWar, setDayOfWar] = useState(0);
  const [date, setDate] = useState();
  const [data, setData] = useState({});
  const [dataForToday, setDataForToday] = useState({});

    const { getWarInfo, getWarStatistics } = useWarStatusService();

    useEffect(() => {
      getWarInfo()
        .then(res =>  {
          setDayOfWar(res.data.data.current_day);
          setDate(res.data.data.current_date);
        })

      getWarStatistics()
        .then(res => {
          setData(res.stats);
          setDataForToday(res.increase)
        });
    }, [])

    useEffect(() => {
      getWarStatistics(date)
        .then(res =>  {
          setData(res.stats);
          setDataForToday(res.increase)
          setDayOfWar(res.day);
        });
    }, [date]);



    return (
      <div className="app">

        <div className="top">
          <p>Генеральний штаб ЗС України інформує</p>
          <h1>Загальні бойові втрати російського окупанта</h1>
            <div className="block-info">
              <p className="block-info-date">Станом на</p>
              <input 
                className="block-info-input"
                value={date}
                type="date"
                onChange={e => setDate(e.target.value)} />
              <p className="block-info-day">{`${dayOfWar}-й день війни`}</p>
          </div>
        </div>

            <div className="war-info">
              {statsData.map((statData, index) => {
                const keys = Object.keys(data);
                return (
                  <div className="war-info-block info-block">
                  <img className='info-block-icon' src={statData.img} alt="" />
                  <div>
                      <p className="info-block-stat">{data[keys[index]]} {dataForToday[keys[index]] !== 0 ? `(+${dataForToday[keys[index]]})` : null}</p>
                    <p className="info-block-name">{statData.name}</p>
                  </div>
                  </div>
                )
              })}
            </div>

            <div className="block-donate">
              <h2>Бажаєш збільшити стату?</h2>
                  <div className="block-donate-btn">
                      <img src="/src/assets/charity-icons/comeBackAlive.png" alt="" />
                      <a href="https://savelife.in.ua/en/donate-en/" target="_blank">
                        <p>Повернись живим</p>
                      </a>
                  </div>
              </div>
              
      </div>
    );
}

export default App;