import React from "react";
import { LuChevronsUpDown } from "react-icons/lu";
import img from "../../assets/logo_2.png";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-evenly gap-2 border border-gray-200 items-center rounded-[0.3rem] p-2 w-full max-w-md">
      <div className="w-8 h-8">
        <img
          src={img}
          alt="Logo"
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div>
        <p className="font-medium text-[0.8rem]">Judha Maygustya</p>
        <p className="text-[#b8bbb9] text-[0.75rem]">judha@emura.studio</p>
      </div>
      <div className="lg:flex hidden">
        <span className="text-gray-500">
          <LuChevronsUpDown />
        </span>
      </div>
    </div>
  );
};

export default Profile;
