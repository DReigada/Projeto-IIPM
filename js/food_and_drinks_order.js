$(function(){ 
	var selected_id="#option1", selected;
	
	function new_product_clicked(product, prev){
		$("#add_button").removeClass('hidden');
		$(prev).removeClass('item-highlight');
		$(product).addClass('item-highlight');
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
		
	})
});