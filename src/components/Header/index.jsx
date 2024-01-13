import './styles.scss';

const Header = ({
    changeLanguage,
    enBtnClassName,
    uaBtnClassName,
    date,
    day,
    t }) => {
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