import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  setTasks,
  deleteTask,
  toggleCompletion,
} from "../redux/slices/taskSlice";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { fetchTasks } from "../services/api";
import TaskSearch from "../components/TaskSearch";
import { Button } from "@material-tailwind/react";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<{
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  } | null>(null);

  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");

  const getUserTasks = async () => {
    try {
      const userTasks = await fetchTasks(token);
      dispatch(setTasks(userTasks.data));
    } catch (error: any) {
      console.error("Task fetching failed", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Search handler
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className="container mx-auto p-4 mt-20">
      <div className="flex justify-between items-center mb-8">
        <TaskSearch onSearch={handleSearch} />
        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Task
        </Button>
      </div>

      <TaskItem
        tasks={filteredTasks}
        token={token}
        onEditClick={(task) => {
          setSelectedTask(task);
          setOpen(true);
        }}
      />
      <TaskForm
        task={selectedTask}
        token={token}
        setOpen={setOpen}
        open={open}
      />
    </div>
  );
};

export default Dashboard;
