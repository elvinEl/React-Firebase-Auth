import React, { useState } from "react";
import { update, auth,resetPassword } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password,setPassword] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(login({
      displayName:auth.currentUser.displayName,
      email:auth.currentUser.email,
      emailVerified:auth.currentUser.emailVerified,
      photoURL:auth.currentUser.photoURL,
      uid:auth.currentUser.uid
    }));
  };

  const handleResetSubmit = async e =>{
    e.preventDefault()
   const result = await resetPassword(password)
    if(result){
      setPassword('')
    } 
  }
  return (
    <div className="grid gap-y-10">
      <form onSubmit={handleSubmit}>
        <p>Profili Yenile</p>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Ad - Soyad
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
       

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Profil Şəkili
          </label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center disabled:opacity-20 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Yenile
          </button>
        </div>
      </form>

      <form onSubmit={handleResetSubmit}>
        <p>Şifrəni Yenile</p>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Şifrə
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <button
          disabled={!password}
            type="submit"
            className="flex w-full justify-center disabled:opacity-20 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Şifrəni yenilə
          </button>
        </div>

        
      </form>

    </div>
  );
}
