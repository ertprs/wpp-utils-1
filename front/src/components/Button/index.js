import { ButtonComponent } from './styles'

const Button = (props) => {
    return(
        <ButtonComponent variant={props.variant} width={props.width ? props.width : false} onClick={() => props.onClick()} >{props.name}</ButtonComponent>
    )
}   

export default Button