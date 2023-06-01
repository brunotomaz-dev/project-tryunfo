import PropTypes from 'prop-types';
import React from 'react';

class GameChoices extends React.Component {
  render() {
    const { isButtonAtributeDisabled, handleButtonChoice, handleChoice } = this.props;
    return (
      <>
        <button
          type="button"
          disabled={ isButtonAtributeDisabled }
          onClick={ () => handleButtonChoice() }
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
              onChange={ handleChoice }
            />
            Presença
          </label>
          <label htmlFor="attr2">
            <input
              type="radio"
              name="attr"
              id="attr2"
              value="cardAttr2"
              onChange={ handleChoice }
            />
            Aprendizado
          </label>
          <label htmlFor="attr3">
            <input
              type="radio"
              name="attr"
              id="attr3"
              value="cardAttr3"
              onChange={ handleChoice }
            />
            Popularidade
          </label>
        </div>
      </>
    );
  }
}

GameChoices.propTypes = {
  isButtonAtributeDisabled: PropTypes.bool.isRequired,
  handleButtonChoice: PropTypes.func.isRequired,
  handleChoice: PropTypes.func.isRequired,
};

export default GameChoices;
