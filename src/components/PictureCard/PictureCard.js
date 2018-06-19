import React, { Component } from 'react';
import './PictureCard.css';

export default class PictureCard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    shuffle = () => {
        this.props.shuffleMethod();
    }

    render() {
        return (
            <div className='PictureCard' onClick={this.shuffle}>
                {/* <img src={ this.props.src } alt=''/> */}
                <div className='PictureCard-number'>
                    { this.props.number }
                </div>
            </div>
        )
    }
}