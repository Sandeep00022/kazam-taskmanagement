import React from "react";
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
  token: string | null;
}

const TaskItem: React.FC<TaskListProps> = ({ tasks, token, onEditClick }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
      <h6 className="text-center">
        Task List
      </h6>
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
