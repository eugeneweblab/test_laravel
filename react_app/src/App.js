import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import './index.css';

function App () {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-wrapper">
          <div className="container">
            <div className="row">
              <Routes>
                <Route path="/" element={ <LoginPage/> }/>
                <Route path="/user-list" element={ <UserListPage/> }/>
              </Routes>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
