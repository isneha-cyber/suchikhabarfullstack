import AddBannerForm from "@/AddFormComponents/AddBannersForm";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import EditBannerForm from "@/EditFormComponents/EditBannerForm";
import axios from "axios";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const imgurl = import.meta.env.VITE_IMAGE_PATH;

const Banners = () => {
    const [allbanner, setAllBanner] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                setLoading(true);
                console.log("Fetching banners...");
                const response = await axios.get(route("banner.index"));
                console.log("API Response:", response.data);

                if (response.data && response.data.data) {
                    setAllBanner(response.data.data);
                } else {
                    setAllBanner(response.data || []);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
                if (error.response) {
                    console.error("Error response:", error.response.data);
                }
                setAllBanner([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBanner();
    }, [reloadTrigger]);

    // Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?"))
            return;

        try {
            await axios.delete(route("banner.destroy", { id }));
            setReloadTrigger((prev) => !prev); // Trigger re-fetch
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // Handle update
    const handleUpdate = async (formData, id) => {
        try {
            formData.append("_method", "PUT");
            await axios.post(route("banner.update", { id }), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Error updating banner:", error);
            throw error;
        }
    };

    // Open edit form
    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setShowEditForm(true);
    };

    // Close edit form
    const handleCloseEdit = () => {
        setEditingBanner(null);
        setShowEditForm(false);
    };

    // Pagination logic
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentBanners = allbanner.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allbanner.length / itemsPerPage);

    if (loading) {
        return (
            <AdminWrapper>
                <div className="p-4">
                    <p>Loading banners...</p>
                </div>
            </AdminWrapper>
        );
    }

    return (
        <AdminWrapper>
            <div className="">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Banners
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add Banner</span>
                    </button>
                </div>
                {/* <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <h2 className="text-2xl font-semibold">Banners</h2>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="py-3 px-4 bg-red-700 text-white rounded-xl hover:bg-red-800 transition"
                    >
                        Add Banner
                    </button>
                </div> */}

                {/* Banner Grid */}
                <div className="flex flex-col gap-6">
                    {currentBanners.length > 0 ? (
                        currentBanners.map((item) => (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <a
                                    href={item.link?.trim() || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <div
                                        className={`${
                                            item.category === "rectangle" ||
                                            item.category === "Rectangle"
                                                ? "w-full h-32 md:h-40"
                                                : "w-56 h-48 md:h-56"
                                        } bg-cover bg-center object-cover`}
                                        style={{
                                            backgroundImage: `url(${item.image})`,
                                        }}
                                    ></div>
                                </a>

                                {/* Edit & Delete Buttons */}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No banners found.</p>
                    )}
                </div>

                {/* Add Form Modal */}
                {showAddForm && (
                    <AddBannerForm
                        showForm={showAddForm}
                        setShowForm={setShowAddForm}
                        reloadTrigger={reloadTrigger}
                        setReloadTrigger={setReloadTrigger}
                    />
                )}

                {/* Edit Form Modal */}
                {showEditForm && (
                    <EditBannerForm
                        showForm={showEditForm}
                        setShowForm={setShowEditForm}
                        editingBanner={editingBanner}
                        handleUpdate={handleUpdate}
                        handleClose={handleCloseEdit}
                        reloadTrigger={reloadTrigger}
                        setReloadTrigger={setReloadTrigger}
                    />
                )}

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="mt-8">
                        <ReactPaginate
                            previousLabel={<ChevronLeft size={16} />}
                            nextLabel={<ChevronRight size={16} />}
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="flex justify-center items-center space-x-1 text-sm mt-4"
                            // Common link styling
                            pageLinkClassName="block px-3 py-1 border rounded hover:bg-gray-100 transition"
                            previousLinkClassName="block px-3 py-1 border rounded hover:bg-gray-100 transition"
                            nextLinkClassName="block px-3 py-1 border rounded hover:bg-gray-100 transition"
                            breakLinkClassName="block px-3 py-1 border-transparent"
                            // Optional: if you want to style disabled states
                            disabledLinkClassName="opacity-50 cursor-not-allowed"
                            // Active page style
                            activeLinkClassName="bg-red-700 text-white hover:bg-red-800"
                        />
                    </div>
                )}
            </div>
        </AdminWrapper>
    );
};

export default Banners;
