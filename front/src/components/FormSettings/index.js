import React, { useState, useEffect } from 'react'
import Input from '../Input'
import { Row, Col, Container } from 'react-bootstrap'
import Button from '../Button/index'

const FormSettings = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    useEffect(()=>{
        const sla = async () => {
            let response = await fetch('http://localhost:3030/settings', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                }
            })
            let result = await response.json()

            setName(result.name)
            setEmail(result.email)
            setNumber(result.number)
        }
        sla()
    }, [])

    const save = async () => {
        if(email==='') setEmail('')

        let response = await fetch('http://localhost:3030/settings', {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    number
                })
            })
    }

    return (
        <>
            <Container className="mt-3">
                <Row>
                    <Col md={4}>
                        <Input type="text" label="Your name" placeholder="Inform your name" onChange={(e)=>{setName(e)}} value={name} required/>
                    </Col>
                    <Col md={4}>
                        <Input type="text" label="Your email" placeholder="Inform your email" onChange={(e)=>{setEmail(e)}} value={email} />
                    </Col>
                    <Col md={4}>
                        <Input type="text" label="Your number" placeholder="Inform your number" onChange={(e)=>{setNumber(e)}} value={number} required/>
                    </Col>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Save" variant="outline-danger" width="15%" onClick={()=>save()}/>
                </Row>
            </Container>
        </>
    )
}

export default FormSettings;