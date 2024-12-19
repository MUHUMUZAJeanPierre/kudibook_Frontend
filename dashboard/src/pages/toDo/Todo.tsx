import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { IoTrashBinOutline } from "react-icons/io5";
import supabase from "../../components/config/supabaseClient";
import white_three from "../../assets/white_three.jpg";
import white_one from "../../assets/white_one.avif";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
  progress: number;
  comments: number;
  links: number;
}

const images = [white_one, white_three];

const ToDo: React.FC = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    priority: "",
    category: "",
    status: "",
    progress: 0,
    comments: 0,
    links: 0,
  });

  // Fetch tasks from Supabase
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase.from("Todo").select();
        if (error) {
          setFetchError("Could not fetch tasks");
          setTodos([]);
        } else {
          setTodos(data || []);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError("Unexpected error occurred while fetching tasks.");
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  // Handle form submission for adding or updating tasks
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentTask) {
        // Update task
        const { error } = await supabase
          .from("Todo")
          .update({ ...newTask })
          .eq("id", currentTask.id);

        if (!error) {
          setTodos((prev) =>
            prev.map((task) => (task.id === currentTask.id ? newTask : task))
          );
          setCurrentTask(null);
          setIsFormVisible(false);
        }
      } else {
        // Add new task
        const { data, error } = await supabase
          .from("Todo")
          .insert([{ ...newTask }]);

        if (!error && data) {
          setTodos((prev) => [...prev, ...data]);
          setNewTask({
            id: 0,
            title: "",
            description: "",
            priority: "",
            category: "",
            status: "",
            progress: 0,
            comments: 0,
            links: 0,
          });
          setIsFormVisible(false);
        }
      }
    } catch (error) {
      console.error("Unexpected error while submitting form:", error);
    }
  };

  // Handle delete button click
  const handleDeleteClick = async (id: number) => {
    try {
      const { error } = await supabase.from("Todo").delete().eq("id", id);
      if (!error) {
        setTodos((prev) => prev.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (task: Task) => {
    setCurrentTask(task);
    setNewTask(task); // Pre-fill the form with task data
    setIsFormVisible(true);
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
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              setCurrentTask(null);
            }}
          >
            <BsPlusLg size={14} />
          </span>
        </div>
      </div>
      {fetchError && <p className="text-red-500">{fetchError}</p>}
      {todos.map((task) => (
        <div
          key={task.id}
          className="relative p-4 mt-4 bg-white rounded-lg shadow-inner group"
        >
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
            <div className="group">
              <p className="font-medium text-gray-500 text-[0.8rem] group-hover:hidden">
                D{task.id}
              </p>
            </div>
          </div>
          <div className="mb-3">
            <h1 className="text-sm font-semibold text-gray-600">
              {task.title}
            </h1>
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
                      {/* {task.assignees && task.assignees.map((assignee, index) => (
                        <img
                          key={index}
                          src={task.assigneeImages?.[index]}
                          className="w-5 h-5 -ml-2 border-2 border-white rounded-full first:ml-0"
                          alt={`Assignee ${assignee}`}
                        />
                      ))} */}
                    </div>
                    <div className="flex items-center justify-center gap-2 px-1 border rounded-sm">
                      <div className="flex items-center gap-1 justify-evenly">
                        <span className="font-semibold text-[0.7rem]">
                          <AiOutlineMessage />
                        </span>
                        <p className="text-[0.7rem]">{task.comments}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[0.7rem]">
                          <IoIosLink />
                        </span>
                        <p className="text-[0.7rem]">{task.links}</p>
                      </div>
                    </div>
                  </div>
          <div className="absolute items-center hidden gap-2 top-4 right-2 group-hover:flex">
            <button
              className="p-[0.5rem] bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => handleDeleteClick(task.id)}
              title="Delete Task"
            >
              <IoTrashBinOutline className="text-[0.5rem] text-red-600 " />
            </button>
            <button
              className="p-[0.5rem] bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => handleEditClick(task)}
              title="Edit Task"
            >
              <FaPencil className="text-[0.5rem] text-green-600" />
            </button>
          </div>
        </div>
      ))}
      {isFormVisible && (
        <form
          onSubmit={handleFormSubmit}
          className="p-3 mt-3 bg-white rounded shadow-lg"
        >
          <input
            type="number"
            placeholder="ID"
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
          <input
            type="text"
            placeholder="Priority"
            value={newTask.priority}
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
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
            placeholder="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="Progress"
            value={newTask.progress}
            onChange={(e) =>
              setNewTask({ ...newTask, progress: +e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="Links"
            value={newTask.links}
            onChange={(e) =>
              setNewTask({ ...newTask, links: +e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-1 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {currentTask ? "Update Task" : "Add Task"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ToDo;
