var DECREMENT_BUTTON_HTML = '<td><button type="button" class="btn btn-danger btn-circle"><i class="glyphicon glyphicon-minus"></i></button></td>';

/**
 * Changes the product that is highlighted
 */
function new_product_clicked(product, prev){
	$("#add_button").removeClass('hidden');
	$(prev).removeClass('item-highlight');
	$(product).addClass('item-highlight');
}
	
/**
 * Adds new product to the order table
 */
function addProductToTable(name, quantity){
	var quantityTd='<td>' + quantity + '</td>', nameTd='<td>' + name + '</td>';
	$('#orderTable > tbody:last-child').append('<tr>' + quantityTd + nameTd + DECREMENT_BUTTON_HTML + '</tr>');
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
			out=key.toString();
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
	var quantity='<td>' + order[rowNumber].quantity + '</td>', name='<td>' + order[rowNumber].name + '</td>';
	$('#orderTable tr').eq(rowNumber).html(quantity + name + DECREMENT_BUTTON_HTML);
}
	
/**
 * Removes product from the order (from the html and the JSON object)
 * rowNumber: string, the number of the product in the order 
 * 				table (WARNING: 1 based indexing)
 * order: JSON object, the order
 */
function removeProduct(rowNumber, order){
	
}


