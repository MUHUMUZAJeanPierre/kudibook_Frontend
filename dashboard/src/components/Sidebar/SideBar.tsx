import React from 'react';
import { RxDashboard } from "react-icons/rx";
import { LuListTodo } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";
import { MdRequestQuote } from "react-icons/md";
import { FaFolder, FaSortAmountUpAlt } from "react-icons/fa";
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import Section from '../Section/Section';

interface MenuItem {
    icon: React.ReactNode;
    text: string;
}

const Sidebar: React.FC = () => {
    const mainMenuItems: MenuItem[] = [
        { icon: <RxDashboard className="text-gray-400" />, text: 'Dashboard' },
        { icon: <LuListTodo className="text-gray-400" />, text: 'My to-do' },
        { icon: <MdRequestQuote className="text-gray-400" />, text: 'Request from' },
        { icon: <TbReportSearch className="text-gray-400" />, text: 'Reports' },
    ];

    const incomingDeadlineItems: MenuItem[] = [
        { icon: <FaSortAmountUpAlt className="text-gray-400" />, text: 'Beling Mobile App' },
        { icon: <FaSortAmountUpAlt className="text-gray-400" />, text: 'Landingpage Beling' },
        { icon: <FaSortAmountUpAlt className="text-gray-400" />, text: 'Beling Admin CMS' },
    ];

    const myProjectItems: MenuItem[] = [
        { icon: <FaFolder className="text-gray-400" />, text: 'Beling Mobile App' },
        { icon: <FaFolder className="text-gray-400" />, text: 'Beling Admin CMS' },
        { icon: <FaFolder className="text-gray-400" />, text: 'Reports' },
    ];

    return (
        <div className="bg-[#f6f8fa] m-2 rounded-t-[10px] w-full sm:w-[20%] h-full border-gray-500">
            <div className="flex flex-col p-4 gap-6">
                <div className="flex flex-col gap-4 items-center sm:items-start">
                    <Profile />
                    <Search />
                </div>
                <Section title="Main Menu" items={mainMenuItems} />
                <Section title="Incoming Deadline" items={incomingDeadlineItems} />
                <Section title="My Project" items={myProjectItems} />
            </div>
        </div>
    );
};

export default Sidebar;
