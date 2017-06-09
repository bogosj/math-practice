var _FIVE_MINUTES = 1 * 60 * 1000;
var millisecondsRemaining = _FIVE_MINUTES;
var timerId;

var updateTimer = function() {
  if (millisecondsRemaining == 0) {
    window.clearInterval(timerId);
    completeQuiz();
  } else {
    millisecondsRemaining -= 100;
    $('#timer').text(millisecondsRemaining);
  }
};

var completeQuiz = function() {
  alert('Quiz over');
};

var onStartClick = function() {
  millisecondsRemaining = _FIVE_MINUTES;
  timerId = window.setInterval(updateTimer, 100);
};

var onLoad = function() {
  $('#start-button').click(onStartClick);
};

$(document).ready(onLoad);
