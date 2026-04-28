function TaskItem({ task, completeTask, deleteTask }) {
  // Format due date
  const due = new Date(task.dueDate).toLocaleDateString();

  return (
    <div style={{ marginTop: "10px" }}>
      
      {/* Task text (crossed out if completed) */}
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginRight: "10px",
        }}
      >
        {task.text}
      </span>

      {/* Due date */}
      <span style={{ marginRight: "10px", color: "gray" }}>
        📅 {due}
      </span>

      {/* Complete button (only shows if not done) */}
      {!task.completed && (
        <button onClick={() => completeTask(task.id)}>
          Complete
        </button>
      )}

      {/* Delete button */}
      <button
        onClick={() => deleteTask(task.id)}
        style={{ backgroundColor: "#ef4444" }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;