import React from 'react';
import { Session } from 'meteor/session'
import Menu from './Menu.jsx';
import Phrase from './Phrase.jsx';
import { StyledApp } from './styles'


const App = () => (
  <StyledApp>
    <Menu />
    <Phrase />
  </StyledApp>
);

export default App;
