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
	user_votes = JSON.parse(sessionStorage.user_votes);
	n_votes_left = Number(sessionStorage.n_votes_left);

	if (n_votes_left){
		user_votes[music] ? user_votes[music] += 1 : user_votes[music] = 1;
		--n_votes_left;
	}

	//TODO: update badge
	$("#votes-left span").html(n_votes_left);
	if (n_votes_left == 0) {
		$('.music-vote-button').disable(true);
	}

	sessionStorage.user_votes = JSON.stringify(user_votes);
	sessionStorage.n_votes_left = n_votes_left;
}

function addMusicToVotesTable(music){
  var votes = JSON.parse(sessionStorage.user_votes);
  if (votes[music] == 1)
    var $tableRow = $($("#voteTemplate").html()).appendTo('#votesTableBody');
  $tableRow.find('.name').html(music);
  $tableRow.find('.votes').html("voted");
}
