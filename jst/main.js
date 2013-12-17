var _ = {

  i: function() {

    setTimeout(_.checkLogin, 000);

  },

  checkLogin: function() {

    s3.loggedin(function(response) {

      if (response) {
        _.list();
      } else {
        $('.loader').hide();
        $('.login').show();
        $('.login').click(_.login);
      }

    });

  },

  login: function() {

    $('.login').hide();
    $('.loader').show();

    s3.login(function(response) {

      if (!response) {
        alert('You must authenticate to continue');
        $('.login').show();
        $('.loader').hide();
      } else {
        $('.login').unbind('click', _.login).hide();
        $('.loader').show();
        _.list();
      }

    });

  },


  list: function() {

    var template = '<div class="item" data-key="{url}">'+
      '<div class="image" style="background-image: url({url})"></div>' +
      '<div class="sloader"></div>'+
      '</div>';
    var listing = $('.listing');

    s3.list(function(data) {

      $('.loader').hide();

      for (var i in data.Contents) {
        var key = data.Contents[i].Key;

        s3.sign(key, function(url) {

          var html = template.replace(/{url}/g, url);
          console.log(html);
          $('.listing').append(html);
        });
        
      }

      _.loadImages();

    });

  },

  loadImages: function() {


  },

  d: function() {}

}
