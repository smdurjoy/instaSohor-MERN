import React, { forwardRef, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar';
import UserContext from '../../context/UserContext'
import moment from 'moment'

const Messages = forwardRef(({message, username, createdAt}, ref) => {
    const { userData } = useContext(UserContext)

    return (
        <div ref={ref} className={`chat__message ${userData.user.username === username && "messages_sender"} `}>
            <Avatar className="message_photo"/>
            <p>{message}</p>
            {/* moment().format('lll'); */}
            <small>{ moment(createdAt).calendar() }</small>
        </div>
    )
});

export default Messages
