$(function(){ 
	
	function new_product_clicked(product, prev){
		$("#add_button").removeClass('hidden');
		$(prev).removeClass('item-highlight');
		$(product).addClass('item-highlight');
	}
	
	function addProductToTable(name, quantity){
		var quantityTd='<td>' + quantity + '</td>', nameTd='<td>' + name + '</td>';
		var button='<td><button type="button" class="btn btn-danger btn-circle"><i class="glyphicon glyphicon-minus"></i></button></td>'
		$('#orderTable > tbody:last-child').append('<tr>' + quantityTd + nameTd + button + '</tr>');
	}
	
	var selected_id="#option1", selected;
	
	if (localStorage.numberOfProducts && localStorage.numberOfProducts != "0"){
		console.log("ja criado");
		var obj = JSON.parse(localStorage.order);
		$.each(obj, function(key, value) {
    		addProductToTable(value["name"], value["quantity"]);
		});
	
	} else {
		console.log("a criar");
		localStorage.numberOfProducts = 0;
		localStorage.order=JSON.stringify({});
	}
	
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
	
	$("#add_button").on("click", function(){
		var order = JSON.parse(localStorage.order), n = localStorage.numberOfProducts;
		
		// if already selected add quantity
		if (!$.isEmptyObject(order) && order[n].name === selected){
			console.log("name == previous");
			order[n].quantity = Number(order[n].quantity) + 1;
			//TODO: update table
			
		} else { // else add row to table
			console.log("name != previous or first product in order");
			localStorage.numberOfProducts = ++n;
			
			order[n.toString()] = {'name': selected, 'quantity': '1'};
			localStorage.order = JSON.stringify(order);
			
			addProductToTable(selected, 1);
		}
		
		
		
	})
});