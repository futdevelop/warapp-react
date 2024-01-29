import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import { apiSlice } from '../../store/selectors';

const HeaderContainer = () => {
	const { date, day } = useSelector(apiSlice);
	const [currentLan, setCurrentLan] = useState('ua');
	const { i18n, t } = useTranslation();

	const changeLanguage = language => {
		i18n.changeLanguage(language);
		setCurrentLan(language);
		window.localStorage.setItem('language', language);
	};

	useEffect(() => {
		window.localStorage.setItem('language', 'ua');
		const lan = window.localStorage.getItem('language');
		setCurrentLan(lan);
		i18n.changeLanguage(lan);
		!lan && window.localStorage.setItem('language', 'ua');
	}, []);

	let enBtnClassName =
		currentLan == 'en' ? 'header__language-btn_active' : 'header__language-btn';
	let uaBtnClassName =
		currentLan == 'ua' ? 'header__language-btn_active' : 'header__language-btn';

	return (
		<Header
			changeLanguage={language => changeLanguage(language)}
			enBtnClassName={enBtnClassName}
			uaBtnClassName={uaBtnClassName}
			date={date}
			day={day}
			t={t}
		/>
	);
};

export default HeaderContainer;
