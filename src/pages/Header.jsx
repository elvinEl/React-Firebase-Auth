import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="bg-lime-500">
      <div className="flex justify-around max-w-[80%] mx-auto py-3 text-white font-medium">
        <NavLink to="/">Ana Səhifə</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/profile">Profil</NavLink>
        {/* <NavLink to="/login">Daxil ol</NavLink> */}
    </div>

    </div>
  );
}
export default Header;
