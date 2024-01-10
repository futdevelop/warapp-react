import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { fetchWarInfo } from "./headerSlice";
import DumbHeader from '../../components/DumbHeader/DumbHeader'

import './header.scss';

const Header = () => {
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
    window.localStorage.setItem('language', 'ua')
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
        <DumbHeader 
          changeLanguage={(language) => changeLanguage(language)}
          enBtnClassName={enBtnClassName}
          uaBtnClassName={uaBtnClassName}
          date={date}
          day={day}
          t={t}
           />
      )
}

export default Header;