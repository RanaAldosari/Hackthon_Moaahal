import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LiaClipboardCheckSolid } from "react-icons/lia";
import { FaArrowTrendUp, FaXmark } from "react-icons/fa6";
import { MdSettingsSuggest, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white/60 rounded-xl shadow-md flex flex-col items-center p-6 text-center hover:shadow-xl hover:cursor-pointer hover:scale-105 transition duration-300">
      <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-700">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function About() {
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
        console.log('تم الإرسال:', result.value);
        Swal.fire('شكرًا لتواصلك!', '', 'success');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F5DC] space-y-16">
      {/* Navbar */}
      <div className='w-full bg-amber-200 p-4 flex justify-between items-center px-5 md:px-10'>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaXmark size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        <div className={`md:flex gap-5 items-center ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-amber-200 p-4 z-50' : 'hidden'} md:static md:bg-transparent md:flex-row`}>
          <h1 onClick={handleContactClick} className="cursor-pointer hover:underline">تواصل معنا</h1>
          <h1 onClick={() => navigate(isLoggedIn ? '/home-analysis' : '/signin-page')} className="cursor-pointer hover:underline">حلل أهليتك</h1>
          <h1 className="cursor-pointer hover:underline" onClick={() => navigate('/')}>الصفحة الرئيسية</h1>
          <h1 className="cursor-pointer hover:underline" onClick={() => navigate('/about')}>عن مؤهل</h1>
        </div>

        <img className='w-28' src="/logo.png" alt="Logo" />
      </div>


      <h1 className="mb-4 text-right text-3xl font-bold text-gray-800 px-10">اكتشف أهليتك الآن مع</h1>
      <div className="text-center">
        <img className="w-60 mx-auto" src="/logo.png" alt="Logo" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-10">
        <div className="flex-1 relative flex justify-center items-center h-[320px] md:h-auto">
          {/* <img
            src="/WhatsApp_Image_2025-07-28_at_01.19.51_07ca905a-removebg-preview.png"
            alt="bg"
            className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[200px] sm:w-[250px] md:w-full max-w-xs opacity-40 z-0"
          /> */}
          <img
            src="/Screenshot_2025-07-28_012144-removebg-preview.png"
            alt="main"
            className="relative w-[180px] sm:w-[220px] md:w-80 z-10 top-10"
          />
        </div>

        <div className="flex-1 text-right px-5">
          <p className="text-gray-700 leading-relaxed text-lg">
            <span className="font-bold text-blue-700">مؤهل</span> هو تطبيق ذكي صُمم لمساعدتك على فهم وتحسين وضعك المالي. يقوم بتحليل بياناتك المالية لتقديم توصيات دقيقة ومخصصة حول المنتجات البنكية التي تناسبك، مع ميزة <span className="font-semibold">"استثماري الذكي"</span> التي تتيح لك استثمار الفائض المالي بأمان وذكاء
          </p>
        </div>
      </div>

      <div className="w-full px-5 text-right mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">خدمات مؤهل</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          يقدّم مؤهل مجموعة متكاملة من الخدمات الذكية التي تساعدك في اتخاذ قرارات مالية مدروسة ومناسبة لاحتياجاتك
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-2 hover:cursor-pointer">
        <FeatureCard
          icon={<LiaClipboardCheckSolid />}
          title="تقييم شامل"
          description="تحليل شامل لوضعك المالي الحالي بناءً على بياناتك البنكية وسلوكك المالي."
        />
        <FeatureCard
          icon={<FaArrowTrendUp />}
          title="استثماري الذكي"
          description="استكشاف الفائض المالي لديك واقتراح طرق استثمار مخصصة بأقل مخاطرة."
        />
        <FeatureCard
          icon={<MdSettingsSuggest />}
          title="توصيات فورية"
          description="نقترح لك المنتجات البنكية الأنسب، مع نصائح مخصصة لتحسين فرصك."
        />
      </div>
      
      <div className="text-center">
        <button
          onClick={() => navigate('/signup-page')}
          className="bg-blue-900 mb-10 hover:bg-blue-800 text-white font-bold py-3 px-10 rounded-full shadow-md transition duration-300"
        >
         ! ابدأ الآن
        </button>
      </div>
    </div>
  );
}

export default About;
