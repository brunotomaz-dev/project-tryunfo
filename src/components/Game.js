import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';
import GameChoices from './GameChoices';
import Score from './Score';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      gameCards: [],
      gameCardPosition: 0,
      playCard: {},
      renderPlayButton: true,
      isNextDisabled: true,
      renderChoice: false,
      attr: '',
      renderCpuCardAndResult: false,
      isButtonAtributeDisabled: true,
      cpuCard: {},
      gamePoints: { player: 0, cpu: 0, status: '' },
      endGame: false,
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
      this.setState(
        { cpuCard: newPlayCard, gameCardPosition: position }, () => this.handleResult(),
      );
    }
  }

  handlePlay = () => {
    const { displaySaved } = this.props;
    displaySaved(false);
    this.shuffleCards();
    this.setState({ renderPlayButton: false, renderChoice: true });
  }

  handleNext = () => {
    const { gameCardPosition, isNextDisabled, gameCards } = this.state;
    if (gameCardPosition + 2 < gameCards.length - 1) {
      const newCardPosition = gameCardPosition + 1;
      this.cardPosition(newCardPosition, 'player');
      if (!isNextDisabled) this.setState({ isNextDisabled: true });
      this.setRenderState(true);
    } else {
      this.setEndGame();
      this.setState({
        isNextDisabled: true,
        renderChoice: false,
        renderCpuCardAndResult: false,
        playCard: {},
      });
    }
  }

  handleChoice = ({ target }) => {
    const { value } = target;
    this.setState({ attr: value, isButtonAtributeDisabled: false });
  }

  handleButtonChoice = () => {
    const { gameCardPosition } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition, 'cpu');
    this.setState({ isButtonAtributeDisabled: true });
  }

  setRenderState = (bool) => {
    this.setState({
      renderChoice: bool, renderCpuCardAndResult: !bool, isNextDisabled: bool,
    });
  }

  handleResult = () => {
    const { attr, playCard, cpuCard, gamePoints } = this.state;
    const attrValue = attr;
    const playerAttr = playCard[attrValue];
    const cpuAttr = cpuCard[attrValue];
    let attrName = '';
    if (attr === 'cardAttr1') {
      attrName = 'Presença';
    } else if (attr === 'cardAttr2') {
      attrName = 'Aprendizado';
    } else {
      attrName = 'Popularidade';
    }
    const atributePhrase = `${attrName}: ${playerAttr} vs ${cpuAttr}`;
    if (playerAttr > cpuAttr) {
      this.setState(
        { gamePoints: {
          player: gamePoints.player + 1,
          cpu: gamePoints.cpu,
          status: 'Você ganhou!',
          attr: atributePhrase,
        } }, () => this.setRenderState(false),
      );
    }
    if (playerAttr < cpuAttr) {
      this.setState(
        { gamePoints: {
          player: gamePoints.player,
          cpu: gamePoints.cpu + 1,
          status: 'Você perdeu!',
          attr: atributePhrase,
        } }, () => this.setRenderState(false),
      );
    }
    if (playerAttr === cpuAttr) {
      this.setState(
        { gamePoints: {
          player: gamePoints.player,
          cpu: gamePoints.cpu,
          status: 'Empate',
          attr: atributePhrase,
        } }, () => this.setRenderState(false),
      );
    }
  }

  setEndGame = () => {
    const { endGame } = this.state;
    return endGame ? this.setState({ endGame: false }) : this.setState({ endGame: true });
  }

  enablePlayButton = () => {
    this.setState({
      renderPlayButton: true,
      endGame: false,
      gamePoints: { player: 0, cpu: 0, status: '' },
    });
  }

  render() {
    const {
      playCard,
      cpuCard,
      renderPlayButton,
      isNextDisabled,
      renderChoice,
      renderCpuCardAndResult,
      isButtonAtributeDisabled,
      gamePoints,
      endGame,
    } = this.state;
    const { displaySaved } = this.props;

    return (
      <>
        {renderPlayButton && (
          <button type="button" onClick={ () => this.handlePlay() }>Jogar</button>)}
        <div className="center_alt">
          <div className="container full-width">
            {playCard && (
              <div className="container_cards">
                <Card
                  objCard={ playCard }
                  cardStatus="play"
                />
              </div>
            )}
            {renderCpuCardAndResult && (
              <>
                <h2>VS</h2>
                <div className="container_cards">
                  <Card
                    objCard={ cpuCard }
                    cardStatus="play"
                  />
                </div>
              </>
            )}
            {(renderCpuCardAndResult || endGame) && (
              <Score
                gamePoints={ gamePoints }
                endGame={ endGame }
                setEndGame={ this.setEndGame }
                inicialPage={ displaySaved }
                enablePlayButton={ this.enablePlayButton }
              />
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
            <GameChoices
              isButtonAtributeDisabled={ isButtonAtributeDisabled }
              handleButtonChoice={ this.handleButtonChoice }
              handleChoice={ this.handleChoice }
            />
          ) }
        </div>
      </>
    );
  }
}

Game.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  displaySaved: PropTypes.func.isRequired,
};

export default Game;
