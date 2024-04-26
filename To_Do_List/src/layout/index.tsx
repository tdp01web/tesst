import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Define sidebarOpen state

  return (
    <div className="flex ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-full">
        <HeaderAdmin />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
