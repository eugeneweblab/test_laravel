import React, { useState } from 'react';
import axios from 'axios';  // Импортируем axios
import './index.css';
import UserAPI from '../../services/UserApi'
const Index = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const api = new UserAPI();
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    api.login(login, password).then(r => {
      setLoading(false)
    });
    
    // axios.post('https://your-api-url.com/login', { login, password })
    //   .then(response => {
    //     console.log('Login successful:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error during login:', error);
    //     setError('Invalid credentials. Please try again.');
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };
  
  return (
    <div className="col-12 login-container">
      <div className="card login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login" className="form-label">Login:</label>
            <input
              type="text"
              id="login"
              name="login"
              className="form-control"
              value={login}
              onChange={handleLoginChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="btn btn-success btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Index;
