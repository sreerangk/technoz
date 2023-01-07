import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Button,  Col,  Form, } from 'react-bootstrap'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, register } from '../actions/userActions'
import { useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions' 


function PaymentScreen() {

  
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  let navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  if(!shippingAddress.address){
    navigate('/shipping')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form as='legend'>Select Method</Form>
          <Col>
            <Form.Check
              type='radio'  
              label='PayPal or credit Card'
              id='paypal'
              name='paymentMethod'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}

            >
              
            </Form.Check>
          </Col>
        </Form.Group>
          <Button  type='submit' variant='btn-block btn-dark'>
              Continue
          </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen