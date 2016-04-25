$(function(){
	// init storage
	if (!localStorage.bar) {
    localStorage.bar = JSON.stringify({});
	}
	if (!sessionStorage.n_votes_left){
		sessionStorage.n_votes_left = MAX_N_VOTES;
		sessionStorage.next_vote_id = 1;
		sessionStorage.user_votes = JSON.stringify({});
	
	} else { 
		n_votes_left = Number(sessionStorage.n_votes_left);
		$("#votes-left span").html(n_votes_left);
		if (n_votes_left == 0) $('.music-vote-button').disable(true);
	}

	setInterval(function(){
		updateVotesStates();
		deleteVotesTable();
		populateVotesTable();
	}, 5000);

	$('.music-vote-button').on('click', function(e){
		// get name
		music = $(this).closest('li').find('.name').html();
	
		// adds vote
		voteMusic(music);

	})
	
	$('#votesTable').on('click', '.music-unvote-button', function(e){
		var $row = $(this).closest('tr');
		unvoteMusic($row);
	})

})
