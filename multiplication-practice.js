var onStartClick = function() {
  alert('hi');
};

var onLoad = function() {
  $('#start-button').click(onStartClick);
};

$(document).ready(onLoad);
