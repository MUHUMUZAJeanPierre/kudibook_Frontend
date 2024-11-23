import React from 'react';
import { BsPlusLg, BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import img from '../../assets/logo.png'; // Default image
import graph from '../../assets/graph.png'; // Task-specific image
import { ImSpinner3 } from "react-icons/im";
import { LuMessageSquareDashed } from "react-icons/lu";
import { FaLink } from "react-icons/fa";
import white_three from '../../assets/white_three.jpg'; // New dynamic image
import white_two from '../../assets/white_two.jpg'; // New dynamic image

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
  assignees: string[]; // Assignees list
  comments: number;
  links: number;
  assigneeImages?: string[]; // Optional: Specific images for assignees
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  return (
    <div className='bg-white p-4 mt-4 rounded-lg shadow-inner'>
      <div className='flex justify-between mb-2'>
        <div className='flex gap-1'>
          <div className={`flex items-center bg-white w-auto px-2 py-1 rounded-[10px] shadow-md`}>
            <p className={`text-${task.priorityColor} font-semibold text-[10px]`}>{task.priority}</p>
          </div>
          <div className='flex items-center bg-gray-100 w-auto px-2 rounded-[10px] shadow-md'>
            <p className='text-blue-500 font-semibold text-[10px]'>{task.category}</p>
          </div>
        </div>
        <div>
          <p className='font-medium text-gray-600'>{task.id}</p>
        </div>
      </div>
      {task.showImage && (
        <div className='h-24 mb-2 bg-red-500 object-cover'>
          <img src={task.image} className='w-full h-full' alt="Task" />
        </div>
      )}
      <div className='mb-3'>
        <h1 className='text-[16px] font-semibold text-gray-600'>{task.title}</h1>
        <p className='text-[12px] text-gray-600'>{task.description}</p>
      </div>

      <div>
        <div className='flex justify-between items-center mb-1'>
          <div className='flex items-center gap-2 text-gray-600'>
            <ImSpinner3 className='text-gray-500 text-[10px]' />
            <p className='text-[10px] font-medium text-gray-600'>Progress</p>
          </div>
          <div>
            <p className='font-medium text-gray-600 text-[10px]'>{task.progress}%</p>
          </div>
        </div>
        <div className='w-full h-1 bg-gray-300 rounded'>
          <div className={`w-[130px] bg-blue-800 h-full rounded`}></div>
        </div>
      </div>
      <div className='flex justify-between items-center mt-3'>
        <div className='flex justify-between items-center'>
          {task.assignees.map((assignee, index) => {
            // Dynamically assign either 'white_two' or 'white_three' based on task conditions
            const assigneeImage = (task.priority === 'High') ? white_two : white_three; // Example: Use `white_two` for high priority tasks
            return (
              <img key={index} src={assigneeImage} className='w-5 h-5 rounded-full' alt={`User ${index + 1}`} />
            );
          })}
        </div>
        <div className='flex items-center border px-1 rounded-sm justify-center gap-2'>
          <div className='flex items-center gap-1'>
            <LuMessageSquareDashed className='text-[15px]' />
            <p className='text-[15px]'>{task.comments}</p>
          </div>
          <div className='flex items-center gap-1'>
            <p className='text-[15px]'>{task.links}</p>
            <FaLink className='text-[15px]' />
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
      category: 'UI/UX/Design',
      progress: 100,
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
          <span className='w-2 h-6 bg-[#fbc146] rounded'></span>
          <p className='text-[15px] font-medium text-gray-700'>On Progress</p>
          <div className='flex items-center justify-center rounded-sm w-[20px] h-[20px] bg-gray-300'>
            <p className='text-gray-500 font-semibold text-[12px]'>{tasks.length}</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <span className='cursor-pointer hover:text-red-700 transition'>
            <BsPlusLg size={16} />
          </span>
          <span className='cursor-pointer hover:text-red-700 transition'>
            <BsThreeDotsVertical size={16} />
          </span>
        </div>
      </div>

      {/* Render tasks */}
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} />
      ))}

      <div className='border border-dashed border-gray-400 flex items-center justify-center gap-2 mt-3 p-2 rounded-md'>
        <BsPlus className='font-medium text-gray-500 text-[10px]' />
        <p className='font-medium text-gray-500 text-[10px]'>Add New Task</p>
      </div>
    </div>
  );
}

export default OnProgress;
