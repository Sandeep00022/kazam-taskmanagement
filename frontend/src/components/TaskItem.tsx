import React from "react";

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

const TaskItem: React.FC<TaskListProps> = ({ tasks, onEditClick, onDeleteClick, onToggleCompletion }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4">{task.description}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onToggleCompletion(task._id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    task.completed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {task.completed ? "Completed" : "Incomplete"}
                </button>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => onEditClick(task)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteClick(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskItem;