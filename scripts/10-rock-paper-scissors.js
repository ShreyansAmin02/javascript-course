// Object to store the score
let score = JSON.parse(localStorage.getItem('Score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}
  ; // Get the score from local storage
console.log(localStorage.getItem('Score'));

updateScoreElement();

// Function to play the game
function playGame(playerMove) {
  const computerMove = pickComputerMove(); // Get computer's move

  // Determine the result based on player's move and computer's move
  if (playerMove == "Scissors") {
    if (computerMove === 'Rock') {
      result = 'You lose!';
    } else if (computerMove === 'Paper') {
      result = 'You win!';
    } else {
      result = 'Tie!';
    }
  }
  else if (playerMove == "Paper") {
    if (computerMove === 'Rock') {
      result = 'You win!';
    } else if (computerMove === 'Paper') {
      result = 'Tie!';
    } else {
      result = 'You lose!';
    }
  }
  else if (playerMove == "Rock") {
    if (computerMove === 'Rock') {
      result = 'Tie!';
    } else if (computerMove === 'Paper') {
      result = 'You lose!';
    } else {
      result = 'You win!';
    }
  }

  // Update the score
  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'You lose!') {
    score.losses++;
  } else {
    score.ties++;
  }

  localStorage.setItem('Score', JSON.stringify(score)); // Save the score to local storage

  updateScoreElement();


  // Display the result
  updateMovesElement(playerMove, computerMove);
  document.querySelector('.js-result')
    .innerHTML = `Result: ${result}`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateMovesElement(playerMove, computerMove) {
  document.querySelector('.js-moves')
    .innerHTML = `Moves: You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png"
  class="move-icon"> Computer`;
}


// Function to randomly pick the computer's move
function pickComputerMove() {
  const randomNumber = Math.random(); // Generate a random number between 0 and 1
  let computerMove = '';

  // Assign a move based on the random number
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }
  console.log(computerMove); // Log the computer's move to the console
  return computerMove; // Return the computer's move
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  localStorage.setItem('Score', JSON.stringify(score));
  alert('Score has been reset!');
  updateScoreElement();
  document.querySelector('.js-result')
    .innerHTML = 'Result:';
  document.querySelector('.js-moves')
    .innerHTML = 'Moves:';
}