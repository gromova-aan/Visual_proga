import React from 'react'
import "../assets/DataSet.css"; 

const DataSet = ({headers, data, renderHeaders, renderData, selectedRows, onRowClick}) => {
    const tableHeaders = headers || (data.length > 0 ? Object.keys(data[0]).map(key => ({key, title: key})) : []);
    
    return (
        <table className="dataset-table">
            <thead>
                <tr>
                    <th className="empty-column"></th>
                    {tableHeaders.map((header) => (
                        <th key={header.key}>
                            {renderHeaders ? renderHeaders(header) : header.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr 
                        key={rowIndex}
                        onClick={(e) => onRowClick(rowIndex, e)}
                        className={selectedRows.includes(rowIndex) ? "selected-row" : ""}
                    >
                        <td className="empty-column"></td>
                        {tableHeaders.map((header) => (
                            <td key={header.key}>
                                {renderData ? renderData(header, item) : getNestedValue(item, header.key)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function getNestedValue(obj, path) {
    const value = path.split('.').reduce((acc, key) => acc?.[key], obj);
    return value === true ? "✓" : value;
}

export default DataSet;