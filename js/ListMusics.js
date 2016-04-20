  var options = {
    valueNames: [
       "name",
       "artist",
			 "duration",
	   	 { data: ['category'] }
  ],
    item: '<li data-category=category><div class="name music-left row-flex-container flex-justify-center flex-align-center"></div><div class="artist music-center-left row-flex-container flex-justify-center flex-align-center"></div><div class="duration music-center-right row-flex-container flex-justify-center flex-align-center"></div><div class="music-right row-flex-container flex-justify-center flex-align-center"><button class="music-vote-button btn btn-success btn-small"><i class="glyphicon glyphicon-check"></i></button></div></li>'
  };

  var musicList = new List('main-center-col', options, musics);

  function filterMusics(filter){
    if (!filter){
      musicList.filter();
      return;
    }
    musicList.filter(function(item) {
      if (item.values().category == filter) {
        return true;
      } else {
        return false;
      }
    });
  }

  $("#categoryFiltersList").find('li').on('click', function(event) {
    var category = $(this).attr('id')
    if (category == "All") category = null;
    filterMusics(category);
    $(this).addClass('active').siblings().removeClass('active');  // make this category selected
    musicList.sort('name', { order: "asc" }); 
  });

  $("#searchBar").on('input', function(event){
    searchValue = $(this).val();
    musicList.search(searchValue, ['name', 'artist']);
    musicList.sort('name', { order: "asc" });
  });
