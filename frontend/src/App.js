import './App.css';
import "react-toastify/dist/ReactToastify.css"
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './components/Home';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div className="App">
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={800}
        limit={3}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
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
