'use strict';

//Select object section
const plyer0 = document.querySelector('.player--0');
const plyer1 = document.querySelector('.player--1');
console.log(plyer0, plyer1);

const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currant0El = document.querySelector('#current--0');
const curranr1El = document.querySelector('#current--1');
console.log(currant0El, curranr1El);

// console.log(btnNew, btnHold);

// console.log(btnRoll);

//General coding

let scores;
let currantScore;
let activePlayer;
let playing;

const init = function () {
  player1Score.textContent = 0;
  player2Score.textContent = 0;

  scores = [0, 0];
  currantScore = 0;
  activePlayer = 0;
  playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  diceEl.classList.add('hidden');

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  document.querySelector(`.player--0`).classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currantScore = 0;
  plyer0.classList.toggle('player--active');
  plyer1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a radom dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled one
    if (dice != 1) {
      currantScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currantScore;
    } else {
      switchPlayer();
      console.log(plyer0, plyer1);
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currantScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
