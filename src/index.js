import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {render} from 'react-dom';
import App from './App';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './react-alert-template-basic'

// optional cofiguration
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 3000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.FADE
  }
  
const Root = () => (
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>
)

render(<Root />, document.getElementById('root'));

