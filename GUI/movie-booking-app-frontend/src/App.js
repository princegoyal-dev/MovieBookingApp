import './App.css';
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';
import Forgot from './Components/Authentication/Forgot';
import Change from './Components/Authentication/Change';
import Add from './Components/Admin/Add';
import SearchMovie from './Components/Movie/SearchMovie';
import BookTicket from './Components/Movie/BookTicket';
import Update from './Components/Movie/Update';
import Home from './Components/Movie/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/Register' element={< Register />}></Route>
        <Route exact path='/Home' element={< Home />}></Route>
        <Route exact path='/Forgot' element={< Forgot />}></Route>
        <Route exact path='/Login' element={< Login />}></Route>
        <Route exact path='/Change' element={< Change />}></Route>
        <Route exact path='/AddMovie' element={< Add />}></Route>
        <Route exact path='/SearchMovie' element={< SearchMovie />}></Route>
        <Route exact path='/BookTicket' element={< BookTicket />}></Route>
        <Route exact path='/UpdateTicket' element={< Update />}></Route>
        <Route exact path='*' element={< Login />}></Route>
      </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
