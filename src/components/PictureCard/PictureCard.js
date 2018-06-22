import React, { Component } from 'react';
import './PictureCard.css';

export default class PictureCard extends Component {

    handleCardClick = () => {
        this.props.cardClickMethod();
    }

    render() {
        
        const number = this.props.difficulty === "easy" ? this.props.number : '';
        const color = (this.props.difficulty === "normal" || this.props.difficulty  === "easy") ? this.props.color : 'white';

        return (
            <div className={ "PictureCard " + this.props.animation }
                onClick={ this.handleCardClick }
                style={{ background : color }}>
                <h1 className='PictureCard-number'>
                    { number }
                </h1>
            </div>
        )
      
    }
}