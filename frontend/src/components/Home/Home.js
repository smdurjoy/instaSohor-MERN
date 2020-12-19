import React from 'react'
import Layout from '../../layouts/fulllayout'
import { Redirect } from 'react-router-dom'

function Home() {
    const token = localStorage.getItem('x-auth-token');

    if (!token) {
        return (
            <Redirect to="/signin" />
        )
    }
    return (
        <Layout>
            <div><h4>This is home</h4></div>
        </Layout>
    )
}

export default Home
