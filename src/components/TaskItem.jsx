function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li style={{ margin: "10px 0" }}>
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;