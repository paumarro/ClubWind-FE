    import { Modal } from './Modal';
    import React, { useState } from 'react';
    import axios from "axios";
    import { CloseIcon } from './CloseIcon';
    import addImage from "../imgs/noun-addImage.png";
import { type } from 'os';

    export const AddMember = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState< File | null >(null);
    const [selectedBlob, setSelectedBlob] = useState<string | File | null>(null);


    const defaultProfile = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

    const [newMember, setNewMember] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        image: { name: `Default Profile Picture`, type: 'image/jpg', url: defaultProfile, description: 'Default Profile Picture' },
        address: { street_name: '', street_number: 0, post_code: '', 'country': '', 'floor': '', 'apartment': '' },
        email: '',
        phone: '',
        roleId: 1,
        date_of_entry: '',
        gender: '',
        clubId: 1
      });
 
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
/*
    const handleBlur = (e) => {
        const { name, value } = e.target;
    if (name === 'address') {
      const addressParts = value.split(',');
      let street_name = addressParts[0] || '';
      const street_number = addressParts[1] || '';
      const post_code = addressParts[2] || '';
      setNewMember((prevMember) => ({
        ...prevMember,
        address: {
          ...prevMember.address,
          street_name,
          street_number: street_number ? Number(street_number) : 0,
          post_code,
            },
          }));
    street_name = addressParts
        } 
      };
*/
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewMember((prevMember) => ({
            ...prevMember,
            [name]: value,
          }));
        
      }
      
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
              console.log(file)


        const url = URL.createObjectURL(file);
        setSelectedBlob(url);


      /*   setNewMember((prevMember) => ({
          ...prevMember,
          image: {
            ...prevMember.image,
            url: file.name,
            type: file.type,
            name: `${prevMember.first_name}'s Profile Picture`,
            description: `${prevMember.first_name} ${prevMember.last_name}'s Profile Picture`
          }
        })); */
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

    Object.entries(newMember).forEach(([key, value]) => {
    if (key !== 'image') {
        formData.append(key, value);
    }
    });

    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);
      

        const response = await axios.post('http://localhost:3000/members', formData);
        console.log(response.data);
        closeModal();
        } catch (error) {
        console.error('Error adding member', error);
        }
    };


    return (
        <div className="flex flex-col justify-center items-center px-10 py-8 mx-2 my-2  rounded-xl">
        <div className="w-24 h-24 border-2 border-gray-300 bg-white rounded-full p-8 flex items-center m-4 duration-1000 ease-in-out cursor-pointer hover:border-gray-400 duration-1000 ease-in-out" onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="text-gray-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>

        <p className="text-lg font-semibold mt-1 text-center text-gray-300"  onClick={openModal}>Add Member</p>

        <Modal isOpen={modalOpen} onClose={closeModal}>
            <div className="px-4" onClick={handleModalClick}>
            <div className="flex">
                <label
                className='bg-gray-100 mt-5 mb-10 mr-10 w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-pointer overflow-hidden'
                >
                <img
                    src={selectedBlob || addImage}
                    className={selectedBlob ? 'object-cover rounded-full w-full h-full' : 'object-scale-down h-12 opacity-30'}
                />
                <input
                    type="file"
                    accept='image/*'
                    className="hidden"
                    name='image'
                    onChange={handleFileChange}
                    alt="Member"
                />
                </label>

                <div className='flex-col justify-center items-center'>
                <div className='place-self-end'>
                    <p className="font-semibold mb-2 ml-2 text-gray-600">First Name</p>
                    <input
                    className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:-outline"
                    type="text"
                    name="first_name"
                    value={newMember.first_name}
                    onChange={handleChange}
                    />
                </div>
                <div className='place-self-end mt-2'>
                    <p className="font-semibold mb-2 ml-2 text-gray-600">Last Name</p>
                    <input
                    className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="last_name"
                    value={newMember.last_name}
                    onChange={handleChange}
                    />
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
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="address"
                placeholder="street, number, postcode"
                //value={newMember.address.street_name}
                //onChange={handleChange}
                //onBlur={handleBlur}
                />
            </div>
            <div className='place-self-end'>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Email</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="email"
                value={newMember.email}
                onChange={handleChange}
                />
            </div>
            <div>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Phone</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="phone"
                value={newMember.phone}
                onChange={handleChange}
                />
            </div>
            <div className='place-self-end'>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Role</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="role"
                value={newMember.roleId}
                onChange={handleChange}
                />
            </div>
            <div>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Date of Entry</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="date_of_entry"
                value={newMember.date_of_entry}
                onChange={handleChange}
                />
            </div>
            <div className='place-self-end'>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Gender</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="gender"
                value={newMember.gender}
                onChange={handleChange}
                />
            </div>
            <div>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Birthday</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="birthday"
             
                onChange={handleChange}
                />
            </div>
            <div className='place-self-end'>
                <p className="font-semibold mb-2 ml-2 text-gray-600">Status</p>
                <input
                className={"appearance-none border rounded-xl py-2 pl-3 mb-6 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                type="text"
                name="status"
            
                onChange={handleChange}
                />
            </div>
            <button className='absolute bottom-6 right-10 px-4 py-1 bg-blue-100 border-none rounded-xl text-gray-600 hover:bg-blue-200 ease-in-out duration-300' onClick={handleSubmit}>Add Member</button>
            </div>
        </Modal>
        </div>
        );
    };
