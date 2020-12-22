import { MyLabel, Span} from './styles'

const Label = (props) => {
    return (
        <MyLabel>{props.label}{props.required ? <Span className="text-danger ml-1 ">*</Span> : ""}</MyLabel>
    )
}

export default Label