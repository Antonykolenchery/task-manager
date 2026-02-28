import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TaskGrid from "./components/TaskGrid";
import ImageSection from "./components/ImageSection";
import Footer from "./components/Footer";
import TaskDetail from "./components/TaskDetail";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <TaskGrid />
              <ImageSection />
            </>
          }
        />

        <Route path="/task/:title" element={<TaskDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}