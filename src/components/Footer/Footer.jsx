import React, { useState } from 'react'

const Footer = ({ updateData }) => {
	const [value, setValue] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		value !== '' ? updateData(value) : null;
		setValue('')
	}

  return (
	 <footer className='footer'>
		<div className='footer-search'>
			<p className='footer-search-text'>Дізнайся статистику за інший день</p>
			<form 
				className='footer-search-form'
				action=""
				onSubmit={handleSubmit}>
				<input 
					className='footer-search-input'
					type="text"
					value={value}
					placeholder='XXXX-XX-XX'
					onChange={(e) => setValue(e.target.value)} />
			</form>
		</div>
		<div className='footer-symbol'>
			<p>Slava Ukraine!</p>
		</div>
	 </footer>
  )
}

export default Footer;