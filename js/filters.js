$(function(){
	//activate the switch
	$("[name='alcohol-checkbox']").bootstrapSwitch();
	
	$('[name="alcohol-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state){
    	if (!state) $('#noCategorySelected').prop('checked',true);
	})
	$('[name="categoryRadio"]').on('click', function(event){
		console.log('heelo');
		if ($(event.delegateTarget).attr('id') !== 'noCategorySelected'){ 
			$('input[name="alcohol-checkbox"]').bootstrapSwitch('state', true, true);
		}
	})
	$("input[name='productSearch']").on('click', function(){
		$('input[name="alcohol-checkbox"]').bootstrapSwitch('state', true, true);
		$('#noCategorySelected').prop('checked',true);
	})
});
