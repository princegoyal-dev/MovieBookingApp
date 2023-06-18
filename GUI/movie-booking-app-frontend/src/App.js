import './App.css';
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';
import Forgot from './Components/Authentication/Forgot';
import Change from './Components/Authentication/Change';
import Add from './Components/Admin/Add';
import SearchMovie from './Components/Movie/SearchMovie';
import BookTicket from './Components/Movie/BookTicket';

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <Forgot />
      <Change />
      <Add />
      <SearchMovie />
      <BookTicket />
    </div>
  );
}

export default App;
