import React from "react";
import { toast } from "react-toastify";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { BiCheckCircle, BiXCircle, BiPencil, BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteTask, toggleCompletion } from "../redux/slices/taskSlice";
import {
  deleteUserTask,
  toggleTaskCompletion,
} from "../services/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onEditClick: (task: Task) => void;
  token: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEditClick, token }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmDelete) return;

      await deleteUserTask(id, token);
      dispatch(deleteTask(id));
      toast.success("Task deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting task:", error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete task. Please try again."
      );
    }
  };

  const handleToggleCompletion = async (id: string) => {
    try {
      await toggleTaskCompletion(id, token);
      dispatch(toggleCompletion(id));
      toast.success("Task status updated!");
    } catch (error: any) {
      console.error("Error toggling task completion:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update task status."
      );
    }
  };

  return (
    <div
      className={`border-l-4 ${
        task.completed ? "border-green-500" : "border-blue-500"
      } rounded-lg shadow-sm p-4 mb-9 bg-white transition-all hover:shadow-md group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Typography
            variant="h6"
            className={`font-semibold text-gray-800 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.title}
          </Typography>
          {task.description && (
            <Typography
              variant="paragraph"
              className={`text-gray-600 mt-1 text-sm ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.description}
            </Typography>
          )}
        </div>
        <Tooltip content={`Toggle Task to ${ task.completed?'Incomplete': 'complete'}`} placement="top">
          <Button
            onClick={() => handleToggleCompletion(task._id)}
            className={`p-2 rounded-full hover:bg-opacity-20 transition-colors
            ${
              task.completed
                ? "text-green-500 hover:bg-green-500"
                : "text-blue-500 hover:bg-blue-500"
            }
          `}
          >
            {task.completed ? (
              <BiCheckCircle className="w-6 h-6" />
            ) : (
              <BiXCircle className="w-6 h-6" />
            )}
          </Button>
        </Tooltip>
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-3">
        <Tooltip content="Edit Task" placement="top">
          <Button
            variant="text"
            onClick={() => onEditClick(task)}
            className="rounded-full p-2 hover:bg-yellow-50 text-yellow-600"
          >
            <BiPencil className="w-5 h-5" />
          </Button>
        </Tooltip>
        <Tooltip content="Delete Task" placement="top">
          <Button
            variant="text"
            onClick={() => handleDeleteTask(task._id)}
            className="rounded-full p-2 hover:bg-red-50 text-red-600"
          >
            <BiTrash className="w-5 h-5" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;
