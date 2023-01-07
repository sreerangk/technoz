import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function CheckoutSteps({step1, step2, step3, step4}) {
    
  return (
    <Nav className='d-flex justify-content-between
     mb-4'> 
        <Nav.Item >
        {step1 ? (
            <LinkContainer to='/login'>
                <h5 className='text-success'>Login</h5>
            </LinkContainer>
        ) : (
            <Nav>Login</Nav>
        )}

        </Nav.Item>
        <Nav.Item>
        {step2 ? (
            <LinkContainer to='/shipping'>
                <h5 className='text-success'>Shipping</h5>
            </LinkContainer>
        ) : (
            <Nav>Shipping</Nav>
        )}

        </Nav.Item>
        <Nav.Item>
        {step3 ? (
            <LinkContainer to='/payment'>
                <h5 className='text-success'>Payment</h5>
            </LinkContainer>
        ) : (
            <Nav>Payment</Nav>
        )}

        </Nav.Item>
        <Nav.Item>
        {step4 ? (
            <LinkContainer to='/placeorder'>
                <h5 className='text-success'>Place Order</h5>
            </LinkContainer>
        ) : (
            <Nav disabled>Place Order</Nav>
        )}

        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps