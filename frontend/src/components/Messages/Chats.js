import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from '@material-ui/icons/Send';
import Messages from './Messages';
import FlipMove from 'react-flip-move';

function Chats() {
    return (
        <div className="chat">
            <div className="chat__header">
                <div className="d-flex align-items-center">
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random"/>    
                    <h5 className="chat__header__title">DurJoy RudDro</h5>
                </div>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
            <div className="chat__messages">
                <FlipMove>
                    <Messages key="1"/>
                </FlipMove>
            </div>
            <div className="chat__input">
                <form className="home__post__comment__form">
                    <input type="text" className="home__post__comment__input" placeholder="Type Your Message"/>
                    <IconButton >
                        <InsertEmoticonIcon />
                    </IconButton>
                    <IconButton type="submit" variant="contained" color="primary" className="home__post__comment__button">
                        <SendIcon/>
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Chats
