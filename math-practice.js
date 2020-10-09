const _TWO_MINUTES = 2 * 60 * 1000;
const _FIVE_MINUTES = 5 * 60 * 1000;
let timerId;

let getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let selectFirstInput = function() {
  $($('#problem-table > div > input')[0]).focus();
};

let checkProblems = function() {
  let numCorrect = 0;
  $.map($('#problem-table > div'), function(e) {
    let elt = $(e);
    let input = elt.find('input');
    if (parseInt(eval(elt.text())) == parseInt(input.val())) {
      elt.addClass('correct');
      numCorrect += 1;
    } else {
      elt.addClass('incorrect')
    }
  });
  selectFirstInput();
  $('#timer').text(`You got ${numCorrect} of ${$('#problem-table > div').length} questions correct.`);
};

let updateTimer = function() {
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
    $('#timer').text(minutes + separator + seconds);
  }
};

let completeQuiz = function() {
  window.clearInterval(timerId);
  checkProblems();
};

let generateProblemTable = function(problemType, numProblems) {
  $('#problem-table').empty();
  for (let i=0; i<numProblems; i++) {
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
    let elt = $('<div/>').text(problem).append($('<hr>')).append($('<input type="text">'));
    $('#problem-table').append(elt);
  };
  selectFirstInput();
};

let problemType = function(e) {
  let elt = $(e.target);
  if (elt.hasClass('add')) {
    return 'add';
  }
  if (elt.hasClass('sub')) {
    return 'sub';
  }
  return 'mul';
}

let onStartClick = function(e) {
  let numProblems = 50;
  millisecondsRemaining = _TWO_MINUTES;
  if (problemType(e) == 'mul') {
    numProblems = 100;
    millisecondsRemaining = _FIVE_MINUTES;
  }
  timerId = window.setInterval(updateTimer, 1000);
  updateTimer();
  generateProblemTable(problemType(e), numProblems);
  $('.start-button').remove();
  let completeButton = $('<button>Check my answers</button>');
  completeButton.click(completeQuiz);
  $('#problem-table').after(completeButton);
};

$(document).ready(function() {
  $('.start-button').click(onStartClick);
});
