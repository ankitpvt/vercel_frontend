import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

//const API_URL = "http://localhost:5000/tasks";
//const API_URL = process.env.VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL;


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (task.trim() === "") return;
    const res = await axios.post(API_URL, { text: task });
    setTasks([...tasks, res.data]);
    setTask("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
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
