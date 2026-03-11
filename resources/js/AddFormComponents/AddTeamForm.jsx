import axios from "axios";
import React, { useState } from "react";

const AddTeamForm = ({ showForm, setShowForm, setReloadTrigger }) => {
    const [teamForm, setTeamForm] = useState({
        name: "",
        designation: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Create new team
    const handleCreate = async (formData) => {
        try {
            await axios.post(route("team.store"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Error creating team:", error);
            throw error;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(teamForm).forEach((key) => {
            if (teamForm[key] !== null && teamForm[key] !== "") {
                formData.append(key, teamForm[key]);
            }
        });

        try {
            setIsSubmitted(true);
            await handleCreate(formData);
            
            // Reset and close modal
            setTeamForm({ name: "", designation: "" });
            setShowForm(false);
        } catch (error) {
            console.error("Error saving team member:", error);
            alert(
                "Failed to save team member: " +
                    (error.response?.data?.message || error.message || "Unknown error")
            );
        } finally {
            setIsSubmitted(false);
        }
    };

    // Handle reset button
    const handleReset = () => {
        setTeamForm({ name: "", designation: "" });
    };

    // If the form is not supposed to be shown, return null
    if (!showForm) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* Modal */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
                {/* Close Button */}
                <button
                    onClick={() => setShowForm(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add Team Member
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={teamForm.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    {/* Designation Field */}
                    <div>
                        <label
                            htmlFor="designation"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Designation
                        </label>
                        <input
                            type="text"
                            id="designation"
                            name="designation"
                            value={teamForm.designation}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter job title"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitted}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-70"
                        >
                            {isSubmitted ? "Saving..." : "Add Member"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTeamForm;