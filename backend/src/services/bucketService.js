import * as aws from '../aws';

/**
 * Async function to Fetch all buckets from all regions
 */
export async function fetchAllBuckets() {
  let buckets = {
    projects: [],
    instances: []
  };
  await Promise.all(
    Object.keys(aws.default.s3).map(async key => {
      await fetchAllBucketsOfRegion(key).then(data => {
        buckets.projects.push(...data.projects);
        buckets.instances.push(...data.buckets);
      });
    })
  );

  return buckets;
}

/**
 * Fetch buckets from particular region name
 * @param {String} regionName
 */
function fetchAllBucketsOfRegion(regionName) {
  return new Promise((resolve, reject) => {
    aws.default.s3[regionName].listBuckets({}, async (err, data) => {
      if (err) {
        reject(err);
      }
      let buckets = [];
      let projects = [];
      await Promise.all(
        data.Buckets.map(async bucket => {
          await fetchTagsForBucket(regionName, bucket).then(bucketData => {
            buckets.push(bucketData);
            projects.push(bucket.project);
          });
        })
      );

      const response = { projects: projects, buckets: buckets };

      return resolve(response);
    });
  });
}

/**
 * This function fetches tags for the buckets
 * @param {String} regionName
 * @param {Object} bucket
 */
function fetchTagsForBucket(regionName, bucket) {
  return new Promise((resolve, reject) => {
    let params = {
      Bucket: bucket.Name
    };
    aws.default.s3[regionName].getBucketTagging(params, (tagErr, tagData) => {
      if (tagErr) {
        reject(tagErr);
      }
      bucket.Tags = tagData ? tagData.TagSet : [];
      bucket.Tags.map(tag => {
        if (tag.Key === 'Project') {
          bucket.project = tag.Value;
        }
        bucket.type = 's3';
        if (tag.Key === 'Deployment') {
          bucket.environment = tag.Value;
        }
        if (tag.Key === 'OS Platform') {
          bucket.os = tag.Value;
        }
        if (tag.Key === 'Name') {
          bucket.name = tag.Value;
        }
        if (tag.Key === 'Services') {
          bucket.services = tag.Value;
        } else {
          bucket.services = bucket.Engine;
        }
      });
      resolve(bucket);
    });
  });
}
