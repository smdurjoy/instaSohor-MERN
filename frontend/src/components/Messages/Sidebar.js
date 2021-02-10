import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { IconButton } from '@material-ui/core';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className="sidebar__avatar"/>    
                <div className="sidebar__header__search">
                    <SearchOutlinedIcon className="sidebar__header__search__icon"/>
                    <input/>
                </div>
                <IconButton >
                    <RateReviewIcon/>
                </IconButton>
            </div>
            <div className="sidebar__chats">
                <div className="sidebar__chat">
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className="sidebar__avatar"/>    
                    <div className="sidebar__chats__info">
                        <h5>DurJoy RudDro</h5>
                        <span>Last message</span>
                        <small>Timestamp</small>
                    </div>
                </div>
                <div className="sidebar__chat">
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className="sidebar__avatar"/>    
                    <div className="sidebar__chats__info">
                        <h5 className="sidebar__chats__name">DurJoy RudDro</h5>
                        <span className="sidebar__chats__lastMsg">Last message</span>
                        <small>Timestamp</small>
                    </div>
                </div>
                <div className="sidebar__chat">
                    <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className="sidebar__avatar"/>    
                    <div className="sidebar__chats__info">
                        <h5 className="sidebar__chats__name">DurJoy RudDro</h5>
                        <span className="sidebar__chats__lastMsg">Last message</span>
                        <small>Timestamp</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
