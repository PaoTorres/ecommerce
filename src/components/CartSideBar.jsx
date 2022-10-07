import React, { useEffect } from 'react';
import {  Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';

const CartSideBar = ({show, handleClose}) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

     useEffect(()=>{
            dispatch(getCartThunk());
     }, [])

     

    const chekout = ()=>{
        alert("Checkout done.");
        dispatch(purchaseCartThunk());
    }


    return (
       
        <Offcanvas placement={"end"} show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Products in my cart.
                <ListGroup>
                    {
                        cart.map( product =>(
                            <ListGroup.Item key={product.id}>
                              
                              <Link to={`/product/${product.id}`} >
                                    {product.title} $ {product.price} Quantity: {product.productsInCart.quantity}
                              </Link> 
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <br />
                <p>Total:</p>
                <Button onClick={chekout}>Checkout</Button>
            </Offcanvas.Body>
        </Offcanvas>
       
    );
};

export default CartSideBar;