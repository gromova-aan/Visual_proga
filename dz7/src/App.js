import './App.css';
import DataSet from "./components/DataSet";

function App() {
  const headers = [
    { key: "id", title: "ID" },
    { key: "name", title: "Имя" },
    { key: "age", title: "Возраст" },
    { key: "jobTitle", title: "Должность" }
  ];

  const data = [
    { id: 1, name: "Андрей", age: 25, jobTitle: "Бэкенд-разработчик" },
    { id: 2, name: "Мария", age: 30, jobTitle: "Дизайнер" },
    { id: 3, name: "Иван", age: 22, jobTitle: "Рекрут" },
    { id: 4, name: "Ольга", age: 28, jobTitle: "Менеджер проектов" },
    { id: 5, name: "Алексей", age: 35, jobTitle: "Аналитик" },
    { id: 6, name: "Екатерина", age: 27, jobTitle: "Тестировщик" },
    { id: 7, name: "Дмитрий", age: 40, jobTitle: "Архитектор ПО" },
    { id: 8, name: "Светлана", age: 33, jobTitle: "Продакт-менеджер" },
    { id: 9, name: "Павел", age: 29, jobTitle: "Фронтенд-разработчик" },
    { id: 10, name: "Анна", age: 26, jobTitle: "Дизайнер" }
  ];


  return (
    <div className="App">
      <h2>Таблица</h2>
      <DataSet
        headers={headers}
        data={data}
        renderHeaders={(header) => <strong>{header.title}</strong>}
        renderData={(header, item) => 
          header.key === "age" ? <span style={{ color: "red" }}>{item[header.key]} лет</span> : item[header.key]
        }
      />
    </div>
  );
}

export default App;