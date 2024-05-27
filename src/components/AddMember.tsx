    import { Modal } from './Modal';
    import React, { useState } from 'react';
    import axios from "axios";
    import addImage from "../imgs/noun-addImage.png";

    export const AddMember = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState< File | null >(null);
    const [selectedBlob, setSelectedBlob] = useState<string | null>(null);


    const defaultProfile = 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

    const [newMember, setNewMember] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        image: { name: `Default Profile Picture`, type: 'image/jpg', url: defaultProfile, description: 'Default Profile Picture' },
        address: { street_name: '', street_number: 0, post_code: '', 'floor': '', 'apartment': '' },
        country: '',
        email: '',
        phone: '',
        roleId: 1,
        zip: '',
        gender: '',
        clubId: 1
      });
 
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    }; 

    const handleAddress = (e) => {
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

const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the change is for the address field
    if (Object.hasOwn(newMember.address, name)) {
        setNewMember((prevMember) => ({
            ...prevMember,
            address: {
                ...prevMember.address,
                [name]: value,
            },
        }));
    } else {
      // Handle changes for fields not in the address object
      setNewMember((prevMember) => ({
        ...prevMember,
        [name]: value,
      }));
    }
  };
  
      
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
              console.log(file)


        const url = URL.createObjectURL(file);
        setSelectedBlob(url);


        setNewMember((prevMember) => ({
          ...prevMember,
          image: {
            ...prevMember.image,
            url: file.name,
            type: file.type,
            name: `${prevMember.first_name}'s Profile Picture`,
            description: `${prevMember.first_name} ${prevMember.last_name}'s Profile Picture`
          }
        })); 
      }; 
      

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };


    const handleSubmit = async () => {
        try {

            console.log(newMember)

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
        <div className="flex flex-col justify-center items-center px-8 py-8 mx-2 my-2  rounded-3xl ">
            <div className="w-24 h-24 rounded-full p-8 flex items-center duration-1000 ease-in-out cursor-pointer hover:bg-gray-100 duration-700 ease-in-out" onClick={openModal}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="text-gray-400 hover:stroke-gray-500 duration-500 ease-in">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </div>

            {/* <p className="text-lg text-xs mt-1 text-center text-gray-300"  onClick={openModal}>Add Member</p> */}

        <Modal isOpen={modalOpen} onClose={closeModal} handleSubmit={handleSubmit} typeOfContent='Member'>
            
            <div className="px-4" onClick={handleModalClick}>
            <form className="flex justify-between content-center">
                <label
                className='bg-gray-100 mb-8 w-44 h-44 rounded-full flex flex-col items-center justify-center cursor-pointer overflow-hidden'
                >
                <img
                    src={selectedBlob || addImage}
                    className={selectedBlob ? 'object-cover rounded-full w-full h-full' : 'object-scale-down h-12 opacity-30'}
                    alt='profile'
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

                <div className='flex-col gap-2 flex-end items-center' >
                <div className='place-self-end'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">First Name</p>
                    <input
                    className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:-outline"
                    type="text"
                    name="first_name"
                    value={newMember.first_name}
                    onChange={handleChange}
                    />
                </div>
                <div className='place-self-end mt-6'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Last Name(s)</p>
                    <input
                    className="appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="last_name"
                    value={newMember.last_name}
                    onChange={handleChange}
                    />
                </div>
                </div>
            </form>
            </div>
            <form className="grid grid-cols-2 gap-y-5 gap-x-8 px-4">
                <div>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Address</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-[#00000080] text-md leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="address"
                    placeholder="street, number"
                    value={newMember.address.street_name}
                    onChange={handleAddress}
                    />
                </div>
                <div className='place-self-end'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Country</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="country"
                    value={newMember.country}
                    onChange={handleChange}
                    />
                </div>
                <div className='place-self-end'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Email</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="email"
                    value={newMember.email}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Phone</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="phone"
                    value={newMember.phone}
                    onChange={handleChange}
                    />
                </div>
                <div className='place-self-end'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Role</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="role"
                    value={newMember.roleId}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Zip</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="zip"
                    value={newMember.zip}
                    onChange={handleChange}
                    />
                </div>
                <div className='place-self-end'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Gender</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="gender"
                    value={newMember.gender}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Birthday</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="birthday"
                
                    onChange={handleChange}
                    />
                </div>
                {/* <div className='place-self-end'>
                    <p className="text-xs mb-2 ml-2 text-[#00000080]">Status</p>
                    <input
                    className={"appearance-none border rounded-xl py-2 pl-3 mb-6 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline aria-required"}
                    type="text"
                    name="status"
                
                    onChange={handleChange}
                    />
                </div> */}

            </form>
        </Modal>
        </div>
        );
    };
