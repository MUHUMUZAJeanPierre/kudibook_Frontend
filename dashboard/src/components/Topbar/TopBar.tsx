import React from 'react';
import {
    IoIosArrowBack,
    IoMdContact,
} from "react-icons/io";
import {
    FaCaretDown,
    FaChartGantt,
} from "react-icons/fa6";
import { RxDividerVertical, RxSlash } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { FiShare2 } from "react-icons/fi";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { TbTimelineEventX } from "react-icons/tb";
import { IoIosLink } from "react-icons/io";
import { LuKanbanSquare } from "react-icons/lu";
import { CiCalendarDate } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import img from '../../assets/Screenshot 2024-11-21 143106.png';
import quarte from '../../assets/quarte.png';
import { IoChevronForwardOutline } from "react-icons/io5";
import TeamAvatars from '../TeamAvatars/TeamAvatars';

const Topbar: React.FC = () => {
    return (
        <div className="rounded-t-[0.625rem]  border border-gray-200">
            <div className="rounded-t-[0.625rem] border-b-[0.029rem] border-gray-200 flex flex-col md:flex-row items-center justify-center md:justify-between p-4 gap-4">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                    <div className="flex items-center gap-1">
                        <span>
                            <IoIosArrowBack />
                        </span>
                        <span className="text-gray-400">
                            <IoChevronForwardOutline />
                        </span>
                    </div>
                    <span className="text-gray-400">
                        <RxDividerVertical />
                    </span>
                    <p className="text-sm">My Pages</p>
                    <span className="text-gray-400">
                        <RxSlash />
                    </span>
                    <p className="text-sm">Emura Project</p>
                    <span className="text-gray-400">
                        <RxSlash />
                    </span>
                    <p className="text-sm ">Beling Pottery</p>
                </div>

                <div className="flex items-center gap-2 justify-center">
                    <GoPlus />
                    <p className="text-sm">New Tab</p>
                    <span className="text-gray-400" >
                        <RxDividerVertical />
                    </span>
                    <span className="text-gray-400">
                        <BsBookmark />
                    </span>
                    <span className="text-gray-400" >
                        <FiShare2 />
                    </span>

                    <span className="text-gray-400">
                        <BsThreeDots />
                    </span>
                </div>
            </div>

            {/* Second Row */}
            <div className="p-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
                    <div className="w-10 h-10 rounded-[1.2rem]">
                        <img src={img} className="w-full h-full rounded-[0.5rem] object-cover" alt="Project" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <p className="font-medium text-gray-600">Belling-Pottery</p>
                            <span className="text-gray-600">
                                <FaCaretDown />
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-[0.75rem]">Timeline: </label>
                                <p className="text-[0.75rem] font-medium text-gray-700">Aug 16, 2024 - Sep 16, 2024</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-[0.75rem]">Client:</label>
                                <p className="text-[0.75rem] font-medium text-gray-700">Ben Barlow</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-[0.75rem]">Status: </label>
                                <p className="text-orange-300 text-[0.75rem] font-medium">In Progress</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <TeamAvatars />
                    {/* <img src={quarte} className="w-24 h-8 rounded-full object-cover" alt="User" /> */}
                    <div className="flex items-center bg-[#745bf7] px-3 py-1 rounded-md">
                        <span className="text-white">
                            <IoMdContact />
                        </span>
                        <button className="text-white px-4 py-1  transition-colors duration-200">Invite</button>
                    </div>
                </div>
            </div>

            {/* Third Row */}
            <div className="p-4 flex flex-col md:flex-row md:flex-wrap justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-evenly gap-4 border border-gray-200 rounded-md px-2 py-1 w-full md:w-auto">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-[0.5rem] shadow-sm">
                        <span className="text-[0.75rem]">
                            <LuKanbanSquare />
                        </span>
                        <p className="text-[0.75rem]">Kanban</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[0.75rem]">
                            <CiCalendarDate />
                        </span>
                        <p className="text-[0.75rem]">Calendar</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[0.75rem]" >
                            <FaChartGantt />
                        </span>
                        <p className="text-[0.75rem]">Gantt</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[0.75rem]">
                            <CiCircleList />
                        </span>
                        <p className="text-[0.75rem]">List</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[0.75rem]">
                            <TbTimelineEventX />
                        </span>
                        <p className="text-[0.75rem]">Timeline</p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-[0.2rem] border border-gray-200 p-2 rounded-md w-full md:w-auto mt-4 md:mt-0">
                    <span className="text-[0.75rem]">
                        <IoIosLink />
                    </span>
                    <p className="text-[0.75rem]">Integrate</p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" className='w-2 h-2 object-cover  ' alt="" />
                    <span className="text-gray-500">

                        <RxDividerVertical />
                    </span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" className='w-2 h-2 object-cover' alt="" />
                    <span className="text-gray-500">

                        <RxDividerVertical />
                    </span>

                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/320px-Gmail_icon_%282020%29.svg.png" className='w-2 h-2 object-cover  ' alt="" />
                </div>
            </div>
        </div>
    );
};

export default Topbar;
