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
      isNextDisabled: false,
      renderChoice: false,
    };
  }

  shuffleCards = () => {
    const { cards } = this.props;
    const numberShuffle = 0.5;
    const shuffledCards = cards.sort(() => Math.random() - numberShuffle);
    this.setState({ gameCards: shuffledCards }, () => this.cardPosition(0));
  }

  cardPosition = (position) => {
    const { gameCards } = this.state;
    const newPlayCard = gameCards[position];
    this.setState({ playCard: newPlayCard, gameCardPosition: position });
  }

  handlePlay = () => {
    this.shuffleCards();
    this.setState({ playStatus: false });
  }

  handleNext = () => {
    const { gameCardPosition, isNextDisabled } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition);
    if (!isNextDisabled) this.setState({ isNextDisabled: true });
    this.setState({ renderChoice: true });
  }

  render() {
    const { playCard, playStatus, isNextDisabled, renderChoice } = this.state;
    return (
      <>
        {playStatus && (
          <button type="button" onClick={ () => this.handlePlay() }>Jogar</button>)}
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
          {playCard.cardName && (
            <button
              type="button"
              onClick={ () => this.handleNext() }
              disabled={ isNextDisabled }
            >
              Próxima Carta
            </button>
          )}
          <span>
            { renderChoice && (
              <>
                <button
                  type="button"
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
                    />
                    Presença
                  </label>
                  <label htmlFor="attr2">
                    <input
                      type="radio"
                      name="attr"
                      id="attr2"
                      value="attr2"
                    />
                    Aprendizado
                  </label>
                  <label htmlFor="attr3">
                    <input
                      type="radio"
                      name="attr"
                      id="attr3"
                      value="attr3"
                    />
                    Popularidade
                  </label>
                </div>
              </>

            ) }

          </span>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Game;
