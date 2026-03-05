import { useState } from "react";
import API from "../api";

function TaskForm({ fetchTasks }) {
  const [form, setForm] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <input
        type="text"
        placeholder="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;