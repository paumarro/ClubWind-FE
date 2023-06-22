import React, { useEffect, useState } from 'react';
import axios from "axios";

import { AddMember } from "./AddMember";
import { MemberIcon } from "./MemberIcon";


interface Member {
    first_name: string;
    last_name: string;
    birthday: string;
    img: string;
    address: object;
    memberId: number;
    email: string;
    phone: string;
    role: string;
    dateOfEntry: string;
    gender: string;
    status: string;
  }



export const MemberBox:React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        console.log('useEffect is running'); // Step 1
    
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/members');
                console.log('API response', response.data); // Step 2
    
                const mappedData = response.data.map((member: any) => ({
                  first_name: member.first_name,
                  last_name: member.last_name,
                  birthday: member.birthday || null,
                  img: member.image?.url || '' ,  
                  address: member.address,  
                  memberId: member.id,
                  email: member.email,
                  phone: member.phone || '',
                  role: member.role.name,  
                  dateOfEntry: member.date_of_entry || null,
                  gender: member.gender || '',
                  status: member.status  
                }));
    
                setMembers(mappedData);
                console.log('Mapped data', mappedData); // Step 2
    
            } catch (error) {
                console.error('Error fetching data', error); // Step 3
            }
        };
    
        fetchData();
    }, []);
    
    
    return(
        <div className="drop-shadow-md rounded-2xl bg-white w-full py-20 mb-20 border-[#F5F5F5]">

        <div className="flex gap-7 absolute right-12 top-10 w-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="mx-2 my-2 w-6 h-6 hover:fill-gray-700 ">
            <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        </svg>

            <input className="shadow bg-gray-200 appearance-none border rounded-xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Search" />
        </div>
        
            <div className="mx-2 my-2 grid gap-4 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-3">
                
                <AddMember />
                {members.map((member) => (
                    
    <MemberIcon
        key={member.memberId}
        first_name={member.first_name}
        last_name={member.last_name}
        birthday={member.birthday}
        img={member.img}
        address={member.address}
        memberId={member.memberId}
        email={member.email}
        phone={member.phone}
        role={member.role}
        dateOfEntry={member.dateOfEntry}
        gender={member.gender}
        status={member.status}
    />
))}
                 
            </div>

        </div>
    )
};