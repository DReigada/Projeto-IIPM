$(function(){
	const MAX_N_VOTES = 3;
	
	// init storage
	if (!localStorage.bar) {
    localStorage.bar = JSON.parse({});
	}
	if (!sessionStorage.n_votes_left){
		sessionStorage.n_votes_left = MAX_N_VOTES;
		sessionStorage.user_votes = JSON.parse({});
	}
	
	
})


