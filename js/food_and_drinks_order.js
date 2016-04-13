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
	var selected_id="#option1", selected;

	// Populates table with the current order if it already exists
	if (sessionStorage.numberOfProducts && sessionStorage.numberOfProducts != "0"){
		var obj = JSON.parse(sessionStorage.order);
		$.each(obj, function(key, value) {
    		addProductToTable(value["name"], value["quantity"]);
		});

	// Creates the order object if it didn't exist already
	} else {
		sessionStorage.numberOfProducts = 0;
		sessionStorage.order=JSON.stringify({});
	}

	// Looks for clicks on the products and highlights if clicked
	$(".productButton").on("click", function(event){
		newProductClicked(event.delegateTarget, selected_id);
		selected_id = event.delegateTarget;
		selected = $(event.delegateTarget).find('.name').html();
	});

	// Adds product to order if the plus button was clicked
	$("#add_button").on("click", function(){
		// retrieves the order and the number of products there in from the local storage
		var order = JSON.parse(sessionStorage.order), n = Number(sessionStorage.numberOfProducts);
		var pos = isProductInTable(selected, order);

		// if user wants to add product that is already in table, simply increment quantity value
		if (pos != -1){
			order[pos].quantity = order[pos].quantity + 1;
			changeQuantityOfProduct(pos, order);

		} else { // else adds new row to table
			sessionStorage.numberOfProducts = ++n;

			order[n] = {'name': selected, 'quantity': 1};
			addProductToTable(selected, 1);
		}
		sessionStorage.order = JSON.stringify(order);
	});

	$('#orderButton').on('click', function(event) {
		if (sessionStorage.numberOfProducts == "0") return;

		$('#acceptOrderModal').modal('toggle');
		var obj = JSON.parse(sessionStorage.order);
		$.each(obj, function(key, value) {
    		addProductToAcceptedTable(value["name"], value["quantity"]);
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
