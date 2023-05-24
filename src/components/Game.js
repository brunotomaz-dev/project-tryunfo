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
      playStatus: true,
      isNextDisabled: true,
      renderChoice: false,
      attr: '',
      isButtonResultDisabled: true,
      cpuCard: {},
    };
  }

  shuffleCards = () => {
    const { cards } = this.props;
    const numberShuffle = 0.5;
    const shuffledCards = cards.sort(() => Math.random() - numberShuffle);
    this.setState({ gameCards: shuffledCards }, () => this.cardPosition(0, 'player'));
  }

  cardPosition = (position, player) => {
    const { gameCards } = this.state;
    const newPlayCard = gameCards[position];
    if (player === 'player') {
      this.setState({ playCard: newPlayCard, gameCardPosition: position });
    } else {
      this.setState({ cpuCard: newPlayCard, gameCardPosition: position });
    }
  }

  handlePlay = () => {
    this.shuffleCards();
    this.setState({ playStatus: false, renderChoice: true });
  }

  handleNext = () => {
    const { gameCardPosition, isNextDisabled } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition, 'player');
    if (!isNextDisabled) this.setState({ isNextDisabled: true });
    this.setState({ renderChoice: true });
  }

  handleChoice = ({ target }) => {
    const { value } = target;
    this.setState({ attr: value });
  }

  handleButtonChoice = () => {
    const { gameCardPosition } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition, 'cpu');
    this.setState({ renderChoice: false, isButtonResultDisabled: false });
  }

  handleResult = () => {
    const { attr, playCard, cpuCard } = this.state;
    const attrValue = attr;
    const playerAttr = playCard[attrValue];
    const cpuAttr = cpuCard[attrValue];
    if (playerAttr > cpuAttr) {
      console.log('Você ganhou!');
    }
    if (playerAttr < cpuAttr) {
      console.log('Você perdeu!');
    }
    if (playerAttr === cpuAttr) {
      console.log('Empate!');
    }
  }

  render() {
    const {
      playCard,
      cpuCard,
      playStatus,
      isNextDisabled,
      renderChoice,
      isButtonResultDisabled,
    } = this.state;

    return (
      <>
        {playStatus && (
          <button type="button" onClick={ () => this.handlePlay() }>Jogar</button>)}
        <div>
          <div className="container full-width">
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
            {!isButtonResultDisabled && <h2>VS</h2>}
            { !isButtonResultDisabled && (
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
          { renderChoice && (
            <>
              <button
                type="button"
                onClick={ () => this.handleButtonChoice() }
              >
                Escolher Atributo
              </button>
              <div>
                <label htmlFor="attr1">
                  <input
                    type="radio"
                    name="attr"
                    id="attr1"
                    value="attr1"
                    onChange={ this.handleChoice }
                  />
                  Presença
                </label>
                <label htmlFor="attr2">
                  <input
                    type="radio"
                    name="attr"
                    id="attr2"
                    value="attr2"
                    onChange={ this.handleChoice }
                  />
                  Aprendizado
                </label>
                <label htmlFor="attr3">
                  <input
                    type="radio"
                    name="attr"
                    id="attr3"
                    value="attr3"
                    onChange={ this.handleChoice }
                  />
                  Popularidade
                </label>
              </div>
            </>

          ) }
        </div>
      </>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Game;
