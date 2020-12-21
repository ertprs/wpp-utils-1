import React from 'react'

import { Aside, DashBoardMenu, DashBoardItem, ContentItem, DashBoardUser, DashBoardSection } from './styles'

import { faHome, faWrench, faTasks, faRobot } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon/index'
import { useLocation } from 'react-router-dom'


const AsideComponent = () => {
    let location = useLocation()

    return (
        <Aside>
            <DashBoardUser>
                Pedro Henrique da Silva Lima
            </DashBoardUser>

            <DashBoardMenu>
                <DashBoardSection>
                    DASHBOARDS
                </DashBoardSection>

                <DashBoardItem>
                    <ContentItem to="/" selected={ (location.pathname === "/") ? true : false }>
                        <Icon icon={faHome} size="17px" /> Home
                    </ContentItem>
                </DashBoardItem>

                <DashBoardItem>
                    <ContentItem to="/to-do" selected={ (location.pathname === "/to-do") ? true : false }>
                        <Icon icon={faTasks} size="17px" />To-do
                    </ContentItem>
                </DashBoardItem>

                <DashBoardItem>
                    <ContentItem to="chatBoot" selected={ (location.pathname === "/chatBoot") ? true : false }>
                        <Icon icon={faRobot} size="17px" />Chat Boot
                    </ContentItem>
                </DashBoardItem>

                <DashBoardItem>
                    <ContentItem to="settings" selected={ (location.pathname === "/settings") ? true : false }>
                        <Icon icon={faWrench} size="17px" />Settings
                    </ContentItem>
                </DashBoardItem>
            </DashBoardMenu>
        </Aside>
    )
}

export default AsideComponent