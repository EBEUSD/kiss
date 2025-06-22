import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contador from './Contador.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contador />} />
      </Routes>
    </Router>
  );
}

export default App;
