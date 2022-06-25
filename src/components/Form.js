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
        <label htmlFor="nameInput">
          Nome
          <input
            type="text"
            name="nameInput"
            id="nameInput"
            value={ cardName }
            onChange={ onInputChange }
            data-testid="name-input"
          />
        </label>
        Descrição
        <label htmlFor="descriptionInput">
          <textarea
            name="descriptionInput"
            id="descriptionOnput"
            cols="20"
            rows="5"
            value={ cardDescription }
            onChange={ onInputChange }
            data-testid="description-input"
          />
        </label>
        Atributo 1
        <label htmlFor="attr1Input">
          <input
            type="number"
            name="attr1Input"
            id="attr1Input"
            value={ cardAttr1 }
            onChange={ onInputChange }
            data-testid="attr1-input"
          />
        </label>
        Atributo 2
        <label htmlFor="attr2Input">
          <input
            type="number"
            name="attr2Input"
            id="attr2Input"
            value={ cardAttr2 }
            onChange={ onInputChange }
            data-testid="attr2-input"
          />
        </label>
        Atributo 3
        <label htmlFor="attr3Input">
          <input
            type="number"
            name="attr3Input"
            id="attr3Input"
            value={ cardAttr3 }
            onChange={ onInputChange }
            data-testid="attr3-input"
          />
        </label>
        Imagem
        <label htmlFor="imageInput">
          <input
            type="text"
            name="imageInput"
            id="imageInput"
            value={ cardImage }
            onChange={ onInputChange }
            data-testid="image-input"
          />
        </label>
        Raridade
        <label htmlFor="rareInput">
          <select
            name="rareInput"
            id="rareInput"
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
        <label htmlFor="trunfoInput">
          <input
            type="checkbox"
            name="trunfoInput"
            id="trunfoInput"
            checked={ cardTrunfo }
            onChange={ onInputChange }
            data-testid="trunfo-input"
          />
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
