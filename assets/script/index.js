'use strict';
import {select, selectAll, onEvent, words} from './utility.js';
import {Score} from './classes.js'

const wordOutput = select('.word');
const input = select('input');
const restartBtn = select('.restart-button');
const timer = select('.timer');
const audiaoCar = select('.audio-car');
const motorSound = select('.motor-sound');
const speedingUp = select('.speeding-up');
const backgroundSound = select('.background-sound')
const scoreText = select('.score-text');
const startModal = select('.start-modal')
const endModal = select('.end-modal')
const gameContent = select('.game-content')
const resultInfo = select('.final-modal p')
const finalBtn = select('.restart-button-final')
const startBtn = select('.start-btn')
speedingUp.type = 'audio/mp3';
backgroundSound.type = 'audio/mp3';
motorSound.type = 'audio/mp3';
audiaoCar.type = 'audio/mp3';
let points = 0;
let currentWord;



function randomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    let index = words.indexOf(currentWord);
    currentWord = words[randomIndex];
    wordOutput.innerText = currentWord;
    console.log(currentWord);

    if (index !== -1) {
        words.splice(index, 1);
    };
};

function inputVerification() {
    let inputValue = input.value;
    if (inputValue == currentWord) {
        input.value = "";
        randomWord();
        points++;
        scoreText.innerText = points;
        wordOutput.classList.add("shadow");
        setTimeout(() => {wordOutput.classList.remove("shadow");}, 400);
        speedingUp.play();
    };
};


function time() {
    let timeLeft = 75;
    let timing = 
    setInterval(() => {
        timer.textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timing);
            audiaoCar.play();
            backgroundSound.pause()
            displayRecord()
        };
    }, 1000);
}; 
function displayRecord() {
    let attempt = new Score(new Date().toString().substring(0, 15), points, `${((100 * points) / 120).toFixed(2)}%`)
    gameContent.style.display = 'none'
    endModal.style.display = 'grid'
    resultInfo.innerHTML = `<span class="result-title">Date:</span class="result-title">&nbsp &nbsp ${attempt.date} <br> <span class="result-title">Hits:</span class="result-title">&nbsp &nbsp ${attempt.hits} 
    <br> <span class="result-title">Percentage:</span class="result-title"> &nbsp &nbsp${attempt.percentage}`
    console.log(attempt.percentage)
}

function start() {
    points = 0;
    scoreText.innerText = points;
    randomWord();
    time()
    setTimeout(() => {
        backgroundSound.play();
        onEvent('ended', backgroundSound, () => {
            backgroundSound.currentTime = 0;
            backgroundSound.play();
        })
    }, 7000);
    startModal.style.display = 'none'
    gameContent.style.display = 'block'
    motorSound.play();
    console.log(points)
}

onEvent('click', startBtn, start);
onEvent('click', restartBtn, () => {location.reload()});
onEvent('click', finalBtn, () => {
    startModal.style.display = 'grid'
    gameContent.style.display = 'none'
    endModal.style.display = 'none'
});
onEvent('input', input, inputVerification);

setInterval(() => {input.classList.add('green-shadow')}, 750);
setInterval(() => {input.classList.remove('green-shadow')}, 1500);
