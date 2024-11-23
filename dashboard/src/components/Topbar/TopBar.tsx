import React from 'react';
import {
    IoIosArrowBack,
    IoMdContact,
} from "react-icons/io";
import {
    FaCaretDown,
    FaCalendarMinus,
    FaChartGantt,
    FaLink,
    FaChrome,
} from "react-icons/fa6";
import { RxDividerVertical, RxSlash } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { FiShare2 } from "react-icons/fi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { TbTimelineEventX } from "react-icons/tb";
import { PiSlackLogoThin } from "react-icons/pi";
import { CgMail } from "react-icons/cg";
import { LuKanbanSquare } from "react-icons/lu";
import { CiCircleList } from "react-icons/ci";
import img from '../../assets/Screenshot 2024-11-21 143106.png';
import quarte from '../../assets/quarte.png';
import { IoChevronForwardOutline } from "react-icons/io5";

const Topbar: React.FC = () => {
    return (
        <div className="rounded-t-[10px] m-2 border border-gray-200">
            {/* First Row */}
            <div className="rounded-t-[10px] border-b-[1.5px] border-gray-200 flex flex-col md:flex-row items-center justify-center md:justify-between p-4 gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    <div className="flex items-center gap-1">
                        <IoIosArrowBack />
                        <IoChevronForwardOutline className="text-gray-400" />
                    </div>
                    <RxDividerVertical className="text-gray-400" />
                    <p className="text-sm">My Pages</p>
                    <RxSlash className="text-gray-400" />
                    <p className="text-sm">Emura Project</p>
                    <RxSlash className="text-gray-400" />
                    <p className="text-sm ">Beling Pottery</p>
                </div>

                <div className="flex items-center gap-2 justify-center">
                    <GoPlus />
                    <p className="text-sm">New Tab</p>
                    <RxDividerVertical className="text-gray-400" />
                    <BsBookmark className="text-gray-400" />
                    <FiShare2 className="text-gray-400" />
                    <BsThreeDots className="text-gray-400" />
                </div>
            </div>

            {/* Second Row */}
            <div className="p-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
                    <div className="w-10 h-10 bg-[#cfb054] rounded-[20px]">
                        <img src={img} className="w-full h-full rounded-[8px] object-cover" alt="Project" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <p className="font-medium text-gray-600">Belling-Pottery</p>
                            <FaCaretDown className="text-gray-600" />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-[12px]">Timeline: </label>
                                <p className="text-[12px] font-medium text-gray-700">Aug 16, 2024 - Sep 16, 2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-[12px]">Client:</label>
                                <p className="text-[12px] font-medium text-gray-700">Ben Barlow</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-[12px]">Status: </label>
                                <p className="text-orange-300 text-[12px] font-medium">In Progress</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <img src={quarte} className="w-24 h-8 rounded-full object-cover" alt="User" />
                    <div className="flex items-center bg-[#745bf7] px-3 py-1 rounded-md">
                        <IoMdContact className="text-white" />
                        <button className="text-white px-4 py-1 hover:bg-blue-600 transition-colors duration-200">Invite</button>
                    </div>
                </div>
            </div>

            {/* Third Row */}
            <div className="p-4 flex flex-col md:flex-row md:flex-wrap justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4 border border-gray-200 rounded-md px-2 py-1 w-full md:w-auto">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-[7px] shadow-md">
                        <LuKanbanSquare className="text-[13px]" />
                        <p className="text-[13px]">Kanban</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendarMinus className="text-[13px]" />
                        <p className="text-[13px]">Calendar</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaChartGantt className="text-[13px]" />
                        <p className="text-[13px]">Gantt</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CiCircleList className="text-[13px]" />
                        <p className="text-[13px]">List</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbTimelineEventX className="text-[13px]" />
                        <p className="text-[13px]">Timeline</p>
                    </div>
                </div>

                <div className="flex items-center justify-evenly gap-1 border border-gray-200 p-2 rounded-md w-full md:w-auto mt-4 md:mt-0">
                    <FaLink className="text-[13px]" />
                    <p className="text-[13px]">Integrate</p>
                    <PiSlackLogoThin className="text-[13px]" />
                    <RxDividerVertical className="text-gray-500" />
                    <CgMail className="text-[13px]" />
                    <RxDividerVertical className="text-gray-500" />
                    <FaChrome className="text-[13px]" />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
