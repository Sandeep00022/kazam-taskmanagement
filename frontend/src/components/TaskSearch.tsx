import React, { useState, useEffect } from "react";
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

const TaskSearch: React.FC<TaskSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedTerm, setDebouncedTerm] = useState<string>("");

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300); 

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
      <input
        type="text"
        className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
};

export default TaskSearch;
