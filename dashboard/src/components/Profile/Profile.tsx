import React from 'react';
import { LuChevronsUpDown } from "react-icons/lu";
import img from '../../assets/logo_2.png';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-evenly gap-2 border border-gray-200 items-center rounded-[5px] p-2 w-full max-w-md">
      <div className="w-10 h-10 bg-red-400">
        <img 
          src={img} 
          alt="Logo" 
          className="w-full h-full object-cover rounded-sm" 
        />
      </div>
      <div>
        <p className="font-medium text-[13px]">Judha Maygustya</p>
        <p className="text-[#b8bbb9] text-[10px]">judha@emura.studio</p>
      </div>
      <div className="lg:flex hidden">
        <LuChevronsUpDown className="text-gray-500" />
      </div>
    </div>
  );
};

export default Profile;
