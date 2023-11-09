import React, { useState } from 'react'
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';

const Modal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const show = () => {
    setIsOpenModal(true)
  }
  const hide = () => {
    setIsOpenModal(false)
  }

  return (
    <div>
    <div className='flex px-[20px] pt-[10px] pb-[5px] bg-[#363d40] text-white'>
      <p className='md:text-[16px] text-[14px] mr-[20px]'>Хочеш підтримати автора своїм відгуком?</p>
      <button
        className='h-[30px] w-[180px] rounded text-[20px] flex justify-center text-center border-[1px] lg:mt-0 mt-[10px] lg:ml-[10px]'
        onClick={show}>
        Тицяй
      </button>
    </div>

        <Rodal visible={isOpenModal} width={600} height={400} onClose={hide}>
          <div className="">
                <div className="modal-title inline-block text-center mt-[10px]">
                  <h1>Відправ відгук автору на пошту. Йому буде приємно:)</h1>
                </div>
                <div className="modal-body flex-[50%] flex justify-center text-center">
                  <input type="text" />
                </div>
                <div className="modal-footer">
                  <button
                    className=''
                    onClick={() => closeModal(false)}>Cancel</button>
                </div>
          </div>
        </Rodal>
    </div>
  )
}

export default Modal;