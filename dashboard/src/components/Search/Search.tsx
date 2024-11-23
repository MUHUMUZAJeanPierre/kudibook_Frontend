import React from 'react';
import { FiShare2 } from "react-icons/fi";
import { AiOutlineVerticalRight } from "react-icons/ai";

const Search: React.FC = () => {
    return (
        <div className='flex flex-wrap justify-center lg:justify-start gap-4 border border-gray-200 p-1 rounded-[5px] w-full max-w-md'>
            <input
                type="text"
                placeholder='Search'
                className='border-none bg-transparent outline-none py-1 px-2 text-sm flex-1 min-w-[100px]'
            />
            <div className='flex justify-center gap-2 items-center'>
                <div className='text-gray-500 border border-gray-200 rounded-[5px] bg-white sm:flex justify-center hidden items-center w-8 h-8'>
                    <FiShare2 size={16}  />
                </div>
                <div className='text-gray-500 border border-gray-200 rounded-[5px] bg-white sm:flex hidden justify-center items-center w-8 h-8'>
                    <AiOutlineVerticalRight size={16} /> 
                </div>
            </div>
        </div>
    );
};

export default Search;
