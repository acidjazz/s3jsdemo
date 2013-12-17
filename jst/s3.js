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

  login: function(callback) {

    FB.login(function(response) {

      if (response.authResponse) {
        s3.fbUserId = response.authResponse.userID;
        s3.fbToken = response.authResponse.accessToken;
        s3.initConfig();
        callback(true);
      } else {
        callback(false);
      }

    });

  },

  list: function(callback) {

    s3.bucket.listObjects()
      .on('success', function(response) {
      callback(response.data);
    }).on('error', function(response) {
      console.log(response);
      callback(false);
    }).send();

  },

  sign: function(key, callback) {

    var params = {Bucket: s3.bucketName, Key: key, Expires: 60*60};

    s3.bucket.getSignedUrl('getObject', params, function (err, url) {

      callback(url);

    });

  },

  d: function() {

  }

}
