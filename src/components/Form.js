import React from 'react';
import PropTypes from 'prop-types';

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
    return (
      <form>
        <label htmlFor="name-input">
          Nome
          <input
            type="text"
            name="name-input"
            id="name-input"
            value={ cardName }
            onChange={ onInputChange }
            data-testid="name-input"
          />
        </label>
        Descrição
        <label htmlFor="description-input">
          <textarea
            name="description-input"
            id="description-input"
            cols="20"
            rows="5"
            value={ cardDescription }
            onChange={ onInputChange }
            data-testid="description-input"
          />
        </label>
        Atributo 1
        <label htmlFor="attr1-input">
          <input
            type="number"
            name="attr1-input"
            id="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
            data-testid="attr1-input"
          />
        </label>
        Atributo 2
        <label htmlFor="attr2-input">
          <input
            type="number"
            name="attr2-input"
            id="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
            data-testid="attr2-input"
          />
        </label>
        Atributo 3
        <label htmlFor="attr3-input">
          <input
            type="number"
            name="attr3-input"
            id="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
            data-testid="attr3-input"
          />
        </label>
        Imagem
        <label htmlFor="image-input">
          <input
            type="text"
            name="image-input"
            id="image-input"
            value={ cardImage }
            onChange={ onInputChange }
            data-testid="image-input"
          />
        </label>
        Raridade
        <label htmlFor="rare-input">
          <select
            name="rare-input"
            id="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
            data-testid="rare-input"
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        Super
        <label htmlFor="trunfo-input">
          <input
            type="checkbox"
            name="trunfo-input"
            id="trunfo-input"
            checked={ cardTrunfo }
            onChange={ onInputChange }
            data-testid="trunfo-input"
          />
        </label>
        <button
          type="submit"
          name="save-button"
          id="save-button"
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
