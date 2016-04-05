$(".newWindowButton").click(function(event) {
  var scale = 0.6;

  // create the new window
  var newWindow = $($("#windowTemplate").html()).appendTo('#table');
  // scale the window
  newWindow.css('transform', 'scale(' + scale + ')');

  // the values that depend on the button pressed
  var top, left, angle;
  switch (event.delegateTarget.id) {
    case "topButton":
      top = '15%';
      left = '18.5%';
      angle = 180;
      break;
    case "bottomButton":
      top = '56%';
      left = '18.5%';
      angle = 0;
      break;
    case "leftButton":
      top = '40%';
      left = '-10%';
      angle = 90;
      break;
  case "rightButton":
    top = '40%';
    left = '52%';
    angle = -90;
    break;
  }
  // apply the values to the position and rotation
  newWindow.css({
    top: top,
    left: left
  });
  newWindow.find(".window").css({'transform': 'rotate('+ angle + 'deg)'});

  // the container to drag the window
  var limits = [0,0, $("#table").width() - newWindow.find(".window").width() * scale, $("#table").height() - newWindow.find(".window").height() * scale];

  // make the window draggable
  newWindow.draggable({
   iframeFix : true,
   containment: limits
  });

  // associate the exit and rotate buttons to their functions
  newWindow.find(".exitButton").click(function(event) {
   $(this).parents(".windowDraggable").remove();
  });
  newWindow.find(".rotateButton").click(function(event) {
   $(this).parents(".window").animate({'transform': '+=rotate(90deg)'});

  });
 });
