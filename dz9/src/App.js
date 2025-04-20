import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import GenericTableApp from './components/GenericTableApp';
import './assets/App.css'

function App() {
  const tables = [
    {
      path: "/posts",
      url: "https://jsonplaceholder.typicode.com/posts",
      title: "Posts",
      headers: [
        { key: "userId", title: "User ID" },
        { key: "id", title: "ID" },
        { key: "title", title: "Title" },
        { key: "body", title: "Body" },
      ],
    },
    {
      path: "/albums",
      url: "https://jsonplaceholder.typicode.com/albums",
      title: "Albums",
      headers: [
        { key: "userId", title: "User ID" },
        { key: "id", title: "ID" },
        { key: "title", title: "Title" },
      ],
    },
    {
      path: "/todos",
      url: "https://jsonplaceholder.typicode.com/todos",
      title: "Todos",
      headers: [
        { key: "userId", title: "User ID" },
        { key: "id", title: "ID" },
        { key: "title", title: "Title" },
        { key: "completed", title: "Completed" },
      ],
    },
    {
      path: "/users",
      url: "https://jsonplaceholder.typicode.com/users",
      title: "Users",
      headers: [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "username", title: "Username" },
        { key: "email", title: "Email" },
        { key: "phone", title: "Phone" },
        { key: "website", title: "Website" },
        { key: "address.street", title: "Street" },
        { key: "address.suite", title: "Suite" },
        { key: "address.city", title: "City" },
        { key: "address.zipcode", title: "Zipcode" },
        { key: "company.name", title: "Company Name" },
        { key: "company.catchPhrase", title: "Catch Phrase" },
        { key: "company.bs", title: "BS" },
      ],
    }
  ];

  return (
    <Router>
      <div className='app-container'>
        <nav className="sidebar">
          <ul>
            {tables.map(({ path, title }) => (
              <li key={path}>
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="content">
          <Routes>
            {tables.map(({ path, url, headers }) => (
              <Route
                key={path}
                path={path}
                element={<GenericTableApp dataUrl={url} headers={headers} />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;