import React, { useState, useEffect } from 'react';

import { Row,Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions'

import {  useNavigate, useLocation, useSearchParams  } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousal';

function HomeScreen() {
  
  const dispatch = useDispatch();



  const productList = useSelector( state => state.productList);
  const {error, loading, products} = productList;


  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className='p-0'>

        <Container className='p-3'>
        <ProductCarousel />
        <h1>Latest Products</h1>
          {loading ? <Loader />
            : error ? <Message variant='danger'> {error}</Message> 
              :
              <div>
                <Row>
                  {products.map(product => (
                      <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                          <Product product={product} />
                      </Col>
                  ))}
                </Row> 
                
              </div>
          }
        </Container>
        
    </div>
  )
}

export default HomeScreen