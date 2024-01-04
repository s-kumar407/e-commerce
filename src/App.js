import logo from './logo.svg';
import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import CartPage from './CartPage.js';
import { BrowserRouter as Router, Routes, Route, Link ,Switch} from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path='/cartPage' element={<CartPage/>}/>
        </Routes>
      
   
       
      </Router>
    </div>
  );
}

export default App;
