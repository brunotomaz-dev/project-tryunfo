import PropTypes from 'prop-types';
import React from 'react';

class Card extends React.Component {
  handleTrunfo = (card) => {
    const trunfoCard = <h2 data-testid="trunfo-card">Super Trunfo</h2>;
    return card === true ? trunfoCard : null;
  }

  atrrSection = (cardAttr1, cardAttr2, cardAttr3) => (
    <div className="attr-container">
      <p data-testid="attr1-card" className="attr">
        <strong>Velocidade:</strong>
        {' '}
        {cardAttr1}
      </p>
      <p data-testid="attr2-card" className="attr">
        <strong>Inteligência:</strong>
        {' '}
        {cardAttr2}
      </p>
      <p data-testid="attr3-card" className="attr">
        <strong>Resistência:</strong>
        {' '}
        {cardAttr3}
      </p>
    </div>
  )

  cardColor = (cardRare) => (cardRare === 'normal' ? 'card' : `card ${cardRare}`)

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

    // if (cardName === '') return null;
    return (
      <section className={ `scale ${this.cardColor(cardRare)}` }>
        <h2 data-testid="name-card">{cardName}</h2>
        <img
          className="img"
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
        />
        <p
          data-testid="description-card"
          className="description-card"
        >
          {cardDescription}
        </p>
        {(cardAttr1 || cardAttr1 > 0)
        && this.atrrSection(cardAttr1, cardAttr2, cardAttr3)}
        {cardRare !== 'normal' && <h3 data-testid="rare-card">{cardRare}</h3>}
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
