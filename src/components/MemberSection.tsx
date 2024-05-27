import React, { useEffect, useState } from 'react';
import axios from "axios";

import { AddMember } from "./AddMember";
import { Member } from "./Member";
import { MembersController } from './MembersController';


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
    date_of_entry: string;
    gender: string;
}



export const MemberSection:React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

const [searchQuery, setSearchQuery] = useState('');
const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

    useEffect(() => {
    const filtered = members.filter((member) =>
        member.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMembers(filtered);
    }, [searchQuery, members]);


    useEffect(() => {
   
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/members');

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
                  date_of_entry: member.date_of_entry || null,
                  gender: member.gender || '',
                }));
    
                setMembers(mappedData);
    
            } catch (error) {
                console.error('Error fetching data', error); // Step 3
            }
        };
    
        fetchData();
    }, []);
    
    
    return(
        <>
        <MembersController />

        <div className="bg-white rounded-xl mx-2 my-2 grid gap-4 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
                
        <AddMember /> 

        {searchQuery !== ''
        ? filteredMembers.map((member) => (
            <Member
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
              date_of_entry={member.date_of_entry}
              gender={member.gender}
          />
      ))
    : members.map((member) => (
          <Member
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
              date_of_entry={member.date_of_entry}
              gender={member.gender}
          />
))}
        </div>
    </>
    )
};