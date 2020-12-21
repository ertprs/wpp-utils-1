import styled from 'styled-components'
import { Button } from 'react-bootstrap'
 
const ButtonComponent = styled(Button)`
    width: ${props => props.width ? props.width : "auto" };
`

export { ButtonComponent }