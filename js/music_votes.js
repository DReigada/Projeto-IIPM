$(function(){
	const MAX_N_VOTES = 3;

	// init storage
	if (!localStorage.bar) {
    localStorage.bar = JSON.stringify({});
	}
	if (!sessionStorage.n_votes_left){
		sessionStorage.n_votes_left = MAX_N_VOTES;
		sessionStorage.user_votes = JSON.stringify({});
	}



	var votes = JSON.parse(sessionStorage.user_votes);

	for(music in votes){
		var $tableRow = $($("#voteTemplate").html()).appendTo('#votesTableBody');
		$tableRow.find('.name').html(music);
		$tableRow.find('.votes').html("voted");
	}

	$('.music-vote-button').on('click', function(e){
		// get name
		music = $(this).closest('li').find('.name').html();

		// increase the number of votes this music has got
		voteMusic(music);

		// add to table of votes or update quantity
		var musicObj = musicList.get("name", music)[0]._values;

		addMusicToVotesTable(musicObj.name);

	})

})
