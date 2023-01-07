import React, { useEffect, useState } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form  } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'
import { useSelector } from 'react-redux'



function ProductScreen(props) {
    const [qty, setQty] = useState(1)
    const [product, setProduct] = useState([])
    const { id } = useParams()
    let navigate = useNavigate();

    const productDetails = useSelector((state) => state.productDetails);
    async function fetchProduct(){
        const { data } = await axios.get(`/api/products/${id}/`)
        setProduct(data)
        
      }
    useEffect(() => {


    fetchProduct()
  }, [id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  }
    return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                         <h3>{product.name}</h3>
                    
                    </ListGroup.Item>

                    <ListGroup.Item>
                         <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    
                    </ListGroup.Item>

                    <ListGroup.Item>
                    Price: ${product.price}
               
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                    Description: {product.description}
               
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                            </Col>
                        </Row>
                        </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                <Row>
                                    <Col>Qty:</Col>
                                    <Col xs='auto' className='my-1'>
                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                            )}       
                        <ListGroup.Item>
                        <Row>
                            <Button onClick={addToCartHandler} className='btn-block btn-dark ' disabled={product.countInStock === 0 } type='button'>Add to Cart</Button>
                        </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default ProductScreen