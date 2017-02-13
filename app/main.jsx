'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider, connect } from 'react-redux'
import {Route, Router, browserHistory, IndexRoute, IndexRedirect} from 'react-router';

import store from './store'

render (
	<Provider store={store}>
		<Router history={browserHistory}>
 		</Router>
 	</Provider>,
	document.getElementById('main')
)
