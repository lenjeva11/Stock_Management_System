import React from 'react';

const Table = ({ data, columns, onEdit, onDelete }) => {
    return (
        <table className="w-full table-auto border-collapse shadow">
            <thead>
                <tr className="bg-gray-100">
                    {columns.map((col) => (
                        <th key={col.key} className="border p-2 text-left">
                            {col.label}
                        </th>
                    ))}
                    {(onEdit || onDelete) && (
                        <th className="border p-2 text-left">Actions</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map((col) => (
                            <td key={col.key} className="border p-2">
                                {row[col.key]}
                            </td>
                        ))}
                        {(onEdit || onDelete) && (
                            <td className="border p-2 space-x-2">
                                {onEdit && (
                                    <button
                                        onClick={() => onEdit(row)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                )}
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

export default Table;
