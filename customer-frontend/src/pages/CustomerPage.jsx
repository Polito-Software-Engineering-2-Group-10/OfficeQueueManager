/* eslint-disable react/prop-types */
import "../styles/CustomerPage.css"
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { bookService } from "../API";
import { Container, Col, Row } from "react-bootstrap";


const CustomerPage = (props) => {
    
    // list of services retrived by the backend
    const {services, setSelectedOption, setText} = props;
    const navigate = useNavigate();
    
    // selected service to handle
    
    // handle the change of the selected service

    const bookAndNavigate = async (index) => {
        setSelectedOption(index);
        const result = await bookService(services[index].name);
        const text = <div className="CenterContent">
            <h2>Your ticket number is: {result.ticketid}</h2>
            <h3>You are in queue with {result.queuelength} other people, waiting time will be approximately {result.waitingTime.minutes} minutes and {Math.round(result.waitingTime.seconds)} seconds</h3>
        </div>;
        setText(text);
        navigate('/ticket');
    };
    
    return (
      <div className='CustomerPage CenterContent'>
        
        <h1>Select a service</h1>
        <h2>Please, select the service that you would like to get a ticket:</h2>
        <Container className="CenterContent">
            <Row>
            {services.map((service, index) => {
                return (
                    <Col key={index}>
                        <Button className="BigButton" variant="secondary" onClick={() => bookAndNavigate(index)}>
                            {service.description}
                        </Button>
                    </Col>
                )
            })}  
            </Row>
        </Container>  
      </div>  
    );
}


export default CustomerPage;