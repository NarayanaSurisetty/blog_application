import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';

const Login = () => {
    const [btnDisable, setBtnDisable] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useUserAuth();
    const navigate = useNavigate();
    const ref = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (email.trim() === '' || password.trim() === '') {
            setError("Please fill out email & password!");
        } else {
            ref.current.staticStart();
            try {
                await logIn(email, password);
                ref.current.complete()
                navigate("/home");
            } catch (err) {
                ref.current.complete()
                setError(err.code);
            }
        }
    };

    return (
        <>
            <div className="p-4 mt-5 box centerForms">
                <h2 className="mb-3 text-primary">Login</h2>
                <LoadingBar color="#08518b" height={2.5} ref={ref} />

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>

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
                            Log In
                        </Button>
                    </div>
                </Form>
                <div className="mt-3 box text-center">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </>
    );
};

export default Login;
