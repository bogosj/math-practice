const _FIVE_MINUTES = 5 * 60 * 1000;
let millisecondsRemaining = _FIVE_MINUTES;
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
  $('#timer').text('You got ' + numCorrect + ' of 100 questions correct.');
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

let generateProblemTable = function() {
  $('#problem-table').empty();
  for (let i=0; i<100; i++) {
    let problem = getRandomInt(0, 12) + '*' + getRandomInt(0, 12);
    let elt = $('<div/>').text(problem).append($('<hr>')).append($('<input type="text">'));
    $('#problem-table').append(elt);
  };
  selectFirstInput();
};

let onStartClick = function() {
  millisecondsRemaining = _FIVE_MINUTES;
  timerId = window.setInterval(updateTimer, 1000);
  generateProblemTable();
  $('#start-button').remove();
  let completeButton = $('<button>Check my answers</button>');
  completeButton.click(completeQuiz);
  $('#problem-table').after(completeButton);
};

$(document).ready(function() {
  $('#start-button').click(onStartClick);
});
