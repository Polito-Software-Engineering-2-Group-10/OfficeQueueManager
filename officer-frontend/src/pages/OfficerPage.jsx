import { Container, Row, Col, Button, Table } from 'react-bootstrap'

function OfficerPage(props){
    return(
        <Container fluid style={{padding: 0, textAlign: 'center'}}>
            <Row style={{paddingTop: '30px'}}>
                <Col>
                    <h1>Officer Interface</h1>
                </Col>
            </Row>
            <Row style={{marginTop: '30px'}}>
                <Col>
                    You have been assigned to counter n.X
                </Col>
                <Col>
                    Current client is: #ticketID<br/>
                    <Button style={{marginTop: '20px'}}>Call Next Client</Button>
                </Col>
                <Col>
                    The services that this counter can manage are:
                </Col>
            </Row>
        </Container>
    )
}

export default OfficerPage;