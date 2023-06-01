import PropTypes from 'prop-types';
import React from 'react';

class Card extends React.Component {
  handleTrunfo = (card) => {
    const trunfoCard = <h3 data-testid="trunfo-card" className="trunfo">Super Trunfo</h3>;
    return card === true ? trunfoCard : null;
  }

  atrrSection = (cardAttr1, cardAttr2, cardAttr3) => (
    <div className="attr-container">
      <p data-testid="attr1-card" className="attr">
        <strong>Presença:</strong>
        {' '}
        {cardAttr1}
      </p>
      <p data-testid="attr2-card" className="attr">
        <strong>Aprendizado:</strong>
        {' '}
        {cardAttr2}
      </p>
      <p data-testid="attr3-card" className="attr">
        <strong>Popularidade:</strong>
        {' '}
        {cardAttr3}
      </p>
    </div>
  )

  cardColor = (cardRare) => {
    let rare = '';
    if (cardRare === 'raro') {
      rare = 'rare';
    }
    if (cardRare === 'muito raro') {
      rare = 'epic';
    }
    return cardRare === 'normal' ? 'card' : `card ${rare}`;
  }

  render() {
    const { objCard:
      { cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo },
    cardStatus,
    handleExclusion,
    } = this.props;

    return (
      <div className="container-column">
        <section className={ cardName && `scale ${this.cardColor(cardRare)}` }>
          <h2 data-testid="name-card" className="name-card">{cardName}</h2>
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
          {cardRare !== 'normal' && (
            <h5 data-testid="rare-card" className="card-rare">{cardRare}</h5>)}
          <div>{this.handleTrunfo(cardTrunfo)}</div>
        </section>
        {cardStatus === 'saved' && (
          <button
            data-testid="delete-button"
            onClick={ () => handleExclusion(cardName) }
            type="button"
          >
            Excluir
          </button>)}
      </div>
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
