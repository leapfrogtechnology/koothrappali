import * as aws from '../aws';

/**
 * Async function to get all databases from all regions
 */
export async function fetchAllDatabases() {
  let databases = {
    projects: [],
    instances: []
  };
  await Promise.all(
    Object.keys(aws.default.rds).map(async key => {
      await fetchAllDatabasesOfRegion(key).then(data => {
        databases.projects.push(...data.projects);
        databases.instances.push(...data.instances);
      });
    })
  );

  return databases;
}

/**
 * Get databases from particular region name
 * @param {String} regionName
 */
function fetchAllDatabasesOfRegion(regionName) {
  return new Promise((resolve, reject) => {
    aws.default.rds[regionName].describeDBInstances({}, async (err, data) => {
      if (err) {
        reject(err);
      }
      let instances = [];
      let projects = [];
      await Promise.all(
        data.DBInstances.map(async instance => {
          await fetchTagsForDatabaseInstance(regionName, instance).then(instanceData => {
            instances.push(instanceData);
            projects.push(instance.project);
          });
        })
      );

      const response = { projects: projects, instances: instances };

      return resolve(response);
    });
  });
}

/**
 * This function fetches tags for the database instance
 * @param {String} regionName
 * @param {Object} instance
 */
function fetchTagsForDatabaseInstance(regionName, instance) {
  return new Promise((resolve, reject) => {
    let params = {
      ResourceName: instance.DBInstanceArn
    };
    aws.default.rds[regionName].listTagsForResource(params, (tagErr, tagData) => {
      if (tagErr) {
        reject(tagErr);
      }
      instance.Tags = tagData.TagList;
      instance.Tags.map(tag => {
        if (tag.Key === 'Project') {
          instance.project = tag.Value;
        }
        instance.type = 'rds';
        if (tag.Key === 'Deployment') {
          instance.environment = tag.Value;
        }
        if (tag.Key === 'OS Platform') {
          instance.os = tag.Value;
        }
        if (tag.Key === 'Name') {
          instance.name = tag.Value;
        }
        if (tag.Key === 'Services') {
          instance.services = tag.Value;
        } else {
          instance.services = instance.Engine;
        }
      });
      resolve(instance);
    });
  });
}
