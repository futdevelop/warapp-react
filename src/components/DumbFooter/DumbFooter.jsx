const DumbFooter = ({ 
		fetchData,
		isOpenModal,
		errors,
		hide,
		show,
		t,
		formikSubmit,
		setFormikValue,
		formikValue,
		isFormFieldInvalid,
		classNames,
		InputMask,
		Icon,
		MyModal
		}) => (
			<footer className='footer'>
				<div className='footer__top'>
					<div className='footer__top-formblock formblock'>
						<p className='formblock__text'>
						{t("search_title")}</p>
							<form onSubmit={formikSubmit} className="formblock-form form">
								<InputMask
									id="value"
									name="value"
									value={formikValue}
									onChange={(e) => setFormikValue(e)}
									mask="9999-99-99"
									placeholder="yyyy-mm-dd"
									className={`${classNames} formblock__input form__input ({ 'p-invalid': ${isFormFieldInvalid} }) `}
								/>
								{isFormFieldInvalid && <p className="form__validation p-error">{errors && errors['value']}</p>}
							</form>
							<button 
								className='formblock__btn'
								onClick={fetchData}
								type='button'>{t("btn_today")}</button>
					</div>
					<div className='footer__top-symbol'>
						<p>{t("slava_ukraine")}</p>
					</div>
				</div>

          <div className='footer__bottom'>
            <div className='footer__bottom-reviews reviews'>
              <p className='reviews__text'>{t("title_support")}</p>
              <button
                className='reviews__btn'
                onClick={show}>{t("btn_support")}
              </button>
            </div>
            <div className='footer__bottom-contact contact'>
              <a 
                className='contact__github'
                href="https://github.com/futdevelop" target="_blank">
                <Icon className='contact__github-icon' width={25} icon="ri:github-fill" />
                <p className='contact__github-text'>github</p>
              </a>
                <a 
                  className='contact__telegram'
                  href="https://t.me/kolya2"
                  target="_blank">
                  <Icon className='contact__telegram-icon' width={25} icon="ic:sharp-telegram" />
                  <p className='contact__telegram-text'>telegram</p>
                </a>
            </div>
        </div>
				<MyModal isOpenModal={isOpenModal} hide={hide}/>
			</footer>
		)

export default DumbFooter;