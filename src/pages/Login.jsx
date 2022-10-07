import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = (data) => {
        console.log(data);
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login", data)
            .then( res => {
                console.log("Login linea 15", res.data.data.token);
                localStorage.setItem("token", res.data.data.token);
                navigate("/");
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert("Invalid credencials");
                }
                console.log(error.response);
            });
    }



    return (
        <div>
            <h1>Login</h1>
            <div className="testData">TEST DATA --> User: pao@gmail.com Password: pasar1234</div>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        {...register("email")}
                        type="email"
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;