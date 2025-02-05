import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/slices/taskSlice";
import { createTask, updateTask as apiUpdateTask } from "../services/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TaskFormProps {
  task?: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
  token: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, open, setOpen, token }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        completed: task.completed,
      });
    } else {
      setFormData({ title: "", description: "", completed: false });
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "completed" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let response;
      if (task) {
        response = await apiUpdateTask(task._id, formData, token);
        dispatch(updateTask(response.data));
      } else {
        response = await createTask(formData, token);
        dispatch(addTask(response.data));
      }
      setOpen(false);
    } catch (error: any) {
      console.error("Error:", error.response || error.message);
      if (error.response) {
        setError(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
      } else if (error.message) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {task ? "Edit Task" : "Create Task"}
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Completed"
            sx={{ mt: 1 }}
          />

          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={loading}
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
