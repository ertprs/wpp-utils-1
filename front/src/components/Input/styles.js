import styled from 'styled-components'

const MyDivInput = styled.div`
    display: flex;
    flex-direction: column;
`

const MyInput = styled.input`
    border-radius: 4px;
    background-color: transparent;
    padding: 4px 6px;
    border: solid 1.5px #141414;
    color: #b5b5b5;
    
    &::placeholder{
        color: #b5b5b5;
        font-weight: 600;
        font-size: 14px;
    }
`

const MyTextarea = styled.textarea`
    border-radius: 4px;
    background-color: transparent;
    padding: 4px 6px;
    border: solid 1.5px #141414;
    color: #b5b5b5;
    height: ${props => props.height ? props.height : "auto" };

    &::-webkit-scrollbar{
        width: 7px;
        background-color: transparent;
    }

    &::-webkit-resizer, &::-webkit-scrollbar-corner{
        display: none;
    }

    &::-webkit-scrollbar-thumb{
        border-radius: 8px;
        background-color: #b5b5b5;
    }
    
    &::placeholder{
        color: #b5b5b5;
        font-weight: 600;
        font-size: 14px;
    }
`

const MyLabel = styled.label`
    color: #b5b5b5;
    font-weight: 600;
    font-size: 16px;
    height: 20px;
`

const Span = styled.span`
    font-size: 18px;
`

export {MyDivInput, MyInput, MyTextarea, MyLabel, Span}