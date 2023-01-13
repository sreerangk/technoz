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
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'


function ProductEditScreen() {
    const productId = useParams()


    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    let navigate = useNavigate();  

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else 
        if (!product.name || product._id !== Number(productId.id)){
            dispatch(listProductDetails(productId.id))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    
    }, [dispatch,product, productId.id,navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId.id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    } 

    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId.id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)


            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }
    }
  return (
    <div>
        <Link to='/admin/productlist'>
        Go Back
        </Link>

        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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

                        <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
            

                    <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    >
                    </Form.Control>
                   </Form.Group>
                   <Form.Control
                        type='file'
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                        >
                    </Form.Control>

                   

                   <Form.Group controlId='brand'>
                   <Form.Label>Brand</Form.Label>
                   <Form.Control
                       type='text'
                       placeholder='Enter brand'
                       value={brand}
                       onChange={(e) => setBrand(e.target.value)}
                   >
                   </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='countinstock'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                      type='number'
                      placeholder='Enter stock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                  >
                  </Form.Control>
                 </Form.Group>
                 <Form.Group controlId='category'>
                 <Form.Label>category</Form.Label>
                 <Form.Control
                     type='text'
                     placeholder='Enter category'
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                 >
                 </Form.Control>
                </Form.Group>
                <Form.Group controlId='description'>
                <Form.Label>description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </Form.Control>
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

export default ProductEditScreen