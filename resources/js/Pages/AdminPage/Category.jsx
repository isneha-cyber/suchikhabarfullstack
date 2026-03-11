import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Edit, Plus, Trash } from "lucide-react";
import axios from "axios";
import AddCategoryForm from "@/AddFormComponents/AddCategoryForm";
import EditCategoryForm from "@/EditFormComponents/EditCategoryForm";
import ReactPaginate from "react-paginate";

const Category = () => {
    const [allCategory, setAllCategory] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(route("cate.index"));
                setAllCategory(response.data.data || []);
                setCurrentPage(0);
            } catch (error) {
                console.error("Error fetching category:", error);
                setAllCategory([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [reloadTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?"))
            return;
        try {
            await axios.delete(route("cate.destroy", { id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting category. Please try again.");
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setShowEditForm(true);
    };

    const offset = currentPage * itemsPerPage;
    const currentCategories = allCategory.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(allCategory.length / itemsPerPage);

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
                            Category Management
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add Category</span>
                    </button>
                </div>
                {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Category Management
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="py-2 px-4 sm:py-3 sm:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">+ Add Category</span>
            <span className="sm:hidden">+ Add</span>
          </button>
        </div> */}

                {/* Add Category Form Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                            <AddCategoryForm
                                showForm={showAddForm}
                                setShowForm={setShowAddForm}
                                setReloadTrigger={setReloadTrigger}
                            />
                        </div>
                    </div>
                )}

                {/* Edit Category Form Modal */}
                {showEditForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
                            <EditCategoryForm
                                showForm={showEditForm}
                                setShowForm={setShowEditForm}
                                editingCategory={editingCategory}
                                setEditingCategory={setEditingCategory}
                                setReloadTrigger={setReloadTrigger}
                            />
                        </div>
                    </div>
                )}

                {/* Responsive Category Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        ID
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-4 py-4 text-center text-gray-500"
                                        >
                                            Loading categories...
                                        </td>
                                    </tr>
                                ) : currentCategories.length > 0 ? (
                                    currentCategories.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {offset + index + 1}
                                            </td>
                                            <td className="px-2 sm:px-4 py-3 text-sm text-gray-900">
                                                {item.name}
                                            </td>
                                            <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                        className="text-blue-600 hover:text-blue-900 flex items-center px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                                                        aria-label={`Edit category ${item.name}`}
                                                    >
                                                        <Edit
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        <span className="hidden sm:inline">
                                                            Edit
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900 flex items-center px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                                                        aria-label={`Delete category ${item.name}`}
                                                    >
                                                        <Trash
                                                            size={14}
                                                            className="mr-1"
                                                        />
                                                        <span className="hidden sm:inline">
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
                                            colSpan="3"
                                            className="px-4 py-4 text-center text-gray-500"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="flex justify-center mt-4 p-4">
                            <ReactPaginate
                                previousLabel={<ChevronLeft size={16} />}
                                nextLabel={<ChevronRight size={16} />}
                                breakLabel="..."
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageChange}
                                containerClassName="pagination flex flex-wrap gap-1 text-sm"
                                activeClassName="bg-red-600 text-white"
                                pageLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition min-w-[2.5rem] text-center"
                                previousLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                                nextLinkClassName="block px-3 py-2 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                                disabledClassName="opacity-50 cursor-not-allowed"
                                forcePage={currentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AdminWrapper>
    );
};

export default Category;
