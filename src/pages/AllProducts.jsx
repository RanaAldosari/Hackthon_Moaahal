import React, { useEffect, useState } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaCheckCircle, FaHome, FaCar } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("الكل");
  const navigate = useNavigate();
  const isLoggedIn = false;

  useEffect(() => {
    const stored = localStorage.getItem("predictionResult");
    if (stored) {
      const parsed = JSON.parse(stored);
      const all = parsed["المنتجات المقترحة"];
      if (Array.isArray(all)) {
        setProducts(all);
      } else {
        setProducts([]);
      }
    }
  }, []);

  const Applymsg = () => {
    Swal.fire({
      title: "تأكيد",
      text: "ودك تقدم على هذا المنتج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "!نعم، قدّم الطلب",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("!ممتاز", "استلمنا طلبك وسيتم التواصل معك", "success");
      }
    });
  };

  const handleContactClick = () => {
    Swal.fire({
      title: "تواصل معنا",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="الاسم الكامل">
        <input type="email" id="email" class="swal2-input" placeholder="البريد الإلكتروني">
        <textarea id="message" class="swal2-textarea" placeholder="رسالتك"></textarea>
      `,
      confirmButtonText: "إرسال",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const message = Swal.getPopup().querySelector("#message").value;
        if (!name || !email || !message) {
          Swal.showValidationMessage(`الرجاء تعبئة جميع الحقول`);
        }
        return { name, email, message };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("شكرًا لتواصلك!", "", "success");
      }
    });
  };

  const getIconForProduct = (title) => {
    if (title.includes("سيارة")) return <FaCar size={24} className="text-blue-900" />;
    if (title.includes("عقاري")) return <FaHome size={24} className="text-blue-900" />;
    if (title.includes("بطاقة")) return <CiCreditCard1 size={24} className="text-blue-900" />;
    if (title.includes("صندوق") || title.includes("استثمار") || title.includes("صكوك")) {
      return <FaCheckCircle size={24} className="text-blue-900" />;
    }
    return <CiCreditCard1 size={24} className="text-blue-900" />;
  };

  const filteredProducts = products.filter((title) => {
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "الكل" ||
      (selectedFilter === "بطاقة" && title.includes("بطاقة")) ||
      (selectedFilter === "سيارة" && title.includes("سيارة")) ||
      (selectedFilter === "عقاري" && title.includes("عقاري")) ||
      (selectedFilter === "استثمار" &&
        (title.includes("استثمار") || title.includes("صندوق") || title.includes("صكوك")));
    return matchesSearch && matchesFilter;
  });

  if (!products.length)
    return <p className="text-center mt-10">لا توجد منتجات إضافية.</p>;

  return (
    <div className="min-h-screen bg-[#F4F5DC]">
      {/* Navbar */}
      <div className="w-full bg-amber-200 p-4 flex justify-between items-center px-5 md:px-10">
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaXmark size={24} /> : <IoMenu size={24} />}
          </button>
        </div>

        <div
          className={`md:flex gap-5 items-center ${
            menuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-amber-200 p-4 z-50"
              : "hidden"
          } md:static md:bg-transparent md:flex-row`}
        >
          <h1
            onClick={handleContactClick}
            className="cursor-pointer hover:underline"
          >
            تواصل معنا
          </h1>
          <h1
            onClick={() =>
              navigate(isLoggedIn ? "/home-analysis" : "/signin-page")
            }
            className="cursor-pointer hover:underline"
          >
            حلل أهليتك
          </h1>
          <h1
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            الصفحة الرئيسية
          </h1>
          <h1
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/about")}
          >
            عن مؤهل
          </h1>
        </div>

        <div>
          <img className="w-28" src="/logo.png" alt="Logo" />
        </div>
      </div>

      {/* عنوان الصفحة */}
      <div className="text-center mb-6 p-10">
        <h1 className="text-2xl font-bold text-blue-900 flex items-center justify-center gap-2">
          <CiCreditCard1 /> المنتجات الإضافية المقترحة
        </h1>
      </div>

      {/* البحث والتصفية */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-5 mb-6">
        <input
          type="text"
          placeholder="ابحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="الكل">عرض الكل</option>
          <option value="بطاقة">بطاقات</option>
          <option value="سيارة">تمويل سيارة</option>
          <option value="عقاري">تمويل عقاري</option>
          <option value="استثمار">منتجات استثمارية</option>
        </select>
      </div>

      {/* عرض المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5">
        {filteredProducts.map((title, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-xl space-y-4">
            <div className="flex justify-around">
              <div className="text-right">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600">
                  هذا المنتج مناسب لك بناءً على تحليلك المالي
                </p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-900 rounded-full lg:p-5 flex justify-center items-center w-fit">
                {getIconForProduct(title)}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-700">
              <span>الرسوم: حسب نوع المنتج</span>
              <span>الحد: متغير</span>
            </div>
            <ul className="space-y-1 text-right">
              <li className="flex items-center justify-end gap-2">
                متوافق مع حالتك <FaCheckCircle className="text-green-600" />
              </li>
              <li className="flex items-center justify-end gap-2">
                عملية تقديم سهلة <FaCheckCircle className="text-green-600" />
              </li>
              <li className="flex items-center justify-end gap-2">
                إمكانية متابعة عبر التطبيق{" "}
                <FaCheckCircle className="text-green-600" />
              </li>
            </ul>
            <button
              onClick={Applymsg}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg"
            >
              ! قدّم طلبك الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
