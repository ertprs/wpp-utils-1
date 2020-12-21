import React, { useState } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import Input from '../Input'
import Button from '../Button'

const FormChatBoot = () => {
    let [initialMessage, setInitialMessage] = useState('')
    let [options, setOptions] = useState('')

    const save = async () => {
        let response = await fetch('http://localhost:3030',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    msg: initialMessage,
                    menu: options
                })
            })
        
        console.log(response)
    }

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col md={12}>
                        <Input value={initialMessage} onChange={(e) => setInitialMessage(e)} label="Initial message" placeholder="Inform the initial message" height="250px" textarea required />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="mt-2">
                        <Input value={options} onChange={(e) => setOptions(e)} label="Menu options (option1, option2, option3, option4...)" placeholder="option1, option2, option3, option4..." required />
                    </Col>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Save" variant="outline-danger" width="15%" onClick={() => save()} />
                </Row>
            </Container>
        </>
    )
}

export default FormChatBoot