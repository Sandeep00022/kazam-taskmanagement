import React, { useState } from "react";
import { filters } from "../constants/constants";

interface TaskFilterProps {
  onFilter: (filterType: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilter }) => {
  const [filter, setFilter] = useState<string>("all");


  const handleFilterClick = (value: string) => {
    setFilter(value);
    onFilter(value);
  };

  return (
    <div className="w-full sm:max-w-xs">
      <div
        className="inline-flex w-full rounded-lg border border-gray-200 bg-white shadow-sm"
        role="group"
      >
        {filters?.map(({ value, label }, index) => (
          <button
            key={value}
            type="button"
            onClick={() => handleFilterClick(value)}
            className={`
              px-4 py-2 text-sm font-medium flex-1 whitespace-nowrap
              transition-colors duration-200 focus:outline-none
              focus:ring-2 focus:ring-blue-500 focus:z-10
              ${
                filter === value
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }
              ${index === 0 ? "rounded-l-lg" : ""}
              ${
                index === filters.length - 1
                  ? "rounded-r-lg"
                  : "border-r border-gray-200"
              }
            `}
            aria-pressed={filter === value}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
