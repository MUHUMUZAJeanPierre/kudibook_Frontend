import React, { useEffect, useState } from "react";
import { BsPlusLg, BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import supabase from "../../components/config/supabaseClient";
import white_three from "../../assets/white_three.jpg";
import white_one from "../../assets/white_one.avif";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
  progress: number;
  assignees: string[];
  comments: number;
  links: number;
}

interface TaskItemProps {
  task: Task;
  image: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, image }) => {
  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-inner">
      <div className="flex justify-between mb-2">
        <div className="flex gap-1">
          <div className="flex items-center bg-[#fdf4f3] w-auto px-2 py-1 rounded-md">
            <p className="text-red-500 font-semibold text-[0.625rem]">
              {task.priority}
            </p>
          </div>
          <div className="flex items-center bg-[#f6f5f8] w-auto px-2 rounded-md">
            <p className="text-blue-500 font-semibold text-[0.625rem]">
              {task.category}
            </p>
          </div>
        </div>
        <div>
          <p className="font-medium text-gray-500 text-[0.8rem]">D{task.id}</p>
        </div>
      </div>
      <div className="mb-3">
        <h1 className="text-sm font-semibold text-gray-600">{task.title}</h1>
        <p className="text-[0.7rem] text-gray-600">{task.description}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 text-gray-600 text-[0.625rem]">
            <span className="text-gray-500">
              <ImSpinner3 />
            </span>
            <p className="font-medium text-gray-600 text-[0.625rem]">
              {task.status}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-600 text-[0.625rem]">
              {task.progress}%
            </p>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-300 rounded">
          <div
            className="bg-[#3e19dd] h-full rounded"
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center">
          {/* {task.map((_, index) => ( */}
            {/* <img
              src={`${task.images}`} // Dynamically assign image
              className="w-5 h-5 rounded-full"
              alt={`Assignee`}
            /> */}
          {/* ))} */}
        </div>
        <div className="flex items-center justify-center gap-2 px-1 border rounded-sm">
          <div className="flex items-center gap-1 justify-evenly">
            <span className="font-semibold text-[0.7rem]">
              <AiOutlineMessage />
            </span>
            <p className="text-[0.7rem]">{task.comments}</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[0.7rem]">{task.links}</p>
            <span className="text-[0.7rem]">
              <IoIosLink />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToDo: React.FC = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [formError, setFormError] = useState(null)

  const images = [white_one, white_three]; // Image array

    const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    priority: "Low",
    category: "",
    status: "",
    progress: "",
    comments: "",
    links: "",
  });


  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from("Todo").select();

      if (error) {
        setFetchError("Could not fetch tasks");
        setTodos([]);
        console.error("Error fetching tasks:", error);
      } else {
        setTodos(data || []);
        setFetchError(null);
      }
    } catch (error) {
      console.error("Unexpected error fetching tasks:", error);
      setFetchError("Unexpected error occurred while fetching tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    
    try {
      const { data, error } = await supabase
        .from("Todo")
        .insert([{ ...newTask, status: "Pending", progress: 0 }]);

      if (error) {
        console.error("Error adding task:", error);
      } else {
        setTodos((prev) => [...prev, data[0]]);
        setIsFormVisible(false);
        setNewTask({
          id: "",
          title: "",
          description: "",
          priority: "Low",
          category: "",
          status: "",
          progress: "",
          comments: "",
          links: "",
        });
      }
    } catch (error) {
      console.error("Unexpected error adding task:", error);
    }
  };

  return (
    <div className="bg-[#f9fbfc] w-60 p-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-[0.4rem] h-[1.2rem] bg-gray-300 rounded"></span>
          <p className="text-[0.850rem] font-medium text-black">To-Do</p>
          <div className="flex items-center justify-center w-[1rem] p-2 h-[1rem] bg-gray-300 rounded-sm">
            <p className="text-gray-500 font-semibold text-[0.6rem]">
              {todos.length}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <span 
          className="transition cursor-pointer hover:text-red-700"
          onClick={() => setIsFormVisible(!isFormVisible)}
          >
            <BsPlusLg size={14} />
          </span>
          <span className="transition cursor-pointer hover:text-red-700">
            <BsThreeDotsVertical size={14} />
          </span>
        </div>
      </div>

      {fetchError && <p className="text-red-500">{fetchError}</p>}

      {todos.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          image={images[index % images.length]} // Assign image cyclically
        />
      ))}
      
      {isFormVisible && (
        <form
          onSubmit={handleFormSubmit}
          className="p-3 mt-3 bg-white rounded shadow-lg"
          >
          <input
            type="text"
            placeholder="id"
            value={newTask.id}
            onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
            className="w-full p-1 mb-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full p-1 mb-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
            required
          ></textarea>
          <select
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="status"
            value={newTask.status}
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="progress"
            value={newTask.progress}
            onChange={(e) =>
              setNewTask({ ...newTask, progress: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="comments"
            value={newTask.comments}
            onChange={(e) =>
              setNewTask({ ...newTask, comments: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <button
            type="submit"
            className="w-full px-2 py-1 text-white bg-blue-500 rounded"
            onClick={handleFormSubmit}
          >
            Add Task
          </button>
        </form>
      )}

      <div className="flex items-center justify-center gap-2 p-2 mt-3 border border-gray-400 border-dashed rounded-md">
        <span className="font-medium text-gray-500 text-[0.625rem]">
          <BsPlus />
        </span>
        <p onClick={() => setIsFormVisible(!isFormVisible)} className="font-medium text-gray-500 text-[0.625rem]">Add New Task</p>
      </div>
    </div>
  );
};

export default ToDo;
