import styled from 'styled-components'

import { Button, Container } from 'react-bootstrap'

const MyContainer = styled(Container)`
    height: 100%;
`

const DivOptions = styled.div`
    display:flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: transparent;
    border: solid 1.5px #141414;
`

const UlOptions = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 0;
`

const LiOptions = styled.li`
    background-color: lightgray;
    border-radius: 2px;
    margin: 2px;
    height: 30px;
    padding-right: 5px;
    background-color: transparent;
    border: solid 1px gray;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ButtonLiOptions = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-weight: bold;
    font-size: 17px;
    width: 25px;
    height: 100%;
    padding-left: 5px;
    padding-right: 5px;
    margin-right: 5px;
    color: white;
    
    &:focus{
        outline:0;
    }
    &:hover{
        background-color: rgba(0, 0, 0, 0.5);
    }
`

const InputOptions = styled.input`
    border: none;
    padding: 5px;
    background-color: transparent;
    color: #b5b5b5;

    &::placeholder{
        color: #b5b5b5;
        font-weight: 600;
        font-size: 14px;
    }
`

const SelectOptions = styled.select`
    display: none;
`

const SpanOptions = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-top: solid 1px #141414;
`

const SpanSugestionOptions = styled.span`
    display: block;
    width: 100%;
    cursor: pointer;
    color: #b5b5b5;
    padding-left: 5px;

    &:hover{
        background-color: rgb(200, 200, 200, 0.2)
    }
`

const FloatButton = styled(Button)`
    position: fixed;
    bottom: 3%;
    right: 2%;
    border-radius: 50%;
    font-size: 35px;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
`

export { DivOptions, UlOptions, LiOptions, ButtonLiOptions, InputOptions, SelectOptions, SpanOptions, SpanSugestionOptions , FloatButton, MyContainer}