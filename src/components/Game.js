import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';
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
    const { gameCardPosition, isNextDisabled } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition, 'player');
    if (!isNextDisabled) this.setState({ isNextDisabled: true });
    this.setRenderState(true);
  }

  handleChoice = ({ target }) => {
    const { value } = target;
    this.setState({ attr: value, isButtonAtributeDisabled: false });
  }

  handleButtonChoice = () => {
    const { gameCardPosition } = this.state;
    const newCardPosition = gameCardPosition + 1;
    this.cardPosition(newCardPosition, 'cpu');
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
      attrName = 'PRESENÇA';
    } else if (attr === 'cardAttr2') {
      attrName = 'APRENDIZADO';
    } else {
      attrName = 'POPULARIDADE';
    }
    const atributePhrase = `Atributo ${attrName}: ${playerAttr} vs ${cpuAttr}`;
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

  // criar lógica para quando o jogo acabar, mostrar o resultado final
  // criar lógica para quando o jogo acabar, mostrar o botão de jogar novamente
  // criar lógica para travar botão de jogar caso não ha carta suficiente
  // criar logica para encerrar o jogo quando não houver mais cartas
  // criar botão para encerrar o jogo - pode ficar no score

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
    } = this.state;

    return (
      <>
        {renderPlayButton && (
          <button type="button" onClick={ () => this.handlePlay() }>Jogar</button>)}
        <div>
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
                <Score gamePoints={ gamePoints } />
              </>
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
                disabled={ isButtonAtributeDisabled }
                onClick={ () => this.handleButtonChoice() }
              >
                Escolher Atributo
              </button>
              <div className="choices">
                <label htmlFor="attr1">
                  <input
                    type="radio"
                    name="attr"
                    id="attr1"
                    value="cardAttr1"
                    onChange={ this.handleChoice }
                  />
                  Presença
                </label>
                <label htmlFor="attr2">
                  <input
                    type="radio"
                    name="attr"
                    id="attr2"
                    value="cardAttr2"
                    onChange={ this.handleChoice }
                  />
                  Aprendizado
                </label>
                <label htmlFor="attr3">
                  <input
                    type="radio"
                    name="attr"
                    id="attr3"
                    value="cardAttr3"
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
  displaySaved: PropTypes.func.isRequired,
};

export default Game;
