import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { InputMask } from 'primereact/inputmask';
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import { fetchWarStats } from '../../store/apiSlice';

import Footer from '../../components/Footer';

const FooterContainer = () => {
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

	const currentDate = new Date();
	const currentYear = String(currentDate.getFullYear());
	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
	const currentDay = String(currentDate.getDate()).padStart(2, '0');
	const formatedDate = `${currentYear}-${currentMonth}-${currentDay}`;

	const formik = useFormik({
		initialValues: {
			value: '',
		},
		validate: data => {
			let errors = {};

			const year = +data.value.slice(0, 4);
			const month = +data.value.slice(5, 7);
			const day = +data.value.slice(8, 10);

			!data.value ? (errors.value = t('required_field')) : null;
			data.value && data.value === prevValue
				? (errors.value = t('already_showed'))
				: null;
			data.value === '2022-02-24' || data.value === '2022-02-26'
				? (errors.value = t('lost_data'))
				: null;
			(month == 4 && day > 30) ||
			(month == 6 && day > 30) ||
			(month == 9 && day > 30) ||
			(month == 11 && day > 30) ||
			(day > 31 && errors.value) ||
			(month == 2 && day > 28) ||
			month > 12
				? (errors.value = t('incorrect_data'))
				: null;
			year < 2022 || data.value > formatedDate
				? (errors.value = t('not_exist_data'))
				: null;

			setErrors(errors);
			return errors;
		},
		onSubmit: data => {
			handleSubmit(data);
			formik.resetForm();
		},
	});

	const isFormFieldInvalid = name =>
		formik.touched[name] && formik.errors[name];

	const handleSubmit = data => {
		setPrevValue(data.value);
		data.value && data.value !== prevValue
			? dispatch(fetchWarStats(data.value))
			: null;
	};

	useEffect(() => {
		setErrors({});
	}, [language]);

	return (
		<>
			<Footer
            errors={errors}
				isOpenModal={isOpenModal}
				hide={hide}
				show={show}
				t={t}
				formik={formik}
				formatedDate={formatedDate}
				formikSubmit={formik.handleSubmit}
				formikValue={formik.values.value}
				setFormikValue={e => formik.setFieldValue('value', e.target.value)}
				isFormFieldInvalid={isFormFieldInvalid('value')}
				classNames={classNames}
				fetchData={() => dispatch(fetchWarStats(formatedDate))}
				InputMask={InputMask}
				Icon={Icon}
				ModalContainer={Modal}
			/>
		</>
	);
};

export default FooterContainer;
