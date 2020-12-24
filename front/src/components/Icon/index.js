import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const IconCss = styled.span`
    font-size: ${props => props.size};
`

const Icon = (props) => {
    return (
        <IconCss size={props.size}>
            <FontAwesomeIcon icon={props.icon} />
        </IconCss>
    )
}

export default Icon