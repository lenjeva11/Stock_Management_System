// Import React library
import React from 'react';

// Define Table functional component with props: data, columns, onEdit, onDelete
const Table = ({ data, columns, onEdit, onDelete }) => {
    // Render table element with styling
    return (
        <table className="w-full table-auto border-collapse shadow">
            <thead>
                <tr className="bg-gray-100">
                    {/* Render table headers based on columns prop */}
                    {columns.map((col) => (
                        <th key={col.key} className="border p-2 text-left">
                            {col.label}
                        </th>
                    ))}
                    {/* Conditionally render Actions header if onEdit or onDelete handlers exist */}
                    {(onEdit || onDelete) && (
                        <th className="border p-2 text-left">Actions</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {/* Render table rows based on data prop */}
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {/* Render table cells for each column */}
                        {columns.map((col) => (
                            <td key={col.key} className="border p-2">
                                {row[col.key]}
                            </td>
                        ))}
                        {/* Conditionally render action buttons if handlers exist */}
                        {(onEdit || onDelete) && (
                            <td className="border p-2 space-x-2">
                                {/* Edit button triggers onEdit callback with row data */}
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(row)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                )}
                                {/* Delete button triggers onDelete callback with row id */}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(row._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                {/* Render message row if no data available */}
                {data.length === 0 && (
                    <tr>
                        <td colSpan={columns.length + 1} className="p-4 text-center">
                            No Data Available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

// Export Table component as default export
export default Table;
