import PropTypes from 'prop-types';
import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import Game from './components/Game';
import cardsData from './database/cardsData';

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
      displaySavedCards: true,
    };
  }

  // carregar database ao iniciar a aplicação
  componentDidMount() {
    this.getLocalStorage();
  }

  saveToLocalStorage = () => {
    const { cards } = this.state;
    localStorage.setItem('cards', JSON.stringify(cards));
  }

  getLocalStorage = () => {
    const cards = JSON.parse(localStorage.getItem('cards'));
    if (cards !== null && cards.length > 0) {
      this.setState({ cards }, () => this.handleTrunfo());
    } else {
      this.setState({ cards: cardsData }, () => this.handleTrunfo());
    }
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

  handleTrunfo = () => {
    this.saveToLocalStorage();
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
      } = object;
      return (<Card
        key={ cardName }
        objCard={ object }
        cardStatus="saved"
        handleExclusion={ this.handleSavedCardsExclude }
      />);
    });
  }

  handleExclusionOfAllCards = () => {
    this.setState({ cards: [] }, () => this.handleTrunfo());
    localStorage.clear();
  }

  changeIfSavedCardsAreDisplayed = (bool) => {
    this.setState({ displaySavedCards: bool });
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
      cards,
      displaySavedCards,
    } = this.state;

    return (
      <div>
        <h3 className="center margin_bottom_reset">Tryunfo</h3>
        <div className="container">
          { displaySavedCards && (
            <>
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
              <div>
                { cardName && <h4 className="center">Prévia da carta</h4>}
                <Card
                  objCard={ {
                    cardName,
                    cardDescription,
                    cardAttr1,
                    cardAttr2,
                    cardAttr3,
                    cardImage,
                    cardRare,
                    cardTrunfo,
                  } }
                  cardStatus="preview"
                />
              </div>
            </>)}
          <Game cards={ cards } displaySaved={ this.changeIfSavedCardsAreDisplayed } />
        </div>
        { displaySavedCards && (
          <>
            <h3 className="center name-card">Cartas salvas</h3>
            <span className="center">
              <button
                type="button"
                className="rareBtn"
                onClick={ this.handleExclusionOfAllCards }
              >
                Apagar todas as Cartas
              </button>
            </span>
            <div className="container_cards">
              {this.savedCards()}
            </div>
          </>)}
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
