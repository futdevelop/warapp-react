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
			<footer className='p-0 m-0 bg-[#414A4E] text-[#fff] flex justify-between py-[20px] px-[50px] h-[130px] items-center'>
				<div className='flex justify-center items-center w-[60%]'>
					<p className='mr-[20px] text-[20px]'>Дізнайся статистику за інший день</p>
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
				<div className='w-[40%] flex justify-center items-center'>
					<p>Slava Ukraine!</p>
				</div>
			</footer>
		)
	}
}

export default Footer;