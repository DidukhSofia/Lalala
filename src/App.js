import "./App.css";
import Aside from "./components/Aside/Aside";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Sessions from "./pages/sessions/Sessions";

const App = () => {
  return (
    <Router>
        <Aside />
          <Routes>
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
    </Router>
  );
};

export default App;
