import React from "react";
import DataSet from "./DataSet"

const url = "http://localhost:5080"

const LogsApp = () => {
    const [logs, setLogs] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filterLevel, setFilterLevel] = React.useState("");

    React.useEffect(() => {
        const fetchLogs = async () => {
            const response = await fetch(`${url}/api/logs?level=${filterLevel}&search=${searchTerm}`);
            const data = await response.json();
            setLogs(data);
        };
        fetchLogs();
    }, [searchTerm, filterLevel]);
    
    const headers = [
        { key: "id", title: "ID" },
        { key: "message", title: "Сообщение" },
        { key: "logLevel", title: "Уровень" },
        { key: "timeStamp", title: "Дата" },
    ];

    return (
        <div className="logs-app">
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Поиск по сообщению..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                >
                    <option value="">Все уровни</option>
                    <option value="Information">Information</option>
                    <option value="Warning">Warning</option>
                    <option value="Error">Error</option>
                </select>
            </div>
            <DataSet headers={headers} data={logs} />
        </div>
    );
};

export default LogsApp;