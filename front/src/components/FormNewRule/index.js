import React, { useEffect, useState, useRef } from 'react'

import { MyContainer, FloatButton, Option } from './styles'
import { DivOptions, UlOptions, LiOptions, ButtonLiOptions, InputOptions, SpanOptions, SpanSugestionOptions } from '../DashboardChatBoot/styles'

import Label from '../Label/index'
import Input from '../Input/index'
import Icon from '../Icon/index'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-bootstrap'
import Button from '../Button/index'

const FormNewRule = (props) => {
    const [ruleTitle, setRuleTitle] = useState('')
    const [ruleType, setRuleType] = useState('sim/nao')
    const [ruleText, setRuleText] = useState('')
    const [ruleCaseYes, setRuleCaseYes] = useState('continue')
    const [ruleCaseNo, setRuleCaseNo] = useState('finaly')

    let [inputTextOption, setInputTextOption] = useState('')
    let [options, setOptions] = useState([])
    let [filtredOptions, setFiltredOptions] = useState([])
    let [allOptions, setAllOptions] = useState([])

    const input = useRef(null);


    useEffect(() => {
        const getData = async () => {

            let response = await fetch('http://localhost:3030/rules', {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                }
            })
            let data = await response.json()
            setAllOptions(data.map(option => { return option.rule_title }))
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
            return (
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


    const renderFields = () => {
        if (ruleType === "sim/nao") {
            return (
                <>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Rule text" placeholder="Inform the rule text" type="textarea" height="250px" onChange={(e) => setRuleText(e)} value={ruleText} required />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Selecione a ação caso a resposta seja sim" type="select" onChange={(e => setRuleCaseYes(e))} value={ruleCaseYes} required>
                                <Option value="continue">Continuar fluxo</Option>
                                <Option value="finaly">Finalizar</Option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Selecione a ação caso a resposta seja não" type="select" onChange={(e => setRuleCaseNo(e))} value={ruleCaseNo} required>
                                <Option value="continue">Continuar fluxo</Option>
                                <Option value="finaly">Finalizar</Option>
                            </Input>
                        </Col>
                    </Row>
                </>
            )
        }
        else if (ruleType === "finalizar" || ruleType === "continuar") {
            return (
                <Row className="mt-2">
                    <Col>
                        <Input label="Rule text" placeholder="Inform the rule text" type="textarea" height="250px" onChange={(e) => setRuleText(e)} value={ruleText} required />
                    </Col>
                </Row>
            )
        }
        else if (ruleType === "mostra_menu") {
            return (
                <>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Rule text" placeholder="Inform the rule text" type="textarea" height="250px" onChange={(e) => setRuleText(e)} value={ruleText} required />
                        </Col>
                    </Row>
                    <div className="mt-2">
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
                    </div>
                </>
            )
        }
    }

    const save = async () => {
        if (ruleType === "sim/nao") {
            let result = await fetch("http://localhost:3030/rules", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                },
                body: JSON.stringify({
                    title: ruleTitle,
                    type: ruleType,
                    text: ruleText,
                    sequence: null,
                    caseYes: ruleCaseYes,
                    caseNo: ruleCaseNo
                })
            })

        }
        else if (ruleType === "finalizar" || ruleType === 'continuar') {

            let result = await fetch("http://localhost:3030/rules", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                },
                body: JSON.stringify({
                    title: ruleTitle,
                    type: ruleType,
                    text: ruleText,
                    sequence: null,
                    caseYes: null,
                    caseNo: null
                })
            })

        }
        else if (ruleType === "mostra_menu") {

            let result = await fetch("http://localhost:3030/rules", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                },
                body: JSON.stringify({
                    title: ruleTitle,
                    type: ruleType,
                    text: ruleText,
                    sequence: options,
                    caseYes: null,
                    caseNo: null
                })
            })

        }

        props.toggleDisplay()
    }

    return (
        <>
            <MyContainer className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Input label="Rule title" placeholder="Inform the rule title" type="text" onChange={(e) => setRuleTitle(e)} value={ruleTitle} required />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Input label="Rule type" type="select" onChange={(e) => setRuleType(e)} value={ruleType} required>
                            <Option value="sim/nao">Resposta sim/não</Option>
                            <Option value='finalizar'>Finalizar</Option>
                            <Option value='continuar'>Continuar</Option>
                            <Option value='mostra_menu'>Mostrar outro menu</Option>
                        </Input>
                    </Col>
                </Row>
                {
                    renderFields()
                }
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Add" variant="outline-danger" width="15%" onClick={() => { save() }} />
                </Row>
            </MyContainer>

            <FloatButton variant="outline-danger" onClick={() => props.toggleDisplay()}>
                <Icon size="25px" icon={faArrowLeft} />
            </FloatButton>
        </>
    )
}

export default FormNewRule