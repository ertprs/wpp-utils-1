import React, { useState, useEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import Input from '../Input'
import Button from '../Button'

import { DivOptions, UlOptions, LiOptions, ButtonLiOptions, InputOptions, SelectOptions, SpanOptions, SpanSugestionOptions, FloatButton, MyContainer } from './styles'
import Label from '../Label/index'
import Icon from '../Icon/index'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const DashboardChatBoot = (props) => {
    let [selectOptions, setSelectOptions] = useState([])
    let [initialMessage, setInitialMessage] = useState('')
    let [inputTextOption, setInputTextOption] = useState('')
    let [filtredOptions, setFiltredOptions] = useState([])
    let [options, setOptions] = useState([])

    const select = useRef();
    const input = useRef(null);
    const sugestions = useRef(null);
    const ul = useRef(null);

    useEffect(()=>{
        const sla = async () => {
            let response = await fetch('http://localhost:3030/list', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                }
            })
            let result = await response.json()
            setSelectOptions(result.map(option=>{return option.rule_title}))
        }
        sla()
    }, [])

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
    }, [inputTextOption, selectOptions])

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
        ))
    }

    const renderOptions = () => {
        return options.map(option => (
            <LiOptions key={option.value}>
                <ButtonLiOptions onClick={() => { removeOption(option) }}>X</ButtonLiOptions>{option.value}
            </LiOptions>
        ))
    }

    const renderSelectOptions = () => {
        return selectOptions.map(( option, index ) => (
            <option key={index} value={option}>option</option>
        ))
    }

    const save = async () => {
        let sendOptions = options.map(option => option.value)

        let result = await fetch('http://localhost:3030/sendMessage', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'json'
            },
            body: JSON.stringify({
                initialMessage,
                options: sendOptions,
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

                            <UlOptions ref={ul}>
                                {renderOptions()}
                            </UlOptions>

                            <InputOptions
                                type="text"
                                placeholder="Select the options of rules"
                                onChange={(e) => setInputTextOption(e.target.value)}
                                ref={input}
                                value={inputTextOption}
                            />

                            <SelectOptions ref={select}>
                                { renderSelectOptions() }
                            </SelectOptions>

                            <SpanOptions className="sugestions" ref={sugestions}>
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