/**
 * This method groups the instances according to environment and projects
 * @param {Array} projects
 * @param {Array} instances
 */
export function groupByProjectAndEnvironment(projects, instances) {
  let responseInstance = [];
  let uniqueProjects = [...new Set(projects)];

  let projectInstances = {};
  instances.map(instance => {
    if (projectInstances[instance.project] === undefined) {
      projectInstances[instance.project] = [];
    }
    projectInstances[instance.project].push(instance);
  });

  uniqueProjects.forEach(function(project) {
    let responseInstanceSingle = {
      project: project,
      environments: []
    };

    let devInstances = {
      title: 'Development',
      servers: []
    };

    let productionInstances = {
      title: 'Production',
      servers: []
    };

    let uatInstances = {
      title: 'UAT',
      servers: []
    };

    let stagingInstances = {
      title: 'Staging',
      servers: []
    };

    let qaInstances = {
      title: 'QA',
      servers: []
    };

    let multipleInstances = {
      title: 'Multiple Deployments',
      servers: []
    };

    let noTagsInstances = {
      title: 'NoTags',
      servers: []
    };

    projectInstances[project].forEach(function(ins) {
      let publicIp = '-';
      let publicDns = '-';
      if (ins.NetworkInterfaces && ins.NetworkInterfaces[0].Association !== undefined) {
        publicIp = ins.NetworkInterfaces[0].Association.PublicIp;
        publicDns = ins.NetworkInterfaces[0].Association.PublicDnsName;
      } else if (ins.Endpoint) {
        publicDns = ins.Endpoint.Address;
      }
      let server = {
        name: ins.name,
        type: ins.type,
        environment: ins.environment ? ins.environment : '-',
        ip: publicIp ? publicIp : '-',
        os: ins.os ? ins.os : '-',
        account: 'aws@leapfrog',
        location: ins.Placement ? ins.Placement.AvailabilityZone : ins.AvailabilityZone ? ins.AvailabilityZone : '-',
        status: ins.State ? ins.State.Name : ins.DBInstanceStatus ? ins.DBInstanceStatus : '-',
        domain: publicDns,
        services: ins.services
          ? ins.services.split('|').length
            ? ins.services.split('|')
            : ins.services.split('/')
          : []
      };
      if (ins.environment === 'Development') {
        devInstances.servers.push(server);
      } else if (ins.environment === 'Production') {
        productionInstances.servers.push(server);
      } else if (ins.environment === 'User Acceptance') {
        uatInstances.servers.push(server);
      } else if (ins.environment === 'Staging') {
        stagingInstances.servers.push(server);
      } else if (ins.environment === 'Quality Assurance') {
        qaInstances.servers.push(server);
      } else if (ins.environment === 'Multiple') {
        multipleInstances.servers.push(server);
      } else {
        noTagsInstances.servers.push(server);
      }
    });

    if (devInstances.servers.length) {
      responseInstanceSingle.environments.push(devInstances);
    }
    if (qaInstances.servers.length) {
      responseInstanceSingle.environments.push(qaInstances);
    }
    if (stagingInstances.servers.length) {
      responseInstanceSingle.environments.push(stagingInstances);
    }
    if (uatInstances.servers.length) {
      responseInstanceSingle.environments.push(uatInstances);
    }
    if (productionInstances.servers.length) {
      responseInstanceSingle.environments.push(productionInstances);
    }
    if (multipleInstances.servers.length) {
      responseInstanceSingle.environments.push(multipleInstances);
    }
    if (noTagsInstances.servers.length) {
      responseInstanceSingle.environments.push(noTagsInstances);
    }
    responseInstance.push(responseInstanceSingle);
  });

  return responseInstance;
}
