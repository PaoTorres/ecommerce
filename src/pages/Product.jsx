import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addToCartThunk } from '../store/slices/cart.slice';

const Product = () => {

    const {id} = useParams();
    const dispatch = useDispatch();

    const productsList = useSelector (state =>state.products);
    const [rate, setRate] = useState(0);


    const productShowed = productsList.find(product =>product.id === Number(id));
    const relatedProducts = productsList.filter(
        product => product.category.id=== productShowed.category.id
    )
    //console.log(relatedProducts);

    //console.log(productShowed);

    const addToCart =()=>{
        alert("Product add to your cart.");
        const productCart = {
            id: id, 
            quantity: rate
        }
        dispatch(addToCartThunk(productCart));
    }

    useEffect(()=>{
        setRate(1)
    }, [id])


    return (

        <Row>
            <Col>
                <h1>{productShowed.title}</h1>

                <h4><b>Price: </b>${productShowed.price}</h4>
                <p><b>Description:</b> {productShowed.description} </p>
                <Button className="me-3" onClick={()=>setRate(rate-1)}>
                   -
                </Button>
                {rate}
                <Button className="ms-3" onClick={()=>setRate(rate+1)}>
                   +
                </Button>
                <Button className="ms-3" onClick={addToCart}>
                   Add to Cart
                </Button>
                <br /> <br />
                <Carousel variant="dark">

                    { 
                         productShowed.productImgs.map(img =>(
                            <Carousel.Item key={img}>
                               <img
                                className="d-block w-100 imgCarousel"
                                src={img}
                                alt=""
                            /> 
                            </Carousel.Item>
                         ))

                    }

                </Carousel>
             
            </Col>
            <Col lg={3}>
                <h2>Products related</h2>

                <ListGroup variant="flush">
                       {
                        relatedProducts.map(product => (
                            <ListGroup.Item key={product.id}>
                                <Link to={`/product/${product.id}`}>{product.title}
                                    <img src={product.productImgs[0]} alt="" className='d-block w-100 imgRelated'/>
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
               
                </ListGroup>


                
            </Col>
        </Row>
    );
};

export default Product;