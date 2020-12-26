import React, { useState, useEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import Input from '../Input'
import Button from '../Button'

import { DivOptions, UlOptions, LiOptions, ButtonLiOptions, InputOptions, SpanOptions, SpanSugestionOptions, FloatButton, MyContainer } from './styles'
import Label from '../Label/index'
import Icon from '../Icon/index'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DashboardChatBoot = (props) => {
    let [initialMessage, setInitialMessage] = useState('')
    let [inputTextOption, setInputTextOption] = useState('')
    let [options, setOptions] = useState([])
    let [filtredOptions, setFiltredOptions] = useState([])
    let [allOptions, setAllOptions] = useState([])

    const input = useRef(null);

    useEffect(()=>{
        const getData = async () => {

            let response = await fetch('http://localhost:3030/rules', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                }
            })
            let data = await response.json()
            setAllOptions(data.map(option=>{return option.rule_title}))

            response = await fetch('http://localhost:3030/initial', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                }
            })
            data = await response.json()
            setInitialMessage(data.initial_message)
            if(data.sequence!==""){
                setOptions(data.sequence.split(", "))
            }
            
        }

        getData()
    }, [])

    useEffect(() => {
        const filtra = () => {
            let filtreds = allOptions.filter((option) => {
                if (option.indexOf(inputTextOption) > -1) {
                    return option
                }
                return null
            })
            
            setFiltredOptions(filtreds)
        }

        filtra()
    }, [inputTextOption, allOptions])

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
        return filtredOptions.map(option => {
            return(
                <SpanSugestionOptions onClick={() => insere(option)} key={option}>{option}</SpanSugestionOptions>
            )
        })
    }

    const renderOptions = () => {
        return options.map(option => (
            <LiOptions key={option}>
                <ButtonLiOptions onClick={() => { removeOption(option) }}>X</ButtonLiOptions>{option}
            </LiOptions>
        ))
    }

    const save = async () => {
        let response = await fetch('http://localhost:3030/initial', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "accept": "json"
            },
            body: JSON.stringify({
                initial_message: initialMessage,
                sequence: options
            })
        })
    }

    return (
        <>
            <MyContainer className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Input value={initialMessage} onChange={(e) => setInitialMessage(e)} label="Initial message" placeholder="Inform the initial message" height="250px" type="textarea" required />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Label label="Choice the order of rules (don't repeat any rules)" required />
                        <DivOptions>

                            <UlOptions>
                                {renderOptions()}
                            </UlOptions>

                            <InputOptions
                                type="text"
                                placeholder="Select the options of rules"
                                onChange={(e) => setInputTextOption(e.target.value)}
                                ref={input}
                                value={inputTextOption}
                            />

                            <SpanOptions className="sugestions">
                                {renderSugestionsOptions()}
                            </SpanOptions>

                        </DivOptions>
                    </Col>
                </Row>
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Save" variant="outline-danger" width="15%" onClick={()=>save()} />
                </Row>
            </MyContainer>

            <FloatButton variant="outline-danger" onClick={()=>props.toggleDisplay()}>
                <Icon size="25px" icon={faPlus}/>
            </FloatButton>
        </>
    )
}

export default DashboardChatBoot