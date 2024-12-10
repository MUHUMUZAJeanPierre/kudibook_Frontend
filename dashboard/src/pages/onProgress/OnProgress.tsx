import React from 'react';
import { BsPlusLg, BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import graph from '../../assets/graph.png';
import { ImSpinner3 } from "react-icons/im";
import white_three from '../../assets/white_three.jpg';
import white_two from '../../assets/white_two.jpg';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoIosLink } from 'react-icons/io';

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
  assigneeImages?: string[];
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className='p-4 mt-4 bg-white rounded-lg shadow-inner'>
      <div className='flex justify-between mb-2'>
        <div className='flex gap-1'>
          <div className={`flex items-center bg-[#fdf4f3] w-auto px-2 py-1 rounded-md `}>
            <p className={`text-${task.priorityColor} font-semibold text-[0.625rem]`}>{task.priority}</p>
          </div>
          <div className='flex items-center bg-[#f6f5f8] w-auto px-2 rounded-md '>
            <p className='text-blue-500 font-semibold text-[0.625rem]'>{task.category}</p>
          </div>
        </div>
        <div>
          <p className='font-medium text-gray-500 text-[0.8rem]'>{task.id}</p>
        </div>
      </div>
      {task.showImage && (
        <div className='object-cover h-24 mb-2'>
          <img src={task.image} className='w-full h-full' alt="Task" />
        </div>
      )}
      <div className='mb-3'>
        <h1 className='text-sm font-semibold text-gray-600'>{task.title}</h1>
        <p className='text-[0.7rem]   text-gray-500 '>{task.description}</p>
      </div>

      <div>
        <div className='flex items-center justify-between mb-1'>
          <div className='flex items-center gap-2 text-gray-600'>
            <span className='text-gray-500 text-[0.625rem]'>

              <ImSpinner3 />
            </span>
            <p className='text-[0.625rem] font-medium text-gray-600'>Progress</p>
          </div>
          <div>
            <p className='font-medium text-gray-600 text-[0.625rem]'>{task.progress}%</p>
          </div>
        </div>
        <div className='w-full h-1 bg-gray-300 rounded'>
          <div className={`w-[5rem] bg-[#3e19dd] h-full rounded`}></div>
        </div>
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='flex items-center justify-between'>
          {task.assignees.map((_, index) => {
            const assigneeImage = (task.priority === 'High') ? white_two : white_three;
            return (
              <img key={index} src={assigneeImage} className='w-5 h-5 rounded-full' alt={`User ${index + 1}`} />
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 px-1 border rounded-sm">
          <div className="flex items-center gap-1 justify-evenly">
            <span className=" font-semibold text-[0.7rem]">
              <AiOutlineMessage />
            </span>
            <p className="text-[0.7rem]">{task.comments}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[0.7rem]">{task.links}</p>
            <span className="text-[0.7rem]" >
              <IoIosLink />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const OnProgress: React.FC = () => {
  const tasks: Task[] = [
    {
      id: 'D-149',
      title: 'Develop API Endpoints',
      description: 'Build necessary API endpoints',
      priority: 'High',
      priorityColor: 'red-500',
      category: 'UI/UX/Design',
      progress: 25,
      image: graph,
      showImage: true,
      assignees: ['User 1', 'User 2', 'User 3'],
      comments: 2,
      links: 1
    },
    {
      id: 'D-150',
      title: 'Design User Interface',
      description: 'Create mockups and prototypes for user interface',
      priority: 'Medium',
      priorityColor: 'orange-500',
      category: 'UI/U/Design',
      progress: 25.5,
      image: graph,
      showImage: false,
      assignees: ['User 4'],
      comments: 3,
      links: 0
    }
  ];

  return (
    <div className='bg-[#f9fbfc] w-60 p-2 rounded-lg shadow-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='w-[0.4rem] h-[1.2rem] bg-[#fbc146] rounded'></span>
          <p className='text-[0.850rem] font-medium text-black'>On Progress</p>
          <div className='flex items-center justify-center rounded-sm w-[1rem] h-[1rem] bg-gray-300'>
            <p className='text-gray-500 font-semibold text-[0.6rem]'>{tasks.length}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <span className='transition cursor-pointer hover:text-red-700'>
            <BsPlusLg size={14} />
          </span>
          <span className='transition cursor-pointer hover:text-red-700'>
            <BsThreeDotsVertical size={14} />
          </span>
        </div>
      </div>

      {/* Render tasks */}
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}

      <div className='flex items-center justify-center gap-2 p-2 mt-3 border border-gray-400 border-dashed rounded-md'>
        <span className='font-medium text-gray-500 text-[0.625rem]'>
          <BsPlus />

        </span>
        <p className='font-medium text-gray-500 text-[0.625rem]'>Add New Task</p>
      </div>
    </div>
  );
}

export default OnProgress;
