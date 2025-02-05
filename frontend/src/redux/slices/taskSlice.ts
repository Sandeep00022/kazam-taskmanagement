import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = { tasks: [] };

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Set tasks (fetch all tasks)
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },

    // Add a new task
    addTask: (state, action: PayloadAction<Task>) => {
      console.log(state?.tasks);
      state.tasks.push(action.payload);
    },

    // Update a task
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    // Delete a task
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },

    // Toggle the completion status of a task
    toggleCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task._id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, toggleCompletion } =
  taskSlice.actions;
export default taskSlice.reducer;
