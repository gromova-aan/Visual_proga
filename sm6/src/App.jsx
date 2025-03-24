import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import './App.css';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState(null);
    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        if (loading && !canceled) {
            const totalTime = 10000; // 10 секунд
            const intervalTime = 100; // Обновление каждые 100 мс
            const increment = (intervalTime / totalTime) * 100;

            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress + increment >= 100) {
                        clearInterval(interval);
                        setLoading(false);
                        fetchData();
                        return 100;
                    }
                    return prevProgress + increment;
                });
            }, intervalTime);

            return () => clearInterval(interval);
        }
    }, [loading, canceled]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://fakeapi.extendsclass.com/countries');
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            
        }
    };

    const handleCancel = () => {
        setCanceled(true);
        setProgress(null);
    };

    return (
        <div className="app-container">
            {loading ? (
                <ProgressBar
                    title="Loading Countries"
                    percentage={progress}
                    onCancel={handleCancel}
                />
            ) : (
                <div className="loaded-data">
                    <h2>Loaded Data:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default App;