import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import React, { useState, useEffect } from "react";
import {
    FileDown,
    User,
    Calendar,
    Edit,
    Trash,
    X,
    Menu,
    Search,
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import axios from "axios";
import AddHeadingForm from "@/AddFormComponents/AddHeadingForm";
import EditHeadingForm from "@/EditFormComponents/EditHeadingForm";
import ReactPaginate from "react-paginate";

const Heading = () => {
    const [allHeadings, setAllHeadings] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingHeading, setEditingHeading] = useState(null);
    const [showHeadingForm, setShowHeadingForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allCategory, setAllCategory] = useState([]);
    const [dailyLimitError, setDailyLimitError] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPage = 15;

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
            setShowHeadingForm(false);
            setShowEditForm(false);
            setEditingHeading(null);
        }
    };

    // Filter headings based on search query
    const filteredHeadings = allHeadings.filter(
        (item) =>
            item.heading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fetch headings from API
    useEffect(() => {
        const fetchHeadings = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(route("headings.index"));

                // Handle different possible response structures
                let headingsData = [];

                if (Array.isArray(response.data)) {
                    headingsData = response.data;
                } else if (response.data && Array.isArray(response.data.data)) {
                    headingsData = response.data.data;
                } else if (response.data && response.data.headings) {
                    headingsData = response.data.headings;
                }

                setAllHeadings(headingsData);
                setCurrentPage(0);
            } catch (error) {
                console.error("Error fetching headings:", error);
                setError("Failed to fetch headings. Please try again.");
                setAllHeadings([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHeadings();

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

    // Delete heading
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this heading?"))
            return;
        try {
            await axios.delete(route("headings.destroy", { id }));
            setReloadTrigger((prev) => !prev); // Trigger re-fetch
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete the heading.");
        }
    };

    // Edit heading
    const handleEdit = (heading) => {
        setEditingHeading(heading);
        setShowEditForm(true);
    };

    // Update heading
    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            await axios.post(route("headings.update", { id }), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
            setShowEditForm(false);
            setEditingHeading(null);
        } catch (error) {
            console.error("Error updating heading:", error);
            throw error;
        }
    };

    // Handle form submission error from AddHeadingForm
    const handleFormSubmissionError = (error) => {
        if (error.response && error.response.status === 403) {
            // Close the form and show the daily limit error
            setShowHeadingForm(false);
            setDailyLimitError(true);
        } else {
            // Handle other errors
            console.error("Error creating heading:", error);
            alert("Failed to create the heading. Please try again.");
        }
    };

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentHeadings = filteredHeadings.slice(
        offset,
        offset + itemsPerPage
    );
    const pageCount = Math.ceil(filteredHeadings.length / itemsPerPage);

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
                         Heading Management
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            setEditingHeading(null);
                            setShowHeadingForm(true);
                        }}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add Heading</span>
                    </button>
                </div>
                {/* <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Heading Management
                    </h1>

                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                        <button
                            onClick={() => {
                                setEditingHeading(null);
                                setShowHeadingForm(true);
                            }}
                            className="py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 flex items-center justify-center gap-2 w-full md:w-auto"
                        >
                            Add Heading
                        </button>
                    </div>
                </div> */}

                {/* Daily Limit Error Modal */}
                {dailyLimitError && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Daily Limit Reached
                                </h3>
                                <button
                                    onClick={() => setDailyLimitError(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-6">
                                News can only be added once per day. Please
                                return tomorrow to add another.
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setDailyLimitError(false)}
                                    className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Heading Form Modal */}
                {showHeadingForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <AddHeadingForm
                                showHeadingForm={showHeadingForm}
                                setShowHeadingForm={setShowHeadingForm}
                                reloadTrigger={reloadTrigger}
                                setReloadTrigger={setReloadTrigger}
                                onError={handleFormSubmissionError}
                                setAllCategory={setAllCategory}
                                allCategory={allCategory}
                            />
                        </div>
                    </div>
                )}

                {/* Edit Heading Form Modal */}
                {showEditForm && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
                        onClick={handleBackdropClick}
                    >
                        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
                            <EditHeadingForm
                                showHeadingForm={showEditForm}
                                setShowHeadingForm={setShowEditForm}
                                editingHeading={editingHeading}
                                setEditingHeading={setEditingHeading}
                                handleUpdate={handleUpdate}
                                setAllCategory={setAllCategory}
                                allCategory={allCategory}
                            />
                        </div>
                    </div>
                )}

                {/* Loading and Error States */}
                {isLoading && (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                        <p className="mt-2 text-gray-600">
                            Loading headings...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {/* Heading Table */}
                {!isLoading && !error && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4 md:mt-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            S.no
                                        </th>
                                        <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                                            Description
                                        </th>
                                        <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                            Published Date
                                        </th>
                                        <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                            Image Path
                                        </th>
                                        <th className="px-3 md:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentHeadings.length > 0 ? (
                                        currentHeadings.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-3 md:px-4 lg:px-6 py-4 text-sm text-gray-900">
                                                    {offset + index + 1}
                                                </td>
                                                <td className="px-3 md:px-4 lg:px-6 py-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900 max-w-xs md:max-w-sm"
                                                        title={item.heading}
                                                    >
                                                        {truncateText(
                                                            item.heading,
                                                            window.innerWidth <
                                                                768
                                                                ? 25
                                                                : 50
                                                        )}
                                                    </div>
                                                    {/* Mobile-only description preview */}
                                                    <div className="text-xs text-gray-500 mt-1 sm:hidden">
                                                        {truncateText(
                                                            item.description,
                                                            40
                                                        )}
                                                    </div>
                                                    {/* Mobile-only published date */}
                                                    <div className="text-xs text-gray-500 mt-1 md:hidden">
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
                                                <td className="px-3 md:px-4 lg:px-6 py-4 hidden sm:table-cell">
                                                    <div
                                                        className="text-sm text-gray-900 max-w-xs md:max-w-md"
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
                                                <td className="px-3 md:px-4 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">
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
                                                <td className="px-3 md:px-4 lg:px-6 py-4 hidden lg:table-cell">
                                                    <div
                                                        className="text-sm text-blue-600 max-w-xs truncate"
                                                        title={item.image}
                                                    >
                                                        {truncateText(
                                                            item.image?.trim(),
                                                            40
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-3 md:px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex flex-col md:flex-row gap-1 md:gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            className="text-blue-600 hover:text-blue-900 flex items-center py-1"
                                                        >
                                                            <Edit
                                                                size={14}
                                                                className="mr-1"
                                                            />
                                                            <span className="hidden xs:inline">
                                                                Edit
                                                            </span>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900 flex items-center py-1"
                                                        >
                                                            <Trash
                                                                size={14}
                                                                className="mr-1"
                                                            />
                                                            <span className="hidden xs:inline">
                                                                Delete
                                                            </span>
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
                                                {searchQuery
                                                    ? "No headings match your search."
                                                    : "No headings found."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="flex justify-center mt-4 p-4 overflow-x-auto">
                        <ReactPaginate
                            previousLabel={<ChevronLeft size={16} />}
                            nextLabel={<ChevronRight size={16} />}
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={
                                window.innerWidth < 768 ? 1 : 2
                            }
                            pageRangeDisplayed={window.innerWidth < 768 ? 3 : 5}
                            onPageChange={handlePageChange}
                            containerClassName="pagination flex gap-1 text-sm flex-wrap justify-center"
                            activeClassName="bg-red-600 text-white"
                            pageLinkClassName="block px-3 py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            previousLinkClassName="block px-3 py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            nextLinkClassName="block px-3 py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            forcePage={currentPage}
                        />
                    </div>
                )}
            </div>
        </AdminWrapper>
    );
};

export default Heading;
