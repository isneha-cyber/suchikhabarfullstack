import axios from "axios";
import { Upload, Camera, File, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const getDefaultDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const EditNewsForm = ({
    showNewsForm,
    setShowNewsForm,
    editingNews,
    setEditingNews,
    handleUpdate,
    setAllCategory,
    allCategory,
}) => {
    const [newsForm, setNewsForm] = useState({
        category: "",
        image: null,
        pdf: null,
        heading: "",
        blog_by: "शुचि खबर",
        description: "",
        published_at: getDefaultDateTime(),
    });

    const [existingImage, setExistingImage] = useState(null);
    const [existingPdf, setExistingPdf] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const imgurl = import.meta.env.VITE_IMAGE_PATH;

    useEffect(() => {
        if (editingNews) {
            setNewsForm({
                category: editingNews.category || "",
                image: null,
                pdf: null,
                heading: editingNews.heading || "",
                blog_by: editingNews.blog_by || "शुचि खबर",
                description: editingNews.description || "",
                published_at: editingNews.published_at
                    ? new Date(editingNews.published_at).toISOString().slice(0, 16)
                    : getDefaultDateTime(),
            });

            setExistingImage(editingNews.image || null); // e.g., "images/news1.jpg"
            setExistingPdf(editingNews.pdf || null); // e.g., "pdfs/news1.pdf"
        } else {
            setNewsForm({
                category: "",
                image: null,
                pdf: null,
                heading: "",
                blog_by: "शुचि खबर",
                description: "",
                published_at: getDefaultDateTime(),
            });
            setExistingImage(null);
            setExistingPdf(null);
        }
    }, [editingNews]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newsForm).forEach((key) => {
            if (newsForm[key] !== null && newsForm[key] !== "") {
                formData.append(key, newsForm[key]);
            }
        });

        // Pass existing file paths if no new file is uploaded
        if (!newsForm.image && existingImage) {
            formData.append("existingImage", existingImage);
        }
        if (!newsForm.pdf && existingPdf) {
            formData.append("existingPdf", existingPdf);
        }

        try {
            setIsSubmitted(true);
            await handleUpdate(formData, editingNews.id);

            // Reset state
            setShowNewsForm(false);
            setEditingNews(null);
        } catch (error) {
            console.error("Error updating news:", error);
            alert("Failed to update news. Please try again.");
        } finally {
            setIsSubmitted(false);
        }
    };

    const handleChange = (e, customValue = null) => {
        const target = e?.target;
        if (customValue !== null) {
            setNewsForm((prev) => ({ ...prev, description: customValue }));
            return;
        }
        const { name, type, files, value } = target;

        if (type === "file" && files && files[0]) {
            const file = files[0];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (file.size > maxSize) {
                alert("The image field must not be greater than 2048 kilobytes (2MB).");
                return;
            }
        }

        setNewsForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    if (!showNewsForm) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
            {/* Responsive Modal */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit News Post</h2>
                    <button
                        onClick={() => {
                            setShowNewsForm(false);
                            setEditingNews(null);
                        }}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={newsForm.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                        >
                            <option value="">Select Category</option>
                            {allCategory.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.name}
                                    selected={category.name === newsForm.category}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm sm:text-lg font-semibold text-gray-700">
                            <Camera className="mr-2 sm:mr-3 text-green-500" size={18} />
                            Featured Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-all duration-300 relative">
                            {newsForm.image ? (
                                <div className="space-y-3">
                                    <img
                                        src={URL.createObjectURL(newsForm.image)}
                                        alt="New preview"
                                        className="mx-auto h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-lg shadow"
                                    />
                                    <p className="text-xs sm:text-sm text-green-600">New image selected</p>
                                </div>
                            ) : existingImage ? (
                                <div className="space-y-3">
                                    <img
                                        src={`${imgurl}/${existingImage}`}
                                        alt="Current"
                                        className="mx-auto h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-lg shadow"
                                    />
                                    <p className="text-xs sm:text-sm text-blue-600 truncate">
                                        {existingImage.split("/").pop()}
                                    </p>
                                    <p className="text-xs text-gray-500">Click to replace image</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                                    <p className="text-sm sm:text-lg text-gray-600">Click to upload image</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* PDF Upload */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm sm:text-lg font-semibold text-gray-700">
                            <File className="mr-2 sm:mr-3 text-blue-500" size={18} />
                            Upload PDF (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all duration-300 relative">
                            {newsForm.pdf ? (
                                <div className="space-y-2">
                                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-lg flex items-center justify-center">
                                        <File className="h-6 sm:h-8 w-6 sm:w-8 text-red-600" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-green-600 truncate">{newsForm.pdf.name}</p>
                                    <p className="text-xs text-gray-500">New PDF selected</p>
                                </div>
                            ) : existingPdf ? (
                                <div className="space-y-2">
                                    <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <File className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-blue-600 truncate">
                                        {existingPdf.split("/").pop()}
                                    </p>
                                    <a
                                        href={`/storage/${existingPdf}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-500 hover:underline block"
                                    >
                                        View PDF
                                    </a>
                                    <p className="text-xs text-gray-500">Click to replace PDF</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <File className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                                    <p className="text-sm sm:text-lg text-gray-600">Click to upload PDF</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="pdf"
                                accept=".pdf"
                                onChange={handleChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Heading */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">News Heading</label>
                        <input
                            type="text"
                            name="heading"
                            value={newsForm.heading}
                            onChange={handleChange}
                            placeholder="Enter an engaging title..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                        <input
                            type="text"
                            name="blog_by"
                            value={newsForm.blog_by}
                            onChange={handleChange}
                            placeholder="Enter author name..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Published At */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Publication Date & Time</label>
                        <input
                            type="datetime-local"
                            name="published_at"
                            value={newsForm.published_at}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">News Content</label>
                        <ReactQuill
                            value={newsForm.description}
                            onChange={(value) => handleChange(null, value)}
                            placeholder="Write your news article here..."
                            theme="snow"
                            style={{ height: "180px", marginBottom: "40px" }}
                            className="text-sm sm:text-base"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitted}
                            className={`py-3 px-6 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                                isSubmitted
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                        >
                            {isSubmitted ? "Updating..." : "Update News"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowNewsForm(false);
                                setEditingNews(null);
                            }}
                            className="py-3 px-6 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition-colors text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNewsForm;