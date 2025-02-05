import React from "react";
import { Typography } from "@material-tailwind/react";
import TaskCard from "./TaskCard"; // Single component for both table and card layout

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onEditClick: (task: Task) => void;
  onDeleteClick: (id: string) => void;
  onToggleCompletion: (id: string) => void;
}

const TaskItem: React.FC<TaskListProps> = ({
  tasks,
  token,
  onEditClick,
}) => {
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
