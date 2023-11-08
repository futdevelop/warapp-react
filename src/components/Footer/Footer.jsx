import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { InputMask } from "primereact/inputmask";
import { classNames } from 'primereact/utils';
import { useTranslation } from 'react-i18next';

const Footer = ({ updateData, isLoaded, handleFooterLoading }) => {
	const [prevValue, setPrevValue] = useState('');
  	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState(); 

   const { t, i18n } = useTranslation();
	const language = i18n.language;

	const currentDate = new Date()
	const currentYear = String(currentDate.getFullYear())
	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
	const currentDay = String(currentDate.getDate()).padStart(2, '0')
	const formatedDate = `${currentYear}-${currentMonth}-${currentDay}`

	const setDataForToday = formatedDate => {
		updateData(formatedDate);
		setLoading(true);
	}

    useEffect(() => {
        if(loading == true) {
          handleFooterLoading(loading);
        }
		  setLoading(false);
    }, [loading])

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
		data.value ? updateData(data.value) : null;
		setLoading(true);
	}

	useEffect(() => {
		setErrors({})
	}, [language])

  if(isLoaded) {
		return (
			<footer className='p-0 m-0 bg-[#414A4E] text-[#fff] flex justify-between py-[20px] 2xl:px-[50px] xl:px-[40px] lg:px-[30px] md:px-[20px] px-[20px] sm:h-auto items-center sm:flex-row flex-col md:pb-[20px] pb-[50px]'>
				<div className='flex justify-center items-center xl:w-[60%] md:w-[70%] w-[100%] lg:flex-row flex-col'>
					<p className='mr-[20px] 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[20px] sm:text-[20px] text-[20px] lg:mb-0 mb-[20px] font-bold'>
					{t("search_title")}</p>
						<form onSubmit={formik.handleSubmit} className="gap-2 flex flex-col text-[black]">
							<InputMask
								id="value"
								name="value"
								value={formik.values.value}
								onChange={(e) => {
										formik.setFieldValue('value', e.target.value);
								}}
								mask="9999-99-99"
								placeholder="yyyy-mm-dd"
								className={`${classNames} h-[30px] w-[200px] rounded text-[24px] ({ 'p-invalid': ${isFormFieldInvalid('value')} }) `}
							/>
							{isFormFieldInvalid('value') && <p className="p-error text-[#d93434]">{errors && errors['value']}</p>}
						</form>
						<button 
							className='h-[30px] w-[180px] rounded text-[20px] flex justify-center text-center border-[1px] ml-[10px]'
							onClick={() => setDataForToday(formatedDate)}
							type='button'>
								Сьогодні</button>
				</div>
				<div className='xl:w-[40%] md:w-[30%] sm:w-[30%] w-[100%]  flex justify-center items-center mt-[20px] sm:mt-0'>
					<p>{t("slava_ukraine")}</p>
				</div>
			</footer>
		)
	}
}

export default Footer;