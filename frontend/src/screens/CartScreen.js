import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Form, Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap"
import Message from '../components/Message'



function CartScreen(props) {
    const  productId  = useParams()
    const [searchPara] = useSearchParams()

    const qty = searchPara.get('qty')
   
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems }  = cart
    let navigate = useNavigate();



    useEffect(() => {
        if (productId.id) {
         
            dispatch(addToCart(productId.id, qty))
        }
    }, [dispatch, productId.id, qty])
   
    const removeFromCartHandler = (id) =>{
      dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
      navigate('/login?redirect=/shipping')
    }

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
                  
                  <Col md={3}>
                  <Form.Control
                  as="select"
                  value={item.qty}
                  onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
              >
                  {

                      [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                              {x + 1}
                          </option>
                      ))
                  }

              </Form.Control>
          
                  </Col>
                  <Col md={1}>
                  <Button type='button'
                  variant='light'
                  onClick={() => removeFromCartHandler(item.product)}>
                  <i className='fas fa-trash'></i>
                  </Button>
                  </Col>
                </Row>
              
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      
      <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                </ListGroup>

              <ListGroup.Item>
                  <Button 
                  type='button'
                  style={{ width: "100%",}}
                  className='btn-block btn-dark'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  PROCEED TO CHECKOUT
                  </Button>
              </ListGroup.Item>
              </Card>
      </Col>


    </Row>
    

  )
}

export default CartScreen