function TaskItem({ task, completeTask, deleteTask }) {
  const due = new Date(task.dueDate).toLocaleDateString();

  return (
    <div style={{ marginTop: "10px" }}>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginRight: "10px",
        }}
      >
        {task.text}
      </span>

      <span style={{ marginRight: "10px", color: "gray" }}>
        📅 {due}
      </span>

      {!task.completed && (
        <button onClick={() => completeTask(task.id)}>
          Complete
        </button>
      )}

      <button
        onClick={() => deleteTask(task.id)}
        style={{ backgroundColor: "red" }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;