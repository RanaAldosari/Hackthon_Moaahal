import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRobot } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MySwal = withReactContent(Swal);

function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tips, setTips] = useState([]);
  const isLoggedIn = false;

  useEffect(() => {
    const stored = localStorage.getItem("predictionResult");
    if (stored) {
      const parsed = JSON.parse(stored);
      setResult(parsed);

      if (parsed.reasons) {
        const generatedTips = [];

        parsed.reasons.forEach(reason => {
          if (reason.includes("الالتزامات")) {
            generatedTips.push("قلل الالتزامات الشهرية بقدر الإمكان");
          }
          if (reason.includes("مدة العمل")) {
            generatedTips.push("زد مدة العمل الحالي فوق 12 شهرًا");
          }
          if (reason.includes("العمر")) {
            generatedTips.push("العمر عامل مؤقت، استمر في التوفير وابقَ ملتزمًا");
          }
        });

        setTips(generatedTips);
      }
    }

    AOS.init({ duration: 1400 });
  }, []);

  const switchtoProducts = () => {
    navigate("/all-products");
  };

  const switchtoDevPg = () => {
    navigate("/nsapp-ai-tech");
  };

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

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">جارٍ تحميل النتائج...</p>
      </div>
    );
  }

  const isEligible = result["نسبة التأهيل"] >= 50;

  return (
    <div className="min-h-screen w-full bg-[#F4F5DC] flex flex-col items-center">
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
          <h1 onClick={() => navigate('/')} className="cursor-pointer hover:underline">الصفحة الرئيسية</h1>
          <h1 onClick={() => navigate('/about')} className="cursor-pointer hover:underline">عن مؤهل</h1>
        </div>

        <div>
          <img className='w-28' src="/logo.png" alt="Logo" />
        </div>
      </div>
{/* products */}
      <div className="w-full mt-10 rounded-xl p-10 space-y-10 text-center ">
        <div>
          {isEligible ? (
            <>
              <h1 className="text-lg font-semibold text-gray-700 mb-1">أنت مؤهل بنسبة</h1>
              <h2 className="text-7xl font-extrabold text-green-600 mb-1">{result["نسبة التأهيل"]}%</h2>
              <h1 className="text-4xl font-bold text-blue-900 mb-3">ممتاز</h1>
              <p className="text-gray-700 text-xl">لديك أهلية عالية للحصول على المنتجات البنكية</p>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold text-gray-700 mb-1">للأسف، نسبة التأهيل</h1>
              <h2 className="text-7xl font-extrabold text-red-600 mb-1">{result["نسبة التأهيل"]}%</h2>
              <h1 className="text-4xl font-bold text-red-900 mb-3">غير كافية</h1>
              <p className="text-gray-700 text-xl">ننصح بمراجعة بياناتك أو تحسين ظروفك المالية</p>
            </>
          )}
        </div>

        <div className="text-right w-full ">
          {isEligible ? (
            <>
              <h2 className="text-3xl font-bold mb-6">المنتج المناسب لك</h2>
              <div className="rounded-lg p-8 bg-white shadow-md space-y-6">
                <div className="flex justify-between items-center border-b border-gray-300 pb-4">
                  <span className="px-4 py-2 rounded-full font-semibold text-lg bg-green-300 text-green-900">
                    مؤهل
                  </span>
                  <div>
                    {Array.isArray(result["المنتجات المقترحة"]) ? (
                      <h3 className="text-xl font-semibold">
                        {result["المنتجات المقترحة"][0]}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-semibold">
                        {result["المنتجات المقترحة"]}
                      </h3>
                    )}
                  </div>
                </div>
                <button
                  onClick={switchtoProducts}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-full shadow-md transition duration-300 text-xl"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            </>
          ) : (
            result.reasons && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-6 mt-10 w-full text-right">
                <h2 className="text-red-700 font-bold text-xl mb-4">أسباب عدم الأهلية</h2>
                <h1 className="list-disc pr-5 text-gray-800 leading-loose">
                  {result.reasons.map((reason, index) => (
                    <h1 key={index}>{reason}</h1>
                  ))}
                </h1>

                {tips.length > 0 && (
                  <>
                    <h3 className="text-red-600 font-semibold mt-6 mb-3">نصائح لتحسين فرص الأهلية</h3>
                    <h1 className="list-disc pr-5 text-gray-700 leading-loose">
                      {tips.map((tip, index) => (
                        <h1 key={index}>{tip}</h1>
                      ))}
                    </h1>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
{/* استثمار */}
      <div className="bg-blue-900 rounded-xl text-white mt-12 w-full p-8 m-10 ">
        <div className="flex items-center justify-between space-x-10">
          <div>
            <GrMoney className="text-yellow-400 text-7xl" />
          </div>
          <div className="flex flex-col items-end space-y-6 flex-grow">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <FaRobot className="text-5xl" />
              <h2 className="text-3xl font-bold">استثماري الذكي</h2>
            </div>
            <p className="text-xl text-right">
              اكتشفنا فائض شهري قدره <span className="font-semibold">{result["الفائض المالي"]} ريال</span>
            </p>
            <button
              onClick={switchtoDevPg}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-200 text-lg"
            >
              اكتشف الإستثمارات المناسبة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
