import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name-input">
          <input
            type="text"
            name="name-input"
            id="name-input"
            data-testid="name-input"
          />
        </label>
        <label htmlFor="description-input">
          <textarea
            name="description-input"
            id="description-input"
            cols="20"
            rows="5"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="atrr1-input">
          <input
            type="number"
            name="atrr1-input"
            id="atrr1-input"
            data-testid="atrr1-input"
          />
        </label>
        <label htmlFor="atrr2-input">
          <input
            type="number"
            name="atrr2-input"
            id="atrr2-input"
            data-testid="atrr2-input"
          />
        </label>
        <label htmlFor="atrr3-input">
          <input
            type="number"
            name="atrr3-input"
            id="atrr3-input"
            data-testid="atrr3-input"
          />
        </label>
        <label htmlFor="image-input">
          <input
            type="text"
            name="image-input"
            id="image-input"
            data-testid="image-input"
          />
        </label>
        <label htmlFor="rare-input">
          <select name="rare-input" id="rare-input" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito-raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo-input">
          <input
            type="checkbox"
            name="trunfo-input"
            id="trunfo-input"
            data-testid="trunfo-input"
          />
        </label>
        <button
          type="submit"
          name="save-button"
          id="save-button"
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
