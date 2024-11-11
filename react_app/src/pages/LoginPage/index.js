import React, { useContext, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ApiContext } from '../../context/ApiContext';

const Index = () => {
    const [loading, setLoading] = useState(false);
    const [statusMess, setStatusMess] = useState('');
    const navigate = useNavigate();
    const { setUserRole } = useContext(UserContext);
    const api = useContext(ApiContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginValue    = e.target?.login?.value;
        const passwordValue = e.target?.password?.value;

        setLoading(true);
        setStatusMess('');

        try {
            const data = await api.login(loginValue, passwordValue);
            setStatusMess('Logged in!');
            navigate('/user-list');
            setUserRole(data?.role);

        } catch (error) {
            setStatusMess(error?.response?.data?.error);
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="col-12 login-container">
            <div className="card login-card">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit} name={'login_form'}>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Login:</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                        />
                    </div>
                    <button type="submit"
                            className="btn btn-success btn-login"
                            disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {statusMess && <div className="status-message">{statusMess}</div>}
                </form>
            </div>
        </div>
    );
};

export default Index;
