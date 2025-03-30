import React from 'react'
import "./DataSet.css"; 

const DataSet = ({headers, data, renderHeaders, renderData}) => {
    const tableHeaders = headers || (data.length > 0 ? Object.keys(data[0]).map(key => ({key, title: key})) : []);
    
    const [selectedRows, setSelectedRow] = React.useState([]);
 
    const HandleRowClick = (index, e) => {
        if (e.target.className === "empty-column") {
            if (e.ctrlKey) {
                setSelectedRow((prev) => 
                    prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
                );
            } else {
                setSelectedRow((prev) => (prev.includes(index) ? [] : [index]));
            }
        }
    };

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
                        onClick={(e) => HandleRowClick(rowIndex, e)}
                        className={selectedRows.includes(rowIndex) ? "selected-row" : ""}
                    >
                        <td className="empty-column"></td>
                        {tableHeaders.map((header) => (
                            <td key={header.key}>
                                {renderData ? renderData(header, item) : item[header.key]} 
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DataSet;