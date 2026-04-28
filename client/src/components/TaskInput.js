import { useState } from "react";

function TaskInput({ addTask }) {
  // State for task text and due date
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty task or missing date
    if (!input.trim() || !dueDate) return;

    addTask(input, dueDate);

    // Reset inputs
    setInput("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>
      
      {/* Task input */}
      <input
        type="text"
        placeholder="Enter a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Due date input */}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Submit button */}
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;