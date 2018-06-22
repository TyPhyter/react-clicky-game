import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import PictureCard from './components/PictureCard/PictureCard';
import colorsArray from './colorsArray';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            cardsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            clickedCards: [],
            colorsArray: colorsArray,
            score: 0,
            highScore: 0,
            animationState: "shake shake-slow",
            lastClicked: 0,
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
                        },
                            () => {
                                console.log(this.state.highScore);
                            });
                    }
                    console.log(this.state.score);
                });

        } else {
            // alert('You already clicked that!');
            this.setState({
                animationState: "shake shake-opacity shake-constant"
            });

            //stop animation and reset after delay
            setTimeout(() => {
                this.setState({
                    cardsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    clickedCards: [],
                    score: 0,
                    animationState: "shake shake-slow",
                    lastClicked: -1
                });
            }, 1000);
        }
    }

    renderCards() {
        const cardsArray = [...this.state.cardsArray];
        const cards = cardsArray.map((elem, i) => {

            const number = cardsArray[i];

            //if we just clicked this one, remove the shake animation
            //prevents the hover effect from lingering on mobile
            if (number === this.state.lastClicked) {

                return (
                    <PictureCard
                        key={number}
                        number={number}
                        cardClickMethod={() => { this.handleCardClick(cardsArray[i]) }}
                        color={this.state.colorsArray[number - 1]}
                        animation=""
                        alt=""
                    />
                )

            } else {

                return (

                    <PictureCard
                        key={number}
                        number={number}
                        cardClickMethod={() => { this.handleCardClick(cardsArray[i]) }}
                        color={this.state.colorsArray[number - 1]}
                        animation={this.state.animationState}
                        alt=""
                    />
                )
            }
        });
        return cards;
    }




    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Color Clicker</h1>
                    <h2 className="App-score">Score: {this.state.score}</h2>
                    <h2 className="App-highScore">High Score: {this.state.highScore}</h2>
                </header>
                {/* <p className="App-intro">
                </p> */}
                <div className='container'>
                    {
                        this.renderCards()
                    }
                </div>

            </div>
        );
    }
}

export default App;
