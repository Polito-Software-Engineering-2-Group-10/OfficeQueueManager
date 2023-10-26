import { Container, Row, Col, Button, Dropdown, ListGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import API from '../API';

function OfficerPage(props){

    const counters = props.counters;
    const services = props.services;
    const [selectedCounter, setSelectedCounter] = useState('01');
    const [selectedServices, setSelectedServices] = useState([]);
    const [currentClient, setCurrentClient] = useState('');

    useEffect(() => {
        if (services.length === 0) return;
        API.getServicesByCounter(selectedCounter)
        .then((selectedServices) => {
            let sr = selectedServices.map((s) => s.typeid);
            const newList = services.filter((s) => sr.includes(s.name));
            setSelectedServices(newList);
        })
        .catch((err) => console.log(err));
    }, [selectedCounter, services.length]);

    function getNextClient(){
        API.getNextClient(selectedCounter)
        .then((c) => setCurrentClient(c))
        .catch((err) => console.log(err));
    }

    return(
        <Container fluid style={{padding: 0, textAlign: 'center'}}>
            <Row style={{paddingTop: '30px'}}>
                <Col>
                    <h1>Officer Interface</h1>
                </Col>
            </Row>
            <Row style={{marginTop: '30px'}}>
                <Col>
                    Current counter selected is {selectedCounter}
                    <Dropdown onSelect={(e) => setSelectedCounter(e)}>
                        <Dropdown.Toggle>
                            Select another counter
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {
                            counters.map((c) => {
                                return (
                                    <Dropdown.Item key={c.counterid} eventKey={c.counterid}>Counter N.{c.counterid}</Dropdown.Item>
                                )
                            })
                        }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    Current client is: {currentClient}<br/>
                    <Button style={{marginTop: '20px'}} onClick={getNextClient}>Call Next Client</Button>
                </Col>
                <Col>
                    The services that this counter can manage are:
                    <ListGroup>
                        {
                            selectedServices.map((s) => {
                                return (
                                    <ListGroup.Item key={s.name}>{s.description}</ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default OfficerPage;