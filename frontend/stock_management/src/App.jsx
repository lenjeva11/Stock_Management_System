
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Stock from "./pages/Stock";
import Navbar from "./components/Navbar";
import Table from "./components/Table";   
import Modal from "./components/Modal";   


function App() {

  return (
    <Router>
      <Navbar />
 
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/users" element={<Users />} /> 
        <Route path="/products" element={<Products />} /> 
        <Route path="/stock" element={<Stock />} /> 
      </Routes>
    </Router>
  );
}

// Export App component as default export
export default App;
