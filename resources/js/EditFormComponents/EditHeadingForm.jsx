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

const EditHeadingForm = ({
    showHeadingForm,
    setShowHeadingForm,
    editingHeading,
    setEditingHeading,
    handleUpdate,
    setAllCategory,
    allCategory,
}) => {
    const [headingForm, setHeadingForm] = useState({
        category: "",
        image: null,
        pdf: null,
        heading: "",
        blog_by: "शुचि खबर",
        description: "",
        published_at: getDefaultDateTime(),
    });

    // Track existing image and PDF URLs from the server
    const [existingImage, setExistingImage] = useState(null);
    const [existingPdf, setExistingPdf] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const imgurl = import.meta.env.VITE_IMAGE_PATH;

    useEffect(() => {
        if (editingHeading) {
            setHeadingForm({
                category: editingHeading.category || "",
                image: null,
                pdf: null,
                heading: editingHeading.heading || "",
                blog_by: editingHeading.blog_by || "शुचि खबर",
                description: editingHeading.description || "",
                published_at: editingHeading.published_at
                    ? new Date(editingHeading.published_at).toISOString().slice(0, 16)
                    : getDefaultDateTime(),
            });

            // Set existing file URLs from backend
            setExistingImage(editingHeading.image || null); // e.g., "/uploads/images/heading1.jpg"
            setExistingPdf(editingHeading.pdf || null);     // e.g., "/uploads/pdfs/heading1.pdf"
        } else {
            // Reset when not editing
            setHeadingForm({
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
    }, [editingHeading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(headingForm).forEach((key) => {
            if (headingForm[key] !== null && headingForm[key] !== "") {
                formData.append(key, headingForm[key]);
            }
        });

        // Optional: Include existing file URLs if no new file uploaded
        // This helps backend decide what to keep
        if (!headingForm.image && existingImage) {
            formData.append("existingImage", existingImage);
        }
        if (!headingForm.pdf && existingPdf) {
            formData.append("existingPdf", existingPdf);
        }

        try {
            setIsSubmitted(true);
            await handleUpdate(formData, editingHeading.id);

            // Reset form
            setShowHeadingForm(false);
            setEditingHeading(null);
        } catch (error) {
            console.error("Error updating heading:", error);
            alert("Failed to update heading. Please try again.");
        } finally {
            setIsSubmitted(false);
        }
    };

    const handleChange = (e, customValue = null) => {
        const target = e?.target;
        if (customValue !== null) {
            setHeadingForm((prev) => ({ ...prev, description: customValue }));
            return;
        }
        const { name, type, files, value } = target;
        if(type === "file" && files && files[0]){
            const file=files[0]
            const maxSize = 2*1024*1024

            if(file.size>maxSize){
                alert("The image field must not be greater than 2048 kilobytes (2mb).")
                return;
            }
        }
        setHeadingForm((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    if (!showHeadingForm) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Heading</h2>
                    <button
                        onClick={() => {
                            setShowHeadingForm(false);
                            setEditingHeading(null);
                        }}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto h-[65vh]">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                         <select
                            name="category"
                            value={headingForm.category}
                            onChange={handleChange}
                            id="category"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                             <option value="">Select Category</option>
                            {allCategory.map((category) => (
                                <option 
                                    key={category.id} 
                                    value={category.name}
                                    selected={category.name === headingForm.category}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {/* <input
                            type="text"
                            name="category"
                            value={headingForm.category}
                            onChange={handleChange}
                            placeholder="e.g. राजनीति, मुख्य"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        /> */}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="flex items-center text-lg font-semibold text-gray-700">
                            <Camera className="mr-3 text-green-500" size={22} />
                            Featured Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-all duration-300 relative">
                            {headingForm.image ? (
                                <div className="space-y-4">
                                    <img
                                        src={URL.createObjectURL(headingForm.image)}
                                        alt="New preview"
                                        className="mx-auto h-32 w-32 object-cover rounded-lg shadow-lg"
                                    />
                                    <p className="text-sm text-green-600">New image selected</p>
                                </div>
                            ) : existingImage ? (
                                <div className="space-y-4">
                                    <img
                                        src={`${imgurl}/${existingImage}`}
                                        alt="Current"
                                        className="mx-auto h-32 w-32 object-cover rounded-lg shadow-lg"
                                    />
                                    <p className="text-sm text-blue-600 truncate">
                                        {existingImage.split("/").pop()}
                                    </p>
                                   
                                    <p className="text-xs text-gray-500">Click to replace image</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="text-lg text-gray-600">Click to upload image</p>
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
                        <label className="flex items-center text-lg font-semibold text-gray-700">
                            <File className="mr-3 text-blue-500" size={22} />
                            Upload PDF (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all duration-300 relative">
                            {headingForm.pdf ? (
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                                        <File className="h-8 w-8 text-red-600" />
                                    </div>
                                    <p className="text-sm text-green-600 truncate px-2">
                                        {headingForm.pdf.name}
                                    </p>
                                    <p className="text-xs text-gray-500">New PDF selected</p>
                                </div>
                            ) : existingPdf ? (
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <File className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <p className="text-sm text-blue-600 truncate px-2">
                                        {existingPdf.split("/").pop()}
                                    </p>
                                    <a
                                        href={existingPdf}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-500 hover:underline block"
                                    >
                                        View PDF
                                    </a>
                                    <p className="text-xs text-gray-500">Click to replace PDF</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <File className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="text-lg text-gray-600">Click to upload PDF</p>
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

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heading Title
                        </label>
                        <input
                            type="text"
                            name="heading"
                            value={headingForm.heading}
                            onChange={handleChange}
                            placeholder="Enter a heading title..."
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
                            value={headingForm.blog_by}
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
                            value={headingForm.published_at}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heading Content
                        </label>
                        <ReactQuill
                            value={headingForm.description}
                            onChange={(value) => handleChange(null, value)}
                            placeholder="Write your heading content here..."
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
                            {isSubmitted ? "Updating..." : "Update Heading"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowHeadingForm(false);
                                setEditingHeading(null);
                            }}
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

export default EditHeadingForm;