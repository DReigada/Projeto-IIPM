$(function(){ 
	//sessionStorage.clear();
	
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
	$("#option1").on("click", function(){
		newProductClicked("#option1", selected_id);
		selected_id = "#option1";
		selected = option1;
	});
	$("#option2").on("click", function(){
		newProductClicked("#option2", selected_id);
		selected_id = "#option2";
		selected = option2;
	});
	$("#option3").on("click", function(){
		newProductClicked("#option3", selected_id);
		selected_id = "#option3";
		selected = option3;
	});
	$("#option4").on("click", function(){
		newProductClicked("#option4", selected_id);
		selected_id = "#option4";
		selected = option4;
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
	
});

