import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Aside = styled.div`
    width: 220px;
    background-color: #404040;
    color: #b5b5b5;
`

const DashBoardMenu = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0px;
    border-top: solid 1px #706f6f; 
`

const DashBoardItem = styled.div`
    color: #b5b5b5;
    padding: 0px 20px 0px 0px;
`

const ContentItem = styled(Link)`
    color: ${props => props.selected ? "white" : "#b5b5b5"};
    background: ${props => props.selected ? "#d94c4c" : "transparent"};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 0px 5px 25px;
    font-weight: 600;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    cursor: pointer;

    &:hover{
        text-decoration: none;
        color: white;
        background: ${props => props.selected ? "#d94c4c" : "rgb(200, 200, 200, 0.1)"};
    }
`

const DashBoardUser = styled.div`
    padding: 15px;
    font-size: 16px;
    font-weight: 700;
    height: 79px
`

const DashBoardSection = styled.div`
    font-size: 15px;
    padding: 10px 0px 10px 6px;
    font-weight: 600;
`

export { Aside, DashBoardMenu, DashBoardItem, ContentItem, DashBoardUser, DashBoardSection }