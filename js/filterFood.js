$(function(){
	
	$('[name="categoryRadio"]').on('click', function(event){
		var category=$(event.delegateTarget).attr('id');
		if (category !== 'noCategorySelected') filterByCategory(category);
		else userList.filter();
	})
	$("input[name='productSearch']").on('click', function(){
		$('#noCategorySelected').prop('checked',true);
		userList.filter();
	})
});
