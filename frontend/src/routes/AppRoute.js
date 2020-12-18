import React from 'react'
import Home from '../components/Home/Home'
import Profile from '../components/Profile/Profile'
import { Route, Switch } from 'react-router-dom'

function AppRoute() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/profile" component={Profile}/>
            </Switch>
        </>
    )
}

export default AppRoute
