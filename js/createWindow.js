$(".newWindowButton").click(function(event) {
  var scale = 0.6;

  var newWindow = $($("#windowTemplate").html()).appendTo('#table'); // create the new window
  newWindow.css('transform', 'scale(' + scale + ')');                // scale the window

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
  newWindow.css({
    top: top,
    left: left
  });
  newWindow.find(".window").css({'transform': 'rotate('+ angle + 'deg)'});


  var limits = [0,0, $("#table").width() - newWindow.find(".window").width() * scale, $("#table").height() - newWindow.find(".window").height() * scale];

  newWindow.draggable({
   iframeFix : true,
   containment: limits
  });
  newWindow.find(".exitButton").click(function(event) {
   $(this).parents(".windowDraggable").remove();
  });
  newWindow.find(".rotateButton").click(function(event) {
   $(this).parents(".window").animate({'transform': '+=rotate(90deg)'});

  });
 });
