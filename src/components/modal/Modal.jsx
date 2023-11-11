import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import emailjs from '@emailjs/browser';
import SignUpSchema from '../../Validation/formValidation';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Icon } from '@iconify/react';

import 'rodal/lib/rodal.css';

const MyModal = ({ isLoaded, toggleModal }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const form = useRef();

   const { t } = useTranslation();

  const show = () => setIsOpenModal(true);
  const hide = () => setIsOpenModal(false);

    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        message: ''
      },
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        handleSubmit(values);
      }
    })

    useEffect(() => {
      setTimeout(() => {
      show();
    }, 60000); 
    }, [])

    const handleSubmit = (e) => {
      emailjs.sendForm(
          'service_6d5f0fn',
          'template_4piawrf',
          form.current,
          '5_sSOsKhhyanKUCQe')
        .then(result => {
            formik.resetForm();
            alert(t("modal_success"));
            console.log(result.text);
        }, error => {
            alert(t("modal_error"));
            console.log(error.text);
        });
    };

  useEffect(() => {
    toggleModal(isOpenModal);
  }, [isOpenModal])

  if(isLoaded) {
    return (
        <div className=''>
          <div className='flex px-[20px] py-[15px] bg-[#363d40] text-white md:flex-row flex-col justify-between'>

            <div className='flex items-center md:justify-start justify-between sm:flex-row flex-col '>
              <p className='md:text-[16px] text-[14px] mr-[20px] md:mb-0 mb-[10px]'>{t("title_support")}</p>
              <button
                className='h-[30px] w-[180px] rounded-lg text-[18px] flex justify-center border-[1px] lg:ml-[10px]'
                onClick={show}>{t("btn_support")}
              </button>
            </div>

            <div className='flex md:mt-0 mt-[20px] ml-[20px] md:justify-start justify-between'>
              <a 
                className='flex items-center justify-center align-center mr-[10px]'
                href="https://github.com/futdevelop" target="_blank">
                <Icon className='mr-[5px]' width={25} icon="ri:github-fill" />
                <p className='2xl:text-[16px] md:text-[14px] text-[14px]'>github</p>
              </a>
                <a 
                  className='flex items-center'
                  href="https://t.me/kolya2"
                  target="_blank">
                  <Icon className='mr-[5px]' width={25} icon="ic:sharp-telegram" />
                  <p className='2xl:text-[16px] md:text-[14px] text-[14px]'>telegram</p>
                </a>
            </div>
        </div>
          <Modal 
            open={isOpenModal} onClose={hide} center>
                <div className="flex justify-center text-center flex-col 2xl:px-[50px] xl:px-[35px] lg:px-[30px] md:px-[20px] sm:px-[15px] px-[10px]">
                      <div className="modal-title inline-block text-center mt-[10px] mb-[30px]">
                        <h1 className='text-[20px] font-bold text-[#414A4E]'>{t("modal_title1")} <br /> {t("modal_title2")}</h1>
                      </div>
                      <div className="modal-body">
                          <form ref={form} onSubmit={formik.handleSubmit}>
                              <label 
                                className="flex flex-col mb-[5px]" 
                                htmlFor="">
                                  <span className='text-start pl-[10px] text-[#414A4E] font-bold mb-[5px]'>Your Name</span>
                                  <input
                                    type="text"
                                    placeholder="What's your name?"
                                    id='name'
                                    name='name'
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    className='bg-[#ECF0F3] text-start rounded py-[5px] px-[10px] w-[100%]'/>
                              </label>
                          {formik.errors.name && formik.touched.name && <div className='text-[#fb3636] text-start mt-[5px] pl-[10px]'>{formik.errors.name}</div>} 
                        <label 
                          className="flex flex-col mt-[20px]" 
                          htmlFor="">
                            <span className='pl-[10px] text-[#414A4E] text-start font-bold mb-[5px]'>Your Email</span>
                            <input 
                              type="text"
                              id='email'
                              name='email'
                              placeholder="What's your email?"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                              className='bg-[#ECF0F3] rounded py-[5px] px-[10px] w-[100%]'/>
                          </label> 
                          {formik.errors.email && formik.touched.email && <div className='text-[#fb3636] text-start mt-[5px] pl-[10px]'>{formik.errors.email}</div>} 
                        <label 
                          className="flex flex-col mt-[20px]" 
                          htmlFor="">
                            <span className='pl-[10px] text-[#414A4E] text-start font-bold mb-[5px]'>Your Message</span>
                              <textarea 
                                id="message"
                                name='message'
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                rows="5"
                                className='bg-[#ECF0F3] rounded py-[10px] px-[10px] max-h-[150px]'
                                placeholder="What do you want to say?"
                                ></textarea>
                          </label>
                        {formik.errors.message && formik.touched.message && <div className='text-[#fb3636] text-start mt-[5px] pl-[10px]'>{formik.errors.message}</div>}
                        <button 
                          className='h-[30px] w-[100%] bg-[#414A4E] text-white rounded text-[20px] flex justify-center text-center mt-[20px]'
                          type="submit">Send</button>
                      </form>
                      </div>
                </div>
          </Modal>
        </div>
    )
  } 
}

export default MyModal;

