
import { useState, useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import LoadingBar from 'react-top-loading-bar';
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
    const [email, setEmail] = useState(null);
    const [emailMessage, setEmailMessage] = useState(false);
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setError("");
        setEmailMessage(false);
        e.preventDefault();
        ref.current.staticStart();
        try {
            await sendPasswordResetEmail(auth, email);
            setEmailMessage(true);
            setEmail(null);
            ref.current.complete();
            // navigate("/home");
        } catch (error) {
            ref.current.complete();
            setEmailMessage(false);
            if (error.code === 'auth/user-not-found') {
                // alert('User not found, try again!')
                setError("User not found, please try again!");
                setEmail('');
            }
            setError(error.code);
        }
    };

    return (
        <div className="p-4 mt-5 box centerForms">
            <h2 className="mb-3 text-primary">Forgot Password</h2>
            <LoadingBar color="#08518b" height={2.5} ref={ref} />

            {error && <Alert variant="danger">{error}</Alert>}

            {emailMessage &&
                <Alert variant="success">The Email has been sent, please check your inbox!</Alert>}

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="Submit">
                        Forgot Password
                    </Button>
                </div>
                <div className="mt-3 box text-center">
                    Do you have an account? <Link to="/">Login</Link>
                </div>
            </Form>
        </div>
    )
}

export default ForgotPassword
