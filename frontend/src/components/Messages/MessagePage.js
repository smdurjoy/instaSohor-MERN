import React from 'react'
import './Messages.css'
import Sidebar from './Sidebar'
import Layout from '../../layouts/fulllayout'
import Chats from './Chats'

function MessagePage() {
    return (
        <Layout title="Messages">
            <div className="messages">
                <Sidebar/>
                <Chats/>
            </div>
        </Layout>
    )
}

export default MessagePage
