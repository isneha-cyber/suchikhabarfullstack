import axios from "axios";
import React, { useEffect, useState } from "react";

const EditCategoryForm = ({
  setShowForm,
  editingCategory,
  setEditingCategory,
  setReloadTrigger,
}) => {
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Sync form with editingCategory when it changes
  useEffect(() => {
    if (editingCategory) {
      setCategoryForm({
        name: editingCategory.name || "",
      });
    } else {
      setCategoryForm({ name: "" });
    }
    setErrors({});
  }, [editingCategory]);

  // Handle update
  const handleUpdate = async (formData, id) => {
    try {
      // Important: Append _method for Laravel PUT spoofing
      formData.append('_method', 'PUT');

      await axios.post(route("cate.update", { id }), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setReloadTrigger((prev) => !prev);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error("Error Updating Category:", error.response?.data || error.message);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setErrors({});

    const formData = new FormData();
    Object.keys(categoryForm).forEach((key) => {
      if (categoryForm[key] !== null && categoryForm[key] !== "") {
        formData.append(key, categoryForm[key]);
      }
    });

    try {
      await handleUpdate(formData, editingCategory.id);

      // Reset form and close modal
      setCategoryForm({ name: "" });
      setShowForm(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setIsSubmitted(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Close modal
  const handleClose = () => {
    setCategoryForm({ name: "" });
    setShowForm(false);
    setEditingCategory(null);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Category
            </h1>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
              disabled={isSubmitted}
            >
              &times;
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Update the category below.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={categoryForm.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                placeholder="Enter category name"
                disabled={isSubmitted}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitted}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {isSubmitted ? "Updating..." : "Update Category"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitted}
                className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryForm;