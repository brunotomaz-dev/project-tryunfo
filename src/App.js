import React from 'react';
import PropTypes from 'prop-types';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
    };
  }

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => this.validationInput());
  }

  validationInput = () => {
    // const { state } = this;
    const { isSaveButtonDisabled, cards, ...rest } = this.state;
    const expectedLenght = 7;
    const validate = Object.values(rest).map((item) => item)
      .filter((item) => item.length > 0);
    if (validate.length === expectedLenght) {
      this.isSaveButtonDisabledState(false);
      this.validationAttr();
    } else {
      this.isSaveButtonDisabledState(true);
    }
  }

  isSaveButtonDisabledState = (bool) => {
    this.setState({ isSaveButtonDisabled: bool });
  }

  validationAttr = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const attrSum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const maxTotalAttr = 210;
    const maxAttr = 90;
    const validation = [
      maxTotalAttr < attrSum ? 1 : 0,
      (cardAttr1 > maxAttr || cardAttr1 < 0) ? 1 : 0,
      (cardAttr2 > maxAttr || cardAttr2 < 0) ? 1 : 0,
      (cardAttr3 > maxAttr || cardAttr3 < 0) ? 1 : 0,
    ];
    this.isSaveButtonDisabledState(validation.includes(1));
  }

  handleButtonSaveClick = (event) => {
    event.preventDefault();
    const { isSaveButtonDisabled, cards, ...rest } = this.state;
    this.setState((previousState) => {
      const newAddCard = [rest, ...previousState.cards];
      return { cards: newAddCard };
    });
    this.setState({
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    });
  }

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
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.handleInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.handleButtonSaveClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
      </div>
    );
  }
}

App.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;

export default App;
