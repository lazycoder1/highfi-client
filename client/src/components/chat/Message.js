import React from 'react';
import './message.scss'

export class Message extends React.Component {
    render() {
        return (
            <div className='message-item'>
                <div> <span className="avatar">Saa</span> <b>{this.props.address + 'safsa'}</b></div>
                <span>{this.props.message + 'fsasfaf'}sczvvxzvxz</span>
            </div>
        )
    }
}