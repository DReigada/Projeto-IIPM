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
	var button='<td><button type="button" class="btn btn-danger btn-circle"><i class="glyphicon glyphicon-minus"></i></button></td>';
	$('#orderTable > tbody:last-child').append('<tr>' + quantityTd + nameTd + button + '</tr>');
}

/**
 * Checks if a certain product is in the table and returns it's position if it is.
 * 
 * name: string, name of the product
 * order: JSON object, the table
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
 *	Modifies the quantity of the product by one in the product order,
 *  either by incrementing or decrementing it. 
 *  NOTE: Removes product from table if quantity gets to 0.
 *  
 *  rowNumber: string, the number of the product in the order 
 * 				table (WARNING: 1 based indexing)
 *	sign: int, indicates if it is to increment or decrement the quantity. 
 *		  To increment this parameter should be a '1', else a '0'
 *
 */
function changeQuantityOfProduct(rowNumber, sign){
	
}
	
/**
 * Removes product from the order
 * rowNumber: string, the number of the product in the order 
 * 				table (WARNING: 1 based indexing)
 */
function removeProduct(rowNumber){
		
}


