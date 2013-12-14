var s3 = {

  appId: false,
  roleArn: false,
  bucketName: false,
  fbUserId: false,
  fbToken: false,
  bucket: false,

  i: function() {
    s3.bucket = new AWS.S3({params: {Bucket: s3.bucketName}});
  },

  loggedin: function(callback) {

    FB.getLoginStatus(function(response) {

      if (response.status == 'connected') {
        s3.fbUserId = response.authResponse.userID;
        s3.fbToken = response.authResponse.accessToken;
        s3.initConfig();
        s3.list();
        callback(true);
      } else {
        callback(false);
      }

    });

  },

  initConfig: function() {

    s3.bucket.config.credentials = new AWS.WebIdentityCredentials({
      ProviderId: 'graph.facebook.com',
      RoleArn: s3.roleArn,
      WebIdentityToken: s3.fbToken
    });

  },

  list: function() {

    s3.bucket.listObjects()
      .on('success', function(response) {

      console.log(response.data.Contents.length);

    }).on('error', function(response) {

      alert('error');
      console.log(response);
      
    }).on('complete', function(response) {
      // always runs
    }).send();

  },

  login: function() {

    FB.login(function(response) {

      if (response.authResponse) {
        s3.fbUserId = response.authResponse.userID;
        s3.fbToken = response.authResponse.accessToken;
        s3.initConfig();
      } else {
        alert('You must authenticate to continue');
      }

    });

  },

  d: function() {

  }

}
