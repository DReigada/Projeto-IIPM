$(function(){

	// change the default options of the modals
	$('#acceptOrderModal').modal({
  		backdrop: 'static',
  		keyboard: false,
		show: false
	})
	$('#confirmedOrderModal').modal({
  		backdrop: 'static',
  		keyboard: false,
		show: false
	})
	$('#cancelOrderModal').modal({
  		backdrop: 'static',
  		keyboard: false,
		show: false
	})
	// determines which product is selected at each moment
	var selected_id="#option1", selected, selected_price;

	// Populates table with the current order if it already exists
	if (sessionStorage.numberOfProducts && sessionStorage.numberOfProducts != "0"){
		var obj = JSON.parse(sessionStorage.order);
		$.each(obj, function(key, value) {
    		addProductToTable(value["name"], value["quantity"], value["price"]);
		$(".totalPrice").html(sessionStorage["orderPrice"]);
		});
	// Creates the order object if it didn't exist already
	} else {
		sessionStorage.numberOfProducts = 0;
		sessionStorage.order=JSON.stringify({});
		sessionStorage["orderPrice"] = 0;
	}

	// Looks for clicks on the products and highlights if clicked
	$(".productButton").on("click", function(event){
		newProductClicked(event.delegateTarget, selected_id);
		selected_id = event.delegateTarget;
		selected = $(event.delegateTarget).find('.name').html();
		selected_price = parseInt($(event.delegateTarget).find('.price').html());
	});

	// if the logo home was clicked checks if are products in ordersList
	$("#home_click").on("click", function(event){
		if (sessionStorage.numberOfProducts == "0") { window.location.href = "home.html"; return; }
		$('#homeClickModal').modal('toggle');
	});

	// options homeClickButton is clicked
	$("#homeClickButton").on('click', function(event) {
		$('#homeClickModal').modal('toggle');
		var order = JSON.parse(sessionStorage.order);

		// if user wants to live, all product selected will be removed
		while (sessionStorage.numberOfProducts && sessionStorage.numberOfProducts != "0") {
			n = parseInt(sessionStorage.numberOfProducts);
			removeProduct(n, order);
		}
		localStorage.order = JSON.stringify(order);
		sessionStorage.numberOfProducts = 0;
	});

	// Adds product to order if the plus button was clicked
	$("#add_button").on("click", function(){
		// retrieves the order and the number of products there in from the local storage
		var order = JSON.parse(sessionStorage.order), n = Number(sessionStorage.numberOfProducts);
		var pos = isProductInTable(selected, order);
		sessionStorage["orderPrice"] = parseInt(sessionStorage["orderPrice"]) + selected_price;
		// if user wants to add product that is already in table, simply increment quantity value
		if (pos != -1){
			order[pos].quantity = order[pos].quantity + 1;
			changeQuantityOfProduct(pos, order);

		} else { // else adds new row to table
			sessionStorage.numberOfProducts = ++n;

			order[n] = {'name': selected, 'quantity': 1, price : selected_price};
			addProductToTable(selected, 1, selected_price);
		}
		sessionStorage.order = JSON.stringify(order);
	});

	$('#orderButton').on('click', function(event) {
		if (sessionStorage.numberOfProducts == "0") return;

		$('#acceptOrderModal').modal('toggle');
		var obj = JSON.parse(sessionStorage.order);
		$.each(obj, function(key, value) {
    		addProductToAcceptedTable(value["name"], value["quantity"], value["price"]);
		});
	});

	// cancel order button is clicked
	$('#cancelOptionButton').on('click', function(event) {
		if (sessionStorage.numberOfProducts == "0") { window.location.href = "home.html"; return; }
		$('#cancelOrderModal').modal('toggle');
	});

	$('#acceptOrderButton').on('click', function(event) {
		$('#acceptOrderModal').modal('toggle');
		var order = JSON.parse(sessionStorage.order);

		var storeOrder = {
			order: order,
			numberOfProducts : sessionStorage.numberOfProducts,
			price : sessionStorage.orderPrice
		}
		var ordersList;
		if (sessionStorage.ordersList) {
			ordersList = JSON.parse(sessionStorage.ordersList);
		}
		else{
			ordersList = [];
		}
		ordersList.push(storeOrder);
		sessionStorage.ordersList = JSON.stringify(ordersList);
		// if user wants to order, all product selected will be removed
		while (sessionStorage.numberOfProducts && sessionStorage.numberOfProducts != "0") {
			n = parseInt(sessionStorage.numberOfProducts);
			removeProduct(n, order);
		}
		localStorage.order = JSON.stringify(order);
		sessionStorage.numberOfProducts = 0;

		$("#acceptOrderTable > tbody:last").children().remove();
		$('#confirmedOrderModal').modal('toggle');


	});

	// cancel the order
	$("#cancelOrderButton").on('click', function(event) {
		$('#cancelOrderModal').modal('toggle');
		var order = JSON.parse(sessionStorage.order);

		// if user wants to cancel, all product selected will be removed
		while (sessionStorage.numberOfProducts && sessionStorage.numberOfProducts != "0") {
			n = parseInt(sessionStorage.numberOfProducts);
			removeProduct(n, order);
		}
		localStorage.order = JSON.stringify(order);
		sessionStorage.numberOfProducts = 0;
	});

	// doesn't confirm the order
	$("#notAcceptOrderButton").on('click', function(event) {
		$("#acceptOrderTable > tbody:last").children().remove();
	})

	// order confirmed
	$("#orderConfirmedButton").on('click', function(event) {
		$('#confirmedOrderModal').modal('toggle');
		$("#acceptOrderTable > tbody:last").children().remove();
	})

});
