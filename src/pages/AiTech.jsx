import React, { useState, useEffect } from 'react';
import { FaRobot } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const InvestmentCard = ({ title, description, rate, minAmount, monthlyReturn, riskLevel, Applymsg }) => (
  <div className="bg-white rounded-xl p-6 shadow-xl space-y-4" data-aos="fade-up">
    <div className="flex justify-between items-start">
      <div className="text-right">
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="text-green-600 text-md font-bold">{rate}</div>
    </div>

    <div className="bg-blue-200  rounded-full py-2 px-4 text-center hover:bg-blue-300 hover:cursor-pointer">
      <p className="text-white font-semibold text-sm">الخيار المثالي لك</p>
    </div>

    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-gray-100 rounded-lg p-2">
        <h4 className="text-green-600 font-bold">{minAmount}</h4>
        <p className="text-sm text-gray-600">الحد الأدنى</p>
      </div>
      <div className="bg-gray-100 rounded-lg p-2">
        <h4 className="text-green-600 font-bold">{monthlyReturn}</h4>
        <p className="text-sm text-gray-600">عائد شهري</p>
      </div>

{/* change color based the state */}
{(() => {
  let bgColor = '';
  let borderColor = '';
  let textColor = '';

  switch (riskLevel) {
    case 'منخفض':
      bgColor = 'bg-green-100';
      borderColor = 'border-green-500';
      textColor = 'text-green-600';
      break;
    case 'متوسط':
      bgColor = 'bg-orange-100';
      borderColor = 'border-orange-500';
      textColor = 'text-orange-600';
      break;
    case 'مرتفع':
      bgColor = 'bg-red-100';
      borderColor = 'border-red-500';
      textColor = 'text-red-600';
      break;
    default:
      bgColor = 'bg-gray-100';
      borderColor = 'border-gray-400';
      textColor = 'text-gray-600';
  }

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-lg p-2`}>
      <h4 className={`${textColor} font-bold`}>{riskLevel}</h4>
      <p className="text-xs text-gray-600">مستوى المخاطر</p>
    </div>
  );
})()}

    </div>

    <button
      onClick={Applymsg}
      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition duration-200"
    >
      !قدّم طلبك الآن
    </button>
  </div>
);

function AiTech() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false;
  const navigate = useNavigate();

  const Applymsg = () => {
    Swal.fire({
      title: "تأكيد",
      text: "ودك تقدم على هذا المنتج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!نعم، قدّم الطلب",
      cancelButtonText: "إلغاء"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "!ممتاز",
          text: "استلمنا طلبك، وراح نتواصل معك قريبًا",
          icon: "success"
        });
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const payload = localStorage.getItem("lastPayload");
    if (!payload) {
      setError("لا يوجد بيانات محفوظة. الرجاء تعبئة البيانات أولاً.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:10000/predict_full", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload
    })
      .then(res => {
        if (!res.ok) throw new Error("فشل في جلب البيانات");
        return res.json();
      })
      .then(data => {
        const invList = data["خيار الاستثمار"];
        if (Array.isArray(invList)) {
          const formatted = invList.map((title) => ({
            title: title.split(" (")[0],
            description: "خيار استثماري ذكي مبني على تحليلك المالي",
            // rate: title.includes("(") ? title.split("(")[1].replace(")", "") : "غير محدد",
            rate: title.includes("(")
  ? "%" + title.split("(")[1].replace(")", "").replace("%", "")
  : "غير محدد",

            minAmount: `${Math.max(1000, data["الفائض المالي"] / 2)} ريال`,
            monthlyReturn: `${Math.round(data["الفائض المالي"] * 0.05)} ريال`,
            riskLevel:
              title.includes("توفير") || title.includes("جاري")
                ? "منخفض"
                : title.includes("ذهب")
                ? "متوسط"
                : "مرتفع"
          }));
          setInvestments(formatted);
        } else {
          setInvestments([]);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleContactClick = () => {
    Swal.fire({
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
    <div className="min-h-screen bg-[#F4F5DC] ">
      
      {/* Navbar start */}
      <div className='w-full bg-amber-200 p-4 flex justify-between items-center px-5 md:px-10'>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaXmark size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        <div className={`md:flex gap-5 items-center ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-amber-200 p-4 z-50' : 'hidden'} md:static md:bg-transparent md:flex-row`}>
          <h1 onClick={handleContactClick} className="cursor-pointer hover:underline">تواصل معنا</h1>
          <h1 onClick={() => navigate(isLoggedIn ? '/home-analysis' : '/signin-page')} className="cursor-pointer hover:underline">حلل أهليتك</h1>
          <h1 onClick={() => navigate('/')} className="cursor-pointer hover:underline">الصفحة الرئيسية</h1>
          <h1 onClick={() => navigate('/about')} className="cursor-pointer hover:underline">عن مؤهل</h1>
        </div>

        <div>
          <img className='w-28' src="/logo.png" alt="Logo" />
        </div>
      </div>
      {/* Navbar end */}
<div className="mb-6 p-10" data-aos="fade-right">
        <h1 className="text-3xl text-center font-bold text-blue-900 flex items-center justify-center gap-2">
          <FaRobot /> استثماري الذكي
        </h1>
        <p className="text-gray-700 text-center mt-2">
          "استثماري الذكي" هو نظام ذكي يحلل وضعك المالي بدقة من الدخل إلى الفائض ومن خلال هذا التحليل، يتم تحديد أفضل خيارات الاستثمار المناسبة لك
        </p>
      </div>

      {loading && <p className="text-center text-lg">...جاري تحميل المنتجات</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4">
        {investments.length > 0 ? (
          investments.map((inv, index) => (
            <InvestmentCard key={index} {...inv} Applymsg={Applymsg} />
          ))
        ) : (          !loading && <p className="text-center col-span-full text-gray-700">لا توجد منتجات استثمارية حالياً</p>
        )}
      </div>
    </div>
  );
}

export default AiTech;

