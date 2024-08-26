import logo from './logo.svg';
import './App.css';
import Home from './cms/Home';
import Header from './partials/Header';
import Footer from './partials/Footer';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import About from './cms/About';
import UserList from './user/UserList';
import UserAdd from './user/UserAdd';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/user/list' element={<UserList />}></Route>
          <Route path='/user/add' element={<UserAdd />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
        
    </div>
  );
}

export default App;
