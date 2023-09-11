import { useContext, useEffect } from "react";
import socket from "./socket";
import AuthContext from "../Context/AuthContext"

const useSocketSetup = () => {
    const { currentUser, token } = useContext(AuthContext)
    useEffect(() => {
        socket.connect();
        socket.on("connect_error", () => {
            console.log('ERROR connection')
        });
        return () => {
            socket.off("connect_error");
        };
    }, [currentUser]);
};

export default useSocketSetup;