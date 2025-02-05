import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskSearchProps {
  tasks: Task[];
  onSearch: (searchTerm: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ tasks, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="relative w-64">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="px-4 py-2 border w-full rounded-lg pl-10"
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TaskSearch;
