import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CommentsApp from './components/CommentsApp';
import LogsApp from './components/LogsApp'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
            <Link to="/">Комментарии</Link> | <Link to="/logs">Логи</Link>
          </nav>

          <Routes>
            <Route path="/" element={<CommentsApp />} />
            <Route path="/logs" element={<LogsApp />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;