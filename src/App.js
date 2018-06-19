import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PictureCard from './components/PictureCard/PictureCard';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cardsArray : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }

        this.shuffle = this.shuffle.bind(this);
        this.renderCards = this.renderCards.bind(this);
    }

    /*
    * Fischer-Yates shuffle algo
    * @param {Array} a items An array containing the items.
    * We're gonna pass this down as a prop to the PictureCard component
    * so we have access to the card array in our App state
    * Could maybe use Redux to help with this complexity?
    */
    shuffle(){
        console.log('click');
        const a = [...this.state.cardsArray];
        console.log(a);
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        console.log(a);
        //trigger a rerender of the component by updating state
        this.setState({ cardsArray : [...a] });
    }

    renderCards() {
        const cardsArray = [...this.state.cardsArray];
        console.log('renderCards');
        const cards = cardsArray.map((elem, i) => {
            return (
                <PictureCard key={cardsArray[i]} number={cardsArray[i]} 
                    shuffleMethod={this.shuffle} 
                    src="https://placehold.it/100x100" alt="" />
            )
        });
        return cards;
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
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
