import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { Button, Row, Col, ListGroup, Form, Image, Card } from 'react-bootstrap'
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deliverOrder, getOrderDetails } from '../actions/orderActions'



function OrderScreen() {
  const orderId = useParams()



  const orderDetails = useSelector(state => state.orderDetails)
  const { order, error, loading } = orderDetails
  

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success:successDeliver } = orderDeliver


  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const navigate = useNavigate()

  const dispatch = useDispatch()

  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  }
 


  useEffect(() => {
    if(!order || order._id !== Number(orderId) || successDeliver) {


        dispatch(getOrderDetails(orderId.id))
    }

  }, [dispatch])  


const deliverHandler = () => {
  dispatch(deliverOrder(order))
}


  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) :  (
    <div>
        <h1> Order: {order._id}</h1>
         <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p><strong>Name: </strong> {order.user.name} </p>
                  <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>
                  <p>
                    <strong>Shipping: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},
                    {'  '}
                    {order.shippingAddress.postalCode},
                    {'  '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                  ):(
                    <Message variant='warning'>Not Delivered</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}</Message>
                ):(
                  <Message variant='warning'>Not Paid </Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                 
                    {order.orderItems.length === 0 ? <Message variant='info'>
                        Your order is empty
                      </Message> : (
                        <ListGroup variant='flush'>
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={1}>
                                  <Image src={item.image} alt={item.name} fluid rounded />

                                </Col>
                                <Col>
                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={4}>
                                  {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                </Col>

                              </Row> 
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )}
                
                </ListGroup.Item>
              </ListGroup>

            </Col>
            <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                            <h2>Order summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items:</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                          <Col>Shipping:</Col>
                          <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                          <Col>Tax:</Col>
                          <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                          <Col>Total:</Col>
                          <Col>${order.totalPrice}</Col>
                      </Row>
                  </ListGroup.Item>
      
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                  <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                  >
                      Mark As Delivered
                  </Button>
                  </ListGroup.Item>   
                  )}
                  </ListGroup>
                </Card>
            </Col>
         </Row>
         
    </div>
  )
}

export default OrderScreen