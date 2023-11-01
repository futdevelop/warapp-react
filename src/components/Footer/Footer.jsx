import React, { useState } from 'react';
import { InputMask } from 'primereact/inputmask';

const Footer = ({ updateData, loading }) => {
	const [value, setValue] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		value !== '' ? updateData(value) : null;
		setValue('')
	}

	// if (value > )

  if(!loading) {
		return (
			<footer className='footer'>
				<div className='footer-search'>
					<p className='footer-search-text'>Дізнайся статистику за інший день</p>
					<form 
						className='footer-search-form'
						action=""
						onSubmit={handleSubmit}>
					<InputMask 
						id='date'
						className='footer-search-input'
						value={value}
						onChange={(e) => setValue(e.target.value)}
						mask="9999-99-99"
						placeholder="yyyy-mm-dd" 
						slotChar="yyyy-mm-dd"
						/>
					</form>
				</div>
				<div className='footer-symbol'>
					<p>Slava Ukraine!</p>
				</div>
			</footer>
		)
	}
}

export default Footer;