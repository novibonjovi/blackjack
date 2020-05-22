const SUIT = ['hearts', 'diamonds', 'clubs', 'spades'];
const VALUE = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

let DEALER = { Name: 'Dealer', Points: 0, Score: 0, Hand: [] };
let PLAYER = { Name: 'Player', Points: 0, Score: 0, Hand: [] };

let deck = [];

let btnStart = document.getElementById('btn-start');
let btnHit = document.getElementById('btn-hit');
let btnStand = document.getElementById('btn-stand');

btnHit.disabled = true;
btnStand.disabled = true;

// HELPER picks a random card from the deck
function getRandomIndex() {
  return Math.floor(Math.random() * 52);
}

// HELPER shuffles the deck 1000 times
function shuffleDeck(deck) {
  for (let i = 0; i < 1000; i++) {
    let location1 = getRandomIndex();
    let location2 = getRandomIndex();
    let temp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = temp;
  }
}

// returns a shuffeled 52 cards Deck
function getDeck() {
  for (let i = 0; i < SUIT.length; i++) {
    for (let j = 0; j < VALUE.length; j++) {
      let weight = parseInt(VALUE[j]);
      if (VALUE[j] == 'J' || VALUE[j] == 'Q' || VALUE[j] == 'K') {
        weight = 10;
      }
      if (VALUE[j] == 'A') {
        weight = 11;
      }

      let card = { Value: VALUE[j], Suit: SUIT[i], Weight: weight };
      deck.push(card);
    }
  }

  shuffleDeck(deck);
}

// HELPER render hands into html
function renderHand() {
  document.getElementById('dealer-hand').innerHTML = '';
  document.getElementById('player-hand').innerHTML = '';

  for (let i = 0; i < DEALER.Hand.length; i++) {
    let card = document.createElement('div');
    let value = document.createElement('div');
    let suit = document.createElement('div');

    card.className = 'card';
    value.className = 'value';
    suit.className = 'suit-' + DEALER.Hand[i].Suit;

    value.innerHTML = DEALER.Hand[i].Value;
    card.appendChild(value);
    card.appendChild(suit);

    document.getElementById('dealer-hand').appendChild(card);
  }

  for (let i = 0; i < PLAYER.Hand.length; i++) {
    let card = document.createElement('div');
    let value = document.createElement('div');
    let suit = document.createElement('div');

    card.className = 'card';
    value.className = 'value';
    suit.className = 'suit-' + PLAYER.Hand[i].Suit;

    value.innerHTML = PLAYER.Hand[i].Value;
    card.appendChild(value);
    card.appendChild(suit);

    document.getElementById('player-hand').appendChild(card);
  }
}

// render all UI information
function renderUI() {
  renderHand();

  document.getElementById('player-name').innerHTML = PLAYER.Name;
  document.getElementById('player-points').innerHTML = PLAYER.Points;

  document.getElementById('dealer-name').innerHTML = DEALER.Name;
  document.getElementById('dealer-points').innerHTML = DEALER.Points;
}

// deal 2 cards each
function dealHands() {
  let card;
  for (let i = 0; i < 2; i++) {
    card = deck.pop();
    PLAYER.Hand.push(card);
  }
  for (let i = 0; i < 2; i++) {
    card = deck.pop();
    DEALER.Hand.push(card);
  }
  updatePoints();
}

// player wins
function winPlayer() {
  PLAYER.Score += 1;
  document.getElementById('player-score').innerHTML = 'Wins: ' + PLAYER.Score;

  btnHit.disabled = true;
  btnStand.disabled = true;
}

// dealer wins
function winDealer() {
  DEALER.Score += 1;
  document.getElementById('dealer-score').innerHTML = 'Wins: ' + DEALER.Score;

  btnHit.disabled = true;
  btnStand.disabled = true;
}

// wincondition
function winCondition() {
  if (PLAYER.Points > DEALER.Points) {
    document.getElementById('result').innerHTML = 'You Win!';
    winPlayer();
  } else if (PLAYER.Points < DEALER.Points) {
    document.getElementById('result').innerHTML = 'You Lose!';
    winDealer();
  } else {
    document.getElementById('result').innerHTML = "It's a Draw!";
    btnHit.disabled = true;
    btnStand.disabled = true;
  }
}

// update points
function updatePoints() {
  PLAYER.Points = 0;
  DEALER.Points = 0;

  for (let i = 0; i < PLAYER.Hand.length; i++) {
    PLAYER.Points += PLAYER.Hand[i].Weight;
  }
  for (let i = 0; i < DEALER.Hand.length; i++) {
    DEALER.Points += DEALER.Hand[i].Weight;
  }
}

// update deck
function updateDeck() {
  document.getElementById('deck').innerHTML = deck.length;
}

// reset game
function restartGame() {
  PLAYER.Hand = [];
  PLAYER.Points = 0;
  DEALER.Hand = [];
  DEALER.Points = 0;
  deck = [];
  btnHit.disabled = false;
  btnStand.disabled = false;
  document.getElementById('result').innerHTML = 'Good Luck!';
  startGame();
}

// start a game
function startGame() {
  document.getElementById('btn-start').innerHTML = 'Restart';

  getDeck();
  dealHands();
  checkBlackjack();
  updateDeck();
  renderUI();

  if (PLAYER.Points > 21) {
    for (let i = 0; i < PLAYER.Hand.length; i++) {
      if (PLAYER.Hand[i].Weight == 11) {
        PLAYER.Points -= 10;
        document.getElementById('player-points').innerHTML = PLAYER.Points;
      }
    }
  }

  if (DEALER.Points > 21) {
    for (let i = 0; i < DEALER.Hand.length; i++) {
      if (DEALER.Hand[i].Weight == 11) {
        DEALER.Points -= 10;
        document.getElementById('dealer-points').innerHTML = DEALER.Points;
      }
    }
  }

  document.getElementById('player').className = 'active';
}

// hitMe deal one card to player
function hitMe() {
  let card = deck.pop();
  PLAYER.Hand.push(card);
  updatePoints();
  updateDeck();

  if (PLAYER.Points > 21) {
    for (let i = 0; i < PLAYER.Hand.length; i++) {
      if (PLAYER.Hand[i].Weight == 11) {
        PLAYER.Points -= 10;
        document.getElementById('player-points').innerHTML = PLAYER.Points;
      }
    }
  }
  if (PLAYER.Points > 21) {
    document.getElementById('result').innerHTML = 'You Busted!';
    winDealer();
    btnHit.disabled = true;
    btnStand.disabled = true;
  }
  if (PLAYER.Points == 21) {
    stand();
  }
}

// stand dealer turn
function stand() {
  while (DEALER.Points < 17) {
    let card = deck.pop();
    DEALER.Hand.push(card);
    updatePoints();
    updateDeck();

    if (PLAYER.Points > 21) {
      for (let i = 0; i < PLAYER.Hand.length; i++) {
        if (PLAYER.Hand[i].Weight == 11) {
          PLAYER.Points -= 10;
          document.getElementById('player-points').innerHTML = PLAYER.Points;
        }
      }
    }

    if (DEALER.Points > 21) {
      for (let i = 0; i < DEALER.Hand.length; i++) {
        if (DEALER.Hand[i].Weight == 11) {
          DEALER.Points -= 10;
          document.getElementById('dealer-points').innerHTML = DEALER.Points;
        }
      }
    }
  }
  winCondition();

  if (DEALER.Points > 21) {
    document.getElementById('result').innerHTML = 'Dealer Busted!';
    winPlayer();
    btnHit.disabled = true;
    btnStand.disabled = true;
  }
}

// check player
function checkBlackjack() {
  if (PLAYER.Points == 21 && DEALER.Points == 21) {
    document.getElementById('result').innerHTML = 'Draw! Double Blackjack!';
    btnHit.disabled = true;
    btnStand.disabled = true;
  } else if (PLAYER.Points == 21) {
    document.getElementById('result').innerHTML =
      'You Win! You have Blackjack!';
    winPlayer();
  } else if (DEALER.Points == 21) {
    document.getElementById('result').innerHTML =
      'You Lose! Dealer has Blackjack!';
    winDealer();
  }
}

// start/restart button
btnStart.onclick = function () {
  btnHit.disabled = false;
  btnStand.disabled = false;
  if (btnStart.innerHTML == 'Start') {
    startGame();
  } else {
    restartGame();
  }
};

// hit button
btnHit.onclick = function () {
  hitMe();
  renderUI();
};

// stand button
btnStand.onclick = function () {
  stand();
  renderUI();
};
