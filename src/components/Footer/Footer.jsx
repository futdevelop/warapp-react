import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { InputMask } from "primereact/inputmask";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

const Footer = ({ updateData, isLoaded, handleFooterLoading }) => {
	const [prevValue, setPrevValue] = useState('');
  	const [loading, setLoading] = useState(false);

	const currentDate = new Date()
	const currentYear = String(currentDate.getFullYear())
	const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
	const currentDay = String(currentDate.getDate()).padStart(2, '0')
	const formatedDate = `${currentYear}-${currentMonth}-${currentDay}`

	console.log(formatedDate)

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

            !data.value ? errors.value = "Поле обов'язкове." : null;
				data.value === prevValue ? errors.value = "Дані відображені за цей день." : null;
				+data.value.slice(0, 4) < 2022 ? errors.value = "Дані не знайдені." : null;
				+data.value.slice(5, 7) > 12  ? errors.value = "Дані не корректні." : null;
				+data.value.slice(5, 7) == 2 ? +data.value.slice(8, 10) > 28 ? errors.value = "Дані не корректні." : null : null;
				+data.value.slice(8, 10) > 31 ? errors.value = "Дані не корректні." : null;
				data.value > formatedDate ? errors.value = "Дані не знайдені." : null;
				data.value === '2022-02-24' || data.value === '2022-02-26' ? errors.value = "За цей день дані втрачені..." : null;
				+data.value.slice(5, 7) == 4 && +data.value.slice(8, 10) > 30 ? errors.value = "Дані не корректні." : null;
				+data.value.slice(5, 7) == 6 && +data.value.slice(8, 10) > 30 ? errors.value = "Дані не корректні." : null;
				+data.value.slice(5, 7) == 9 && +data.value.slice(8, 10) > 30 ? errors.value = "Дані не корректні." : null;
				+data.value.slice(5, 7) == 11 && +data.value.slice(8, 10) > 30 ? errors.value = "Дані не корректні." : null;

            return errors;
        },
        onSubmit: (data) => {
				handleSubmit(data)
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => isFormFieldInvalid(name) && <p className="p-error text-[#d93434]">{formik.errors[name]}</p>;

	const handleSubmit = data => {
		setPrevValue(data.value);
		data.value ? updateData(data.value) : null;
		setLoading(true);
	}

	useEffect(() => {
		if(prevValue) {
			console.log(prevValue);
		}
	}, [prevValue])


  if(isLoaded) {
		return (
			<footer className='p-0 m-0 bg-[#414A4E] text-[#fff] flex justify-between py-[20px] 2xl:px-[50px] xl:px-[40px] lg:px-[30px] md:px-[20px] px-[20px] sm:h-auto items-center sm:flex-row flex-col md:pb-[20px] pb-[50px]'>
				<div className='flex justify-center items-center xl:w-[60%] md:w-[70%] w-[100%] lg:flex-row flex-col'>
					<p className='mr-[20px] 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[20px] sm:text-[20px] text-[20px] lg:mb-0 mb-[20px] font-bold'>Дізнайся статистику за інший день</p>
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
								className={`${classNames} h-[30px] pl-[10px] w-[200px] rounded text-[24px] ({ 'p-invalid': ${isFormFieldInvalid('value')} }) `}
							/>
							{getFormErrorMessage('value')}
						</form>
				</div>
				<div className='xl:w-[40%] md:w-[30%] sm:w-[30%] w-[100%]  flex justify-center items-center mt-[20px] sm:mt-0'>
					<p>Slava Ukraine!</p>
				</div>
			</footer>
		)
	}
}

export default Footer;