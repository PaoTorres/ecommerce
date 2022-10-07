import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases)


    useEffect(()=>{
        dispatch(getPurchasesThunk());
    }, []);


    return (
        <div>
        <h1> Purchases</h1>
        <ListGroup>
        {
            purchases.map(purchase =>(
                <ListGroup.Item key={purchase.id} >
                    { 
                       purchase?.cart.products.map(product =>(
                         <b key={product.id} onClick={()=>navigate(`/product/${product.id}` )}>{product.title} <span>${product.price}</span><span>   Quantity:{product.productsInCart.quantity} UND</span><br /></b>
                        ))
                     
                    }
                    <br />
                </ListGroup.Item>

            ))
        
        }
        </ListGroup>   


        </div>
    );
};

export default Purchases;