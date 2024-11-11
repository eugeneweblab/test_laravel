import React, { useContext } from 'react';
import EditUserButton from '../EditUserButton'
import UserAPI from '../../services/UserApi'
import { ApiContext } from '../../context/ApiContext';




const UserTable = ({ users, setUpdatedUser }) => {
    const api = useContext(ApiContext);

    if ( !users ) {
        return <>{'No users were found!'}</>
    }

    const handleDeleteClick = async (id) => {

        if ( window.confirm('Are you sure you want to delete this user?') ) {
            const res = await api.deleteUser(id);
            alert(res.message);
        }
    }
    const handleOnUserUpdate = async (userId, formData) => {
        if ( !userId || !formData ) return false;
        const res = await api.updateUser(userId, formData);
        setUpdatedUser(userId, res);
    }

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
                                <EditUserButton user={user}
                                                onUpdate={ (formData) => handleOnUserUpdate(user.id, formData) }
                                />
                                <button className={'btn btn-danger'}
                                        onClick={ () => handleDeleteClick(user.id)}>
                                    Delete
                                </button>
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
