$(function(){ 
	
	// determines which product is selected at each moment
	var selected_id="#option1", selected;
	
	// Populates table with the current order if it already exists
	if (localStorage.numberOfProducts && localStorage.numberOfProducts != "0"){
		var obj = JSON.parse(localStorage.order);
		$.each(obj, function(key, value) {
    		addProductToTable(value["name"], value["quantity"]);
		});
		
	// Creates the order object if it didn't exist already
	} else {
		localStorage.numberOfProducts = 0;
		localStorage.order=JSON.stringify({});
	}
	
	// Looks for clicks on the products and highlights if clicked
	$("#option1").on("click", function(){
		new_product_clicked("#option1", selected_id);
		selected_id = "#option1";
		selected = option1;
	});
	$("#option2").on("click", function(){
		new_product_clicked("#option2", selected_id);
		selected_id = "#option2";
		selected = option2;
	});
	$("#option3").on("click", function(){
		new_product_clicked("#option3", selected_id);
		selected_id = "#option3";
		selected = option3;
	});
	$("#option4").on("click", function(){
		new_product_clicked("#option4", selected_id);
		selected_id = "#option4";
		selected = option4;
	});
	
	// Adds product to order if the plus button was clicked
	$("#add_button").on("click", function(){
		// retrieves the order and the number of products there in from the local storage
		var order = JSON.parse(localStorage.order), n = localStorage.numberOfProducts;
		var pos = isProductInTable(selected, order);
		
		// if user wants to add product that is already in table, simply increment quantity value
		if (pos != -1){
			
			order[pos].quantity = Number(order[pos].quantity) + 1;
			changeQuantityOfProduct(n, 1);
			
		} else { // else adds new row to table
			localStorage.numberOfProducts = ++n;
			
			order[n.toString()] = {'name': selected, 'quantity': '1'};
			localStorage.order = JSON.stringify(order);
			
			addProductToTable(selected, 1);
		}
		
		
		
	})
});

