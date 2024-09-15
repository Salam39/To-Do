import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

// Now here we create a function App in which we use axios form connecting our frontend to backend.
function App() {
  //Here we use useState hook for our task
  const [task, setTask] = useState("");
  const [tasksList, setTasksList] = useState([]);

  // here we use useEffect hook for stopping unstoppable data printing in loop.
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasksList(storedTasks);
    }
  }, []);

  // here we create a function for submitting button for that page are not move on new page
  const submit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      alert("Please provide a input");
    } else {
      addTask();
    }
  };

  // here we create a function for adding task
  const addTask = () => {
    if (task.trim() !== "") {
      const updatedTasks = [...tasksList, task];

      // We use axios for connecting our frontend to backend
      axios
        .post("http://localhost:5500/AddTask", { task: updatedTasks })
        .then((response) => {
          // Handle the response if needed
          console.log("Tasks added successfully to server:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error adding tasks to server:", error);
        });

      // Update state
      setTasksList(updatedTasks);
      setTask("");
    }
  };

  // here we create a function for clearing task 
  const clearTask = (server) => {
    axios
      .delete(`http://localhost:5500/DeleteTask/${server}`)
      .then((response) => {
        // Handle the response if needed
        console.log("Task deleted successfully from server:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting task from server:", error);
      });
    const updatedTasks = tasksList.filter((_, i) => i !== server);
    setTasksList(updatedTasks);
  };

  //Now from here i would create input box for adding task.
  // And also add two button for add and delete task by using map function
  return (
    <div className="App">
      <div className="Style-Page">
        <h1>To Do List App</h1>
        <div className="container">
          <button type="button">Enter The Task</button>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Today Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="button" onClick={submit}>
            Add Task
          </button>
        </div>
        <br />
        <div>
          {tasksList.map((task, server) => (
            <li key={server}>
              {task}{" "}
              <button onClick={() => clearTask(server)}>clearTask</button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
