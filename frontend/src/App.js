import './App.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/cart" exact Component={Cart} />
        <Route path="/" exact Component={Home} />
        <Route path="/*" Component={NotFound} element={<Navigate />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
