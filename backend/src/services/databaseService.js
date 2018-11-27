import * as aws from '../aws';

/**
 * Async function to get all databases from all regions.
 */
export async function fetchAllDatabases() {
  let databases = {
    projects: [],
    instances: []
  };
  const promises = Object.keys(aws.default.rds).map(key => fetchAllDatabasesOfRegion(key));
  const results = await Promise.all(promises);
  results.map(data => {
    databases.projects.push(...data.projects);
    databases.instances.push(...data.instances);
  });

  return databases;
}

/**
 * Get databases from particular region name.
 *
 * @param {String} regionName
 */
function fetchAllDatabasesOfRegion(regionName) {
  return new Promise((resolve, reject) => {
    aws.default.rds[regionName].describeDBInstances({}, async (err, data) => {
      if (err) {
        reject(err);
      }
      const instances = [],
        projects = [];
      const instancesWithTags = data.DBInstances.map(instance => fetchTagsForDatabaseInstance(regionName, instance));
      const results = await Promise.all(instancesWithTags);
      results.map(instance => {
        instances.push(instance);
        projects.push(instance.project);
      });
      const response = { projects: projects, instances: instances };

      resolve(response);
    });
  });
}

/**
 * This function fetches tags for the database instance.
 *
 * @param {String} regionName
 * @param {Object} instance
 */
function fetchTagsForDatabaseInstance(regionName, instance) {
  return new Promise((resolve, reject) => {
    let params = {
      ResourceName: instance.DBInstanceArn
    };
    aws.default.rds[regionName].listTagsForResource(params, (err, data) => {
      if (err) {
        reject(err);
      }
      instance.Tags = data.TagList;
      instance.type = 'rds';
      instance.services = instance.Engine;
      instance.Tags.map(tag => {
        const value = tag.Value;
        switch (tag.Key) {
          case 'Project':
            instance.project = value;
            break;
          case 'Deployment':
            instance.environment = value;
            break;
          case 'OS Platform':
            instance.os = value;
            break;
          case 'Name':
            instance.name = value;
            break;
        }
      });

      resolve(instance);
    });
  });
}
