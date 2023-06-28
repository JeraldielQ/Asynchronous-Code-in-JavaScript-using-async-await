// 1.Make a request to the Numbers API (http://numbersapi.com/) 
// to get a fact about your favorite number.


const Btn = document.getElementById('draw-card-btn');

Btn.addEventListener('click', async () => {
  try {
    const apiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const deckId = data.deck_id;
    const drawCardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;

    const drawCardResponse = await fetch(drawCardUrl);
    const cardData = await drawCardResponse.json();
    const card = cardData.cards[0];
    const value = card.value;
    const suit = card.suit;
    const cardName = `${value} of ${suit}`;
    console.log(cardName);
  } catch (error) {
    console.error('Error:', error);
  }
});


// 2.Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.


async function drawCards() {
  try {
    const apiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    const response = await fetch(apiUrl);
    const data = await response.json();
    const deckId = data.deck_id;
    const drawCardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

    const drawCardResponse = await fetch(drawCardUrl);
    const cardData = await drawCardResponse.json();
    const cards = cardData.cards;
    const card1 = cards[0];
    const card2 = cards[1];

    const value1 = card1.value;
    const suit1 = card1.suit;
    const cardName1 = `${value1} of ${suit1}`;

    const value2 = card2.value;
    const suit2 = card2.suit;
    const cardName2 = `${value2} of ${suit2}`;

    console.log(`Card 1: ${cardName1}`);
    console.log(`Card 2: ${cardName2}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

drawCards();



// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

const drawCardBtn = document.getElementById('draw-card-btn');
const cardContainer = document.getElementById('cardContainer');
let deckId = null;

const createNewDeck = async () => {
  try {
    const apiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    const response = await fetch(apiUrl);
    const data = await response.json();
    deckId = data.deck_id;
  } catch (error) {
    console.error('Error:', error);
  }
};

const drawCard = async () => {
  if (deckId) {
    try {
      const drawCardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
      const response = await fetch(drawCardUrl);
      const cardData = await response.json();

      const card = cardData.cards[0];
      const value = card.value;
      const suit = card.suit;
      const cardName = `${value} of ${suit}`;

      const cardElement = document.createElement('p');
      cardElement.textContent = cardName;
      cardContainer.appendChild(cardElement);

      if (cardData.remaining === 0) {
        drawCardBtn.disabled = true;
        drawCardBtn.textContent = 'No More Cards';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

drawCardBtn.addEventListener('click', drawCard);

window.addEventListener('load', createNewDeck);
