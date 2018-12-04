import { formatServices } from '../utils/services';

const TAG_NAME = 'Name';
const TAG_OS = 'OS Platform';
const TAG_PROJECT = 'Project';
const TAG_SERVICES = 'Services';
const TAG_DEPLOYMENT = 'Deployment';

/**
 * Assigns variables using tags.
 *
 * @param {Array} tags
 * @returns {Object}
 */
export function assignUsingTags(tags) {
  const instance = {};
  tags.forEach(tag => {
    switch (tag.Key) {
      case TAG_PROJECT:
        instance.project = tag.Value;
        break;

      case TAG_DEPLOYMENT:
        instance.environment = tag.Value;
        break;

      case TAG_OS:
        instance.os = tag.Value;
        break;

      case TAG_NAME:
        instance.name = tag.Value;
        break;

      case TAG_SERVICES:
        instance.services = formatServices(tag.Value);
        break;
    }
  });

  return instance;
}
