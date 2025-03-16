import React from 'react'
import BookCard from './components/BookCard'
import './App.css';

function App() {
  const [books, setBook] = React.useState([]);

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
            } catch (error) {
              console.error('Ошибка ', error);
              return null;
            }
          })
        );
              
        const filteredBooks = bookCovers.filter(book => book !== null);
        setBook(filteredBooks);
      } catch (error) {
        console.error('Ошибка ', error);
      }
    };
  
    fetchBooks();
  }, []);

  return (
    <div className="App">
      {books.map(book => (
        <BookCard
          key={book.id}
          title={book.title}
          authors={book.authors}
          cover={book.cover}
        />
      ))}    
    </div>
  );
}

export default App;
