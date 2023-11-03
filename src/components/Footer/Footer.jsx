import React, { useState, useEffect } from 'react';
import { InputMask } from 'primereact/inputmask';

const Footer = ({ updateData, isLoaded, handleFooterLoading }) => {
	const [value, setValue] = useState('');
  	const [loading, setLoading] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		value !== '' ? updateData(value) : null;
		setLoading(true);
		setValue('')
	}

    useEffect(() => {
        if(loading == true) {
          handleFooterLoading(loading);
        }
		  setLoading(false);
    }, [loading])

  if(isLoaded) {
		return (
			<footer className='p-0 m-0 bg-[#414A4E] text-[#fff] flex justify-between py-[20px] 2xl:px-[50px] xl:px-[40px] lg:px-[30px] md:px-[20px] px-[20px] sm:h-[130px] items-center sm:flex-row flex-col md:pb-[20px] pb-[50px]'>
				<div className='flex justify-center items-center xl:w-[60%] md:w-[70%] w-[100%] lg:flex-row flex-col'>
					<p className='mr-[20px] 2xl:text-[20px] xl:text-[20px] lg:text-[20px] md:text-[20px] sm:text-[26px] text-[18px] lg:mb-0 mb-[20px] font-bold'>Дізнайся статистику за інший день</p>
					<form 
						action=""
						onSubmit={handleSubmit}>
					<InputMask 
						id='date'
						className='h-[30px] w-[200px] bg-[inherit] border-[1px] border-[#fff] rounded-md text-[#fff] cursor-pointer pl-[20px] text-[20px]'
						value={value}
						onChange={(e) => setValue(e.target.value)}
						mask="9999-99-99"
						placeholder="yyyy-mm-dd" 
						// slotChar="____-__-__"
						/>
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