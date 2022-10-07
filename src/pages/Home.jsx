import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Home = () => {
    
    const navigate = useNavigate();
    const productsList = useSelector(state=>state.products);
    const [categories, setCategories] = useState([]);
    const [productsFiltered, setProductsFiltered] =useState([]);
    const [searchValue, setSearchValue]= useState("");

    useEffect(()=>{
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res=>setCategories(res.data.data.categories));
    }, [])


    useEffect(()=>{
        setProductsFiltered(productsList);
    }, [productsList])

    const filterCategory =(categoryId)=>{
        const filtered = productsList.filter( product =>
         product.category.id === categoryId
        )
        setProductsFiltered(filtered);
    }

    const searchProducts=()=>{
        const filtered = productsList.filter(
            product => product.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        console.log(filtered);
        setProductsFiltered(filtered);
    }
    
    return (
        <Row>
            <Col lg={3}>
               <ListGroup>
                {
                    categories.map(category=>(
                        <ListGroup.Item 
                            key={category.id} 
                            onClick={()=>filterCategory(category.id)}
                            style  ={{cursor: "pointer"}}
                        >
                            {category.name}
                            </ListGroup.Item> 
                    ))
                }
                </ListGroup> 
            </Col>
            <Col>    
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search products"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button variant="outline-secondary" onClick={searchProducts}>
                        Search
                    </Button>
                </InputGroup>

            <br />
            <Row xs={1} md={2} xl={3} className="g-4">
                {productsFiltered.map(product =>(
                       <Col key={product.id}>
                            <Card onClick={()=>navigate(`/product/${product.id}`)} style={{height: "100%"}}>
                                <Card.Img className="imgHome"  variant="top" src={product.productImgs[0] }/>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                                Price: {product.price}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Col>
        </Row>
    );
};

export default Home;