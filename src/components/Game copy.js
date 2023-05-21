import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      gameCards: [],
      gameCardPosition: 0,
      playCard: {},
      cpuCard: {},
      playStatus: false,
      isNextDisabled: false,
    };
  }

  shuffleCards = () => {
    const { cards } = this.props;
    const numberShuffle = 0.5;
    const shuffledCards = cards.sort(() => Math.random() - numberShuffle);
    this.setState({ gameCards: shuffledCards }, () => this.cardPosition(0));
  }

  cardPosition = (position, firstPosition) => {
    const { gameCards } = this.state;
    const newPlayCard = gameCards[position];
    if (firstPosition) {
      this.setState({ playCard: newPlayCard, gameCardPosition: position });
    } else {
      this.setState({ cpuCard: newPlayCard, gameCardPosition: position });
    }
  }

  handlePlay = () => {
    this.shuffleCards();
    this.setState({ playStatus: true });
  }

  handleNext = () => {
    const { gameCardPosition, isNextDisabled } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition, isNextDisabled);
    const isDisabled = (bool) => this.setState({ isNextDisabled: bool });
    return isNextDisabled ? isDisabled(false) : isDisabled(true);
  }

  handleAttr = (attr) => {
    const winner = this.verifyWinner(attr);
    console.log(winner);
    // alert(winner);
    this.setState({ isNextDisabled: false });
  }

  verifyWinner = (attr) => {
    const { playCard, cpuCard } = this.state;
    const player = playCard[attr];
    const cpu = cpuCard[attr];
    if (player > cpu) {
      return `Você ganhou a rodada com ${attr} ${player} vs ${cpu}`;
    } if (player < cpu) {
      return `Você perdeu a rodada com ${attr} ${player} vs ${cpu}`;
    }
    return `Empate com ${attr} ${player} vs ${cpu}`;
  }

  render() {
    const { playCard, playStatus, isNextDisabled } = this.state;
    return (
      <>
        {!playStatus && (
          <button type="button" onClick={ () => this.handlePlay() }>Jogar</button>)}
        <div>
          <div>
            {playCard && (
              <div className="container_cards">
                <Card
                  cardName={ playCard.cardName }
                  cardDescription={ playCard.cardDescription }
                  cardAttr1={ playCard.cardAttr1 }
                  cardAttr2={ playCard.cardAttr2 }
                  cardAttr3={ playCard.cardAttr3 }
                  cardImage={ playCard.cardImage }
                  cardRare={ playCard.cardRare }
                  cardTrunfo={ playCard.cardTrunfo }
                  cardStatus="play"
                />
              </div>
            )}
            {cpuCard && (
              <div className="container_cards">
                <Card
                  cardName={ cpuCard.cardName }
                  cardDescription={ cpuCard.cardDescription }
                  cardAttr1={ cpuCard.cardAttr1 }
                  cardAttr2={ cpuCard.cardAttr2 }
                  cardAttr3={ cpuCard.cardAttr3 }
                  cardImage={ cpuCard.cardImage }
                  cardRare={ cpuCard.cardRare }
                  cardTrunfo={ cpuCard.cardTrunfo }
                  cardStatus="play"
                />
              </div>
            )}
          </div>
          {playCard.cardName && (
            <button
              type="button"
              onClick={ () => this.handleNext() }
              disabled={ isNextDisabled }
            >
              Próxima Carta
            </button>
          )}
          { isNextDisabled && (
            <button
              type="button"
              onClick={ () => this.handleAttr('cardAtrr1') }
            >
              Presença
            </button>)}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Game;
