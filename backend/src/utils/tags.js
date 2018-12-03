import { formatServices } from '../utils/services';

const project = 'Project';
const deployment = 'Deployment';
const os = 'OS Platform';
const name = 'Name';
const services = 'Services';

/**
 * Assigns variables using tags.
 *
 * @param {Array} tags
 * @returns {Object}
 */
export function assignUsingTags(tags) {
  const instance = {};
  tags.forEach(tag => {
    const value = tag.Value;

    switch (tag.Key) {
      case project:
        instance.project = value;
        break;

      case deployment:
        instance.environment = tag.Value;
        break;

      case os:
        instance.os = tag.Value;
        break;

      case name:
        instance.name = tag.Value;
        break;

      case services:
        instance.services = formatServices(tag.Value);
        break;
    }
  });

  return instance;
}
