import React, { useState }     from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const AddUserButton = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    login   : '',
    password: '',
    email   : '',
    role    : ''
  })
  
  const handleShow = () => setShowModal(true)
  
  const handleClose = () => setShowModal(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    
    setShowModal(false)
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
          <Form onSubmit={ handleSubmit }>
            <Form.Group controlId="formLogin">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                name="login"
                value={ formData.login }
                onChange={ handleChange }
                placeholder="Login"
                required
              />
            </Form.Group>
            
            <Form.Group className={ 'mt-3' } controlId="formEmail">
              <Form.Label>Email</Form.Label>
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
              <Form.Label>Password</Form.Label>
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
              <Form.Label>Role</Form.Label>
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
