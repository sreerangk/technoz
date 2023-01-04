import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import Footer from '../components/Footer'
import { Button, Form, Row } from 'react-bootstrap'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { useLocation } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'




function LoginScreen( ) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();  
  const Location = useLocation()

  const dispatch = useDispatch()

  const redirect = Location.search ? Location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))

  } 
  return (
    <FormContainer>
        <h1>Sign In </h1>
        {error && <Message variant='danger'>No active account fount with the given credentials</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
              <Form.Label>
              Email Address
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                
              </Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
          <Form.Label>
          Password
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            
          </Form.Control>
      </Form.Group>

      <Button className='mt-3' type='submit' variant='dark'>
      Sign In
      </Button>
      <Row className='py-3'>
        New Coutomer? 
        <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>
        Register
        </Link>
      </Row>  
      </Form>

  

      <Footer/>
    </FormContainer>
  
    
  )
}

export default LoginScreen