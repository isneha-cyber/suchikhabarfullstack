// import React, { useState } from "react";
// import { Link, usePage } from "@inertiajs/react";
// import {
//     Home,
//     Users,
//     LogOut,
//     ChevronDown,
//     ChevronUp,
//     BookOpen,
//     Bookmark,
//     FileStack,
//     Image,
//     FolderOpen,
//     User,
//     Newspaper
// } from "lucide-react";

// const AdminSideBar = () => {
//     const { url } = usePage();
//     const [isLibraryOpen, setIsLibraryOpen] = useState(false);

//     const toggleLibrary = () => {
//         setIsLibraryOpen(!isLibraryOpen);
//     };

//     const handleLogout = () => {
//         axios
//             .post(route("logout"))
//             .then((response) => {
//                 console.log(response.data);
//                 if (response.data.redirect) {
//                     window.location.href = response.data.redirect;
//                 } else {
//                     window.location.href = "/login";
//                 }
//             })
//             .catch((error) => {
//                 console.error("logout error:", error);
//                 toast.error("Failed to logout. Please try again.");
//             });
//     };

//     // Function to check if a link is active
//     const isActiveLink = (path) => {
//         return url === path || url.startsWith(path + '/');
//     };

//     return (
//         <div className="fixed top-0 left-0 h-screen w-full md:w-[30%] lg:w-[18%] bg-slate-50 text-slate-800 flex flex-col shadow-xl z-50">
//             <div className="p-6 flex items-center space-x-2">
//                 <img
//                     src="../logo.png"
//                     alt="SuchiKhabar"
//                     className="w-full h-[6rem]"
//                 />
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-4 space-y-1">
//                 {/* Home */}
//                 <Link
//                     href={"/dashboard"}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
//                         isActiveLink("/dashboard")
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                 >
//                     <Home size={20} />
//                     <span className="font-medium">Home</span>
//                 </Link>

//                 <Link
//                     href={"/teams"}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
//                         isActiveLink("/teams")
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                 >
//                     <Users size={20} />
//                     <span className="font-medium">Teams</span>
//                 </Link>

//                 <Link
//                     href={"/banners"}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
//                         isActiveLink("/banners")
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                 >
//                     <Image size={20} />
//                     <span className="font-medium">Banners</span>
//                 </Link>

//                 <Link
//                     href={"/article"}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
//                         isActiveLink("/article")
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                 >
//                     <Newspaper size={20} />
//                     <span className="font-medium">News</span>
//                 </Link>

//                 <Link
//                     href={"/category"}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
//                         isActiveLink("/category")
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                 >
//                     <FolderOpen size={20} />
//                     <span className="font-medium">Category</span>
//                 </Link>

//                 <Link
//                     href={"/user"}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
//                         isActiveLink("/user")
//                             ? "bg-blue-100 text-blue-700"
//                             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                     }`}
//                 >
//                     <User size={20} />
//                     <span className="font-medium">User</span>
//                 </Link>

//                 {/* Library Section (commented out but updated for consistency) */}
//                 {/* <div className="w-full">
//                     <button
//                         onClick={toggleLibrary}
//                         className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all w-full"
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen size={20} />
//                             <span className="font-medium">Library</span>
//                         </div>
//                         {isLibraryOpen ? (
//                             <ChevronUp size={16} />
//                         ) : (
//                             <ChevronDown size={16} />
//                         )}
//                     </button>
//                     {isLibraryOpen && (
//                         <div className="ml-8 mt-1 space-y-1">
//                             <Link
//                                 href={"/library/banners"}
//                                 className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all w-full text-sm ${
//                                     isActiveLink("/library/banners")
//                                         ? "bg-blue-100 text-blue-700"
//                                         : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Image size={16} />
//                                 <span>Banners</span>
//                             </Link>
//                             <Link
//                                 href={"/library/category"}
//                                 className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all w-full text-sm ${
//                                     isActiveLink("/library/category")
//                                         ? "bg-blue-100 text-blue-700"
//                                         : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <FolderOpen size={16} />
//                                 <span>Category</span>
//                             </Link>
//                             <Link
//                                 href={"/library/news"}
//                                 className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all w-full text-sm ${
//                                     isActiveLink("/library/news")
//                                         ? "bg-blue-100 text-blue-700"
//                                         : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                                 }`}
//                             >
//                                 <Newspaper size={16} />
//                                 <span>News</span>
//                             </Link>
//                         </div>
//                     )}
//                 </div> */}
//             </nav>

//             <button
//                 method="post"
//                 as="button"
//                 onClick={(e) => {
//                     e.preventDefault();
//                     handleLogout();
//                 }}
//                 className="m-6 flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all text-left"
//             >
//                 <LogOut size={20} />
//                 <span className="font-medium">Log Out</span>
//             </button>
//         </div>
//     );
// };

// export default AdminSideBar;

import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Users,
    LogOut,
    Image,
    User,
    Newspaper,
    X,
    List,
    FileText,
    Archive
} from "lucide-react";
import axios from "axios";

const AdminSideBar = ({ isOpen, toggleSidebar }) => {
    const { url } = usePage();
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        setActiveLink(url);
    }, [url]);

    const isActiveLink = (path) => {
        return activeLink.startsWith(path)
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900";
    };

    const handleLogout = () => {
        axios
            .post(route("logout"))
            .then((response) => {
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                } else {
                    window.location.href = "/login";
                }
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    return (
        <>
            {/* Backdrop for mobile and tablet */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            
            <aside
                className={`fixed top-0 left-0 z-50 h-screen bg-slate-50 text-slate-800 transform transition-transform duration-300 ease-in-out w-64 ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="relative flex justify-between items-center p-4 md:p-6">
                    <img
                        src="../logo.png"
                        alt="SuchiKhabar"
                        className="w-full h-12 md:h-16 object-contain"
                    />
                    {/* Close button for mobile and tablet */}
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-2 right-2 lg:hidden p-2 rounded-full hover:bg-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 md:px-4 space-y-1 mt-4 overflow-y-auto h-[calc(100vh-10rem)]">
                    <Link
                        href="/home"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/home"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Home size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Home</span>
                    </Link>

                    <Link
                        href="/category"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/category"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <List size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Categories</span>
                    </Link>

                    <Link
                        href="/article"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/article"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Newspaper size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">News Articles</span>
                    </Link>
                    
                    <Link
                        href="/banners"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/banners"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Image size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Banners</span>
                    </Link>
                    
                    <Link
                        href="/heading"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/heading"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <FileText size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Headings</span>
                    </Link>

                    <Link
                        href="/teams"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/teams"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Users size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Team Members</span>
                    </Link>

                    <Link
                        href="/user"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/user"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <User size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Users</span>
                    </Link>

                    <Link
                        href="/log"
                        className={`flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl transition-all w-full text-sm md:text-base ${isActiveLink(
                            "/log"
                        )}`}
                        onClick={() =>
                            window.innerWidth < 1024 && toggleSidebar()
                        }
                    >
                        <Archive size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Activity Logs</span>
                    </Link>
                </nav>

                {/* Logout Button at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 border-t border-gray-200 bg-slate-50">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        className="flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all w-full text-left text-sm md:text-base"
                    >
                        <LogOut size={18} className="md:w-5 md:h-5" />
                        <span className="font-medium">Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSideBar;