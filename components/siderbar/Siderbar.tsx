import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsFire } from "react-icons/bs";

const Siderbar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-72 bg-gray-900 transition-transform">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-6 p-4">
          <h6 className="block antialiased font-sans text-xl font-semibold text-white">
            CTI Control
          </h6>
        </div>

        <div className="space-y-4">
          <ul className="flex flex-col gap-2">
            {/* Menu */}
            <li>
              <a
                href="/menu"
                className="flex items-center gap-4 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <AiFillHome className="w-6 h-6" />
                <span className="font-medium">Menu</span>
              </a>
            </li>

            {/* Calefacción */}
            <li>
              <a
                href="/calefaccion"
                className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-blue-600 rounded-lg transition-colors"
              >
                <BsFire className="w-6 h-6" />
                <span className="font-medium">Calefaccion</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Siderbar;
