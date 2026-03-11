import React, { useState, useEffect } from "react";
import { Save, X, Eye, EyeOff, Camera, Upload } from "lucide-react";
import axios from "axios";

const AddUserForm = ({ setShowUserForm, setReloadTrigger }) => {
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
    });
    const [imagePreview, setImagePreview] = useState(null);

    // Cleanup blob URL on unmount or close
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    // Handle Create User
    const handleCreate = async (formData) => {
        try {
            await axios.post(route("users.store"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev); // Trigger data reload
        } catch (error) {
            console.error(
                "Error creating user:",
                error.response?.data || error.message
            );
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(userForm).forEach((key) => {
            if (userForm[key] !== null && userForm[key] !== "") {
                formData.append(key, userForm[key]);
            }
        });

        try {
            setSubmitting(true);
            await handleCreate(formData);

            // Reset form
            setUserForm({
                name: "",
                email: "",
                password: "",
                image: "",
            });
            setImagePreview(null);
            setShowUserForm(false);
        } catch (error) {
            alert("Failed to create user. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files.length > 0) {
            const file = files[0];
            const maxSize = 2 * 1024 * 1024; // 2MB

            if (file.size > maxSize) {
                alert("The image must not be greater than 2MB.");
                e.target.value = "";
                return;
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onClose = () => {
        setShowUserForm(false);
        setUserForm({
            name: "",
            email: "",
            password: "",
            image: "",
        });
        setImagePreview(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
            {/* Responsive Modal Width */}
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-5 border-b">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        Add New User
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none transition"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="p-4 sm:p-5 space-y-5 max-h-[80vh] overflow-y-auto"
                >
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="flex items-center text-sm sm:text-base font-semibold text-gray-700">
                            <Camera className="mr-2 sm:mr-3 text-green-500" size={18} />
                            Profile Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-400 transition-all duration-300 relative cursor-pointer">
                            {imagePreview ? (
                                <div className="space-y-3">
                                    <img
                                        src={imagePreview}
                                        alt="Image preview"
                                        className="mx-auto h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-lg shadow"
                                    />
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Click to change image
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                                    <p className="text-sm sm:text-base text-gray-600">
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
                                aria-label="Upload profile image"
                            />
                        </div>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Full Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={userForm.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter full name"
                            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={userForm.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email address"
                            className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password *
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userForm.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter password"
                                className="w-full px-3 py-2 sm:py-2.5 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                ) : (
                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md flex items-center justify-center space-x-2 transition disabled:opacity-50 text-sm sm:text-base"
                        >
                            <Save className="w-4 h-4" />
                            <span>{submitting ? "Adding..." : "Add User"}</span>
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2.5 px-4 rounded-md transition text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserForm;