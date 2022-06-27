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
      isSaveButtonDisable: true,
    };
  }

  // isSaveButtonDisable = () => true;

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    }, () => this.validationInput());
  }

  validationInput = () => {
    const { state } = this;
    const expectedLenght = 7;
    const validate = Object.values(state).map((item) => item)
      .filter((item) => item.length > 0);
    if (validate.length === expectedLenght) {
      this.isSaveButtonDisableState(false);
      this.validationAttr();
    } else {
      this.isSaveButtonDisableState(true);
    }
  }

  isSaveButtonDisableState = (bool) => {
    this.setState({ isSaveButtonDisable: bool });
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
    this.isSaveButtonDisableState(validation.includes(1));
  }

  // validationInput = () => {
  //   const { state } = this;
  //   const expectedLenght = 7;
  //   const validate = Object.values(state).map((item) => item)
  //     .filter((item) => item.length > 0);
  //   if (validate.length === expectedLenght) {
  //     this.isSavedButtonDisable = () => false;
  //     this.validationAttr();
  //   } else {
  //     this.isSavedButtonDisable = () => true;
  //   }
  // }

  // validationAttr = () => {
  //   const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
  //   const attrSum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
  //   const maxTotalAttr = 210;
  //   const maxAttr = 90;
  //   if (attrSum > maxTotalAttr) {
  //     this.isSavedButtonDisable = () => true;
  //   } else if (maxAttr < cardAttr1) {
  //     this.isSavedButtonDisable = () => true;
  //   } else if (maxAttr < cardAttr2) {
  //     this.isSavedButtonDisable = () => true;
  //   } else if (maxAttr < cardAttr3) {
  //     this.isSavedButtonDisable = () => true;
  //   } else {
  //     this.isSavedButtonDisable = () => false;
  //   }
  // }

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
      isSaveButtonDisable,
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
          isSaveButtonDisable={ isSaveButtonDisable }
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
