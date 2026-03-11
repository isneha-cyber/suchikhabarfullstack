import AddTeamForm from "@/AddFormComponents/AddTeamForm";
import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import EditTeamForm from "@/EditFormComponents/EditTeamForm";
import axios from "axios";
import { Edit, Plus, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

const Teams = () => {
    const [allTeams, setAllTeams] = useState([]);
    const [reloadTrigger, setReloadTrigger] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    // Fetch teams from API
    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const response = await axios.get(route("team.index"));

                console.log("API Response:", response.data);

                let teams = [];
                if (Array.isArray(response.data)) {
                    teams = response.data;
                } else if (response.data && Array.isArray(response.data.data)) {
                    teams = response.data.data;
                } else {
                    console.warn(
                        "Unexpected data format received:",
                        response.data
                    );
                }

                setAllTeams(teams);
            } catch (error) {
                console.error("Error fetching teams:", error);
                setAllTeams([]);
                alert("Failed to load team members. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [reloadTrigger]);

    // Handle delete with loading state
    const handleDelete = async (id) => {
        if (
            !window.confirm("Are you sure you want to delete this team member?")
        )
            return;

        setActionLoading(id);
        try {
            await axios.delete(route("team.destroy", { id }));
            setReloadTrigger((prev) => !prev);
        } catch (error) {
            console.error("Delete error:", error);
            alert(
                "Failed to delete team member. " +
                    (error.response?.data?.message || error.message)
            );
        } finally {
            setActionLoading(null);
        }
    };

    // Open edit form
    const handleEdit = (team) => {
        setEditingTeam(team);
        setShowEditForm(true);
    };

    return (
        <AdminWrapper>
            <div className="">
                {/* Header - Responsive */}
                <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                             Teams
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="mt-2 md:mt-0 py-2 md:py-3 px-4 md:px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center gap-2 text-sm md:text-base"
                    >
                        <Plus size={18} className="hidden md:block" />
                        <span>Add Team Member</span>
                    </button>
                </div>
                {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Teams
                    </h2>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full sm:w-auto py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 transition text-center"
                    >
                        Add Team Member
                    </button>
                </div> */}

                {/* Add Form Modal */}
                {showAddForm && (
                    <AddTeamForm
                        showForm={showAddForm}
                        setShowForm={setShowAddForm}
                        setReloadTrigger={setReloadTrigger}
                    />
                )}

                {/* Edit Form Modal */}
                {showEditForm && (
                    <EditTeamForm
                        showForm={showEditForm}
                        setShowForm={setShowEditForm}
                        editingTeam={editingTeam}
                        setEditingTeam={setEditingTeam}
                        setReloadTrigger={setReloadTrigger}
                    />
                )}

                {/* Responsive Table or Cards */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {loading ? (
                        <p className="p-6 text-center text-gray-500">
                            Loading team members...
                        </p>
                    ) : allTeams.length === 0 ? (
                        <p className="p-6 text-center text-gray-500">
                            No team members found.
                        </p>
                    ) : (
                        <>
                            {/* Mobile Cards (Visible on sm and below) */}
                            <div className="lg:hidden">
                                {allTeams.map((team, index) => (
                                    <div
                                        key={team.id}
                                        className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-medium text-gray-900">
                                                {team.name}
                                            </h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                #{index + 1}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {team.designation}
                                        </p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEdit(team)}
                                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                                disabled={
                                                    actionLoading === team.id
                                                }
                                            >
                                                <Edit size={14} />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(team.id)
                                                }
                                                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                                disabled={
                                                    actionLoading === team.id
                                                }
                                            >
                                                {actionLoading === team.id ? (
                                                    <>
                                                        <span className="animate-spin">
                                                            ⏳
                                                        </span>
                                                        <span>Deleting...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash size={14} />
                                                        <span>Delete</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Desktop/Tablet Table (Hidden on sm and below) */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                                S.No
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Designation
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allTeams.map((team, index) => (
                                            <tr
                                                key={team.id}
                                                className="hover:bg-gray-50 transition duration-150 ease-in-out"
                                            >
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {team.name}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {team.designation}
                                                </td>
                                                <td className="px-4 py-4 flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(team)
                                                        }
                                                        className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1 text-sm"
                                                        disabled={
                                                            actionLoading ===
                                                            team.id
                                                        }
                                                    >
                                                        <Edit size={14} />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                team.id
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-800 transition flex items-center gap-1 text-sm"
                                                        disabled={
                                                            actionLoading ===
                                                            team.id
                                                        }
                                                    >
                                                        {actionLoading ===
                                                        team.id ? (
                                                            <span className="animate-spin">
                                                                ⏳
                                                            </span>
                                                        ) : (
                                                            <Trash size={14} />
                                                        )}
                                                        <span>Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Optional: Horizontal Scroll Table for Medium Screens */}
                            <div className="hidden lg:hidden overflow-x-auto max-h-96">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                S.No
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Designation
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allTeams.map((team, index) => (
                                            <tr key={team.id}>
                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                                    {team.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {team.designation}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleEdit(team)
                                                            }
                                                            className="text-blue-600 hover:text-blue-800"
                                                            disabled={
                                                                actionLoading ===
                                                                team.id
                                                            }
                                                        >
                                                            <Edit size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    team.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-800"
                                                            disabled={
                                                                actionLoading ===
                                                                team.id
                                                            }
                                                        >
                                                            {actionLoading ===
                                                            team.id ? (
                                                                <span className="animate-spin">
                                                                    ⏳
                                                                </span>
                                                            ) : (
                                                                <Trash
                                                                    size={14}
                                                                />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AdminWrapper>
    );
};

export default Teams;
