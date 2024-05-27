import React, { useEffect, useState } from 'react';

export const MembersController = () => {

    const [searchQuery, setSearchQuery] = useState('');

    return(
        <div className="flex justify-self-end gap-5 w-200 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000080" className="w-10 h-10 bg-gray/10 rounded-full drop-shadow px-3 hover:bg-gray-100 duration-300">
                    <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                </svg>

                <input
                className="w-36 h-8 bg-gray-200 mt-[3px] appearance-none rounded-xl mr-2 pl-4 text-xs text-[#00000080] leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
        />
            </div>
    )
}