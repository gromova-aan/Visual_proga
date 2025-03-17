import React from 'react'
import BookCard from './components/BookCard'
import SortAndSearch from './components/SordAndSearch';
import './App.css';

function App() {
  const [books, setBook] = React.useState([]);
  const [filteredBooks, setFilteredBooks] = React.useState([]); //массив книг отфильтрованных по запросу поиска или сортировке
 
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://fakeapi.extendsclass.com/books');
        const data = await response.json();
  
        const bookCovers = await Promise.all(
          data.map(async (book) => {
            try {
              const googleResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`);
              const googleData = await googleResponse.json();
              const imageUrl = googleData.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
              
              return imageUrl ? { ...book, cover: imageUrl } : null;
              // return { ...book, cover: imageUrl || null };
            } catch (error) {
              console.error('Ошибка ', error);
              return null;
            }
          })
        );
              
        const filteredBooks = bookCovers.filter(book => book !== null);
        setBook(filteredBooks);
        setFilteredBooks(filteredBooks);
        // setBook(bookCovers);
        // setFilteredBooks(bookCovers);
      } catch (error) {
        console.error('Ошибка ', error);
      }
    };
  
    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    //разбиваем запрос на отдельные слова
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.trim() !== '');
  
    const filtered = books.filter((book) => {
      const lowerCaseTitle = book.title.toLowerCase();
      const lowerCaseAuthors = book.authors.map(author => author.toLowerCase());
  
      //проверяем что все слова из запроса найдены хотя бы в одном из полей
      return searchTerms.every((term) => {
        const foundInTitle = lowerCaseTitle.includes(term);
        const foundInAuthors = lowerCaseAuthors.some(author => author.includes(term));
        return foundInTitle || foundInAuthors;
      });
    });
  
    setFilteredBooks(filtered);
  };

  const handleSort = (sortBy, sortOrder) => {
    const sorted = [...filteredBooks].sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === 'authors') {
        const authorsA = a.authors.join(', ').toLowerCase(); 
        const authorsB = b.authors.join(', ').toLowerCase();
        return sortOrder === 'asc' 
          ? authorsA.localeCompare(authorsB)
          : authorsB.localeCompare(authorsA);
      }
      return 0;
    });
    
    setFilteredBooks(sorted);
  }

  return (
    <div className="App">
      <div className='search-sort-container'>
        <SortAndSearch onSearch={handleSearch} onSort={handleSort}/>
      </div>
      <div className='books-container'>
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            title={book.title}
            authors={book.authors}
            cover={book.cover}
          />
        ))}
      </div>
    </div>
  );
}

export default App;