import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table,  } from 'react-bootstrap'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'


function OrderListScreen() {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.orderList )
    const { loading, error, orders } = userList

    const userLogin = useSelector(state => state.userLogin )
    const { userInfo } = userLogin
    const navigate = useNavigate()



    useEffect(() => {
      if (userInfo && userInfo.isAdmin ) {
        dispatch(listOrders())
      }else{
        navigate('/login')
      }
    },[dispatch, navigate,userInfo])

  return (
    <div>
      <h1>Orders</h1>
        {loading
          ? (<Loader/>)
          : error
            ? ( <Message variant='danger'>{ error }</Message>)
            :(
              <Table striped bordered hover responsve className='table-sm'>
                <thead>
                  <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                  </tr>
                </thead>

                <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>

                        <td>{order.isPaid ? (
                            order.paidAt
                        ) : (
                                <i className='fas fa-x' style={{ color: 'red' }}></i>
                            )}
                        </td>

                        <td>{order.isDelivered ? (
                            order.deliveredAt
                        ) : (
                                <i className='fas fa-x' style={{ color: 'red' }}></i>
                            )}
                        </td>

                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    Details
                                </Button>
                            </LinkContainer>


                        </td>
                    </tr>
                ))}
            </tbody>

              </Table>
        
            )}
    </div>
  )
}

export default OrderListScreen