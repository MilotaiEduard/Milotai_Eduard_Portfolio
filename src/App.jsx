import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import About from "../src/components/About";
import Projects from "../src/components/Projects";
import Contact from "../src/components/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
