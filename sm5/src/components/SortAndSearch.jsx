import React from 'react'
import './SortAndSearch.css'

const SortAndSearch = ({onSearch, onSort}) => {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };
    
    const handleSort = (e) => {
        onSort(e.target.value);
    };

    return (
        <div className="search-sort">
            <input
                type="text"
                placeholder="Поиск по названию"
                onChange={handleSearch}
                className="search-input"
            />

            <select onChange={handleSort} className="sort-select">
                <option value="userId">Сортировать по User ID</option>
                <option value="id">Сортировать по ID</option>
            </select>
        </div>
    );
};

export default SortAndSearch;