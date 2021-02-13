import React, { useState, useEffect, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import Messages from './Messages';
import FlipMove from 'react-flip-move';
import UserContext from '../../context/UserContext'
import io from 'socket.io-client'
import url from '../../BackendUrl'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom';
import { Redirect } from 'react-router-dom'
import brandLogo from '../../assets/images/brang-logo.png'

let socket;

function Chats() {
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages ] = useState([])
    const { userData } = useContext(UserContext)

    useEffect(() => {
        const getChats = async () => {
            await axios.get(`${url}/chats/getChats`, {
                headers: {
                    'x-auth-token' : localStorage.getItem('x-auth-token')
                }
            }).then(res => {
                setMessages(res.data)
                console.log(messages)
            })
        }
        getChats()
    }, [])

    const submitMessage = (e) => {
        e.preventDefault()

        const id = userData.user._id
        const name = userData.user.name
        const username = userData.user.username
        const type = "text"

        socket.emit('sendMessage', { id, name, username, message, type })
        setMessage('')
    }

    useEffect(() => {
        socket = io(url)
        socket.on('getMessages', (msg) => {
            setMessages([...messages, msg]);
        })

        return () => {
            socket.on('disconnect');
            socket.off();
        }
    }, [messages])

    const token = localStorage.getItem('x-auth-token');
    if (!token) {
        return (
            <Redirect to="/signin" />
        )
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <div className="d-flex align-items-center">
                    <Avatar alt="Remy Sharp" src={brandLogo}/>    
                    <h5 className="chat__header__title">instaSohor Community</h5>
                </div>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
            <ScrollToBottom className="chat__messages">
                <FlipMove>
                    {
                        messages.map(msg => {
                            return(
                                <Messages 
                                    key={msg._id} 
                                    message={msg.message} 
                                    username={ msg.sender.username } 
                                    createdAt={msg.createdAt} 
                                />
                            )
                        })
                    }
                </FlipMove>
            </ScrollToBottom>
            <div className="chat__input">
                <form className="home__post__comment__form" onSubmit={submitMessage}>
                    <input type="text" className="home__post__comment__input" placeholder="Type Your Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                    <IconButton >
                        <InsertEmoticonIcon />
                    </IconButton>
                    <IconButton type="submit" disabled={!message} variant="contained" color="primary" className="home__post__comment__button">
                        <SendIcon/>
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Chats
