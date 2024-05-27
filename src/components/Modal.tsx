import React, { MouseEventHandler, useEffect } from 'react';
import { CloseIcon } from './CloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit?:  MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  typeOfContent: string;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, handleSubmit, children, typeOfContent }) => {

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const closeModal = () => {
    onClose();
    document.body.style.overflow = 'auto';
  }; 

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className={`fixed top-0 left-0 flex justify-center items-center w-full h-full backdrop-blur-sm z-99 
    ${isOpen ? 'block' : 'hidden'}`} >

      <div className="flex justify-center items-center">
        <div className="bg-white rounded-xl text-left overflow-hidden shadow-md">
          <button className="mt-4 mr-2 px-4 py-2 float-right" onClick={closeModal}>
            <CloseIcon />
          </button>
          <div className="mt-16 px-4 py-4 sm:p-6">{children}</div>
            <button 
                className='float-right h-12 w-full px-4 text-semibold text-[#00000080] py-1 ml-8 mt-0 bg-gray-200 border-none hover:bg-blue-500 hover:text-white ease-in-out duration-300' 
                onClick={handleSubmit}>Add {typeOfContent}
            </button>
        </div>
      </div>
    </div>
  );
};
