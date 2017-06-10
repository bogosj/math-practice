var _FIVE_MINUTES = 5 * 60 * 1000;
var millisecondsRemaining = _FIVE_MINUTES;
var timerId;

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var selectFirstInput = function() {
  $($('#problem-table > div > input')[0]).focus();
};

var checkProblems = function() {
  var numCorrect = 0;
  $.map($('#problem-table > div'), function(e) {
    var elt = $(e);
    var input = elt.find('input');
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

var updateTimer = function() {
  if (millisecondsRemaining == 0) {
    alert('Time is up!');
    completeQuiz();
  } else {
    millisecondsRemaining -= 100;
    var minutes = Math.floor(millisecondsRemaining / 1000 / 60);
    var seconds = Math.floor((millisecondsRemaining - (minutes * 1000 * 60)) / 1000);
    var separator = ':';
    if (seconds < 10) {
      separator = ':0';
    }
    $('#timer').text(minutes + separator + seconds);
  }
};

var completeQuiz = function() {
  window.clearInterval(timerId);
  checkProblems();
};

var generateProblemTable = function() {
  $('#problem-table').empty();
  for (var i=0; i<100; i++) {
    var problem = getRandomInt(0, 12) + '*' + getRandomInt(0, 12);
    var elt = $('<div/>').text(problem).append($('<hr>')).append($('<input type="text">'));
    $('#problem-table').append(elt);
  };
  selectFirstInput();
};

var onStartClick = function() {
  millisecondsRemaining = _FIVE_MINUTES;
  timerId = window.setInterval(updateTimer, 100);
  generateProblemTable();
  var completeButton = $('<button>Check my answers</button>');
  completeButton.click(completeQuiz);
  $('#start-button').after(completeButton);
  $('#start-button').remove();
};

var onLoad = function() {
  $('#start-button').click(onStartClick);
};

$(document).ready(onLoad);
