import React, { useState } from 'react'
import Rodal from 'rodal';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import 'rodal/lib/rodal.css';

const Modal = ({ isLoaded }) => {
  const [isOpenModal, setIsOpenModal] = useState(true);

   const { t } = useTranslation();

  const show = () => setIsOpenModal(true);
  const hide = () => setIsOpenModal(false);

   const SignUpSchema = Yup.object().shape({
      name: Yup.string()
        .min(1, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      message: Yup.string()
        .min(5, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    });

    const formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        message: ''
      },
      validationSchema: SignUpSchema,
      onSubmit: (values) => {
        handleSubmit();
      }
    })

    const handleSubmit = (e) => {
      console.log(formik.values);
      formik.resetForm();
      console.log(formik.touched.name)
    };

  if(isLoaded) {
    return (
        <div>
          <div className='flex px-[20px] pt-[10px] pb-[5px] bg-[#363d40] text-white sm:flex-row flex-col justify-center text-center sm:justify-start sm:text-start'>
          <p className='md:text-[16px] text-[14px] sm:mr-[20px] mr-0'>{t("title_support")}</p>
            <button
              className='h-[30px] w-[180px] my-[20px] rounded text-[18px] flex justify-center text-center border-[1px] sm:mt-0 mt-[10px] lg:ml-[10px] mx-auto'
              onClick={show}>
              {t("btn_support")}
            </button>
        </div>
            <Rodal visible={isOpenModal} width={700} className='' height={600} onClose={hide}>
              <div className="flex justify-center text-center flex-col px-[50px]">
                    <div className="modal-title inline-block text-center mt-[10px] mb-[30px]">
                      <h1 className='text-[20px] font-bold text-[#414A4E]'>Відправ відгук автору на пошту. <br /> Йому буде приємно:)</h1>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formik.handleSubmit}>
                            <label 
                              className="flex flex-col mb-[5px]" 
                              htmlFor="">
                                <span className='text-start pl-[10px] text-[#414A4E] font-bold'>Your Name</span>
                                <input
                                  type="text"
                                  placeholder="What's your name?"
                                  id='name'
                                  onChange={formik.handleChange}
                                  value={formik.values.name}
                                  className='bg-[#ECF0F3] text-start rounded py-[5px] px-[10px] w-[100%]'/>
                            </label>
                        {formik.errors.name && formik.touched.name && <div className='text-[#fb3636] text-start mt-[5px] pl-[10px]'>{formik.errors.name}</div>} 
                      <label 
                        className="flex flex-col mt-[20px]" 
                        htmlFor="">
                          <span className='pl-[10px] text-[#414A4E] text-start font-bold'>Your Email</span>
                          <input 
                            type="text"
                            id='email'
                            placeholder="What's your email?"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className='bg-[#ECF0F3] rounded py-[5px] px-[10px] w-[100%]'/>
                        </label> 
                        {formik.errors.email && formik.touched.email && <div className='text-[#fb3636] text-start mt-[5px] pl-[10px]'>{formik.errors.email}</div>} 
                      <label 
                        className="flex flex-col mt-[20px]" 
                        htmlFor="">
                          <span className='pl-[10px] text-[#414A4E] text-start font-bold'>Your Message</span>
                            <textarea 
                              name=""
                              id="message"
                              value={formik.values.message}
                              onChange={formik.handleChange}
                              rows="5"
                              className='bg-[#ECF0F3] rounded py-[10px] px-[10px] max-h-[150px]'
                              placeholder="What do you want to say?"
                              ></textarea>
                        </label>
                      {formik.errors.message && formik.touched.message && <div className='text-[#fb3636] text-start mb-[20px] mt-[5px] pl-[10px]'>{formik.errors.message}</div>}
                      <button 
                        className='h-[30px] w-[180px] bg-[#414A4E] text-white rounded text-[20px] flex justify-center text-center lg:mt-0 mt-[10px] lg:ml-[10px]'
                        type="submit">Send</button>
                    </form>
                    </div>
              </div>
            </Rodal>
        </div>
    )
  } 
}

export default Modal;

