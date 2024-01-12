import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useUserAuth();
    let navigate = useNavigate();
    const ref = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (email.trim() === '' || password.trim() === '' || name.trim() === '') {
            setError("Please fill out full name, email & password!");
        } else {
            ref.current.staticStart();
            try {
                await signUp(email, password, name);                        
                navigate("/");
                ref.current.complete();
            } catch (err) {
                ref.current.complete();
                setError(err.code);
            }
        }
    };

    return (
        <>
            <div className="p-4 mt-5 box">
                <h2 className="mb-3 text-warning">Signup</h2>
                <LoadingBar color="#08518b" height={2.5} ref={ref} />

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Sign up
                        </Button>
                    </div>
                </Form>
            </div>
            <div className=" box text-center">
                Already have an account? <Link to="/">Log In</Link>
            </div>
        </>
    );
};

export default Signup;