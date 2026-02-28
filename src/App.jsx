import "./App.css";

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>TaskManager</h1>
        <p>Simple Responsive Static Layout</p>
      </header>

      <section className="task-grid">
        <div className="card">Design UI</div>
        <div className="card">Build Components</div>
        <div className="card">Connect Backend</div>
        <div className="card">Deploy Project</div>
        <div className="card">Fix Bugs</div>
        <div className="card">Optimize Performance</div>
      </section>

      <section className="image-section">
        <img
          src="https://picsum.photos/1000/400"
          alt="Demo"
        />
      </section>

      <footer className="footer">
        © 2026 TaskManager App
      </footer>
    </div>
  );
}