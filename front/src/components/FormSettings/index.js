import Input from '../Input'
import { Row, Col, Container } from 'react-bootstrap'
import Button from '../Button/index'

const FormSettings = () => {
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col md={4}>
                        <Input type="text" label="Your name" placeholder="Inform your name" required/>
                    </Col>
                    <Col md={4}>
                        <Input type="text" label="Your email" placeholder="Inform your email" />
                    </Col>
                    <Col md={4}>
                        <Input type="text" label="Your number" placeholder="Inform your number" required/>
                    </Col>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Save" variant="outline-danger" width="15%"/>
                </Row>
            </Container>
        </>
    )
}

export default FormSettings;