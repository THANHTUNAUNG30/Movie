/* eslint-disable react/jsx-pascal-case */

import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Movie_Details from './components/Movie_Details';
import NotFoung from "./components/NotFoung";
import Movie from './components/Movie';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/movies' element={<Movie/>} />
        <Route path='/movies/details/:movie_id' element={<Movie_Details />} />
        <Route path="*" element={<NotFoung />}/>
      </Routes>

    </div>
  );
}

export default App;
