import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import './styles.scss'

import App from './components/App'

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("app"))
