$(function(){
  if (!sessionStorage.ordersList) return;
  var ordersList = JSON.parse(sessionStorage.ordersList);
  var counter = 1;
  for (var order of ordersList) {
    var $orderTable = $($("#orderTemplate").html()).appendTo("#accordion");
    var n = order.numberOfProducts;
    $orderTable.find('.totalPrice').html(order.price);
    $orderTable.closest(".orderTitle").html("Order " + counter++ );
    for (var i=1; i<=n; i++){
      var product = order.order[i];
      var quantityTd='<td>' + product.quantity + '</td>',
            nameTd='<td>' + product.name + '</td>',
            priceTd= '<td>' + product.price + '€</td>';
      var str = '<tr>' + quantityTd + nameTd + priceTd +'</tr>';
      $(str).appendTo($orderTable.find('tbody'));
    }
  }
  $("#accordion").accordion();
});
