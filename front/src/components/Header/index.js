import React from 'react'

import { Header, Logo, HeaderIconArea } from './styles'

import { faBell, faEnvelope, faUsers } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon'

const HeaderComponent = () => {
    return (
        <Header>
            <Logo>WhatsappUtils</Logo>
            <div>
                <HeaderIconArea>
                    <Icon icon={faBell} size='23px' />
                </HeaderIconArea>
                <HeaderIconArea>
                    <Icon icon={faEnvelope} size='23px' />
                </HeaderIconArea>
                <HeaderIconArea>
                    <Icon icon={faUsers} size='23px' />
                </HeaderIconArea>
            </div>
        </Header>
    )
}

export default HeaderComponent