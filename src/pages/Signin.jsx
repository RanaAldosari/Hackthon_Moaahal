import React, { useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

function Signin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
// to store the login info in mockApi
  const apiUrl = "https://68219a91259dad2655afc3cc.mockapi.io/api/users/user";

  const handleLogin = async () => {
    // if empty fields
    if (!phone || !password) {
      Swal.fire("يرجى إدخال رقم الجوال وكلمة المرور");
      return;
    }

    try {
      const response = await axios.get(apiUrl);
      const users = response.data;

      const user = users.find(u => u.phone === phone && u.password === password);
// if user exists
      if (user) {
        Swal.fire({
  title: "تم تسجيل الدخول بنجاح!",
  icon: "success",
  draggable: true
});
localStorage.setItem('user', JSON.stringify(user));

navigate('/home-analysis');
      } else {
        Swal.fire({
  icon: "error",
  title: "خطأ",
  text: "رقم الجوال أو كلمة المرور غير صحيحة",
});
  
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
  icon: "error",
  title: "خطأ",
  text: "حدث خطأ أثناء تسجيل الدخول.",
});
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5DC] flex flex-col md:flex-row items-center justify-around px-4 md:px-10 py-8 relative">
    {/* button for back */}
      <button className="absolute top-4 left-4 text-3xl text-blue-700 p-2 rounded cursor-pointer">
        <IoIosArrowBack />
      </button>

      <div className="flex justify-center items-center mb-6 md:mb-0">
        <img
          src="/Novas_gerações__novas_demandas__novos_desafios_-_Update_or_Die_-removebg-preview.png"
          alt="img"
          className="w-56 md:w-80 max-w-full"
        />
      </div>
{/* form for login */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-4 md:p-8 w-full max-w-md">
        <h1 className="text-xl md:text-2xl font-bold text-right mb-4 md:mb-6">سجل دخولك</h1>
<div className="flex flex-col space-y-3 md:space-y-4">
          <label className="text-gray-700 font-medium text-right" htmlFor="phone">رقم الجوال</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="أدخل رقم الجوال"
            className="border border-gray-300 text-right rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
          />

          <label className="text-gray-700 font-medium text-right" htmlFor="password">كلمة المرور</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            className="border border-gray-300 text-right rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
          />

          <div className="text-right">
            <a href="#" className="text-sm text-blue-700 hover:underline">نسيت كلمة المرور؟</a>
          </div>

          <button
            onClick={handleLogin}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            سجل دخولي
          </button>

          <p className="text-center text-gray-700 text-sm md:text-base">
            لا تمتلك حساب؟ <a href="/signup-page" className="text-blue-700 hover:underline">سجل الآن</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
