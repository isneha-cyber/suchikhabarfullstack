import React, { useState, useEffect } from "react";
import { Save, X, Camera, Upload } from "lucide-react";

const EditUserForm = ({
    editingUser,
    setEditingUser,
    setShowUserForm,
    handleUpdate,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        image: "", // Will be string (URL) initially, or File if changed
    });
    const [imagePreview, setImagePreview] = useState("");


    const imgurl = import.meta.env.VITE_IMAGE_PATH;

    // Reset form when editingUser changes
    useEffect(() => {
        if (editingUser) {
            const { name, email, image } = editingUser;
            setUserForm({
                name: name || "",
                email: email || "",
                image: image || "", // Keep as URL string
            });
            setImagePreview(
                image
                    ? image.startsWith("http") || image.startsWith("/")
                        ? image
                        : `${imgurl}/${image}`
                    : ""
            );
        }
    }, [editingUser]);

    // Cleanup blob URLs on unmount or image change
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Always send name and email
        formData.append("name", userForm.name.trim());
        formData.append("email", userForm.email.trim());

        // Only append image if it's a File object (user selected a new image)
        if (userForm.image instanceof File) {
            formData.append("image", userForm.image);
        }
        // Do NOT send image if it's a string (existing image) — Laravel will keep old one

        try {
            setSubmitting(true);
            await handleUpdate(formData, editingUser.id);

            // Close modal and reset
            setShowUserForm(false);
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
            // Optionally show error toast/message
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files.length > 0) {
            const file = files[0];
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes

            // Check if file size exceeds 2MB
            if (file.size > maxSize) {
                alert(
                    "The image field must not be greater than 2048 kilobytes (2MB)."
                );
                e.target.value = ""; // Clear the file input
                return; // Exit the function early
            }

            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }

            setUserForm((prev) => ({ ...prev, [name]: file }));
            setImagePreview(URL.createObjectURL(file));
        } else {
            setUserForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const onClose = () => {
        // Clean up blob URL
        if (imagePreview && imagePreview.startsWith("blob:")) {
            URL.revokeObjectURL(imagePreview);
        }
        setShowUserForm(false);
        setEditingUser(null);
        setUserForm({ name: "", email: "", image: "" });
        setImagePreview("");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Update User
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6 h-[65vh] overflow-y-auto"
                >
                    {/* Image Upload Field */}
                    <div className="space-y-2">
                        <label className="flex items-center text-lg font-semibold text-gray-700">
                            <Camera className="mr-3 text-green-500" size={22} />
                            Profile Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-all duration-300 relative cursor-pointer">
                            {imagePreview ? (
                                <div className="space-y-4">
                                    <img
                                        src={imagePreview}
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
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={userForm.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userForm.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> Password is not shown for
                            security. Existing password will be preserved.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>
                                {submitting ? "Updating..." : "Update User"}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserForm;
