  var options = {
    valueNames: [
       "name",
       "artist",
			 "duration",       
	   	 { data: ['category'] }
  ],
    item: '<li data-category=category class="row-flex-container flex-space-around"><div class="name music-left row-flex-container flex-justify-center flex-align-center"></div><div class="artist music-center row-flex-container flex-justify-center flex-align-center"></div><div class="duration music-right row-flex-container flex-justify-center flex-align-center"></div></li>'
  };

  var musicList = new List('main-center-col', options, musics);
