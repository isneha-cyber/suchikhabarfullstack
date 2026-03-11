import AdminWrapper from "@/AdminDashboard/AdminWrapper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(route("logs.index"));
                setLogs(Array.isArray(response.data) ? response.data : []);
                setCurrentPage(0);
            } catch (error) {
                console.error("Error fetching logs:", error);
                setError("Failed to fetch logs. Please try again later.");
                setLogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    // Pagination logic
    const offset = currentPage * itemsPerPage;
    const currentLogs = logs.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(logs.length / itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <AdminWrapper>
            <div className="">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                    Logs
                </h2>

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-8 sm:py-10">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-sm sm:text-base text-gray-600">
                            Loading logs...
                        </p>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
                        {error}
                    </div>
                )}

                {/* Table */}
                {!loading && !error && (
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-md mt-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 table-auto">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className=" text-left text-xs font-medium text-gray-500 uppercase ">
                                            S.No
                                        </th>
                                        <th className=" text-left text-xs font-medium text-gray-500 uppercase">
                                            Name
                                        </th>
                                        <th className=" text-left text-xs font-medium text-gray-500 uppercase ">
                                            IP Address
                                        </th>
                                        <th className=" text-left text-xs font-medium text-gray-500 uppercase ">
                                            Title
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentLogs.length > 0 ? (
                                        currentLogs.map((log, index) => (
                                            <tr
                                                key={log.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-3 py-2 sm:px-4 sm:py-4 text-xs sm:text-sm text-gray-900 ">
                                                    {offset + index + 1}
                                                </td>
                                                <td className="px-3 py-2 sm:px-4 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 ">
                                                    {log.name}
                                                </td>
                                                <td className="px-3 py-2 sm:px-4 sm:py-4 text-xs sm:text-sm text-gray-900 font-mono ">
                                                    {log.ip_address}
                                                </td>
                                                <td className="text-xs sm:text-sm text-gray-900 ">
                                                    {log.title &&
                                                    log.title.length > 50
                                                        ? log.title.slice(
                                                              0,
                                                              50
                                                          ) + "..."
                                                        : log.title}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-4 py-8 text-center text-sm text-gray-500 italic"
                                            >
                                                No logs found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                    </div>
                )}
                {pageCount > 1 && (
                    <div className="flex justify-center mt-4 p-3 sm:mt-6 sm:p-4">
                        <ReactPaginate
                            previousLabel={<ChevronLeft size={16} />}
                            nextLabel={<ChevronRight size={16} />}
                            breakLabel="..."
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageChange}
                            containerClassName="pagination flex flex-wrap gap-1 text-xs sm:text-sm"
                            activeClassName="bg-red-600 text-white"
                            pageLinkClassName="block px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            previousLinkClassName="block px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            nextLinkClassName="block px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded hover:bg-red-50 hover:text-red-700 transition"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            forcePage={currentPage}
                        />
                    </div>
                )}
            </div>
        </AdminWrapper>
    );
};

export default Logs;
