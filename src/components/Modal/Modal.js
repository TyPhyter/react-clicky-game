import React, { Component } from 'react';
import './Modal.css';
import Slider from '../Slider/Slider';

export default class Modal extends Component {


    render() {
        
        const display = this.props.display;

        return (
            <div className="Modal" style={ { display:  display } }>
                <h1 className="Modal-title">Settings</h1>
                <section className="Modal-section">
                    <h1 className="Modal-sectionTitle">Difficulty</h1>
                    <Slider handleDifficultyChange={this.props.handleDifficultyChange}/>
                    <div className="Modal-difficultyLabelContainer">
                        <span className="Modal-difficultyLabel">Easy</span>
                        <span className="Modal-difficultyLabel">Normal</span>
                        <span className="Modal-difficultyLabel">Hard</span>
                    </div>
                </section>
                
            </div>
        )
    }
}