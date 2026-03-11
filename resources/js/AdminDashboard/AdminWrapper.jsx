// import React from "react";
// import AdminNavBar from "./AdminNavBar";
// import AdminSideBar from "./AdminSideBar";

// const AdminWrapper = ({ children }) => {
//     return (
//         <div>
//             <AdminNavBar />
//             <AdminSideBar />
//             <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 lg:w-[82%] mt-16 md:mt-0 pt-2 md:pt-16 lg:pt-28 ml-auto">
//                 {children}
//             </main>
//         </div>
//     );
// };
//w-full px-4 sm:px-6 md:px-8 lg:px-12 lg:w-[82%] mt-16 md:mt-0 pt-4 md:pt-16 lg:pt-28 md:ml-auto

{/* <main
    className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? "md:ml-64 lg:ml-72" : "md:ml-0 lg:ml-0"
    } w-full p-4 md:p-6 lg:p-8 mt-16 md:mt-0`}
>
    <div className="w-full px-4 sm:px-6 md:px-12 lg:px-8 lg:w-[82%] mt-16 md:mt-0 pt-4 md:pt-16 lg:pt-28 md:ml-auto">
        {children}
    </div>
</main>; */}
// export default AdminWrapper;

import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import AdminSideBar from "./AdminSideBar";

const AdminWrapper = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Hidden on mobile and tablet, visible on desktop */}
            <AdminSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Navbar */}
                <AdminNavBar toggleSidebar={toggleSidebar} />

                {/* Page Content */}
                <main className="flex-1  w-full px-4 sm:px-6 md:px-4 lg:px-8  mt-16 md:mt-0 pt-4 md:pt-16 lg:pt-28 md:ml-auto ">
                    <div className=" min-h-[calc(100vh-8rem)]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminWrapper;
