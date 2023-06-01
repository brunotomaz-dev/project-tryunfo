import PropTypes from 'prop-types';
import React from 'react';

class Score extends React.Component {
  parcialResult = () => {
    const { gamePoints } = this.props;
    return (
      <div className="parcial_result">
        <h3>{gamePoints.status}</h3>
        <p>{gamePoints.attr}</p>
        <h5>Pontuação:</h5>
        <p>
          Você:
          {' '}
          {gamePoints.player}
        </p>
        <p>
          CPU:
          {' '}
          {gamePoints.cpu}
        </p>
      </div>
    );
  }

  calculateWinner = () => {
    const { gamePoints } = this.props;
    if (gamePoints.player > gamePoints.cpu) {
      return 'Você venceu!';
    }
    if (gamePoints.player < gamePoints.cpu) {
      return 'Você perdeu!';
    }
    return 'Empate!';
  }

  finalResult = () => {
    const { gamePoints } = this.props;
    return (
      <div className="final_result">
        <h3>{this.calculateWinner()}</h3>
        <h5>Pontuação Final:</h5>
        <p>
          Você:
          {' '}
          {gamePoints.player}
        </p>
        <p>
          CPU:
          {' '}
          {gamePoints.cpu}
        </p>
        <button type="button" onClick={ this.handleInicialButton }>Início</button>
      </div>
    );
  }

  handleInicialButton = () => {
    const { inicialPage, enablePlayButton } = this.props;
    inicialPage(true);
    enablePlayButton();
  }

  render() {
    const { endGame } = this.props;
    return (
      <span>
        {endGame ? this.finalResult() : this.parcialResult()}
      </span>
    );
  }
}

Score.propTypes = {
  gamePoints: PropTypes.shape({
    player: PropTypes.number.isRequired,
    cpu: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    attr: PropTypes.string.isRequired,
  }).isRequired,
  endGame: PropTypes.bool.isRequired,
  inicialPage: PropTypes.func.isRequired,
  enablePlayButton: PropTypes.func.isRequired,
};

export default Score;
