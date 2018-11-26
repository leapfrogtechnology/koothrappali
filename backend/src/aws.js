import AWS from 'aws-sdk';
AWS.config.loadFromPath('./cred.json');

const awsApiVersion = '2016-11-15';

const awsConfig = {
  ec2: {
    'us-east-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'us-east-1' }), // N. Virginia
    'us-east-2': new AWS.EC2({ apiVersion: awsApiVersion, region: 'us-east-2' }), // Ohio
    'us-west-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'us-west-1' }), // N. California
    'us-west-2': new AWS.EC2({ apiVersion: awsApiVersion, region: 'us-west-2' }), // Oregon
    'ca-central-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'ca-central-1' }), // Canada (Central)
    'eu-west-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'eu-west-1' }), // Ireland
    'eu-central-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'eu-central-1' }), // Frankfurt
    'eu-west-2': new AWS.EC2({ apiVersion: awsApiVersion, region: 'eu-west-2' }), // London
    'ap-northeast-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'ap-northeast-1' }), // Tokyo
    'ap-northeast-2': new AWS.EC2({ apiVersion: awsApiVersion, region: 'ap-northeast-2' }), // Seoul
    'ap-southeast-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'ap-southeast-1' }), // Singapore
    'ap-southeast-2': new AWS.EC2({ apiVersion: awsApiVersion, region: 'ap-southeast-2' }), // Syndney
    'ap-south-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'ap-south-1' }), // Mumbai
    'sa-east-1': new AWS.EC2({ apiVersion: awsApiVersion, region: 'sa-east-1' }) // Sao Paulo
  },
  rds: {
    'us-east-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'us-east-1' }), // N. Virginia
    'us-east-2': new AWS.RDS({ apiVersion: awsApiVersion, region: 'us-east-2' }), // Ohio
    'us-west-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'us-west-1' }), // N. California
    'us-west-2': new AWS.RDS({ apiVersion: awsApiVersion, region: 'us-west-2' }), // Oregon
    'ca-central-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'ca-central-1' }), // Canada (Central)
    'eu-west-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'eu-west-1' }), // Ireland
    'eu-central-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'eu-central-1' }), // Frankfurt
    'eu-west-2': new AWS.RDS({ apiVersion: awsApiVersion, region: 'eu-west-2' }), // London
    'ap-northeast-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'ap-northeast-1' }), // Tokyo
    'ap-northeast-2': new AWS.RDS({ apiVersion: awsApiVersion, region: 'ap-northeast-2' }), // Seoul
    'ap-southeast-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'ap-southeast-1' }), // Singapore
    'ap-southeast-2': new AWS.RDS({ apiVersion: awsApiVersion, region: 'ap-southeast-2' }), // Syndney
    'ap-south-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'ap-south-1' }), // Mumbai
    'sa-east-1': new AWS.RDS({ apiVersion: awsApiVersion, region: 'sa-east-1' }) // Sao Paulo
  },
  s3: {
    'us-east-1': new AWS.S3({ apiVersion: awsApiVersion, region: 'us-east-1' })
  }
};

export default awsConfig;
