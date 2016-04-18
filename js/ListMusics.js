  var options = {
    valueNames: [
       "name",
       "artist",
			 "duration",       
	   	 { data: ['category'] }
  ],
    item: '<li data-category=category class="row-flex-container flex-space-around"><div class="name row-flex-container flex-justify-center flex-align-center music-left"></div><div class="artist row-flex-container flex-justify-center flex-align-center music-center"></div><div class="duration row-flex-container flex-justify-center flex-align-center music-right"></div></li>'
  };

  var musicList = new List('main-center-col', options, musics);
