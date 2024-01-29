import './styles.scss';

const Footer = ({
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
	ModalContainer,
	formik,
}) => (
	<footer className='footer'>
		<div className='footer-top'>
			<div className='footer-top__formblock'>
				<p className='footer-formblock__text'>{t('search_title')}</p>
				<form onSubmit={formikSubmit} className='footer-formblock__form'>
					<InputMask
						id='value'
						name='value'
						value={formikValue}
						onChange={e => setFormikValue(e)}
						mask='9999-99-99'
						placeholder='yyyy-mm-dd'
						className={`${classNames} footer-formblock__input ({ 'p-invalid': ${isFormFieldInvalid} }) `}
					/>
					{isFormFieldInvalid && (
						<p className='footer-formblock__input-valid p-error'>
							{errors && errors['value']}
						</p>
					)}
				</form>
				<button
					className='footer-formblock__btn'
					onClick={fetchData}
					type='button'
				>
					{t('btn_today')}
				</button>
			</div>
			<div className='footer-top__symbol'>
				<p>{t('slava_ukraine')}</p>
			</div>
		</div>

		<div className='footer-bottom'>
			<div className='footer-bottom__reviews '>
				<p className='footer-reviews__text'>{t('title_support')}</p>
				<button className='footer-reviews__btn' onClick={show}>
					{t('btn_support')}
				</button>
			</div>
			<div className=' footer-bottom__contact'>
				<a
					className='footer-contact__github'
					href='https://github.com/futdevelop'
					target='_blank'
				>
					<Icon
						className='footer-contact__github_icon'
						width={25}
						icon='ri:github-fill'
					/>
					<p className='footer-contact__github_text'>github</p>
				</a>
				<a
					className='footer-contact__telegram'
					href='https://t.me/kolya2'
					target='_blank'
				>
					<Icon
						className='footer-contact__telegram_icon'
						width={25}
						icon='ic:sharp-telegram'
					/>
					<p className='footer-contact__telegram_text'>telegram</p>
				</a>
			</div>
		</div>
		<ModalContainer
			isOpenModal={isOpenModal}
			formikSubmit={formikSubmit}
			t={t}
			formik={formik}
			hide={hide}
		/>
	</footer>
);

export default Footer;
