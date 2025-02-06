import React from "react";
import { Typography } from "@material-tailwind/react";
import TaskCard from "./TaskCard"; 

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  token: string;
  onDeleteClick: (id: string) => void;
  onToggleCompletion: (id: string) => void;
}

const TaskItem: React.FC<TaskListProps> = ({ tasks, token, onEditClick }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <Typography variant="h6" className="text-center">
        Task List
      </Typography>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          token={token}
          task={task}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
};

export default TaskItem;
