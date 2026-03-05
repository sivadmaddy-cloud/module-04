import API from "../api";

function TaskItem({ task, fetchTasks }) {
  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  const toggleComplete = async () => {
    await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  return (
    <div className="card">
      <h4 style={{ textDecoration: task.completed ? "line-through" : "" }}>
        {task.title}
      </h4>
      <p>{task.description}</p>
      <button onClick={toggleComplete}>
        {task.completed ? "Incomplete" : "Complete"}
      </button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default TaskItem;