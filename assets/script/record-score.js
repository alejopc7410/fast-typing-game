'use strict';

let scoreArray = [];

function recordScore(parent, points) {
    parent.innerHTML = ''
    scoreArray.splice(9)

    const score = {
        hits: points,
    };
    scoreArray.unshift(score);
    scoreArray.sort((a, b) => b.hits - a.hits);

    for (let i = 0; i < scoreArray.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `
        <span>#${i + 1}</span>
        <span>${scoreArray[i].hits} words</span>
        <span>${((100 * scoreArray[i].hits) / 120).toFixed(2)}%</span>
        `;
        parent.appendChild(li);
    }
    
}

const finalScoreDiv = document.querySelector('.final-score')
const showScoreBtn = document.querySelector('.show-score-btn')
function hideScore() {
    showScoreBtn.style.display = 'grid'
    finalScoreDiv.style.display = 'none'
}

function showScore() {
    showScoreBtn.style.display = 'none'
    finalScoreDiv.style.display = 'block'
}

export {recordScore, scoreArray, hideScore, showScore}