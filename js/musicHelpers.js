// a function to disable buttons, inputs, selects and textareas (note: not anchors)
jQuery.fn.extend({
    disable: function(state) {
        return this.each(function() {
            this.disabled = state;
        });
    }
});

function Music(name, artist, category, duration){ //add year when it was released?
		this.name = name;
		this.artist = artist;
		this.category = category;
		this.duration = duration;
}

function voteMusic(music) {
	var user_votes = JSON.parse(sessionStorage.user_votes);
	var n_votes_left = Number(sessionStorage.n_votes_left);
	var next_id = Number(sessionStorage.next_vote_id);

	if (n_votes_left == 0) return;
	
	user_votes[next_id] = {'music': music, 'state': IN_10_MIN};
	--n_votes_left;

	$("#votes-left span").html(n_votes_left);
	if (n_votes_left == 0) $('.music-vote-button').disable(true);
	
	addMusicToVotesTable(music, next_id);
	
	sessionStorage.next_vote_id = next_id + 1;
	sessionStorage.user_votes = JSON.stringify(user_votes);
	sessionStorage.n_votes_left = n_votes_left;
}

function addMusicToVotesTable(music, vote_id){
  var $tableRow = $($("#voteTemplate").html()).appendTo('#votesTableBody');
  $tableRow.find('.name').html(music);
  $tableRow.find('.music-state').html(IN_10_MIN);
	$tableRow.closest('tr').data('vote-id', vote_id);
}

function unvoteMusic(row) {
	var user_votes = JSON.parse(sessionStorage.user_votes);
	var vote_id = row.data('vote-id');
	var music_name = user_votes[vote_id].music;
	var music_state = user_votes[vote_id].state;
	
	/* TODO: send message to user if any of the following checks is true */
	// check if music id is not valid (should never happen)
	if (vote_id >= sessionStorage.next_vote_id) return;
	
	// check if music hasn't played yet and is not the next song playing
	if (music_state == HAS_PLAYED || music_state == NEXT_SONG || music_state == CURRENT_SONG) return;
	/* END TODO */
	
	/* ## UPDATE STORAGE ## */

	delete user_votes[vote_id]; // remove vote
	sessionStorage.user_votes = JSON.stringify(user_votes);
	var n_votes_left = Number(sessionStorage.n_votes_left) + 1; // increase number of votes left
	sessionStorage.n_votes_left = n_votes_left;
	
	/* ## UPDATE DISPLAY ## */
	$("#votes-left span").html(n_votes_left); // update votes left display
	row.remove(); // delete music vote from votes table
	// allow new votes (only changes something if user had already used up his votes)
	$('.music-vote-button').disable(false);
}

function updateVotesStates() {
	var next_count = 0;
	var user_votes = JSON.parse(sessionStorage.user_votes);
	for (vote in user_votes){ 
		// only allow one current song and one next song
		if (user_votes[vote].state == IN_5_MIN && next_count++) continue;
		user_votes[vote].state = nextState(user_votes[vote].state);
	}
	sessionStorage.user_votes = JSON.stringify(user_votes);
}

function deleteVotesTable() {
	$('#votesTableBody').empty();
}

function populateVotesTable() {
	// TODO: remove delete vote button if music already played, his playing or his next song
	var votes = JSON.parse(sessionStorage.user_votes);

	for(vote in votes){
		var $tableRow = $($("#voteTemplate").html()).appendTo('#votesTableBody');
		$tableRow.find('.name').html(votes[vote].music);
		$tableRow.find('.music-state').html(votes[vote].state);
		$tableRow.data('vote-id', vote);
	}
}

function nextState(state) {
	var r = HAS_PLAYED;

	if (state == IN_10_MIN) r = IN_5_MIN;
	else if (state == IN_5_MIN) r = NEXT_SONG;
	else if (state == NEXT_SONG) r = CURRENT_SONG;
	else if (state == CURRENT_SONG) r = HAS_PLAYED;

	return r;
}
	
	
