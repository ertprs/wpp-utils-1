import { MyDivInput, MyInput, MyTextarea, MyLabel, Span } from './styles'

const Input = (props) => {
    return (
        <MyDivInput>
            <MyLabel>{props.label}{props.required ? <Span className="text-danger ml-1 ">*</Span> : ""}</MyLabel>
            { 
                props.textarea ? 
                <MyTextarea 
                    placeholder={props.placeholder} 
                    height={props.height ? props.height : false} 
                    onChange={(e) => props.onChange(e.target.value)} 
                    value={props.value}
                /> : 
                <MyInput 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    onChange={(e) => props.onChange(e.target.value)} 
                    value={props.value}
                />
            }
        </MyDivInput>
    )
}

export default Input