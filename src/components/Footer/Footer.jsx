import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { InputMask } from "primereact/inputmask";
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import MyModal from '../modal/Modal';
import { useDispatch } from "react-redux";
import { fetchWarStatsByDate } from "../warInfo/warInfoSlice";

import './footer.scss';

const Footer = ({ }) => {
	const [prevValue, setPrevValue] = useState('');
	const [errors, setErrors] = useState(); 
   const [isOpenModal, setIsOpenModal] = useState(false);

	const dispatch = useDispatch();

	const show = () => setIsOpenModal(true);
	const hide = () => setIsOpenModal(false);

   // useEffect(() => {
   //    setTimeout(() => {
   //    show();
   //  }, 60000); 
   //  }, [])

   const { t, i18n } = useTranslation();
	const language = i18n.language;

	const currentDate = new Date()
	const currentYear = String(currentDate.getFullYear())
	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
	const currentDay = String(currentDate.getDate()).padStart(2, '0')
	const formatedDate = `${currentYear}-${currentMonth}-${currentDay}`

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

				const year = +data.value.slice(0, 4);
				const month = +data.value.slice(5, 7);
				const day = +data.value.slice(8, 10);

            !data.value ? errors.value = t("required_field") : null;
				data.value && data.value === prevValue ? errors.value = t("already_showed") : null;
				 data.value === '2022-02-24' || data.value === '2022-02-26' ? errors.value = t("lost_data") : null;
				month == 4 && day > 30 || month == 6 && day > 30 || month == 9 && day > 30 ||
				month == 11 && day > 30 ||day > 31 && errors.value || month == 2 && day > 28 ||
				month > 12  ? errors.value = t("incorrect_data") : null;
				year < 2022 || data.value > formatedDate ? errors.value = t("not_exist_data") : null;

            setErrors(errors);
				return errors;
        },
        onSubmit: (data) => {
				handleSubmit(data)
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => (formik.touched[name] && formik.errors[name]);

	const handleSubmit = data => {
		setPrevValue(data.value);
		data.value ? dispatch(fetchWarStatsByDate(data.value)) : null;
	}

	useEffect(() => {
		setErrors({})
	}, [language])

		return (
			<footer className='footer'>
				<div className='footer__top'>
					<div className='footer__top-formblock formblock'>
						<p className='formblock__text'>
						{t("search_title")}</p>
							<form onSubmit={formik.handleSubmit} className="formblock-form form">
								<InputMask
									id="value"
									name="value"
									value={formik.values.value}
									onChange={(e) => {
											formik.setFieldValue('value', e.target.value);
									}}
									mask="9999-99-99"
									placeholder="yyyy-mm-dd"
									className={`${classNames} formblock__input form__input ({ 'p-invalid': ${isFormFieldInvalid('value')} }) `}
								/>
								{isFormFieldInvalid('value') && <p className="form__validation p-error">{errors && errors['value']}</p>}
							</form>
							<button 
								className='formblock__btn'
								onClick={() => {
									dispatch(fetchWarStatsByDate(formatedDate))
								}}
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
}

export default Footer;