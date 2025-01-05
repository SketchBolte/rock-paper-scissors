let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};
/* If left value is false it will automatically use right value*/

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `<p class="update-score">Wins: ${score.wins}</p><p class="update-score">Loses: ${score.loses}</p><p class="update-score">Ties: ${score.ties}</p>`;
};
updateScoreElement();

let result = '';

function pickComputerMove() {
    let randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock'
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper'
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissor'
    }
    return computerMove;
}

let issAutoPlay = false;
let intervalId;
//const autoPlay = () => {
//   
//}
function autoPlay () {
    if (!issAutoPlay) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playgame(playerMove);
        }, 1000);
        issAutoPlay = true;
        document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing'
    } else {
        clearInterval(intervalId);
        issAutoPlay = false;
        document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play'
    }
}

document.querySelector('.js-autoplay-button')
    .addEventListener('click', autoPlay)

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playgame('Rock')
    });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playgame('Paper')
    });
document.querySelector('.js-scissor-button')
    .addEventListener('click', () => {
        playgame('Scissor')
    });
document.querySelector('.js-reset-button')
    .addEventListener('click', resetScoreAlert)

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playgame('Rock')
    } else if (event.key === 'p') {
        playgame('Paper')
    } else if (event.key === 's') {
        playgame('Scissor')
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        resetFunction();
    }
});

function playgame(playerMove) {

    let computerMove = pickComputerMove();

    if (playerMove === 'Scissor') {

        if (computerMove === 'Rock') {
            result = 'You Loose.';
        } else if (computerMove === 'Paper') {
            result = 'You Win.'
        } else if (computerMove === 'Scissor') {
            result = 'Tie.'
        }

    } else if (playerMove === 'Paper') {

        if (computerMove === 'Rock') {
            result = 'You Win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.'
        } else if (computerMove === 'Scissor') {
            result = 'You Loose.'
        }

    } else if (playerMove === 'Rock') {

        if (computerMove === 'Rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You Loose.'
        } else if (computerMove === 'Scissor') {
            result = 'You Win.'
        }

    }

    if (result === 'You Win.') {
        score.wins += 1
    } else if (result === 'Tie.') {
        score.ties += 1
    } else {
        score.loses += 1
    }



    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `<p>Your Pick <img src="${playerMove}-emoji.png" alt=""></p><p>Computer Pick <img src="${computerMove}-emoji.png" alt=""></p>`;
}

function resetFunction () {
    score.loses = 0;
    score.ties = 0;
    score.wins = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    alert(`Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`);
    document.querySelector('.js-reset-alert')
        .innerHTML = ''
}

function resetScoreAlert () {

    document.querySelector('.js-reset-alert')
        .innerHTML = `
        Are you sure you want to reset score?
        <button class="js-score-reset-alert-yes">Yes</button> <button class="js-score-reset-alert-no">No</button>`
        document.querySelector('.js-score-reset-alert-yes').addEventListener('click', resetFunction)
        document.querySelector('.js-score-reset-alert-no').addEventListener('click', () => {
            document.querySelector('.js-reset-alert')
        .innerHTML = ''
        })
    }

