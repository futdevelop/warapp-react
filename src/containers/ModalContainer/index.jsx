import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import emailjs from '@emailjs/browser';
import SignUpSchema from '../../utils/formValidation';
import Modal from '../../components/Modal/Modal';

const ModalContainer = ({ isOpenModal, hide }) => {
	const form = useRef();
	const { t } = useTranslation();

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			message: '',
		},
		validationSchema: SignUpSchema,
		onSubmit: values => {
			handleSubmit(values);
		},
	});

	const handleSubmit = e => {
		emailjs
			.sendForm(
				'service_6d5f0fn',
				'template_4piawrf',
				form.current,
				'5_sSOsKhhyanKUCQe'
			)
			.then(
				result => {
					formik.resetForm();
					alert(t('modal_success'));
				},
				error => {
					alert(t('modal_error'));
				}
			);
	};

	return (
		<Modal
			isOpenModal={isOpenModal}
			hide={hide}
			t={t}
			form={form}
			formik={formik}
		/>
	);
};

export default ModalContainer;
