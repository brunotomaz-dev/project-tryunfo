import PropTypes from 'prop-types';
import React from 'react';
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
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      hasTrunfo: false,
    };
  }

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => this.validationInput());
  }

  validationInput = () => {
    const { isSaveButtonDisabled, cards, hasTrunfo, ...rest } = this.state;
    const expectedLength = 7;
    const validate = Object.values(rest).map((item) => item)
      .filter((item) => item.length > 0);
    if (validate.length === expectedLength) {
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
    const { hasTrunfo, isSaveButtonDisabled, cards, ...rest } = this.state;
    this.setState((previousState) => {
      const newAddCard = [...previousState.cards, rest];
      return { cards: newAddCard };
    }, () => this.handleTrunfo());
    this.setState({
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    });
  }

  handleTrunfo = () => { // trabalhar nessa lógica
    const { cards } = this.state;
    const changeState = (state) => this.setState({ hasTrunfo: state });
    const arrayCardTrunfo = cards.map((object) => {
      const { cardTrunfo } = object;
      return cardTrunfo;
    });
    return arrayCardTrunfo.includes(true) ? changeState(true) : changeState(false);
  }

  handleSavedCardsExclude = (cardName) => {
    const { cards } = this.state;
    const newCards = cards.filter((object) => object.cardName !== cardName);
    this.setState({ cards: newCards }, () => this.handleTrunfo());
  }

  savedCards = () => {
    const { cards } = this.state;
    return cards.map((object) => {
      const {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      } = object;
      return (<Card
        key={ cardName }
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardRare={ cardRare }
        cardTrunfo={ cardTrunfo }
        cardStatus="saved"
        handleExclusion={ this.handleSavedCardsExclude }
      />);
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
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;

    return (
      <div>
        <h1 className="center">Tryunfo</h1>
        <div className="container">
          <div className="form_container">
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
              hasTrunfo={ hasTrunfo }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              onSaveButtonClick={ this.handleButtonSaveClick }
            />
          </div>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            cardStatus="preview"
          />
        </div>
        <div className="container_cards">
          {this.savedCards()}
        </div>
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
