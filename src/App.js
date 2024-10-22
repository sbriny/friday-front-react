/**
 * App.js
 */
import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import styled from '@emotion/styled';

import ThemeProvider from './components/ThemeProvider';
import SideMenu from './components/SideMenu3';
import {ResultProvider} from './components/Context';

const AppContainer = styled.div`
  display: flex;

  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;


function App() {
    
    return (
      <ResultProvider>
        <ThemeProvider>
            <Router>
                    <SideMenu/>
            </Router>
        </ThemeProvider>
      </ResultProvider>
    );
  };


export default App;
