'use strict';
import { select, onEvent, words } from './utility.js';
import { Score } from './Score.js'

const backgroundSound = select('.background-sound')
const finalBtn = select('.restart-button-final')
const restartBtn = select('.restart-button');
const gameContent = select('.game-content')
const startModal = select('.start-modal')
const motorSound = select('.motor-sound');
const speedingUp = select('.speeding-up');
const percentage = select('.percentage')
const scoreText = select('.score-text');
const audiaoCar = select('.audio-car');
const endModal = select('.end-modal')
const startBtn = select('.start-btn')
const wordOutput = select('.word');
const timer = select('.timer');
const input = select('input');
const date = select('.date')
const hits = select('.hits')
backgroundSound.type = 'audio/mp3';
speedingUp.type = 'audio/mp3';
motorSound.type = 'audio/mp3';
audiaoCar.type = 'audio/mp3';
let currentWord;
let points = 0;
let timeLeft;
let timeFunc = time()

function randomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    let index = words.indexOf(currentWord);
    wordOutput.innerText = currentWord;
    currentWord = words[randomIndex];

    if (index !== -1) {
        words.splice(index, 1);
    };
};

function inputVerification() {
    let inputValue = input.value;
    if (inputValue == currentWord) {
        setTimeout(() => { wordOutput.classList.remove("shadow"); }, 400);
        wordOutput.classList.add("shadow");
        scoreText.innerText = points;
        speedingUp.play();
        input.value = "";
        randomWord();
        points++;
    };
};

function time() {
    timeLeft = 99;
    let timing = setInterval(() => {
            timer.textContent = timeLeft;
            timeLeft--;
            if (timeLeft < 0) {
                backgroundSound.pause()
                clearInterval(timing);
                audiaoCar.play();
                displayRecord()
            };
        }, 1000);
};

function getDate() {
    let date = new Date();
    return date.toLocaleString().substring(0, 9)
}

function displayRecord() {
    let attempt = new Score(getDate(), points, `${((100 * points) / 120).toFixed(2)}%`)
    percentage.textContent = attempt.percentage
    gameContent.style.display = 'none'
    date.textContent = attempt.date
    hits.textContent = attempt.hits
    endModal.style.display = 'grid'
}

function start() {
    gameContent.style.display = 'block'
    startModal.style.display = 'none'
    motorSound.play();
    restart()
}

function restart() {
    gameContent.style.display = 'block'
    endModal.style.display = 'none'
    scoreText.innerText = points;
    input.value = "";
    backgroundSound.currentTime = 0
    randomWord();
    timeLeft = 99
    points = 0;
    timeFunc
}

onEvent('ended', backgroundSound, () => {backgroundSound.play();})
setInterval(() => {input.classList.remove('green-shadow')}, 1500);
setInterval(() => {input.classList.add('green-shadow')}, 750);
onEvent('ended', motorSound, () => {backgroundSound.play();})
onEvent('input', input, inputVerification);
onEvent('click', restartBtn, restart);
onEvent('click', finalBtn, restart);
onEvent('click', startBtn, start);
