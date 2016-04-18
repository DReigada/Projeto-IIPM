$(function(){
	//activate the switch
	$("[name='alcohol-checkbox']").bootstrapSwitch();
	
	$('[name="alcohol-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state){
    	if (state){
			if ($('#soda').prop('checked')) $('#noCategorySelected').prop('checked',true);
			filterByAlcohol("true");
		}
		else { 
			if (!$('#soda').prop('checked')) $('#noCategorySelected').prop('checked',true);
			filterByAlcohol("false");
		}
	})
	$('[name="categoryRadio"]').on('click', function(event){
		var category=$(event.delegateTarget).attr('id');
		if (category !== 'noCategorySelected') {
			if (category == 'soda') $('input[name="alcohol-checkbox"]').bootstrapSwitch('state', false);
			else $('input[name="alcohol-checkbox"]').bootstrapSwitch('state', true);
			filterByCategory(category);
		} else {
			$('input[name="alcohol-checkbox"]').bootstrapSwitch('indeterminate', true, true);
			userList.filter();
		}
	})
	$("input[name='productSearch']").on('click', function(){
		$('input[name="alcohol-checkbox"]').bootstrapSwitch('indeterminate', true, true);
		$('#noCategorySelected').prop('checked',true);
		userList.filter();
	})
	
	function filterByAlcohol(filter){
		userList.filter(function(item) {			
			return item.values().alcohol == filter;
		});	
	}
	
	function filterByCategory(category){
		userList.filter(function(item) {
			return item.values().category == category;
		})
	}
});
