import TaskItem from "./TaskItem";

function TaskList({ tasks, completeTask, deleteTask }) {
  return (
    <div>
      
      {/* If no tasks, show message */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        // Loop through tasks and display each one
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        ))
      )}

    </div>
  );
}

export default TaskList;