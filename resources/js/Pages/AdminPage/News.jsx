import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import React, { useState, useEffect } from "react";
import {
    FileDown,
    User,
    Calendar,
    Edit,
    Trash,
    Plus,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import axios from "axios";
import AddNewsForm from "@/AddFormComponents/AddNewsForm";
import EditNewsForm from "@/EditFormComponents/EditNewsForm";
import ReactPaginate from "react-paginate";

const News = () => {
    const [allNews, setAllNews] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [showNewsForm, setShowNewsForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [allCategory, setAllCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const itemsPerPage = 15;

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Truncate text utility
    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    // Handle backdrop click to close modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowNewsForm(false);
            setShowEditForm(false);
            setEditingNews(null);
        }
    };

    // Fetch news from API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(route("news.index"));
                setAllNews(
                    Array.isArray(response.data.data) ? response.data.data : []
                );
                setCurrentPage(0);
            } catch (error) {
                console.error("Error fetching news:", error);
                setAllNews([]);
            }
        };
        fetchNews();
        const fetchCategories = async () => {
            try {
                const response = await axios.get(route("cate.index"));
                setAllCategory(
                    Array.isArray(response.data.data) ? response.data.data : []
                );
            } catch (error) {
                console.error("Error fetching Category:", error);
                setAllCategory([]);
            }
        };
        fetchCategories();
    }, [reloadTrigger]);

    // Delete news
    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Are you sure you want to delete this news article?"
            )
        )
            return;
        try {
            await axios.delete(route("news.destroy", { id }));
            setReloadTrigger((prev) => !prev); // Trigger re-fetch
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete the article.");
        }
    };

    // Edit news
    const handleEdit = (news) => {
        setEditingNews(news);
        setShowEditForm(true);
    };

    // Update news
    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            await axios.post(route("news.update", { id }), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
            setShowEditForm(false);
            setEditingNews(null);
        } catch (error) {
            console.error("Error updating news:", error);
            throw error;
        }
    };

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentNews = allNews.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allNews.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <AdminWrapper>
            <div className="">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            News Management
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            setEditingNews(null);
                            setShowNewsForm(true);
                        }}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add News</span>
                    </button>
                </div>

                {/* Add News Form Modal */}
                {showNewsForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-2 md:p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <AddNewsForm
                                showNewsForm={showNewsForm}
                                setShowNewsForm={setShowNewsForm}
                                reloadTrigger={reloadTrigger}
                                setReloadTrigger={setReloadTrigger}
                                setAllCategory={setAllCategory}
                                allCategory={allCategory}
                            />
                        </div>
                    </div>
                )}

                {/* Edit News Form Modal */}
                {showEditForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-2 md:p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <EditNewsForm
                                showNewsForm={showEditForm}
                                setShowNewsForm={setShowEditForm}
                                editingNews={editingNews}
                                setEditingNews={setEditingNews}
                                handleUpdate={handleUpdate}
                                setAllCategory={setAllCategory}
                                allCategory={allCategory}
                            />
                        </div>
                    </div>
                )}

                {/* News Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4 md:mt-6">
                    {isMobileView ? (
                        // Mobile view - card layout
                        <div className="divide-y divide-gray-200">
                            {currentNews.length > 0 ? (
                                currentNews.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="p-4 hover:bg-gray-50"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm text-gray-500">
                                                S.no {offset + index + 1}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                    className="text-blue-600 hover:text-blue-900 p-1"
                                                    aria-label="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                    className="text-red-600 hover:text-red-900 p-1"
                                                    aria-label="Delete"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <h3
                                            className="font-medium text-gray-900 mb-2"
                                            title={item.heading}
                                        >
                                            {truncateText(item.heading, 60)}
                                        </h3>

                                        <p
                                            className="text-sm text-gray-600 mb-3"
                                            title={item.description}
                                        >
                                            {truncateText(
                                                item.description,
                                                100
                                            )}
                                        </p>

                                        <div className="flex justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Calendar
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                <span>
                                                    {new Date(
                                                        item.published_at
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className="mt-2 text-sm text-blue-600 truncate"
                                            title={item.image}
                                        >
                                            {truncateText(
                                                item.image?.trim(),
                                                30
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-4 text-center text-gray-500">
                                    No news articles found.
                                </div>
                            )}
                        </div>
                    ) : (
                        // Tablet/Desktop view - table layout
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            S.no
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Heading
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                            Description
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Published Date
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Image Path
                                        </th>
                                        <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentNews.length > 0 ? (
                                        currentNews.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-3 md:px-6 py-4 text-sm text-gray-900">
                                                    {offset + index + 1}
                                                </td>
                                                <td className="px-3 md:px-6 py-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900 max-w-xs md:max-w-sm"
                                                        title={item.heading}
                                                    >
                                                        {truncateText(
                                                            item.heading,
                                                            window.innerWidth <
                                                                1024
                                                                ? 30
                                                                : 50
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 md:px-6 py-4 hidden md:table-cell">
                                                    <div
                                                        className="text-sm text-gray-900 max-w-xs lg:max-w-md"
                                                        title={item.description}
                                                    >
                                                        {truncateText(
                                                            item.description,
                                                            window.innerWidth <
                                                                1024
                                                                ? 50
                                                                : 70
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(
                                                            item.published_at
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 md:px-6 py-4">
                                                    <div
                                                        className="text-sm text-blue-600 max-w-xs truncate"
                                                        title={item.image}
                                                    >
                                                        {truncateText(
                                                            item.image?.trim(),
                                                            window.innerWidth <
                                                                1024
                                                                ? 20
                                                                : 40
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            className="text-blue-600 hover:text-blue-900 flex items-center"
                                                        >
                                                            <Edit
                                                                size={14}
                                                                className="mr-1"
                                                            />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 flex items-center"
                                                        >
                                                            <Trash
                                                                size={14}
                                                                className="mr-1"
                                                            />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-4 text-center text-gray-500"
                                            >
                                                No news articles found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="flex justify-center mt-4 md:mt-6 p-3 md:p-4">
                        <ReactPaginate
                            previousLabel={<ChevronLeft size={16} />}
                            nextLabel={<ChevronRight size={16} />}
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={isMobileView ? 1 : 2}
                            pageRangeDisplayed={isMobileView ? 2 : 5}
                            onPageChange={handlePageChange}
                            containerClassName="pagination flex gap-1 text-sm"
                            activeClassName="bg-red-600 text-white"
                            pageLinkClassName="block px-2 md:px-3 py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            previousLinkClassName="block px-2 md:px-3 py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition flex items-center"
                            nextLinkClassName="block px-2 md:px-3 py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition flex items-center"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            forcePage={currentPage}
                        />
                    </div>
                )}
            </div>
        </AdminWrapper>
    );
};

export default News;
