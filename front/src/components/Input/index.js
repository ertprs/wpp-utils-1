import { MyDivInput, MyInput, MyTextarea } from './styles'

import MyLabel from '../Label/index'

const Input = (props) => {
    return (
        <MyDivInput>
            <MyLabel label={props.label} required={props.required} />
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