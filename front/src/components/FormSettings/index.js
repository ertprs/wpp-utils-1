import Input from '../Input'
import { Row, Col, Container } from 'react-bootstrap'
import Button from '../Button/index'

const FormSettings = () => {
    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col md={4}>
                        <Input label="Your name" type="text" placeholder="Inform your name" required/>
                    </Col>
                    <Col md={4}>
                        <Input label="Your email" type="text" placeholder="Inform your email" />
                    </Col>
                    <Col md={4}>
                        <Input label="Your number" type="text" placeholder="Inform your number" required/>
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