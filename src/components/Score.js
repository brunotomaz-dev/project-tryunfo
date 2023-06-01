import PropTypes from 'prop-types';
import React from 'react';

class Score extends React.Component {
  render() {
    const { gamePoints } = this.props;
    console.log(gamePoints);
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
}

Score.propTypes = {
  gamePoints: PropTypes.shape({
    player: PropTypes.number.isRequired,
    cpu: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    attr: PropTypes.string.isRequired,
  }).isRequired,
};

export default Score;
