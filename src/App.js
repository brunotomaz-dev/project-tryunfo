import React from 'react';
import PropTypes from 'prop-types';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      descriptionInput: '',
      attr1Input: 0,
      attr2Input: 0,
      attr3Input: 0,
      imageInput: '',
      rareInput: 'normal',
      trunfoInput: false,
    };
  }

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value,
    });
  }

  render() {
    const {
      nameInput,
      descriptionInput,
      attr1Input,
      attr2Input,
      attr3Input,
      imageInput,
      rareInput,
      trunfoInput,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          onInputChange={ this.handleInputChange }
          cardName={ nameInput }
          cardDescription={ descriptionInput }
          cardAttr1={ attr1Input }
          cardAttr2={ attr2Input }
          cardAttr3={ attr3Input }
          cardImage={ imageInput }
          cardRare={ rareInput }
          cardTrunfo={ trunfoInput }
        />
        <Card
          cardName={ nameInput }
          cardDescription={ descriptionInput }
          cardAttr1={ attr1Input }
          cardAttr2={ attr2Input }
          cardAttr3={ attr3Input }
          cardImage={ imageInput }
          cardRare={ rareInput }
          cardTrunfo={ trunfoInput }
        />
      </div>
    );
  }
}

App.propTypes = {
  nameInput: PropTypes.string,
  descriptionInput: PropTypes.string,
  attr1Input: PropTypes.string,
  attr2Input: PropTypes.string,
  attr3Input: PropTypes.string,
  imageInput: PropTypes.string,
  rareInput: PropTypes.string,
  trunfoInput: PropTypes.bool,
}.isRequired;

export default App;
