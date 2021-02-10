import React, { forwardRef } from 'react'
import Avatar from '@material-ui/core/Avatar';

const Messages = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <div className="chat__message">
                <Avatar className="message_photo"/>
                <p>Whats up bro ?</p>
                <small>10-02-21 at 7.48 pm</small>
            </div>
            <div className="chat__message messages_sender">
                <Avatar className="message_photo"/>
                <p>Great! What about you ?</p>
                <small>10-02-21 at 7.50 pm</small>
            </div>
        </div>
    )
});

export default Messages
