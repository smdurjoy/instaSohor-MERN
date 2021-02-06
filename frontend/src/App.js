import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import CheckSignin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import UserContext from './context/UserContext'
import Axios from 'axios'
import url from './BackendUrl'
import UserProfile from './components/Profile/UserProfile'
import { PostProvider } from './context/PostContext'

function App() {
    const [ userData, setUserData ] = useState({
        token: '',
        user: {name: 'loading..'}
    })

    useEffect(() => {
        const checkLoogedIn = async () => {
            let token = localStorage.getItem('x-auth-token');
            if(token === null) {
                localStorage.setItem('x-auth-token', '')
                token = ''
            }

            const tokenRes = await Axios.post(`${url}/users/isTokenValid`, null, {
                headers: { 'x-auth-token': token }
            })

            if(tokenRes.data) {
                const userRes = await Axios.get(`${url}/users/`, {
                    headers: { 'x-auth-token': token }
                })
                
                setUserData({
                    token,
                    user: userRes.data
                })
            }
        }

        checkLoogedIn()
    }, [])

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userData, setUserData }}>
                <PostProvider>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/profile/:username" component={UserProfile}/>  
                        <Route path="/signin" component={CheckSignin}/>
                        <Route path="/signup" component={Signup}/>
                    </Switch>
                </PostProvider>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App
