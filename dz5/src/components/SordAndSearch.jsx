import React from 'react';
import './SortAndSearch.css'

const SortAndSearch = ({onSearch, onSort}) => {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    const handleSort = (e) => {
        const [sortBy, sortOrder] = e.target.value.split('-');
        onSort(sortBy, sortOrder);
    }

    return (
        <div className='search-sort'>
            <input
                type="text"
                placeholder="Поиск по названию или автору"
                onChange={handleSearch}
                className='search-input'
            />

            <select onChange={handleSort} className='sort-select'>
                <option value = "title-asc">По названию(А-Я)</option>
                <option value = "title-desc">По названию(Я-А)</option>
                <option value = "authors-asc">По авторам (А-Я)</option>
                <option value = "authors-desc">По авторам (Я-А)</option>
            </select>
        </div>
    );
};

export default SortAndSearch;