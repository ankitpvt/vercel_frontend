import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Using environment variable

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async () => {
    if (task.trim() === "") return;
    try {
      const res = await axios.post(API_URL, { text: task });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id} className="task">
            {t.text}
            <button onClick={() => deleteTask(t._id)} className="delete-btn">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
