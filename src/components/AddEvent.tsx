import axios from 'axios';
import React, { useState } from 'react'
import { Modal } from './Modal';
import {LockOpen, Lock} from '@mui/icons-material';

export const AddEvent:any = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState< File | null >(null);
  const [selectedBlob, setSelectedBlob] = useState<string | null>(null);
  const [selectPrivat, setPrivat] = useState<string | boolean | null>(true);

  const defaultPicture = "/static/media/noun-addImage.d2c768147ee187d02b01.png"

  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    is_public: '',
    start_at: '',
    end_at: '',
    entry_fee: '',
    capacity: '',
    clubId: '',
    addressId:'',
    image: { name: `Default Picture`, type: 'image/jpg', url: defaultPicture, description: 'Default Picture' },
    createdAt: '',
    updatedAt: ''
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  }
  

  
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
            console.log(file)

            
            
      const url = URL.createObjectURL(file);
      setSelectedBlob(url);
    };

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
  };




  const handleSubmit = async () => {
      try {

    const formData: any = new FormData();
    
    if(selectedFile){
    formData.append('image', selectedFile);
  }

  Object.entries(newEvent).forEach(([key, value]) => {
  if (key !== 'image') {
      formData.append(key, value);
  }
  });

  const formDataObject = Object.fromEntries(formData.entries());
  console.log(formDataObject);
    

      const response = await axios.post('http://localhost:3000/Events', formData);
      console.log(response.data);
      closeModal();
      } catch (error) {
      console.error('Error adding Event', error);
      }
  }



  return (
    <div className="w-80 h-350 rounded-xl justify-center hover:bg-gray-200 duration-700 ease-in-out" onClick={openModal} >
      <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="0.5" 
        stroke="currentColor" 
        className="scale-75 text-gray-400 px-24 py-28 hover:stroke-gray-500 duration-500 ease-in-out">
          <path stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <Modal isOpen={modalOpen} onClose={closeModal} handleSubmit={handleSubmit} typeOfContent='Event'>
            
      <form className="flex justify-between content-center px-4">
    <label
        className='bg-gray-100 mb-8 w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer overflow-hidden'
    >
        <img
            src={selectedBlob || defaultPicture}
            className={selectedBlob ? 'object-cover rounded-full w-full h-full' : 'object-scale-down h-12 opacity-30'}
            alt="Event"
        />
        <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            alt="Event"
        />
    </label>

    <div className='flex-col gap-2 flex-end items-center'>
        <div className='place-self-end'>
            <p className="text-xs mb-2 ml-2 text-[#00000080]">Name</p>
            <input
                className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:-outline"
                type="text"
                name="name"
                value={newEvent.name}
                onChange={handleChange}
            />
        </div>
        <div className='place-self-end mt-6'>
            <p className="text-xs mb-2 ml-2 text-[#00000080]">Description</p>
            <textarea
                className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="description"
                value={newEvent.description}
                onChange={handleChange}
                rows={4}
            />
        </div>
    </div>
</form>
<form className="grid grid-cols-2 gap-y-5 gap-x-8 px-4">
    <div>
        <p className="text-xs mb-2 ml-2 text-[#00000080]">Address</p>
        <input
            className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-[#00000080] text-md leading-tight focus:outline-none focus:shadow-outline aria-required"
            type="text"
            name="addressId"
            placeholder="street, number, postcode"
            value={newEvent.addressId}
            onChange={handleChange}
        />
    </div>
    <div className=''>
        <p className="text-xs mb-2 ml-2 text-[#00000080]">Public/Private</p>
        <button className='p-4 bg-gray-100 rounded-full' type="button" onClick={()=>setPrivat(!selectPrivat)}>
        {selectPrivat ? <Lock color='disabled'/> : <LockOpen color='disabled'/>}
        </button>

    </div>
    <div>
        <p className="text-xs mb-2 ml-2 text-[#00000080]">Start At</p>
        <input
            className="py-2 pl-3 pr-16 text-[#00000080] focus:outline-none  focus:shadow-outline aria-required"
            type="date"
            name="start_at"
            value={newEvent.start_at}
            onChange={handleChange}
        />
    </div>
    <div className='place-self-end'>
        <p className="text-xs mb-2 ml-2 text-[#00000080]">End At</p>
        <input
            className="py-2 pl-3 pr-16 text-[#00000080] focus:outline-none focus:shadow-outline aria-required"
            type="date"
            name="end_at"
            value={newEvent.end_at}
            onChange={handleChange}
        />
    </div>
    <div>
        <p className="text-xs mb-2 ml-2 text-[#00000080]">Entry Fee</p>
        <input
            className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"
            type="number"
            name="entry_fee"
            value={newEvent.entry_fee}
            onChange={handleChange}
        />
    </div>
    <div className='place-self-end'>
        <p className="text-xs mb-2 ml-2 text-[#00000080]">Capacity</p>
        <input
            className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"
            type="number"
            name="capacity"
            value={newEvent.capacity}
            onChange={handleChange}
        />
    </div>

</form>

        </Modal>
    </div>
  )
}   