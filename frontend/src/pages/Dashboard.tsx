// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setTasks, deleteTask, toggleCompletion } from "../redux/slices/taskSlice";
// import { RootState } from "../redux/store";
// import TaskForm from "../components/TaskForm";
// import TaskItem from "../components/TaskItem";

// const Dashboard: React.FC = () => {
//   const dispatch = useDispatch();
//   const tasks = useSelector((state: RootState) => state.tasks.tasks);
//   const [editTask, setEditTask] = useState<null | { _id: string; title: string; description: string; completed: boolean }>(null);

//   useEffect(() => {
//     // Assuming you have a function to fetch tasks from an API or local storage
//     const fetchTasks = async () => {
//       // Replace with actual API call
//       const fetchedTasks = [
//         { _id: "1", title: "Task 1", description: "Description 1", completed: false },
//         { _id: "2", title: "Task 2", description: "Description 2", completed: true },
//       ];
//       dispatch(setTasks(fetchedTasks));
//     };
//     fetchTasks();
//   }, [dispatch]);

//   const handleEditClick = (task: any) => {
//     setEditTask(task);
//   };

//   const handleDeleteClick = (id: string) => {
//     dispatch(deleteTask(id));
//   };

//   const handleToggleCompletion = (id: string) => {
//     dispatch(toggleCompletion(id));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Task Dashboard</h1>
//       <TaskForm task={editTask} onClose={() => setEditTask(null)} />
//       <TaskItem
//         tasks={tasks}
//         onEditClick={handleEditClick}
//         onDeleteClick={handleDeleteClick}
//         onToggleCompletion={handleToggleCompletion}
//       />
//     </div>
//   );
// };

// export default Dashboard;

// pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTasks, deleteTask, toggleCompletion } from "../redux/slices/taskSlice";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{ 
    _id: string; 
    title: string; 
    description: string; 
    completed: boolean 
  } | null>(null);

  useEffect(() => {
    // Simulated API call
    const fetchedTasks = [
      { _id: "1", title: "Task 1", description: "Description 1", completed: false },
      { _id: "2", title: "Task 2", description: "Description 2", completed: true },
    ];
    dispatch(setTasks(fetchedTasks));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
        <button
          onClick={() => setShowTaskForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Add Task
        </button>
      </div>

      <TaskItem
        tasks={tasks}
        onEditClick={(task) => {
          setSelectedTask(task);
          setShowTaskForm(true);
        }}
        onDeleteClick={(id) => dispatch(deleteTask(id))}
        onToggleCompletion={(id) => dispatch(toggleCompletion(id))}
      />

      {(showTaskForm || selectedTask) && (
        <TaskForm
          task={selectedTask}
          onClose={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;