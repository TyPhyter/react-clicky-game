import React, { Component } from 'react';
import './PictureCard.css';

export default class PictureCard extends Component {

    handleCardClick = () => {
        this.props.cardClickMethod();
    }

    render() {

        return (
            <div className={ "PictureCard " + this.props.animation }
                onClick={ this.handleCardClick }
                style={{ background : this.props.color }}>
                {/* <img src={ this.props.src } alt=''/> */}
                <h1 className='PictureCard-number'>
                    { this.props.number }
                </h1>
            </div>
        )
      
    }
}