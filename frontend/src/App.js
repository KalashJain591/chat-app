
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Components/Home';
import Login from '../src/Components/Login'
import Register from './Components/Register';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
