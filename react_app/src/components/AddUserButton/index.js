import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { ApiContext } from '../../context/ApiContext';

const AddUserButton = ({addNewUser}) => {
    const api = useContext(ApiContext);
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
                                                 name   : '',
                                                 password: '',
                                                 email   : '',
                                                 role    : ''
                                             });
    const [statusMess, setStatusMess] = useState('');

    const handleShow = () => setShowModal(true)

    const handleClose = () => setShowModal(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.register(formData);
            addNewUser(res);
            setStatusMess('');
            setShowModal(false)
        } catch (error) {
            const errors = [
                ...(error?.response?.data?.name || []),
                ...(error?.response?.data?.email || []),
                ...(error?.response?.data?.password || []),
                ...(error?.response?.data?.role || [])
            ];

            setStatusMess(errors.join(' '));
        }
    }

    return (
        <>
            <Button variant="success" onClick={ handleShow } className="mb-4">
                Add new user
            </Button>

            <Modal show={ showModal } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        statusMess &&
                        <div className={'alert alert-danger'}>{statusMess}</div>
                    }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group controlId="formLogin">
                            <Form.Label column={true}>Login</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={ formData.name }
                                onChange={ handleChange }
                                placeholder="Name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className={ 'mt-3' } controlId="formEmail">
                            <Form.Label column={true}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={ formData.email }
                                onChange={ handleChange }
                                placeholder="Email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className={ 'mt-3' } controlId="formPassword">
                            <Form.Label column={true}>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={ formData.password }
                                onChange={ handleChange }
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <Form.Group className={ 'mt-3' } controlId="formRole">
                            <Form.Label column={true}>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                className={'form-select'}
                                value={ formData.role }
                                onChange={ handleChange }
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="regular">Regular</option>
                            </Form.Control>
                        </Form.Group>

                        <div className="mt-3 d-flex gap-1">
                            <Button variant="secondary" onClick={ handleClose }>
                                Close modal
                            </Button>
                            <Button variant="success" type="submit">
                                Add User
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddUserButton
