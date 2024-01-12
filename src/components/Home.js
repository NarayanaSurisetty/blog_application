import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import LoadingBar from 'react-top-loading-bar';

const Home = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const ref = useRef(null);

    useEffect(() => {
        console.log(11111, user)
    },[])

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
            <div className="p-4 box mt-3 text-center">
                Welcome <br />
                {user && user.displayName}
            </div>
            <div className="d-grid gap-2">

                <Button variant="primary" onClick={handleLogout}>
                    Log out
                </Button>

            </div>
        </>
    );
};

export default Home;