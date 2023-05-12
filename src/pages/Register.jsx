import React from "react";
import { useState } from "react";
import { register } from "../firebase";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Qeydiyyatınız uğurla tamamlandı");
    const user = await register(email, password);
  };

  return (
    <div className="max-w-[80%] mx-auto">
      <div>
        <p className="text-2xl font-bold py-2 mt-4 flex justify-center">
          Yeni hesab yaradın
        </p>
        <p>
          Artiq bir hesabınız varsa
          <NavLink className="text-blue-600 underline" to="/login">
            Daxil ol
          </NavLink>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            E-mail
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Şifrə
            </label>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={!email || !password}
            className="flex w-full justify-center disabled:opacity-20 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Qeydiyyatdan kec
          </button>
        </div>
      </form>
      <div className="mt-4">
        <NavLink className="px-5 py-1 bg-blue-500 text-white rounded " to="/">
          Ana sehifeye kecid et
        </NavLink>
      </div>
    </div>
  );
}

export default Register;
