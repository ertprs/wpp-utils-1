import styled from 'styled-components'

const Page = styled.div`
    width: 100%;
    min-height: 100vh; 
    display: flex;
    flex-direction: row;
`

const MainContainer = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #363636;
`

export { Page, MainContainer }