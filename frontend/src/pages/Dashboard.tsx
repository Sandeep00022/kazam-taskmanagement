
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button } from "@material-tailwind/react";
import {
  setTasks,
  deleteTask,
  toggleCompletion,
} from "../redux/slices/taskSlice";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { fetchTasks } from "../services/api";
import TaskSearch from "../components/TaskSearch";
import { getRandomTaskQuote } from "../utils/randomQuotes";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [randomQuote, setRandomQuote] = useState<string>("");
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
    setRandomQuote(getRandomTaskQuote());
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center">
          <blockquote className="text-xl italic text-gray-600 bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            {randomQuote}
          </blockquote>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full sm:max-w-md">
            <TaskSearch onSearch={handleSearch} />
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            Add Task +
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">
              No tasks found. Start by adding a new task!
            </p>
          </div>
        ) : (
          <TaskItem
            tasks={filteredTasks}
            token={token}
            onEditClick={(task) => {
              setSelectedTask(task);
              setOpen(true);
            }}
          />
        )}

        <TaskForm
          task={selectedTask}
          setSelectedTask={setSelectedTask}
          token={token}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
};

export default Dashboard;
