import { Container, Row, Col, Button, Dropdown, ListGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import API from '../API';

function OfficerPage(props){

    const counters = props.counters;
    const [selectedCounter, setSelectedCounter] = useState('01');
    const [services, setServices] = useState([]);

    useEffect(() => {
        API.getServicesByCounter(selectedCounter)
        .then((services) => {
            setServices(services);
        })
        .catch((err) => console.log(err));
    }, [selectedCounter]);

    /*const changeCounter=(event)=>{
        setSelectedCounter(event.target.value);
    }*/

    return(
        <Container fluid style={{padding: 0, textAlign: 'center'}}>
            <Row style={{paddingTop: '30px'}}>
                <Col>
                    <h1>Officer Interface</h1>
                </Col>
            </Row>
            <Row style={{marginTop: '30px'}}>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle>
                            Select the counter
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        {
                            counters.map((c) => {
                                return (
                                    <Dropdown.Item key={c.counterid} value={c.counterId} onSelect={() => setSelectedCounter(c.counterId)}>Counter N.{c.counterid}</Dropdown.Item>
                                )
                            })
                        }
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    Current client is: #ticketID<br/>
                    <Button style={{marginTop: '20px'}}>Call Next Client</Button>
                </Col>
                <Col>
                    The services that this counter can manage are:
                    <ListGroup>
                        {
                            services.map((s) => {
                                return (
                                    <ListGroup.Item key={s.typeid}>{s.typename}</ListGroup.Item>
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