import React, { useState,} from 'react';
import {Modal} from './Modal';
import { CloseIcon } from './CloseIcon';
import axios from 'axios';
import { DeleteMember } from './DeleteMember';

interface MemberProps {
    first_name: string;
    last_name: string;
    birthday: string;
    img: string;
    memberId: number;
    address?: any | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    role?: string | undefined;
    date_of_entry?: string | undefined;
    gender?: string | undefined;
  }
  

  export const Member: React.FC<MemberProps> = ({
    first_name,
    last_name,
    birthday,
    img,
    memberId,
    address,
    email,
    phone,
    role,
    date_of_entry,
    gender,
    
  }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [info, setNewInfo] = useState({
    first_name,
    last_name,
    birthday,
    img,
    address,
    email,
    phone,
    role,
    dateOfEntry: date_of_entry,
    gender,
  });

  const [changedInfo, setChangedInfo] = useState({});


  const openModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const updateInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangedInfo((prevChangedInfo) => ({
      ...prevChangedInfo,
      ...(info[name] !== value ? { [name]: value } : {})
    }));
  };
  
  const updatedData = { ...changedInfo };


  const handleSubmit = async () => {
    try {
      axios.interceptors.request.use(request => {
        console.log('Request:', request);
        return request;
      }, error => {
        console.error('Request error:', error);
        return Promise.reject(error);
      });
      
      axios.interceptors.response.use(response => {
        console.log('Response:', response);
        return response;
      }, error => {
        console.error('Response error:', error);
        return Promise.reject(error);
      });

      const response = await axios.put( `http://localhost:3000/members/${memberId}`, updatedData);
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error('Error updating member', error);
      console.log(info);
      
    }
  };


  return (
    <div
      className="flex-col px-10 py-8 mx-2 my-2 rounded-xl hover:bg-slate-50 ease-in-out"
      onClick={openModal}
    >
      <img
        className="drop-shadow rounded-full scale-75"
        src={img}
        alt="Member"
      />
      <p className="text-lg font-semibold mt-1 text-center">
        {first_name} {last_name}
      </p>

     
    <Modal isOpen={modalOpen} onClose={closeModal} typeOfContent='Member'>
      <div className="m-5" onClick={handleModalClick}>
        <div className="flex">
          <img
            className="mt-5 mb-10 mr-10 w-32 h-32 rounded-full"
            src={img}
            alt="Member"
          />
          <div>
            <h1 className="text-4xl font-semibold mt-10">
              {first_name} {last_name}
            </h1>
            <p className="text-xl text-gray-500 mt-2">ID {memberId}</p>
          </div>
          <button className="absolute top-4 right-4 mt-4 px-4 py-2 flex-auto" onClick={closeModal}>
          <CloseIcon />
        </button>
        </div>
        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mb-8 ">
          <div>
            <p className="font-semibold mb-2 ml-2">Address</p>
            <input
  className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline aria-required	"}
  type="text"
  defaultValue={`${address?.street_name + ', ' + address?.street_number + ', ' + address?.post_code}`}

/>
          </div>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2">Email</p>
            <input className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline"} type="text" onChange={updateInfo} name='email' defaultValue={email} />
          </div>
          <div>  
            <p className="font-semibold mb-2 ml-2">Phone</p>
            <input className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline"} type="text" onChange={updateInfo} name='phone' defaultValue={phone} />
          </div>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2">Role</p>
            <input className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline"} type="text" onChange={updateInfo} name='role' defaultValue={role} />
          </div>
          <div>
            <p className="font-semibold mb-2 ml-2">Zip</p>
            <input className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline"} type="text" onChange={updateInfo} name='date_of_entry' disabled defaultValue={date_of_entry} />
          </div>
          <div className='place-self-end'>
            <p className="font-semibold mb-2 ml-2">Gender</p>
            <input className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline aria-readonly"} type="text" onChange={updateInfo} name='gender' disabled defaultValue={`${gender === 'M' ? 'Male' : 'Female'}`} />
          </div>
          <div>
            <p className="font-semibold mb-2 ml-2">Birthday</p>
            <input className={" bg-gray-100 appearance-none border-none rounded-xl py-2 pl-3 pr-16 text-slate-500 leading-tight focus:outline-none focus:shadow-outline"} type="text" onChange={updateInfo} name='birthday' defaultValue={birthday} />
          </div>
          
          <DeleteMember memberId={memberId} onDelete={closeModal}/>

          <button className='absolute bottom-6 right-11 px-4 py-1 bg-blue-100 border-none rounded-xl text-gray-600 hover:bg-blue-200 ease-in-out duration-300' onClick={handleSubmit}>Update Member</button>

        </div>
      </div>
    </Modal>
    </div>
  );
};