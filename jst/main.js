var _ = {

  i: function() {

    s3.loggedin(function(response) {

      if (response) {
        $('.login').hide();
      } else {
        $('.login').show();
        $('.login').click(s3.login);
      }

    });

  },

  d: function() {}

}
