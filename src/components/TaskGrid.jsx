import TaskCard from "./TaskCard";

export default function TaskGrid() {
  const tasks = [
    "Design UI",
    "Build Components",
    "Connect Backend",
    "Deploy Project",
    "Fix Bugs",
    "Optimize Performance"
  ];

  return (
    <section className="task-grid">
      {tasks.map((task, index) => (
        <TaskCard key={index} title={task} />
      ))}
    </section>
  );
}