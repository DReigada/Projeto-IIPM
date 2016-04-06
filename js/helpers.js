var DECREMENT_BUTTON_HTML = '<td><button type="button" class="btn btn-danger small-btn-circle decrease_button"><i class="glyphicon glyphicon-minus"></i></button></td>';

/**
 * Changes the product that is highlighted
 */
function newProductClicked(product, prev){
	$("#add_button").removeClass('hidden');
	
	$(prev).addClass('hidden_border');
	$(prev).removeClass('item-highlight');
	
	$(product).addClass('item-highlight');
	$(product).removeClass('hidden_border');
	
}
	
/**
 * Adds new product to the order table
 */
function addProductToTable(name, quantity){
	var quantityTd='<td>' + quantity + '</td>', nameTd='<td>' + name + '</td>';
	var str = '<tr>' + quantityTd + nameTd + DECREMENT_BUTTON_HTML + '</tr>';
	var $div = $(str).appendTo('#orderTable > tbody:last-child');
	
	$($div).on("click", "button", function(){
		
		var order = JSON.parse(sessionStorage.order);
		
		var $tr = $(this).closest('tr'); // gets the tr element of the clicked button
		var rowIndex = $tr.index() + 1;      // gets the row number of the clicked button
		
		// decrease the quantity in the order object
		order[rowIndex].quantity = order[rowIndex].quantity - 1;
		sessionStorage.order = JSON.stringify(order);
		
		// decrease the quantity in the order table (deletes product if quantity is 0)
		changeQuantityOfProduct(rowIndex, order);
		
	});
}

/**
 * Checks if a certain product is in the table and returns it's position if it is.
 * 
 * name: string, name of the product
 * order: JSON object, the order
 * returns int, the position of the product if it is present in the table or -1 if not
 * WARNING: the return value is 1 based indexing
 */ 
function isProductInTable(name, order){
	
	if ($.isEmptyObject(order)) return -1;
	var out = -1;
	$.each(order, function(key, value) {
   		if (value["name"] === name){ 
			out=key;
			return;
		}
	});
	return out;
 }

/**
 *	Modifies the quantity of a specific product in the order table (html) for the given value.
 *  NOTE: Removes product from table if quantity gets to 0.
 *  
 *  rowNumber: int, the number of the product in the order 
 * 				table (WARNING: 1 based indexing)
 *	order: JSON object, the order
 *  
 *
 */
function changeQuantityOfProduct(rowNumber, order){
	if (order[rowNumber].quantity == 0) removeProduct(rowNumber, order);
	else {
		var quantity='<td>' + order[rowNumber].quantity + '</td>', name='<td>' + order[rowNumber].name + '</td>';
		$('#orderTable tr').eq(rowNumber).html(quantity + name + DECREMENT_BUTTON_HTML);
	}
}
	
/**
 * Removes product from the order (from the html and the JSON object)
 * rowNumber: int, the number of the product in the order 
 * 				table (WARNING: 1 based indexing)
 * order: JSON object, the order
 */
function removeProduct(rowNumber, order){
	var n = sessionStorage.numberOfProducts;
		
	var key;
	for (var i=0; i<n; ++i){
		key=i+1;
		var next = key+1;
		if (key >= n) break;
		if (key < rowNumber) continue;
		
		order[key] = order[next];
	}
	delete order[key];

	sessionStorage.numberOfProducts = --n;
	sessionStorage.order = JSON.stringify(order);

	$('#orderTable tr').eq(rowNumber).remove();
}


