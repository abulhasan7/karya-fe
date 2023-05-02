const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');


// AWS.config.loadFromPath('./util/awscred.json')
AWS.config.update({
  apiVersion: 'latest',
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  // profile: 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


// AWS.Config.
const myBucket = process.env.bucketName;

const signedUrlExpireSeconds = 60 * 10;
function generateSignedUrl() {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  console.log('bucket is '+process.env.secretAccessKey)
  return s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.bucketName,
    Key: `profile-pics/${uuidv4()}`,
    Expires: signedUrlExpireSeconds,
  });
}

module.exports = { generateSignedUrl };
