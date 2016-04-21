
  var options = {
    valueNames: [
       "name",
       "price",
       { name: 'image', attr: 'src' },
	   { data: ['alcohol'] },
	   { data: ['category'] }
  ],
    item: '<li data-alcohol=alcohol data-category=category class="productButton hidden_border col-xs-6"><img class="image" height="100" width="100"><h3 class="name"></h3><h4 class="price"></h4></li>'
  };

  var userList = new List('products', options, products);
