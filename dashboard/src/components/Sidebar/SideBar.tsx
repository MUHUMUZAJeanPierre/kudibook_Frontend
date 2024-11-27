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
        { icon: <RxDashboard />, text: 'Dashboard' },
        { icon: <LuListTodo />, text: 'My to-do' },
        { icon: <MdRequestQuote />, text: 'Request from' },
        { icon: <TbReportSearch  />, text: 'Reports' },
    ];

    const incomingDeadlineItems: MenuItem[] = [
        { 
            icon: <FaSortAmountUpAlt  />, 
            text: 'Beling Mobile App' },
        { icon: <FaSortAmountUpAlt  />, text: 'Landingpage Beling' },
        { icon: <FaSortAmountUpAlt />, text: 'Beling Admin CMS' },
    ];

    const myProjectItems: MenuItem[] = [
        { icon: <FaFolder  />, text: 'Beling Mobile App' },
        { icon: <FaFolder  />, text: 'Beling Admin CMS' },
        { icon: <FaFolder />, text: 'Reports' },
    ];

    return (
        <div className="m-1 rounded-t-[0.625rem] w-full sm:w-[19%] h-full border-gray-200 sticky lg:top-0 lg:overflow-hidden sm:overflow-auto bg-[#f6f8fa]">
          <div className="h-screen overflow-y-auto scrollbar-hidden flex flex-col p-2 gap-6">
          <div className="flex flex-col p-2 gap-6">
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <Profile />
              <Search />
            </div>
            <Section title="Main Menu" items={mainMenuItems} />
            <Section title="Incoming Deadline" items={incomingDeadlineItems} />
            <Section title="My Project" items={myProjectItems} />
          </div>
          </div>
        </div>
    );
};

export default Sidebar;
