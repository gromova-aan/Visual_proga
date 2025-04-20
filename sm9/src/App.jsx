import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PersonForm from './PersonForm';
import PersonComponent from './PersonComponent';


function App() {
  const [people, setPeople] = React.useState([]);

  React.useEffect(() => {
    console.log('Состояние people обновлено:', people);
  }, [people])

  const addPerson = (person) => {
    console.log('Добавлен новый человек:', person);
    setPeople((prevPeople) => [...prevPeople, person]);
  };


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/form">Форма</Link>
            </li>
            <li>
              <Link to="/list">Список людей</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/form"
            element={<PersonForm onSubmit={addPerson} />}
          />

          <Route
            path="/list"
            element={<PersonComponent key={Date.now()} people={people} />}
          />
        </Routes>
      </div>
    </Router>  
  );
};

export default App;
