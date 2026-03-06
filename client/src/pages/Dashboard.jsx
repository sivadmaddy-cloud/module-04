import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Dashboard({ setUser }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // 🔥 FILTER LOGIC
  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((task) => task.completed)
      : tasks.filter((task) => !task.completed);

  return (
   
    <div className="container">
      <button className="logged" onClick={logout}>Logout</button>

      <TaskForm fetchTasks={fetchTasks} />

      {/* 🔥 FILTER BUTTONS */}
      <div style={{}} class="filter">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("active")}>Active</button>
      </div>

      {/* 🔥 DISPLAY FILTERED TASKS */}
      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );  
}

export default Dashboard;