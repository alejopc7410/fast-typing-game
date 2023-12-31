'use strict';

import { select, onEvent } from './utility.js';

let scoreArray = [];
let itemNum = 1
const numberOfItems = localStorage.length;

for (let i = 0; i < numberOfItems; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    scoreArray.push({hits: value});
}

function recordScore(parent, points) {
    parent.innerHTML = ''
    scoreArray.splice(9)
    
    localStorage.setItem(`score ${itemNum}`, points)
    let point = localStorage.getItem(`score ${itemNum}`)
    const score = {
        hits: point,
    };
    
    scoreArray.unshift(score);
    scoreArray.sort((a, b) => b.hits - a.hits);

    scoreArray.forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
            <span>#${index + 1}</span>
            <span>${item.hits} words</span>
            <span>${((100 * item.hits) / 120).toFixed(2)}%</span>
        `;
        parent.appendChild(li);
    });
    itemNum++
}

const finalScoreDiv = select('.final-score')
const showScoreBtn = select('.show-score-btn')
const scoreList = select('.score-list')
const advice = document.createElement('p')

function validateScores() {
    let itemsNum = localStorage.length
    if (itemsNum === 0) {
        finalScoreDiv.insertBefore(advice, scoreList)
        advice.textContent = "No scores avaible"
    } else {
        advice.style.display = 'none'
    }
}

function clearScore() {
    localStorage.clear()
    const finalScoreList = select('.final-score ul')
    finalScoreList.innerHTML = ''
    advice.style.display = 'block'
    scoreArray = []
    itemNum = 1
}

function hideScore() {
    showScoreBtn.style.display = 'grid'
    finalScoreDiv.style.display = 'none'
}

function showScore() {
    showScoreBtn.style.display = 'none'
    finalScoreDiv.style.display = 'block'
}

export {recordScore, scoreArray, hideScore, showScore, validateScores, clearScore}