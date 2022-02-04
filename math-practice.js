let millisecondsRemaining;
let timerId;

let getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let selectFirstInput = function () {
  document.querySelector('#problem-table > div > input').focus();
};

let checkProblems = function () {
  let numCorrect = 0;
  document.querySelectorAll('#problem-table > div').forEach(elt => {
    let input = elt.querySelector('input');
    if (parseInt(eval(elt.innerText)) == parseInt(input.value)) {
      elt.classList.add('correct');
      numCorrect += 1;
    } else {
      elt.classList.add('incorrect')
    }
  });
  selectFirstInput();
  document.querySelector('.check-answers').remove();
  let numQuestions = document.querySelectorAll('#problem-table > div').length;
  document.getElementById('timer').innerText = `You got ${numCorrect} of ${numQuestions} questions correct.`;
};

let updateTimer = function () {
  if (millisecondsRemaining == 0) {
    alert('Time is up!');
    completeQuiz();
  } else {
    millisecondsRemaining -= 1000;
    let minutes = Math.floor(millisecondsRemaining / 1000 / 60);
    let seconds = Math.floor((millisecondsRemaining - (minutes * 1000 * 60)) / 1000);
    let separator = ':';
    if (seconds < 10) {
      separator = ':0';
    }
    document.getElementById('timer').innerText = `${minutes}${separator}${seconds}`;
  }
};

let completeQuiz = function () {
  window.clearInterval(timerId);
  checkProblems();
};

let generateProblemTable = function (problemType, numProblems) {
  document.getElementById('problem-table').innerHTML = '';
  for (let i = 0; i < numProblems; i++) {
    let problem = '';
    if (problemType == 'mul') {
      problem = getRandomInt(0, 12) + '*' + getRandomInt(0, 12);
    }
    if (problemType == 'add') {
      while (true) {
        problem = getRandomInt(0, 20) + '+' + getRandomInt(0, 20);
        if (eval(problem) <= 20) {
          break;
        }
      }
    }
    if (problemType == 'sub') {
      while (true) {
        problem = getRandomInt(0, 20) + '-' + getRandomInt(0, 20);
        if (eval(problem) >= 0) {
          break;
        }
      }
    }
    let elt = document.createElement('div');
    elt.innerText = problem;
    elt.appendChild(document.createElement('hr'));
    elt.appendChild(document.createElement('input', { 'type': 'text' }));
    document.getElementById('problem-table').appendChild(elt);
  };
  selectFirstInput();
};

let problemType = function (e) {
  let elt = e.target;
  if (elt.classList.contains('add')) {
    return 'add';
  }
  if (elt.classList.contains('sub')) {
    return 'sub';
  }
  return 'mul';
}

let onStartClick = function (e) {
  let numProblems = 50;
  if (problemType(e) == 'mul') {
    numProblems = 100;
  }
  millisecondsRemaining = e.target.parentElement.querySelector('input').value * 60 * 1000;
  timerId = window.setInterval(updateTimer, 1000);
  updateTimer();
  generateProblemTable(problemType(e), numProblems);
  document.querySelector('.buttons').remove();
  let completeButton = document.createElement('button');
  completeButton.classList.add('check-answers');
  completeButton.innerText = 'Check my answers';
  completeButton.addEventListener('click', completeQuiz)
  let table = document.getElementById('problem-table');
  table.parentElement.insertBefore(completeButton, table.nextSibling);
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.start-button').forEach(elt => {
    elt.addEventListener('click', onStartClick);
  });
});
