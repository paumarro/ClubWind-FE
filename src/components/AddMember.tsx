import { Modal } from './Modal';
import React, { useState } from 'react';
import axios from "axios";
import { CloseIcon } from './CloseIcon';
import addImage from "../imgs/noun-addImage.png"

export const AddMember = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const [selectedFile, setSelectedFile] =  useState<string | null>(null);

    const [newMember, setNewMember] = useState({
      first_name: '',
      last_name: '',
      birthday: '',
      img: '',
      address: { street_name: '', street_number: '', post_code: '' },
      email: '',
      phone: '',
      role: '',
      dateOfEntry: '',
      gender: '',
      status: ''
    });

    const openModal = () => {
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewMember({ ...newMember, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(URL.createObjectURL(e.target.files[0]));
      };

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
      };
    

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:3000/members', newMember);
        console.log(response.data);
        closeModal();
      } catch (error) {
        console.error('Error adding member', error);
      }
    };

    return (

    <div className="flex flex-col justify-center items-center px-10 py-8 mx-2 my-2  rounded-3xl "  onClick={openModal} >
        <div className="w-24 h-24 border-2 border-gray-300 bg-white rounded-full p-8 flex items-center m-4 hover:bg-slate-100 duration-1000 ease-in-out cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-gray-300" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

    </div>

    <p className="text-lg font-semibold mt-1 text-center text-gray-300">Add Member</p>
    
    <Modal isOpen={modalOpen} onClose={closeModal}>
    <div className="px-4" onClick={handleModalClick}>
        <div className="flex">
        <label 
    className='bg-gray-100 mt-5 mb-10 mr-10 w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-pointer overflow-hidden'
            >
                <img 
                    src={selectedFile || addImage} 
                    className={selectedFile ? 'object-cover rounded-full w-full h-full' : 'object-scale-down h-12 opacity-30'}
                />
            <input
            type="file"
            accept='image/*'
            className="hidden"
            onChange={handleFileChange}
            alt="Member"
            />
        </label>

          <div className='flex-col justify-center items-center'>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2 text-gray-600">First Name</p>
            <input className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:-outline" type="text" />
          </div>
            <div className='place-self-end mt-2'>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Last Name</p>
            <input className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>

          </div>
          <button className="absolute top-4 right-4 mt-4 px-4 py-2 flex-auto" onClick={closeModal}>
          <CloseIcon />
        </button>
        </div>
        </div>
        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mb-8 px-4">
          <div>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Address</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Email</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div>  
            <p className="font-semibold mb-2 ml-2 text-gray-600">Phone</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Role</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Date of Entry</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Gender</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div>
            <p className="font-semibold mb-2 ml-2 text-gray-600">Birthday</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
          <div className='place-self-end'>  
            <p className="font-semibold mb-2 ml-2 text-gray-600">Status</p>
            <input className={"appearance-none border rounded-xl py-2 pl-3 mb-6 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"} type="text" />
          </div>
        <button className='absolute bottom-6 right-10 px-4 py-1 bg-blue-100 border rounded-xl text-gray-600 hover:bg-blue-200' onClick={handleSubmit}>Add Member</button>

    </div>

      </Modal>

    </div>
    )
};
