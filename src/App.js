import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
