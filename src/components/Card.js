import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  handleTrunfo = (card) => {
    const trunfoCard = <h2 data-testid="trunfo-card">Super Trunfo</h2>;
    return card === true ? trunfoCard : null;
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
    } = this.props;

    if (cardName === '') return null;
    return (
      <section>
        <h1 data-testid="name-card">{cardName}</h1>
        <img
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
        />
        <p data-testid="description-card">{cardDescription}</p>
        <p data-testid="attr1-card">{cardAttr1}</p>
        <p data-testid="attr2-card">{cardAttr2}</p>
        <p data-testid="attr3-card">{cardAttr3}</p>
        <h3 data-testid="rare-card">{cardRare}</h3>
        <div>{this.handleTrunfo(cardTrunfo)}</div>
      </section>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;

export default Card;
