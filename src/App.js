import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignUp';
import SuccessPage from './Components/LoginSignup/successPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
