jQuery.fn.rotate = function(degrees, mode) {
  if (mode && ($(this).css("transform") != 'none')){
    var tr = $(this).css("transform");
    var values = tr.split('(')[1],
    values = values.split(')')[0],
    values = values.split(',');
    var angle = Math.round(Math.asin(values[1]) * (180/Math.PI));
    degrees += angle;
  }
  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
               '-moz-transform' : 'rotate('+ degrees +'deg)',
               '-ms-transform' : 'rotate('+ degrees +'deg)',
               'transform' : 'rotate('+ degrees +'deg)'});
};
