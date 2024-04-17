import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

const Register = () => {
  const navigate = useNavigate()
  const { register, loading, user } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { name, email, password }
    register(user)
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <Card style={{ width: '30rem', marginTop: 20 }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formGridName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId='formGridEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              className='mt-5'
              variant='primary'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </Form>
          <div className='text-center'>
            <Link to='/login'>Already have an account? Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Register
