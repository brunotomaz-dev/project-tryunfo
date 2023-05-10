import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    const inputSuper = (<input
      type="checkbox"
      name="cardTrunfo"
      id="cardTrunfo"
      checked={ cardTrunfo }
      onChange={ onInputChange }
      data-testid="trunfo-input"
    />);

    return (
      <form>
        <label htmlFor="cardName">
          Nome
          <input
            type="text"
            name="cardName"
            id="cardName"
            value={ cardName }
            onChange={ onInputChange }
            data-testid="name-input"
          />
        </label>
        <label htmlFor="cardDescription">
          Descrição
          <textarea
            name="cardDescription"
            id="cardDescription"
            cols="20"
            rows="5"
            value={ cardDescription }
            onChange={ onInputChange }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="cardAttr1">
          Velocidade
          <input
            type="number"
            max="90"
            name="cardAttr1"
            id="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
            data-testid="attr1-input"
          />
        </label>
        <label htmlFor="cardAttr2">
          Inteligência
          <input
            type="number"
            max="90"
            name="cardAttr2"
            id="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
            data-testid="attr2-input"
          />
        </label>
        <label htmlFor="cardAttr3">
          Resistência
          <input
            type="number"
            max="90"
            name="cardAttr3"
            id="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
            data-testid="attr3-input"
          />
        </label>
        <label htmlFor="cardImage">
          Imagem
          <input
            type="text"
            name="cardImage"
            id="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
            data-testid="image-input"
          />
        </label>
        <label htmlFor="cardRare">
          Raridade
          <select
            name="cardRare"
            id="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            data-testid="rare-input"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="cardTrunfo">
          Super:
          {' '}
          { hasTrunfo
            ? <p>&quot;Você já tem um Super Trunfo em seu baralho&quot;</p>
            : inputSuper }
        </label>
        <button
          type="submit"
          name="saveButton"
          id="saveButton"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  ccardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
