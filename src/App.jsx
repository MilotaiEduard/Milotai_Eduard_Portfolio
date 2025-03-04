import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import About from "../src/pages/About";
import Projects from "../src/pages/Projects";
import Contact from "../src/pages/Contact";
import usePageTracking from "./hooks/usePageTracking";

function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

function PageTracker() {
  usePageTracking();
  return null;
}

export default App;
