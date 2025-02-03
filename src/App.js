import "./App.css";
import Aside from "./components/Aside/Aside";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Sessions from "./pages/sessions/Sessions";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

const App = () => {
  return (
    <Router>
        <Aside />
          <Routes>
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          </Routes>
    </Router>
  );
};

export default App;
