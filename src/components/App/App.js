import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PictureCard from '../PictureCard/PictureCard';
import Modal from '../Modal/Modal';
import colorsArray from '../../colorsArray';
import settingsButton from '../../settings.png'

export default class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            cardsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            clickedCards: [],
            colorsArray: colorsArray,
            score: 0,
            highScore: 0,
            animationState: 'shake shake-slow',
            lastClicked: 0,
            difficulty: 'normal',
            modalDisplay: 'none',
        }
        // bindings
        // not sure if I like this or the alternatives better
        this.shuffle = this.shuffle.bind(this);
        this.renderCards = this.renderCards.bind(this);
        // this.handleCardClick = this.handleCardClick.bind(this);
    }

    /*
    * Fischer-Yates shuffle algo
    * @param {Array} a items An array containing the items.
    */
    shuffle() {

        const a = [...this.state.cardsArray];

        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }

        //trigger a rerender of the component by updating state
        this.setState({ cardsArray: [...a] });
    }

    /**
    * We're gonna pass this down as a prop to the PictureCard component
    * so we have access to the card array in our App state
    */
    handleCardClick(clickedNumber) {


        if (!this.state.clickedCards.includes(clickedNumber)) {

            this.shuffle();

            this.setState({
                clickedCards: [...this.state.clickedCards, clickedNumber],
                score: this.state.score + 1,
                lastClicked: clickedNumber
            },
                //callback for setState, 
                //should probably use a lifecycle event instead apparently
                () => {
                    if (this.state.score > this.state.highScore) {
                        this.setState({
                            highScore: this.state.score
                        });
                    }
                });

        } else {
            // alert('You already clicked that!');
            this.setState({
                animationState: 'shake shake-opacity shake-constant',
                lastClicked: -1
            });

            //stop animation and reset after delay
            setTimeout(() => {
                this.setState({
                    cardsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    clickedCards: [],
                    score: 0,
                    animationState: 'shake shake-slow',
                });
            }, 1000);
        }
    }

    renderCards() {

        const cardsArray = [...this.state.cardsArray];
        let animation;
        const cards = cardsArray.map((elem, i) => {

            const number = cardsArray[i];

            //if we just clicked this one, remove the shake animation
            //prevents the hover effect from lingering on mobile
            if (number === this.state.lastClicked) {
                animation = "";
            } else {
                animation = this.state.animationState;
            }

            return (
                <PictureCard
                    key={number}
                    number={number}
                    cardClickMethod={() => { this.handleCardClick(cardsArray[i]) }}
                    color={this.state.colorsArray[number - 1]}
                    animation={animation}
                    alt=""
                    difficulty={this.state.difficulty}
                />
            )
        });
        return cards;
    }

    toggleModal = () => {
        const display = this.state.modalDisplay === "none" ? "block" : "none";
        this.setState({
            modalDisplay: display
        });
    }

    handleDifficultyChange = (value) => {
        let difficulty;
        if (value === '0') {
            difficulty = 'easy'
        } else if (value === '1') {
            difficulty = 'normal'
        } else {
            difficulty = 'hard'
        }

        console.log(value, difficulty);
        this.setState({
            difficulty: difficulty
        });
    }

    render() {
        return (
            <main className="App">

                <header className="App-header">

                    <h1 className="App-title">Color Clicker</h1>

                    <div className="App-scoreContainer">
                        <h2 className="App-score">Score: {this.state.score}</h2>
                        <h2 className="App-highScore">High Score: {this.state.highScore}</h2>
                    </div>
                
                    <img className="App-settingsButton" src={ settingsButton } onClick={ this.toggleModal } alt=""/>
                
                </header>

                <section className='container'>
                    {
                        this.renderCards()
                    }
                </section>

                <Modal display={this.state.modalDisplay} 
                    handleDifficultyChange={this.handleDifficultyChange}
                    toggleModal={this.toggleModal}/>

            </main>
        );
    }
}