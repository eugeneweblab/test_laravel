import React, { useState, useEffect, useContext } from 'react';
import AddUserButton from '../../components/AddUserButton';
import UserTable from '../../components/UserTable';
import Pagination from '../../components/Pagination';
import './index.css';
import { UserContext } from '../../context/UserContext';
import { ApiContext } from '../../context/ApiContext';


const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const { role, setUserRole } = useContext(UserContext);
    const api = useContext(ApiContext);

    useEffect(() => {
        ( async () => {
            try {
                const data = await api.getUsers(5, currentPage);
                setUsers(data.data);
                setTotalPages(data?.last_page);
            } catch (error) {
                setUserRole(null);
            }
        })()
    }, [currentPage]);




    const setUpdatedUser = (userId, userData) => {
        setUsers(prev => {
            return prev.map(user => {
                if (user.id === userId) {
                    return { ...user, ...userData };
                }
                return user;
            });
        });
    };

    const addNewUser = (userData) => {
        setUsers(prev => {
            return [ ...prev, userData ]
        });
    };


    if ( role !== 'admin' ) {
        return <>{'You are not allowed to see content on this page'}</>
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Users List</h2>

            <AddUserButton addNewUser={addNewUser}/>

            <UserTable users={users} setUpdatedUser={setUpdatedUser} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={ (page) => setCurrentPage(page) }
            />
        </div>
    );
};

export default UserListPage;
