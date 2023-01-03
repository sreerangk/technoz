import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { Row, Col, ListGroup, Image } from "react-bootstrap"
import Message from '../components/Message'



function CartScreen(props) {
    const  productId  = useParams()
    const [searchPara] = useSearchParams()

    const qty = searchPara.get('qty')
   
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const  {cartItems}  = cart

    
    useEffect(() => {
        if (productId.id) {
         
            dispatch(addToCart(productId.id, qty))
        }
    }, [dispatch, productId.id, qty])
   
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ):(
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>

                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    ${item.price}
                  </Col>
                </Row>
              
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      
      <Col md={4}>

      </Col>


    </Row>
    

  )
}

export default CartScreen