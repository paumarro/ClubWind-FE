import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {


  const closeModal = () => {
    onClose();
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);

    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed  z-10 inset-0 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div
        className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
<div
  className={`absolute inset-0 bg-white rounded-xl transition-opacity ease-in-out duration-1000 ${isOpen ? 'opacity-40' : 'opacity-0'}`}
  aria-hidden="true"
  onClick={closeModal}
></div>

        <span   
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

          <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="px-4 py-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};