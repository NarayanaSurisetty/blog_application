import React, { useEffect, useRef } from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';
import Posts from "./Posts";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        // console.log(11111, user)
    }, [])

    const handleLogout = async () => {
        ref.current.staticStart();
        try {
            await logOut();
            ref.current.complete();
            navigate("/");
        } catch (error) {
            ref.current.complete();
            console.log(error.message);
        }
    };

    return (
        <>
            <LoadingBar color="#08518b" height={2.5} ref={ref} />
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <span className="name-textColor">Welcome {user && user.displayName}</span>
                    <Button variant="warning" onClick={handleLogout} className="justify-content-end">
                        <i className="bi bi-box-arrow-right"></i> Logout
                    </Button>
                    {/* <Navbar.Collapse>
                        <Nav className="justify-content-end" style={{ width: "100%" }}>
                            <Button variant="warning" onClick={handleLogout}>
                                <i class="bi bi-box-arrow-right"></i>
                            </Button>
                        </Nav>
                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
            {/* <Posts /> */}
            <div className="centerForms mt-5">
                <p>Blog posts coming soon......</p>
            </div>
        </>
    );
};

export default Home;