import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Language = ({ isLoaded }) => {
  const [currentLan, setCurrentLan] = useState('ua');

  const { i18n } = useTranslation();

  const changeLanguage = language => {
    i18n.changeLanguage(language);
    setCurrentLan(language);
  };
  if(isLoaded) {
    return (
      <div className='gap-4 pl-[40px] bg-[#363d40] text-[white]'>
          <button 
            className={`mr-[5px] ${currentLan == 'en' ? 'text-[red]' : 'underline'}`}
            onClick={() => changeLanguage("en")}>EN</button>
          <button 
            className={`${currentLan == 'ua' ? 'text-[red]' : 'underline'}`}
            onClick={() => changeLanguage("ua")}>UA</button>
        </div>
    )
  }
}

export default Language;