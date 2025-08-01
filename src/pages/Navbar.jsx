import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
       
 <button className="text-2xl text-blue-900"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaXmark /> : <IoMenu />}
        </button>

         <div className="flex items-center gap-2">
          <img src="/logo.png" alt="img" className="w-30 h-10 object-contain" />
 </div>
      </div>

{isOpen && (
        <div className="mt-4 text-right space-y-3 text-blue-900 font-semibold px-4">
          <p className="cursor-pointer hover:text-blue-700" onClick={() => { setIsOpen(false); navigate('/about'); }}>
            تعرف على مؤهل
          </p>
          <p className="cursor-pointer hover:text-blue-700" onClick={() => { setIsOpen(false); navigate('/home-analysis'); }}>
            حلل أهليتك
          </p>
          <p className="cursor-pointer hover:text-red-700" onClick={() => { setIsOpen(false); logout(); }}>
            تسجيل خروج
          </p>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
