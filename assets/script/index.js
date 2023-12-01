'use strict';
import {select, selectAll, onEvent, words} from './utility.js'

const wordOutput = select('.word')
const input = select('input')
const restartBtn = select('.restart-button')
const timer = select('.timer')
const audiaoCar = select('.audio-car');
const motorSound = select('.motor-sound')
const speedingUp = select('.speeding-up')
const scoreText = select('.score-text')
speedingUp.type = 'audio/mp3'
motorSound.type = 'audio/mp3';
audiaoCar.type = 'audio/mp3';
let score = 0;
let currentWord;



function randomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    let index = words.indexOf(currentWord);
    currentWord = words[randomIndex]
    wordOutput.innerText = currentWord
    console.log(currentWord)

    if (index !== -1) {
        words.splice(index, 1);
    }
}
randomWord()

function inputVerification() {
    let inputValue = input.value
    if (inputValue == currentWord) {
        input.value = ""
        randomWord()
        score++
        scoreText.innerText = score;
        wordOutput.classList.add("shadow")
        setTimeout(() => {wordOutput.classList.remove("shadow");}, 400)
        speedingUp.play()
    }
}

onEvent('input', input, inputVerification)
function time() {
    let timeLeft = 5;
    let timing = 
    setInterval(() => {
        timer.textContent = timeLeft
        timeLeft--
        if (timeLeft < 0) {
            clearInterval(timing)
            audiaoCar.play()
        }
    }, 1000)
} 

onEvent('load', window, time)

setInterval(() => {input.classList.add('green-shadow')}, 750)
setInterval(() => {input.classList.remove('green-shadow')}, 1500)