import styled from 'styled-components'
import { Container, Button } from 'react-bootstrap'

const MyContainer = styled(Container)`
    height: 100%;
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

const Option = styled.option`
    background: #363636;
    color: white;
`

export { MyContainer, FloatButton, Option }