import React from 'react';
import { BsPlusLg, BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { FaLink } from "react-icons/fa";
import { LuMessageSquareDashed } from "react-icons/lu";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import img from "../../assets/logo.png";
import fedelity_2 from "../../assets/federity_2.png";
import white_two from '../../assets/white_two.jpg';
import white_three from '../../assets/white_three.jpg'

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    priorityColor: string;
    category: string;
    progress: number;
    image?: string;
    showImage: boolean;
    assignees: string[];
    comments: number;
    links: number;
}

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    return (
        <div className="bg-[#ffffff] p-4 mt-4 rounded-lg shadow-inner">
            {/* Task Header */}
            <div className="flex justify-between mb-2">
                <div className="flex gap-1">
                    <div
                        className={`flex items-center justify-around bg-${task.priorityColor} w-auto px-3 py-1 rounded-[10px] shadow-md`}
                    >
                        <p className="text-red-500 font-semibold text-[10px]">{task.priority}</p>
                    </div>
                    <div className="flex items-center bg-gray-100 w-auto px-3 rounded-[10px] shadow-md">
                        <p className="text-blue-500 font-semibold text-[10px]">{task.category}</p>
                    </div>
                </div>
                <div>
                    <p className="font-medium text-gray-600">{task.id}</p>
                </div>
            </div>

            {task.showImage && (
                <div className="h-24 mb-2 bg-red-500 object-cover">
                    <img src={task.image} className="w-full h-full" alt="Task" />
                </div>
            )}

            {/* Task Details */}
            <div className="mb-3">
                <h1 className="text-[16px] font-semibold text-gray-600">{task.title}</h1>
                <p className="text-[12px] text-gray-600">{task.description}</p>
            </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2 text-gray-600">
                        <IoCheckmarkDoneCircleOutline className="text-gray-500" />
                        <p className="font-medium text-gray-600 text-[10px]">Done</p>
                    </div>
                    <div>
                        <p className="font-medium text-gray-600 text-[10px]">{task.progress}%</p>
                    </div>
                </div>
                <div className="w-full h-1 bg-gray-300 rounded">
                    <div
                        style={{ width: `${task.progress}%` }}
                        className="bg-blue-800 h-full rounded"
                    ></div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-3">
                <div className="flex justify-between items-center">
                    {task.assignees.map((assignee, index) => (
                        <img
                            key={index}
                            src={index % 2 === 0 ? white_two : white_three} // Alternate images
                            className="w-5 h-5 rounded-full"
                            alt={`User ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex items-center border px-1 rounded-sm justify-center gap-2">
                    <div className="flex items-center gap-1">
                        <LuMessageSquareDashed className="text-[15px]" />
                        <p className="text-[15px]">{task.comments}</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <p className="text-[15px]">{task.links}</p>
                        <FaLink className="text-[15px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Completed: React.FC = () => {
    const tasks: Task[] = [
        {
            id: "D-149",
            title: "Wireframing",
            description: "Create Low-Fidelity Wireframes",
            priority: "High",
            priorityColor: "white",
            category: "Back-End",
            progress: 100,
            image: fedelity_2,
            showImage: true,
            assignees: ["User 1", "User 2"],
            comments: 2,
            links: 1,
        },
        {
            id: "D-150",
            title: "Conduct Market Research",
            description: "Research similar apps in the market",
            priority: "High",
            priorityColor: "white",
            category: "UI/UX",
            progress: 100,
            showImage: false,
            assignees: ["User 3"],
            comments: 3,
            links: 0,
        },
    ];

    return (
        <div className="bg-[#f9fbfc] w-60 p-2 rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-6 bg-green-500 rounded"></span>
                    <p className="text-[16px] font-medium text-gray-800">Complete</p>
                    <div className="flex items-center justify-center w-[20px] h-[20px] bg-gray-300 rounded-sm">
                        <p className="text-gray-500 font-semibold text-[12px]">{tasks.length}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="cursor-pointer hover:text-red-700 transition">
                        <BsPlusLg size={16} />
                    </span>
                    <span className="cursor-pointer hover:text-red-700 transition">
                        <BsThreeDotsVertical size={16} />
                    </span>
                </div>
            </div>

            {tasks.map((task, index) => (
                <TaskItem key={index} task={task} />
            ))}

            {/* Add New Task */}
            <div className="border border-dashed flex border-gray-400 items-center justify-center gap-2 mt-3 p-2 rounded-md">
                <BsPlus className="font-medium text-gray-500 text-[10px]" />
                <p className="font-medium text-gray-500 text-[10px]">Add New Task</p>
            </div>
        </div>
    );
};

export default Completed;
