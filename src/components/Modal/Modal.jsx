import React from 'react'
import { Modal as RodalModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import 'rodal/lib/rodal.css'
import './styles.scss'

const Modal = ({ isOpenModal, formikSubmit, hide, t, formik }) => {
  return (
    <RodalModal open={isOpenModal} onClose={hide} center>
      <div className='modal'>
        <div className='modal-title modal__titles'>
          <h1 className='modal__header-title'>
            {t('modal_title1')} <br /> {t('modal_title2')}
          </h1>
        </div>
        <div className='modal-body modal__content content'>
          <form onSubmit={formikSubmit}>
            <label className='content__name-label' htmlFor=''>
              <span>Your Name</span>
              <input
                type='text'
                placeholder="What's your name?"
                id='name'
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                className='content__name-input'
              />
            </label>
            {formik.errors.name && formik.touched.name && (
              <div className='content__name-error'>{formik.errors.name}</div>
            )}
            <label className='content__email-label' htmlFor=''>
              <span>Your Email</span>
              <input
                type='text'
                id='email'
                name='email'
                placeholder="What's your email?"
                onChange={formik.handleChange}
                value={formik.values.email}
                className='content__email-input'
              />
            </label>
            {formik.errors.email && formik.touched.email && (
              <div className='content__email-error text-[#fb3636] text-start mt-[5px] pl-[10px]'>
                {formik.errors.email}
              </div>
            )}
            <label
              className='content__message-label flex flex-col mt-[20px]'
              htmlFor=''
            >
              <span>Your Message</span>
              <textarea
                id='message'
                name='message'
                value={formik.values.message}
                onChange={formik.handleChange}
                rows='5'
                className='content__message-input'
                placeholder='What do you want to say?'
              ></textarea>
            </label>
            {formik.errors.message && formik.touched.message && (
              <div className='content__message-error'>
                {formik.errors.message}
              </div>
            )}
            <button className='content__btn' type='submit'>
              Send
            </button>
          </form>
        </div>
      </div>
    </RodalModal>
  )
}

export default Modal
