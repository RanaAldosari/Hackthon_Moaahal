import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';  // تأكد تستخدم react-router-dom
import { CiCalculator1 } from "react-icons/ci";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './Navbar';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
// import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
function Analysis() {
  const navigate = useNavigate();
  const username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : 'مستخدم';

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    jobType: 'حكومي',
    jobDuration: '',
    age: '',
    salary: '',
    delayInSama: 'لا',
    commitments: '',
    accountType: 'راتب',
    principal: '',
    termMonths: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const delayValue = formData.delayInSama === 'نعم' ? 1 : 0;

    if (
      !formData.jobDuration ||
      !formData.age ||
      !formData.salary ||
      !formData.commitments ||
      !formData.principal ||
      !formData.termMonths
    ) {
      setError('يرجى تعبئة جميع الحقول المطلوبة');
      setLoading(false);
      return;
    }

    const payload = {
      income: Number(formData.salary),
      commitments: Number(formData.commitments),
      delay_in_sama: delayValue,
      job_type: formData.jobType,
      months_in_job: Number(formData.jobDuration),
      account_type: formData.accountType,
      age: Number(formData.age),
      principal: Number(formData.principal),
      term_months: Number(formData.termMonths),
    };

    try {
      const res = await fetch('http://localhost:10000/predict_full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`خطأ في الاتصال: ${res.status}`);

      const data = await res.json();
      setResult(data);

      localStorage.setItem('predictionResult', JSON.stringify(data));
      localStorage.setItem('lastPayload', JSON.stringify(payload)); 

      navigate('/result');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
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
    <div className="min-h-screen bg-[#F4F5DC]">
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
      <div className="text-[#FEB920] mt-10 px-5 text-lg font-semibold text-right mb-4 mx-auto" data-aos="fade-left">
        مرحبًا، {username}
      </div>

      <div className="text-right mb-6 p-5" data-aos="fade-right">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-end gap-2">
          مستعد لتحليل أهليتك؟ <CiCalculator1 />
        </h1>
        <p className="text-gray-700 mt-2">! قم بملء بياناتك لمساعدتنا في تحليل أهليتك والمنتجات المناسبة لك</p>
      </div>

      <img
        src="/Digital_wallet_mobile_app_Illustration-removebg-preview.png"
        alt=""
        className="mx-auto mb-6 w-60"
        data-aos="zoom-in"
      />

      <div className="flex flex-col lg:flex-row items-center justify-around gap-10">
        <div data-aos="fade-left">
          <img src="/Diyana___Digital_Narayana_on_X-removebg-preview.png" alt="" className="w-72" />
        </div>

        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6 m-5 mb-5" data-aos="fade-up">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="flex flex-col space-y-4">
              <label htmlFor="jobType" className="text-gray-700 font-medium">نوع الوظيفة</label>
              <select
                id="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="حكومي">حكومي</option>
                <option value="خاص">خاص</option>
                <option value="عمل حر">عمل حر</option>
              </select>

              <label htmlFor="jobDuration" className="text-gray-700 font-medium">مدة العمل (بالأشهر)</label>
              <input
                id="jobDuration"
                type="number"
                placeholder="أدخل مدة العمل"
                value={formData.jobDuration}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />

              <label htmlFor="age" className="text-gray-700 font-medium">العمر</label>
              <input
                id="age"
                type="number"
                placeholder="أدخل العمر"
                value={formData.age}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <label htmlFor="salary" className="text-gray-700 font-medium">الراتب الشهري</label>
              <input
                id="salary"
                type="number"
                placeholder="أدخل الراتب"
                value={formData.salary}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />

              <label htmlFor="delayInSama" className="text-gray-700 font-medium">تأخير في سمة</label>
              <select
                id="delayInSama"
                value={formData.delayInSama}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="لا">لا</option>
                <option value="نعم">نعم</option>
              </select>

              <label htmlFor="commitments" className="text-gray-700 font-medium">الإلتزامات الشهرية</label>
              <input
                id="commitments"
                type="number"
                placeholder="الإلتزامات الشهرية"
                value={formData.commitments}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />

              <label htmlFor="accountType" className="text-gray-700 font-medium">نوع الحساب</label>
              <select
                id="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="راتب">راتب</option>
                <option value="جاري">جاري</option>
                <option value="توفير">توفير</option>
              </select>

              <label htmlFor="principal" className="text-gray-700 font-medium">المبلغ</label>
              <input
                id="principal"
                type="number"
                placeholder="أدخل المبلغ"
                value={formData.principal}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />

              <label htmlFor="termMonths" className="text-gray-700 font-medium">مدة السداد (بالأشهر)</label>
              <input
                id="termMonths"
                type="number"
                placeholder="أدخل مدة السداد"
                value={formData.termMonths}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {error && <p className="text-red-600 col-span-2 text-center">{error}</p>}

            <div className="mt-6 text-center md:text-left col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded-lg transition duration-200"
              >
                {loading ? 'جاري التحليل...' : 'حلل أهليتي'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
