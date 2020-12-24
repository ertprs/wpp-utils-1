import React, { useEffect, useState } from 'react'

import { MyContainer, FloatButton, Option } from './styles'

import Input from '../Input/index'
import Icon from '../Icon/index'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Row, Col} from 'react-bootstrap'
import Button from '../Button/index'

const FormNewRule = (props) => {
    const [ruleTitle, setRuleTitle] = useState('')
    const [ruleType, setRuleType] = useState('sim/nao')
    const [ruleText, setRuleText] = useState('')
    const [ruleCaseYes, setRuleCaseYes] = useState('continue')
    const [ruleCaseNo, setRuleCaseNo] = useState('finaly')

    const renderFields = () => {
        if(ruleType==="sim/nao"){
            return (
                <>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Rule text" placeholder="Inform the rule text" type="textarea" height="250px" onChange={(e)=>setRuleText(e)} value={ruleText} required />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Selecione a ação caso a resposta seja sim" type="select" onChange={(e=>setRuleCaseYes(e))} value={ruleCaseYes} required>
                                <Option value="continue">Continuar fluxo</Option>
                                <Option value="finaly">Finalizar</Option>
                            </Input>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Input label="Selecione a ação caso a resposta seja não" type="select" onChange={(e=>setRuleCaseNo(e))} value={ruleCaseNo} required>
                                <Option value="continue">Continuar fluxo</Option>
                                <Option value="finaly">Finalizar</Option>
                            </Input>
                        </Col>
                    </Row>
                </>
            )
        }
        else if(ruleType==="finalizar"){
            return (
                <Row className="mt-2">
                    <Col>
                        <Input label="Rule text" placeholder="Inform the rule text" type="textarea" height="250px" onChange={(e)=>setRuleText(e)} value={ruleText} required />
                    </Col>
                </Row>
            )
        }
    }

    const save = async () => {
        if(ruleType==="sim/nao"){
            let result = await fetch("http://localhost:3030/saveNewRule", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                },
                body: JSON.stringify({
                    title: ruleTitle,
                    type: ruleType,
                    text: ruleText,
                    caseYes: ruleCaseYes,
                    caseNo: ruleCaseNo
                })
            })

        }else if(ruleType==="finalizar"){
            
            let result = await fetch("http://localhost:3030/saveNewRule", {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                    "accept": "json"
                },
                body: JSON.stringify({
                    title: ruleTitle,
                    type: ruleType,
                    text: ruleText,
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
                        <Input label="Rule title" placeholder="Inform the rule title" type="text" onChange={(e)=>setRuleTitle(e)} value={ruleTitle} required />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <Input label="Rule type" type="select" onChange={(e)=>setRuleType(e)} value={ruleType} required>
                            <Option value="sim/nao">Resposta sim/não</Option>
                            <Option value='finalizar'>Finalizar</Option>
                        </Input>
                    </Col>
                </Row>
                {
                    renderFields()
                }
                <Row className="d-flex flex-row justify-content-center mt-3">
                    <Button name="Add" variant="outline-danger" width="15%" onClick={()=>{save()}}/>
                </Row>
            </MyContainer>

            <FloatButton variant="outline-danger" onClick={()=>props.toggleDisplay()}>
                <Icon size="25px" icon={faArrowLeft} />
            </FloatButton>
        </>
    )
}

export default FormNewRule