let dealerScore = 0;
let playerScore = 0;

let dealerCountHigh = 0;
let playerCountHigh = 0;

let dealerCountLow = 0;
let playerCountLow = 0;

let playerCountValid = 0;

let deck = [
  '2h',
  '3h',
  '4h',
  '5h',
  '6h',
  '7h',
  '8h',
  '9h',
  '10h',
  'jh',
  'qh',
  'kh',
  'ah',
  '2t',
  '3t',
  '4t',
  '5t',
  '6t',
  '7t',
  '8t',
  '9t',
  '10t',
  'jt',
  'qt',
  'kt',
  'at',
  '2c',
  '3c',
  '4c',
  '5c',
  '6c',
  '7c',
  '8c',
  '9c',
  '10c',
  'jc',
  'qc',
  'kc',
  'ac',
  '2p',
  '3p',
  '4p',
  '5p',
  '6p',
  '7p',
  '8p',
  '9p',
  '10p',
  'jp',
  'qp',
  'kp',
  'ap',
];
let pile = [];

let dealerCards = [];
let playerCards = [];

const btnHit = document.getElementById('hit');
const btnStand = document.getElementById('stand');

const result_h2 = document.getElementById('result');

// set player and dealer count
function setCardCount() {
  playerCountHigh = checkCardCountHigh(playerCards);
  playerCountLow = checkCardCountLow(playerCards);

  dealerCountHigh = checkCardCountHigh(dealerCards);
  dealerCountLow = checkCardCountLow(dealerCards);

  console.log('Player High: ' + playerCountHigh);
  console.log('Player Low: ' + playerCountLow);
  console.log(playerCards);

  console.log('Dealer High: ' + dealerCountHigh);
  console.log('Dealer Low: ' + dealerCountLow);
  console.log(dealerCards);
}

// test setCardCount
function setCardCountTest() {
  playerCards = ['ah', '10p'];
  dealerCards = ['at', 'ac'];

  setCardCount();
  console.log('player High: ' + playerCountHigh);
  console.log('player Low: ' + playerCountLow);
  console.log('dealer High: ' + dealerCountHigh);
  console.log('dealer Low: ' + dealerCountLow);

  if (
    playerCountHigh == 11 + 10 &&
    playerCountLow == 1 + 10 &&
    dealerCountHigh == 11 + 11 &&
    dealerCountLow == 1 + 1
  ) {
    return true;
  } else {
    return false;
  }
}

// random number from 0 to 51
function random() {
  return Math.floor(Math.random() * deck.length);
}

// check if 21 or exceeded Count, returns sum of higher possible Value
function checkCardCountHigh(cards) {
  let sum = 0;

  for (let i = 0; i < cards.length; i++) {
    sum += checkValue(cards[i]);
  }

  return sum;
}

// test checkCardCountHigh
function checkCardCountHighTest() {
  let testSum = 0;
  let testCards = ['4h', '2t', 'ap', 'ac'];

  testSum = checkCardCountHigh(testCards);
  console.log(testSum);

  if ((testSum = 4 + 2 + 11 + 11)) {
    return true;
  } else {
    return false;
  }
}

// check if 21 or exceeded Count, returns sum of lower possible Value
function checkCardCountLow(cards) {
  let sum = 0;

  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i] == 'ah' ||
      cards[i] == 'at' ||
      cards[i] == 'ap' ||
      cards[i] == 'ac'
    ) {
      sum += 1;
    } else {
      sum += checkValue(cards[i]);
    }
  }

  return sum;
}

// test checkCardCountLow
function checkCardCountLowTest() {
  let testSum = 0;
  let testCards = ['ah', 'ap', '3t'];

  testSum = checkCardCountLow(testCards);
  console.log(testSum);

  if (testSum == 5) {
    return true;
  } else {
    return false;
  }
}

// check if player or dealer has Ace + 10
function checkBlackjack() {
  if (
    checkValue(playerCards[0]) + checkValue(playerCards[1]) == 21 &&
    checkValue(dealerCards[0]) + checkValue(dealerCards[1]) == 21
  ) {
    result_h2.innerHTML = 'Both parties have 21';
  } else if (checkValue(playerCards[0]) + checkValue(playerCards[1]) == 21) {
    result_h2.innerHTML = 'Player Winner Chicken Dinner';
  } else if (checkValue(dealerCards[0]) + checkValue(dealerCards[1]) == 21) {
    result_h2.innerHTML = 'Dealer Winner Chicken Dinner';
  }
}

// test checkBlackjack
function checkBlackjackTest() {
  playerCards = ['kh', 'ap'];
  dealerCards = ['9t', 'ah'];

  checkBlackjack();
}

// check the value of the card (ace == 11), returns value 2-11
function checkValue(card) {
  let value = card[0];
  switch (value) {
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    case '1':
      return 10;
    case 'j':
      return 10;
    case 'q':
      return 10;
    case 'k':
      return 10;
    case 'a':
      return 11;
    default:
      break;
  }
}

// test checkValue(card)
function checkValueTest() {
  let testArray = [];
  let arrayExpected = [
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10,
    11,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10,
    11,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10,
    11,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10,
    11,
  ];

  for (let i = 0; i < deck.length; i++) {
    testArray = testArray.concat(checkValue(deck[i]));
    console.log('Value: ' + checkValue(deck[i]));
  }

  console.log('testArray: ' + testArray);
  console.log('arrayExpected: ' + arrayExpected);

  if (testArray.toString() == arrayExpected.toString()) {
    return true;
  } else {
    return false;
  }
}

// deal a card to the target pile and remove it from the deck
function dealCard(target) {
  let num = random();
  let card = deck.splice(num, 1);
  target.push(card.toString());
}

// test dealCard
function dealCardTest(target) {
  let deckExpected = 51;
  let playerCardsExpected = 1;

  dealCard(target);
  console.log(deck.length);
  console.log(target.length);

  if (deckExpected == deck.length && playerCardsExpected == target.length) {
    return true;
  } else {
    return false;
  }
}

// deal 2 cards to the player and dealer
function gameSetup() {
  for (i = 0; i < 2; i++) {
    dealCard(playerCards);
    dealCard(dealerCards);
  }
}

// test gameSetup
function gameSetupTest() {
  gameSetup();

  console.log(deck.length);
  console.log(playerCards);
  console.log(dealerCards);

  if (
    deck.length == 52 - 4 &&
    playerCards.length == 2 &&
    dealerCards.length == 2
  ) {
    return true;
  } else {
    return false;
  }
}

// move played cards to the pile
function removeCards() {
  pile = pile.concat(playerCards, dealerCards);
  playerCards.splice(0, playerCards.length);
  dealerCards.splice(0, dealerCards.length);
}

// test removeCards
function removeCardsTest() {
  gameSetup();
  removeCards();

  console.log(deck.length);
  console.log(pile.length);
  console.log(playerCards.length);
  console.log(dealerCards.length);

  if (
    pile.length == 4 &&
    deck.length == 48 &&
    playerCards.length == 0 &&
    dealerCards == 0
  ) {
    return true;
  } else {
    return false;
  }
}

// put the pile back into the deck
function restockDeck() {
  deck = deck.concat(pile);
  pile.splice(0, pile.length);
}

// test restockDeck
function restockDeckTest() {
  gameSetup();
  removeCards();
  restockDeck();

  console.log(deck.length);
  console.log(pile.length);
  console.log(playerCards.length);
  console.log(dealerCards.length);

  if (
    deck.length == 52 &&
    pile.length == 0 &&
    playerCards.length == 0 &&
    dealerCards == 0
  ) {
    return true;
  } else {
    return false;
  }
}

// button to give player an additional card
btnHit.onclick = function () {
  dealCard(playerCards);

  console.log(playerCards);

  setCardCount();

  if (playerCountHigh == 21 || playerCountLow == 21) {
    dealerTurn();
  } else if (playerCountHigh > 21 && playerCountLow > 21) {
    console.log('You lost! ' + playerCountLow + ' ' + playerCountHigh);

    removeCards();
    restockDeck();

    playerCountHigh = 0;
    playerCountLow = 0;

    main();
  }
};

// button to stop taking more cards
btnStand.onclick = function () {
  dealerTurn();
};

function dealerTurn() {
  setCardCount();

  if (dealerCountLow >= 17 && dealerCountLow <= 21) {
    chooseLowHighPlayer();

    if (playerCountValid > dealerCountLow) {
      console.log(
        'You win ' +
          'Player: ' +
          playerCountValid +
          ' Dealer: ' +
          dealerCountLow
      );
      console.log('player: ' + playerCards);
      console.log('dealer: ' + dealerCards);

      removeCards();
      restockDeck();

      playerCountHigh = 0;
      playerCountLow = 0;

      main();
    } else if (playerCountValid < dealerCountLow) {
      console.log(
        'You lost! ' +
          'Player: ' +
          playerCountValid +
          ' Dealer: ' +
          dealerCountLow
      );
      console.log('player: ' + playerCards);
      console.log('dealer: ' + dealerCards);

      removeCards();
      restockDeck();

      playerCountHigh = 0;
      playerCountLow = 0;

      main();
    }
  } else if (dealerCountHigh >= 17 && dealerCountHigh <= 21) {
    chooseLowHighPlayer();

    if (playerCountValid > dealerCountHigh) {
      console.log(
        'You win! ' +
          'Player: ' +
          playerCountValid +
          ' Dealer: ' +
          dealerCountHigh
      );
      console.log('player: ' + playerCards);
      console.log('dealer: ' + dealerCards);

      removeCards();
      restockDeck();

      playerCountHigh = 0;
      playerCountLow = 0;

      main();
    } else if (playerCountValid < dealerCountHigh) {
      console.log(
        'You lost! ' +
          'Player: ' +
          playerCountValid +
          ' Dealer: ' +
          dealerCountHigh
      );
      console.log('player: ' + playerCards);
      console.log('dealer: ' + dealerCards);

      removeCards();
      restockDeck();

      playerCountHigh = 0;
      playerCountLow = 0;

      main();
    }
  } else {
    console.log(
      "It's a draw! " +
        'Player: ' +
        playerCountValid +
        ' Dealer: ' +
        dealerCountHigh
    );
    console.log('player: ' + playerCards);
    console.log('dealer: ' + dealerCards);

    removeCards();
    restockDeck();

    playerCountHigh = 0;
    playerCountLow = 0;

    main();
  }
}

function main() {
  gameSetup();
  setCardCount();
  checkBlackjack();
}

// return highest valid
function chooseLowHighPlayer() {
  if (playerCountHigh != playerCountLow && playerCountHigh > 21) {
    playerCountValid = playerCountLow;
  } else if (playerCountHigh != playerCountLow && playerCountHigh <= 21) {
    playerCountValid = playerCountHigh;
  }
}

// test chooseLowHighPlayer
function chooseLowHighPlayerTest() {
  playerCountHigh = 18;
  playerCountLow = 17;

  console.log('high: ' + playerCountHigh);
  console.log('low: ' + playerCountLow);

  chooseLowHighPlayer();

  console.log('valid: ' + playerCountValid);

  if (playerCountValid == playerCountHigh) {
    return true;
  } else {
    return false;
  }
}

main();
