import axios from "axios";
import { Upload, Camera, File, X } from "lucide-react";
import React, { useState } from "react";
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

const AddNewsForm = ({
    showNewsForm,
    setShowNewsForm,
    setReloadTrigger,
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
    const [isSubmitted, setIsSubmitted] = useState(false);

   const handleCreate = async (formData) => {
    try {
        await axios.post(route("news.store"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        setReloadTrigger((prev) => !prev);
    } catch (error) {
        console.error("Error creating news", error);
        
        // Check if it's a validation error (status 422)
        if (error.response?.status === 422) {
            // Check if there's a general message
            if (error.response.data?.message) {
                alert(error.response.data.message);
            } 
            // Check if there are field-specific errors
            else if (error.response.data?.errors) {
                const errors = error.response.data.errors;
                const errorMessages = Object.values(errors).flat().join('\n');
                alert(errorMessages);
            } else {
                alert("Validation failed. Please check your input.");
            }
        } else if (error.response?.data?.message) {
            // Handle other types of errors with a message
            alert(error.response.data.message);
        } else {
            // Generic error message
            alert("Failed to create the heading. Please try again.");
        }
    }
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newsForm).forEach((key) => {
            if (newsForm[key] !== null && newsForm[key] !== "") {
                formData.append(key, newsForm[key]);
            }
        });

        try {
            setIsSubmitted(true);
            await handleCreate(formData);

            // Reset form
            setNewsForm({
                category: "",
                image: null,
                pdf: null,
                heading: "",
                blog_by: "शुचि खबर",
                description: "",
                published_at: getDefaultDateTime(),
            });
            setShowNewsForm(false);
        } catch (error) {
            console.error("Error saving news", error);
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
    
    // Check if it's a file input and file size exceeds 2MB
    if (type === "file" && files && files[0]) {
        const file = files[0];
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Create News Post
                    </h2>
                    <button
                        onClick={() => setShowNewsForm(false)}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6 overflow-y-auto h-[65vh]"
                >
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            id=""
                            value={newsForm.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Select Category</option>
                            {allCategory.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {/* <input
                            type="text"
                            name="category"
                            value={newsForm.category}
                            onChange={handleChange}
                            placeholder="e.g. राजनीति, मुख्य, खेलकुद"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        /> */}
                    </div>

                    {/* Image Upload - Matches Your Design */}
                    <div className="space-y-2">
                        <label className="flex items-center text-lg font-semibold text-gray-700">
                            <Camera className="mr-3 text-green-500" size={22} />
                            Featured Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-all duration-300 relative">
                            {newsForm.image ? (
                                <div className="space-y-4">
                                    <img
                                        src={URL.createObjectURL(
                                            newsForm.image
                                        )}
                                        alt="Preview"
                                        className="mx-auto h-32 w-32 object-cover rounded-lg shadow-lg"
                                    />
                                    <p className="text-sm text-gray-600">
                                        Click to change image
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="text-lg text-gray-600">
                                        Click to upload image
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                required
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* PDF Upload - Same Style as Image */}
                    <div className="space-y-2">
                        <label className="flex items-center text-lg font-semibold text-gray-700">
                            <File className="mr-3 text-blue-500" size={22} />
                            Upload PDF (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-300 relative">
                            {newsForm.pdf ? (
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                                        <File className="h-8 w-8 text-red-600" />
                                    </div>
                                    <p className="text-sm text-gray-600 truncate px-2">
                                        {newsForm.pdf.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Click to change PDF
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <File className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="text-lg text-gray-600">
                                        Click to upload PDF
                                    </p>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            News Heading
                        </label>
                        <input
                            type="text"
                            name="heading"
                            value={newsForm.heading}
                            onChange={handleChange}
                            placeholder="Enter an engaging title..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author Name
                        </label>
                        <input
                            type="text"
                            name="blog_by"
                            value={newsForm.blog_by}
                            onChange={handleChange}
                            placeholder="Enter author name..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Published At */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Publication Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="published_at"
                            value={newsForm.published_at}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            News Content
                        </label>
                        <ReactQuill
                            value={newsForm.description}
                            onChange={(value) => handleChange(null, value)}
                            placeholder="Write your news article here..."
                            theme="snow"
                            style={{ height: "200px", marginBottom: "40px" }}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitted}
                            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                                isSubmitted
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                        >
                            {isSubmitted ? "Saving..." : "Publish News"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowNewsForm(false)}
                            className="flex-1 py-3 px-6 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewsForm;
