import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { login, user, loading, dispatch } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const user = { email, password }
    login(user)
  }
  useEffect(() => {
    let url = location.state?.from?.pathname || '/'
    if (user) {
      navigate(url)
    }
  }, [user])

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <Card style={{ width: '30rem', marginTop: 20 }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Form onSubmit={handleSubmit}>
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
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </Form>
          <div className='text-center'>
            <Link to='/register'>Don't have an account? register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Login
