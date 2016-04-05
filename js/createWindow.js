$(".newWindowButton").click(function(event) {
     var scale = 0.6;

     var newWindow = $($("#windowTemplate").html()).appendTo('#table');
     newWindow.css('transform', 'scale(' + scale + ')');
     newWindow.find(".window").css({'transform': 'rotate(0deg)'});
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
