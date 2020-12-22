import React, { useState, useEffect, useRef } from 'react'
import { Col, Row, Container } from 'react-bootstrap'
import Input from '../Input'
import Button from '../Button'

import { DivOptions, UlOptions, LiOptions, ButtonLiOptions, InputOptions, SelectOptions, SpanOptions, SpanSugestionOptions } from './styles'
import Label from '../Label/index'

const FormChatBoot = () => {
    let [initialMessage, setInitialMessage] = useState('')
    let [inputTextOption, setInputTextOption] = useState('')
    let [filtredOptions, setFiltredOptions] = useState([])
    let [options, setOptions] = useState([])

    const select = useRef();
    const input = useRef(null);
    const sugestions = useRef(null);
    const ul = useRef(null);

    useEffect(() => {
        const filtra = () => {
            let filtreds = [...select.current.children].filter(option => {
                if (option.value.indexOf(inputTextOption) > -1) {
                    return option
                }
                return null
            })

            setFiltredOptions(filtreds)
        }

        filtra()
    }, [inputTextOption])

    const insere = (option) => {
        setOptions([...options, option])
        setInputTextOption('')
        input.current.select()
    }

    const removeOption = (option) => {
        let oldOptions = options
        let newOptions = oldOptions.filter(oldOption => {
            if (oldOption !== option) {
                return option
            } else {
                return null
            }
        })

        setOptions(newOptions)
    }

    const renderSugestionsOptions = () => {
        return filtredOptions.map(option => (
            <SpanSugestionOptions onClick={() => insere(option)} key={option.value}>{option.value}</SpanSugestionOptions>
        )
        )
    }

    const renderOptions = () => {
        return options.map(option => (
            <LiOptions key={option.value}>
                <ButtonLiOptions onClick={() => { removeOption(option) }}>X</ButtonLiOptions>{option.value}
            </LiOptions>
        ))
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
                        <Label label="Escolha as regra em ordem (Não repita nenhuma regra)" required />
                        <DivOptions>

                            <UlOptions ref={ul}>
                                <LiOptions key="initialMessage">
                                    <ButtonLiOptions>X</ButtonLiOptions>InitialMessage
                                </LiOptions>
                                {renderOptions()}
                            </UlOptions>

                            <InputOptions
                                type="text"
                                placeholder="Digite as opções de menu"
                                onChange={(e) => setInputTextOption(e.target.value)}
                                ref={input}
                                value={inputTextOption}
                            />

                            <SelectOptions name="" id="" ref={select}>
                                <option value="Pedro">Pedro</option>
                                <option value="Lara">Lara</option>
                                <option value="Alessandra">Alessandra</option>
                            </SelectOptions>

                            <SpanOptions className="sugestions" ref={sugestions}>
                                {renderSugestionsOptions()}
                            </SpanOptions>

                        </DivOptions>
                    </Col>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Save" variant="outline-danger" width="15%" />
                </Row>
            </Container>
        </>
    )
}

export default FormChatBoot