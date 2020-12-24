import React from 'react'

import { Page, MainContainer } from './styles/styles'
import GlobalStyle from './styles/GlobalStyles'

import Header from './components/Header/index'
import Aside from './components/Aside/index'
import Routes from './routes/index'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Page>
      <BrowserRouter>
        <GlobalStyle />
        <Aside />
        <MainContainer>
          <Header />
          <Routes />
        </MainContainer>
      </BrowserRouter>
    </Page>
  );
}

export default App;

