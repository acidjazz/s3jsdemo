# S3 JS SDK prototype
simple s3 JS SDK using facebook auth on a bucket to view its contents on mobile/desktop devices

## requirements
you'll need
* AWS s3 account
* AWS s3 bucket with lots of images
* a browser


## s3.js
the S3 AWS SDK wrapper, simply instanciatie it
```javascript
s3.i();
```

and use it's functions
```javascript
s3.list();
```

sample jade attempt
```jade

body

  .container
    .button.login Log In with Facebook

    figure.loader
      .dot.white
      .dot.red
      .dot.yellow
      .dot.green
      .dot.blue

#fb-root

```
woop
