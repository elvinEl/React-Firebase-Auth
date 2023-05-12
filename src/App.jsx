import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux'
// PAGES
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
// LAYOUTS
import RootLayout from "./layouts/RootLayout";
import Modal from "./components/Modal";

function App() {
  
  const {open,data} = useSelector(state=>state.modal)

  return (
    <>
      <Toaster />
      {open && <Modal name={open} data={data}/>}
      <Routes>
        <Route path="/" element={<RootLayout/>} >
        <Route index element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings/>}/>
        </Route> 
      </Routes>
    </>
  );
}

export default App;
