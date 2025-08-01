import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Welcome() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false; 

  useEffect(() => {
    AOS.init({ duration: 1400 });
  }, []);

  const handleContactClick = () => {
    MySwal.fire({
      title: 'تواصل معنا',
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="الاسم الكامل">
        <input type="email" id="email" class="swal2-input" placeholder="البريد الإلكتروني">
        <textarea id="message" class="swal2-textarea" placeholder="رسالتك"></textarea>
      `,
      confirmButtonText: 'إرسال',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const message = Swal.getPopup().querySelector('#message').value;
        if (!name || !email || !message) {
          Swal.showValidationMessage(`الرجاء تعبئة جميع الحقول`);
        }
        return { name, email, message };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('شكرًا لتواصلك!', '', 'success');
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F4F5DC] space-y-7">
      {/* navbar */}
      <div className='w-full bg-amber-200 p-4 flex justify-between items-center px-5 md:px-10'>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaXmark size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        <div className={`md:flex gap-5 items-center ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-amber-200 p-4 z-50' : 'hidden'} md:static md:bg-transparent md:flex-row`}>
          <h1 onClick={handleContactClick} className="cursor-pointer hover:underline">تواصل معنا</h1>
          <h1
            onClick={() => navigate(isLoggedIn ? '/home-analysis' : '/signin-page')}
            className="cursor-pointer hover:underline"
          >
            حلل أهليتك
          </h1>
          <h1 className="cursor-pointer hover:underline" onClick={() => navigate('/')}>الصفحة الرئيسية</h1>
          <h1 className="cursor-pointer hover:underline" onClick={() => navigate('/about')}>عن مؤهل</h1>
        </div>

        <div>
          <img className='w-28' src="/logo.png" alt="Logo" />
        </div>
      </div>

      {/* hero section */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl gap-8 px-4 mt-20" data-aos="fade-up" data-aos-delay="300">
        
        <div className="flex-1 flex justify-center md:justify-start order-2 md:order-1">
          <img
            src="/Screenshot_2025-07-28_012144-removebg-preview.png"
            alt="foreground"
            className="w-96 sm:w-[28rem] md:w-[30rem]"
          />
        </div>

        <div className="flex-1 text-right space-y-4 order-1 md:order-2">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-400">
            اكتشف أهليتك للمنتجات البنكية
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            نظام ذكي يساعدك على معرفة مدى أهليتك للحصول على المنتجات البنكية مع توصيات مخصصة وميزة
            <span className="font-semibold"> " نصّبب الذكي" </span>
            لاستثمار فائضك المالي
          </p>

          <p
            onClick={() => navigate('/about')}
            className="text-blue-700 font-semibold hover:underline flex justify-end items-center gap-1 cursor-pointer"
          >
            <MdKeyboardDoubleArrowLeft /> تعرف على مؤهل
          </p>

          <div className="text-right flex justify-end">
            <button
              onClick={() => navigate('/signin-page')}
              className="flex justify-end bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300"
            >
              ! ابدأ الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
