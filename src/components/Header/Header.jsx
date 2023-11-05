import React, { useEffect, useState } from "react";
import useWarStatusService from "../../Service/WarStatusService";
import { useTranslation } from 'react-i18next';

const Header = ({ userValue, isLoaded, handleHeaderLoading }) => {
  const [dayOfWar, setDayOfWar] = useState(0);
  const [date, setDate] = useState('');
  const [valueDate, setValueDate] = useState('');
  const [loading, setLoading] = useState(true);

    const { t } = useTranslation();
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
				<header className="bg-[#414A4E] text-[#fff] max-w-[100%] flex md:flex-row flex-col justify-between items-center p-[20px] 2xl:px-[70px] xl:px-[50px] lg:px-[40px] md:px-[30px] px-[20px]">
            <div className="font-bold xl:ml-[50px] lg:ml-[30px] md:ml-[20px] ml-[10px]">
              <p className="2xl:text-[18px] sm:text-center text-start md:text-start xl:text-[18px] lg:text-[16px] text-[12px] mb-[5px] md:mb-0">{t("inform")}</p>
              <h1 className="2xl:text-[32px] xl:text-[24px] lg:text-[20px] md:text-[20px] sm:text-[24px] text-[20px] flex-wrap">{t("losses")}</h1>
            </div>
						<div className="flex md:flex-col md:mt-0 mt-[20px] flex-row items-end 2xl:text-[22px] xl:text-[20px] lg-[18px] md:text-[16px] font-bold lg:w-[30%] ">
							<p className="md:mb-[10px] mb-0 md:mr-0 mr-[15px]">{date}</p>
							<p className="m-[0px]"><span className="text-[red]">{dayOfWar}</span>{t("dayOfWar")}</p>
					</div>
				</header>
      )
    }
}

export default Header;