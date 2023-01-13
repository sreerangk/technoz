import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import Footer from '../components/Footer'
import { Button, Form} from 'react-bootstrap'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import { useLocation } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UseEditScreen() {
    const userId = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    let navigate = useNavigate();  

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails
   
    const userUpdate = useSelector(state => state.userUpdate)
    const {error: errorUpdate, loading: loadingUpdate, success:successUpdate} = userUpdate

    useEffect(() => {

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{

        if (!user.name || user._id !== Number(userId.id)){
            dispatch(getUserDetails(userId.id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }
    }, [user, userId.id,successUpdate,navigate])

    const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id:user._id, name,email,isAdmin}))


    } 
  return (
    <div>
        <Link to='/admin/userlist'>
        Go Back
        </Link>

        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{error}</Message> }

            {loading ? <Loader/> :error ? <Message variant='danger'>{error}</Message> :(
                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='isadmin'>
                   
                    <Form.Check
                        type='checkbox'
                        placeholder='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    >
                    </Form.Check>
                </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            )}
              

                
            </FormContainer>
    </div>
  
  )
}

export default UseEditScreen