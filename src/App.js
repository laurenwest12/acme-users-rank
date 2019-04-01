import React, { Component} from 'react'
import {HashRouter, Route} from 'react-router-dom'

import Users from './components/Users'
import CreateUserForm from './components/CreateUserForm'
import TopRanked from './components/TopRanked'
import Nav from './components/Nav'

export default class App extends Component {
    render () {
        return (
        <HashRouter>
        <div>
            <h1>Acme Users With Ranks</h1>
                <Route render = {({location, history}) => <Nav history = { history } location = { location }/>}/>
                <Route exact path = '/users' component = {Users}/>
                <Route exact path = '/users/create' render = {({history}) => <CreateUserForm history = {history}/>}/>
                {/* <Route exact path = '/users/create' component= {CreateUserForm}/> */}
                <Route eact path = '/users/topranked' component = {TopRanked}/>
        </div>
        </HashRouter>
        )

    }
}