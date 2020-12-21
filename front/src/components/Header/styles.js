import styled from 'styled-components'

const Header = styled.div`
    background-color: #d94c4c;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    color: white;
`

const Logo = styled.div`
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 1px;
`

const HeaderIconArea = styled.span`
    margin: 0 10px;
`

export { Header, Logo, HeaderIconArea }