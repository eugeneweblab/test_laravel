import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddUserButton from '../../components/AddUserButton';
import UserTable from '../../components/UserTable';
import Pagination from '../../components/Pagination';
import './index.css';
import UserAPI from '../../services/UserApi'

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    
    const api = new UserAPI();
    console.log(api.getUsers(5, currentPage));
    
    axios.get(`https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=5`)
      .then(response => {
        setUsers(response.data);
        
        setTotalPages(2);
      })
      .catch(error => {
        console.error('There was an error fetching the users:', error);
      });
  }, [currentPage]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Users List</h2>
      
      <AddUserButton />
      
      <UserTable users={users} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserListPage;
