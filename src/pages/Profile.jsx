import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, emailVerification, addTodo } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import Login from "./Login";

function Profile() {
  const [todo, setTodo] = useState("");
  const { todos } = useSelector((state) => state.todos);
  const submitHandle = async (e) => {
    e.preventDefault();
    await addTodo({
      todo,
      uid: user.uid,
    });
    setTodo('')
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };
  const handleVerification = async () => {
    await emailVerification();
  };



  if (user) {
    return (
      <div className="max-w-[80%] mx-auto items-center flex flex-col justify-center">
        <div className="flex flex-col">
          <div className="w-20 h-20 object-contain">
            {user.photoURL && (
              <img
                src={user.photoURL}
                className="w-full h-full object-contain rounded-full"
              />
            )}
          </div>
          Salam {user.displayName} ({user.email}) maili ile daxil oldun
          <div className="flex justify-center items-center">
            <Link
              to="/settings"
              className="rounded px-4 py-1 mt-4  bg-blue-500 text-white"
            >
              Parametrlər
            </Link>
            <button
              onClick={handleLogout}
              className="rounded px-4 py-1 mt-4  bg-blue-500 text-white"
            >
              Çıxış et
            </button>
            {!user.emailVerified && (
              <button
                onClick={handleVerification}
                className="rounded px-4 py-1 mt-4  bg-blue-500 text-white"
              >
                E-maili tesdiqle
              </button>
            )}
          </div>
        </div>
        <form className="flex flex-col gap-x-4 mt-8" onSubmit={submitHandle}>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Todo"
          />
          <button
            disabled={!todo}
            className="rounded px-4 py-1 mt-4 disabled:opacity-30  bg-blue-500 text-white"
          >
            Əlavə Et
          </button>

         
        </form>
        <ul>
        {todos.map((todo,index)=>(
          <li key={index}>
            {todo.todo}
          </li>
        ))}
       </ul>
      
      </div>
    );
  }

  return (
    <div>
      <Login />
    </div>
  );
}

export default Profile;
