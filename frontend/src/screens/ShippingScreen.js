import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Button,  Form, } from 'react-bootstrap'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../actions/userActions'
import { useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions' 

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.address)
    const [postalCode, setPostalCode] = useState(shippingAddress.address)
    const [country, setCountry] = useState(shippingAddress.address)
    let navigate = useNavigate();  


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment') 
    }


  return (
    <FormContainer>
        <h1>shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Address'
                    value={address ? address : ""}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter city'
                    value={city ? city : ""}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Address'
                    value={postalCode ? postalCode : ""}
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control> 
            </Form.Group>
            <Form.Group controlId='Country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Address'
                    value={country ? country : ""}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control> 
            </Form.Group>

            
        <Button type='submit' variant='primary'>
        Continue
        </Button>

        </Form>

    </FormContainer>
  )
}

export default ShippingScreen