/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/ErrorModal";
import { useEffect, useState } from "react";

const TicketPage = (props) => {
    const {services, selectedOption, text} = props;
    const [seconds, setSeconds] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => {
                if (seconds === 0) {
                    clearInterval(interval);
                    navigate('/');
                    return seconds;
                }
                return seconds - 1;
            
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        selectedOption === -1 ?
        <ErrorModal message="Please, select a service before continuing" setShow={() => { navigate('/') }}/> :
        <div className="TicketPage CenterContent">
            <h1>Ticket Page</h1>
            <h2>Selected Service: {services[selectedOption].description}</h2>
            <h3>{text}</h3>
            <h3>You will be redirected in {seconds} seconds</h3>
            <Button className="BigButton" variant="primary" onClick={() => navigate('/')}> OK </Button>
        </div>
    )
}

export default TicketPage;