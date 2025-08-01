import React from 'react';
import { FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-amber-200 py-5 pt-4px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right ">

  <div className="flex flex-col items-end">
            <h2 className="text-xl font-bold mb-2">تواصل معنا</h2>
            <div className="flex gap-4 text-2xl text-gray-800">
              <h1 className='bg-amber-100 p-2 rounded-full hover:scale-110 duration-500 delay-200 hover:cursor-pointer hover:text-orange-400'>  <MdOutlineEmail /></h1>
              <h1 className='bg-amber-100 p-2 rounded-full hover:scale-110 duration-500 delay-200 hover:cursor-pointer hover:text-orange-400'>  <FaXTwitter /></h1>
              <h1 className='bg-amber-100 p-2 rounded-full hover:scale-110 duration-500 delay-200 hover:cursor-pointer hover:text-orange-400'>  <FaLinkedinIn /></h1>
              <h1 className='bg-amber-100 p-2 rounded-full hover:scale-110 duration-500 delay-200 hover:cursor-pointer hover:text-orange-400'>  <FaWhatsapp /></h1>
            </div>
              <div className="flex justify-center items-center gap-6 mt-6">
          <img src="/appStore.png" alt="App Store" className="w-32 h-auto" />
          <img src="/googlePlay.png" alt="Google Play" className="w-32 h-auto" />
        </div>
          </div>

  <div className=''>
            <h2 className="text-xl font-bold mb-2">المنتجات والخدمات</h2>
            <ul className="space-y-1 text-gray-800">
              <li className='hover:underline cursor-pointer'>تقييم شامل</li>
              <li className='hover:underline cursor-pointer'>نصبب الذكي</li>
              <li className='hover:underline cursor-pointer'>توصيات فورية</li>
            </ul>
          </div>


          <div>
            <h2 className="text-xl font-bold mb-2">مؤهل</h2>
            <ul className="space-y-1 text-gray-800">
              <li className='hover:underline cursor-pointer'>من نحن</li>
              <li className='hover:underline cursor-pointer'>قالوا عن مؤهل</li>
            </ul>
          </div>

        
 </div>

<div className="text-center mt-6 text-gray-700 font-medium">
          <p>جميع الحقوق محفوظة © 2025</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
