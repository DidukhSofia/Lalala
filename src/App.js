import "./App.css";
import Aside from "./components/Aside/Aside";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sessions from "./pages/Sessions/Sessions";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Main from "./pages/Main/Main";
import Widget from "./pages/Widget/Widget";

const App = () => {
  return (
    <Router>
        <Aside />
          <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/widget/:movieId/seatplan" element={<Widget/>}/>
          </Routes>
    </Router>
  );
};

export default App;
