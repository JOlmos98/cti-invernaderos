import React from "react";
import NavLinks from "./navLinks";

const Siderbar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-72 bg-gray-900 transition-transform">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-6 p-4">
          <h6 className="block antialiased font-sans text-xl font-semibold text-white">
            CTI Control
          </h6>
        </div>
        < NavLinks /> 
      </div> 
    </aside>
  );
};

export default Siderbar;
