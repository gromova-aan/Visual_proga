import React from 'react'
import Card from './components/Card'
import SortAndSearch from './components/SortAndSearch';
import './App.css';

function App() {
  const [albums, setAlbums] = React.useState([]);
  const [filteredAlbums, setFilteredAlbums] = React.useState([]);
  
  React.useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        const data = await response.json();
        setAlbums(data);
        setFilteredAlbums(data);
      } catch (error) {
        console.error('Ошибка ', error);
      }
    };

    fetchAlbums();

  }, []);

  const handleSearch = (query) => {
    const filtered = albums.filter((album) => {
      return album.title.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredAlbums(filtered);
  }
 
  const handleSort = (sortBy) => {
    const sorted = [...filteredAlbums].sort((a, b) => {
      if (sortBy === 'userId') {
        return a.userId - b.userId;
      } else if (sortBy === 'id') {
        return b.id - a.id;
      }
      return 0;
    });

    setFilteredAlbums(sorted);
  }

  return (
    <div className="App">
      <div className='search-sort-container'>
        <SortAndSearch onSearch = {handleSearch} onSort = {handleSort} />
      </div>
      <div className='card-container'>
        {filteredAlbums.map((album) => (
          <Card key={album.id} userId={album.userId} id={album.id} title={album.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
