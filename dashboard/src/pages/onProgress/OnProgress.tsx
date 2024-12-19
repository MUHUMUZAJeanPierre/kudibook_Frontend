import React, { useEffect, useState } from "react";
import { BsPlusLg, BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import supabase from "../../components/config/supabaseClient";
import { bool } from "prop-types";

// Interfaces
interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  status: string;
  progress: number;
  image?: string;
  showImage: boolean;
  assignees: string[];
  comments: number;
  links: number;
  assigneeImages?: string[];
}

// Image Upload Component
interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  existingImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  existingImage 
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(existingImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload JPG, PNG, or GIF.');
        return;
      }

      if (selectedFile.size > maxSize) {
        setError('File is too large. Maximum size is 5MB.');
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    try {
      // Detailed error logging
      if (!file) {
        console.error('No file selected');
        return;
      }
  
      // Log file details
      console.log('File details:', {
        name: file.name,
        type: file.type,
        size: file.size
      });
  
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
  
      // Log upload attempt details
      console.log('Upload attempt:', { filePath, fileType: file.type });
  
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          // Add content type explicitly
          contentType: file.type,
          // Optional: add upsert to replace existing files
          upsert: true 
        });
  
      if (error) {
        // More detailed error logging
        console.error('Supabase Upload Error:', {
          message: error.message,
          details: error
        });
        throw error;
      }
  
      // Log successful upload
      console.log('Upload successful:', data);
  
      // Get public URL with more error handling
      const { data: urlData, error: urlError } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);
  
      if (urlError) {
        console.error('Public URL Error:', urlError);
        throw urlError;
      }
  
      console.log('Public URL:', urlData.publicUrl);
      return urlData.publicUrl;
  
    } catch (error) {
      console.error('Complete Upload Process Error:', error);
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  };

  return (
    <div className="mb-2 image-upload-container">
      {previewImage && (
        <div className="mb-2">
          <img 
            src={previewImage} 
            alt="Preview" 
            className="object-cover w-full h-24 rounded-md"
          />
        </div>
      )}

      <input 
        type="file" 
        accept="image/jpeg,image/png,image/gif"
        onChange={handleFileChange} 
        className="hidden" 
        id="image-upload-input"
      />
      <div className="flex items-center gap-2">
        <label 
          htmlFor="image-upload-input" 
          className="text-sm text-blue-500 cursor-pointer hover:text-blue-700"
        >
          {previewImage ? 'Change Image' : 'Add Image'}
        </label>

        {file && (
          <button 
            onClick={handleUpload} 
            disabled={uploading}
            className="px-2 py-1 text-sm text-white bg-blue-500 rounded disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

// Task Item Component
const TaskItem: React.FC<{ 
  task: Task; 
  onUpdateTask: (updatedTask: Partial<Task>) => Promise<void>;
}> = ({ task, onUpdateTask }) => {
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleImageUpload = async (imageUrl: string) => {
    try {
      await onUpdateTask({ 
        image: imageUrl, 
        showImage: true 
      });
      setIsEditingImage(false);
    } catch (error) {
      console.error('Failed to update task image', error);
    }
  };

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

      {/* Image Section */}
      {task.showImage && (
        <div className='relative object-cover h-24 mb-2'>
          {task.image ? (
            <>
              <img 
                src={task.image} 
                className='object-cover w-full h-full rounded-md' 
                alt="Task" 
              />
              <button 
                onClick={() => setIsEditingImage(!isEditingImage)}
                className="absolute p-1 text-xs rounded-full top-1 right-1 bg-white/70"
              >
                {isEditingImage ? 'Cancel' : 'Change'}
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <p className="text-sm text-gray-500">No Image</p>
            </div>
          )}
        </div>
      )}

      {/* Image Upload */}
      {isEditingImage && (
        <ImageUpload 
          onImageUpload={handleImageUpload}
          existingImage={task.image}
        />
      )}

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
          {task.assignees && task.assignees.map((assignee, index) => (
            <img
              key={index}
              src={task.assigneeImages?.[index]}
              className="w-5 h-5 -ml-2 border-2 border-white rounded-full first:ml-0"
              alt={`Assignee ${assignee}`}
            />
          ))}
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
    </div>
  );
};

// On Progress Component
const OnProgress: React.FC = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [onProgress, setOnProgress] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false); 

 

    const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    category: "",
    status: "",
    progress: "",
    comments: "",
    showImage: bool
  });



  const handleFormSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
    
      try {
        const { data, error } = await supabase
          .from("Todo")
          .insert([{ ...newTask}]);
    
        if (error) {
          console.error("Error adding task:", error);
        } else {
          // setTodos((prev) => [...prev, data[0]]);
          setIsFormVisible(false);
          setNewTask({
            id: "",
            title: "",
            description: "",
            priority: "",
            category: "",
            status: "",
            progress: "",
            comments: "",
            showImage: bool
          });
        }
      } catch (error) {
        console.error("Unexpected error adding task:", error);
      }
    };

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase.from("OnProgress").select();

        if (error) {
          setFetchError("Could not fetch tasks");
          setOnProgress([]);
          console.error("Error fetching tasks:", error);
        } else {
          setOnProgress(data || []);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Unexpected error fetching tasks:", error);
        setFetchError("Unexpected error occurred while fetching tasks.");
      }
    };
    fetchTasks();
  }, []);

  // Update task method
  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from("OnProgress")
        .update(updates)
        .eq('id', taskId);

      if (error) throw error;

      // Update local state
      setOnProgress(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId ? { ...task, ...updates } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <div className="bg-[#f9fbfc] w-60 p-2 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-[0.4rem] h-[1.2rem] bg-gray-300 rounded"></span>
          <p className="text-[0.850rem] font-medium text-black">On Progress</p>
          <div className="flex items-center justify-center w-[1rem] p-2 h-[1rem] bg-gray-300 rounded-sm">
            <p className="text-gray-500 font-semibold text-[0.6rem]">
              {onProgress.length}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="transition cursor-pointer hover:text-red-700">
            <BsPlusLg size={14} />
          </span>
          <span className="transition cursor-pointer hover:text-red-700">
            <BsThreeDotsVertical size={14} />
          </span>
        </div>
      </div>

      {fetchError && <p className="text-red-500">{fetchError}</p>}

      {onProgress.map((task) => (
        <TaskItem 
          key={task.id} 
          task={task}
          onUpdateTask={(updates) => handleUpdateTask(task.id, updates)}
        />
      ))}
      
      {isFormVisible && (
        <form
          onSubmit={handleFormSubmit}
          className="p-3 mt-3 bg-white rounded shadow-lg"
          >
          <input
            type="number"
            placeholder="id"
            value={newTask.id}
            onChange={(e) => setNewTask({ ...newTask, id:e.target.value })}
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
            placeholder="priority"
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
            placeholder="status"
            value={newTask.status}
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="progress"
            value={newTask.progress}
            onChange={(e) =>
              setNewTask({ ...newTask, progress: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <input
            type="number"
            placeholder="comments"
            value={newTask.comments}
            onChange={(e) =>
              setNewTask({ ...newTask, comments: e.target.value })
            }
            className="w-full p-1 mb-2 border rounded"
          />
          <select value={newTask.showImage} onChange={(e)=>setNewTask({...newTask, showImage: e.target.value})}>
            <option value="TRUE">True</option>
            <option value="FALSE">False</option>
          </select>
          <button
            type="submit"
            className="w-full px-2 text-md py-1 text-white bg-[#745BF7] rounded"
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
        <p className="font-medium text-gray-500 text-[0.625rem]">
          Add New Task
        </p>
      </div>
    </div>
  );
};

export default OnProgress;