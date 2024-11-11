import React from 'react';
import EditUserButton from '../EditUserButton'
import UserAPI from '../../services/UserApi'


const handleDeleteClick = (id) => {
  const api = new UserAPI();
  if (window.confirm('Are you sure you want to delete this user?')) {
    api.deleteUser(id);
  }
}

const UserTable = ({ users }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Edit</th>
        </tr>
        </thead>
        <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>Subscriber</td>
            <td>
              <div className={'d-flex gap-1 align-items-center'}>
                <EditUserButton user={user}/>
                <button className={'btn btn-danger'} onClick={ () => handleDeleteClick(user.id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
