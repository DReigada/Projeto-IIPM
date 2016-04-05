$(function(){ 
	$("#add_button").css('visibility', 'hidden');
	console.log("yayayayay");
	function new_product_clicked(product){
		$("#add_button").css('visibility', 'visible');
		console.log("hello " + product);
	}
	
	$("#option1").on("click", function(){
		new_product_clicked(option1);
	});
	$("#option2").on("click", function(){
		new_product_clicked(option2);
	});
	$("#option3").on("click", function(){
		new_product_clicked(option3);
	});
	$("#option4").on("click", function(){
		new_product_clicked(option4);
	});
	
});