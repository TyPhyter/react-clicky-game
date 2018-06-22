import React, { Component } from 'react';
import './Slider.css';

export default class Slider extends Component {

    state = {
        value: 1
    }

    handleDifficultyChange = (event) => {
        this.setState({value: event.target.value},
            () => {
                this.props.handleDifficultyChange(this.state.value);
            });
    }

    render() {
        return (
            <div className="Slider">
                <input type="range" value={this.state.value} min="0" max="2" step="1" list="snapValues" 
                    onChange={(evt) => { this.handleDifficultyChange(evt) }} />

                <datalist id="snapValues">
                    <option value="0">Easy</option>
                    <option value="1">Normal</option>
                    <option value="2">Hard</option>
                </datalist>
            </div>
        )
    }
}