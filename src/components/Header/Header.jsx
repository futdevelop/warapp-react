import React, { useEffect, useState } from "react";
import warStatusService from "../../Service/WarStatusService";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { fetchWarInfo } from "./headerSlice";
import { createSelector } from 'reselect'

import './header.scss';

const Header = ({ }) => {
  const { date, day, dataLoaded } = useSelector(state => state.header);

  const [currentLan, setCurrentLan] = useState('ua');
  const { i18n, t } = useTranslation();

  const dispatch = useDispatch();

  const changeLanguage = language => {
    i18n.changeLanguage(language);
    setCurrentLan(language);
    window.localStorage.setItem('language', language);
  };

  useEffect(() => {
    const lan = window.localStorage.getItem('language')
    setCurrentLan(lan);
    i18n.changeLanguage(lan);
    !lan && window.localStorage.setItem('language', 'ua')
  }, [])

    useEffect(() => {
      !dataLoaded && dispatch(fetchWarInfo());
    }, [])


    let enBtnClassName = currentLan == 'en' ? 'header__language-btn_active' : 'header__language-btn';
    let uaBtnClassName = currentLan == 'ua' ? 'header__language-btn_active' : 'header__language-btn';

			return (
				<header className="header">
          <div className='header__language'>
              <button 
                className={enBtnClassName}
                onClick={() => changeLanguage("en")}>EN</button>
              <button 
                className={uaBtnClassName}
                onClick={() => changeLanguage("ua")}>UA</button>
          </div>
          <div className="header__content">
            <div className="header__content-titles titles">
              <p className="titles__information">{t("inform")}</p>
              <h1 className="titles__heading">{t("losses")}</h1>
            </div>
						<div className="header__content-dates dates">
							<p className="dates__date">{date}</p>
							<p className="dates__day">
                <span className="text-[red]">{day}</span>{t("dayOfWar")}
              </p>
					</div>
          </div>
				</header>
      )
}

export default Header;