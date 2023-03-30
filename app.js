const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', () => {
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  createRandomCircle();
  setInterval(decreaseTime, 1000);
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerText = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Score:<span class ='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10,60);
  const {width, height} = board.getBoundingClientRect();

  const x = getRandomNumber(10, width - size);
  const y = getRandomNumber(10, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  setColor(circle);
  board.append(circle);
}

function setColor(element) {
  const color = generateRandomColor();
  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function generateRandomColor() {
  const hexCodes = '0123456789ABCDEF';
  let colors = '';

  for (let i = 0; i < 6; i++) {
    colors += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  // for (let i = 0; i < 3; i++) {
  //   let num = getRandomNumber(0, 255);
  //   num = num.toString(16);
  //   console.log(num)
  // } 
  return '#' + colors;
}


function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}