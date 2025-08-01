import React, { useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
function Signup() {
  const navigate = useNavigate();

  const switchtohome = () => {
    navigate("/");
  };
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const apiUrl = "https://68219a91259dad2655afc3cc.mockapi.io/api/users/user";

  const handleSignup = async () => {
    if (!name || !phone || !password || !confirmPassword) {
  
      Swal.fire("يرجى تعبئة جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("كلمة المرور غير متطابقة");
      return;
    }

    try {
      // to store the signup info in mockApi
      const response = await axios.post(apiUrl, {
        name,
        phone,
        password
      });

      Swal.fire({
  title: "تم إنشاء الحساب بنجاح!",
  icon: "success",
  draggable: true
});
localStorage.setItem('user', JSON.stringify(response.data));
navigate("/home-analysis")
    } catch (error) {
      console.error(error);
      Swal.fire({
  icon: "error",
  title: "خطأ",
  text: "حدث خطأ أثناء إنشاء الحساب.",
});
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-around bg-[#F4F5DC] px-4 py-8">
      {/* button for back */}
 <button onClick={switchtohome} className="absolute top-4 left-4 text-3xl text-blue-700 p-2 rounded cursor-pointer">
        <IoIosArrowBack />
      </button>
      <div className="flex justify-center items-center mb-8 md:mb-0 md:mr-8">
        <img
          src="/Novas_gerações__novas_demandas__novos_desafios_-_Update_or_Die_-removebg-preview.png"
          alt="img"
          className="w-80 max-w-full"
        />
      </div>
{/* form for create new account */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-right mb-6">أنشئ حسابك</h1>

        <div className="flex flex-col space-y-4">
          <label htmlFor="name" className="text-gray-700 font-medium text-right">الاسم الكامل</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="أدخل اسمك الكامل"
            className="border border-gray-300 text-right rounded-lg px-4 py-2"
          />

          <label htmlFor="phone" className="text-gray-700 font-medium text-right">رقم الجوال</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="أدخل رقم الجوال"
            className="border border-gray-300 text-right rounded-lg px-4 py-2"
          />

          <label htmlFor="password" className="text-gray-700 font-medium text-right">كلمة المرور</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            className="border border-gray-300 text-right rounded-lg px-4 py-2"
          />

          <label htmlFor="confirmPassword" className="text-gray-700 font-medium text-right">تأكيد كلمة المرور</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="أعد إدخال كلمة المرور"
            className="border border-gray-300 text-right rounded-lg px-4 py-2"
          />

          <button
            onClick={handleSignup}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            إنشاء الحساب
          </button>

          <p className="text-center text-gray-700">
            لديك حساب بالفعل؟ <a href="/signin-page" className="text-blue-700 hover:underline">سجّل دخولك</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
