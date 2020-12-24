import { MyDivInput, MyInput, MyTextarea, MySelect } from './styles'

import MyLabel from '../Label/index'
import { Children } from 'react'

const Input = (props) => {

    const RenderInput = () => {
        if(props.type==="text" || props.type==="number"){ 
            return(
                <MyInput 
                    type={props.type} 
                    placeholder={props.placeholder} 
                    onChange={(e) => props.onChange(e.target.value)} 
                    value={props.value}
                />
            )
        }else if(props.type==="textarea"){
            return( 
                <MyTextarea 
                    placeholder={props.placeholder} 
                    height={props.height ? props.height : false} 
                    onChange={(e) => props.onChange(e.target.value)} 
                    value={props.value}
                />
            )
        }else if(props.type==="select"){
            return (
                <MySelect onChange={(e)=>props.onChange(e.target.value)} value={props.value}>
                    {props.children}
                </MySelect>
            )
        }
    }

    return (
        <MyDivInput>
            <MyLabel label={props.label} required={props.required} />
            {
                RenderInput()
            }
        </MyDivInput>
    )
}

export default Input