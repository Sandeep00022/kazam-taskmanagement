import { Request, Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/authMiddleware";
import { taskValidation } from "../utils/validateRequest";

// Create a Task
export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  // Validate request body
  const { error } = taskValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const { title, description } = req.body;
    const newTask = await Task.create({
      user: req.user?.id,
      title,
      description,
      completed: false,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get All Tasks for Logged-in User
export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user?.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get Single Task by ID
export const getTaskById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user?.id) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Update Task
export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  // Validate request body
  const { error } = taskValidation.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const { title, description, completed } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user?.id) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete Task
export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user?.id) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Mark Task as Completed
export const toggleTaskCompletion = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user?.id) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task status", error });
  }
};
