import config from '../config';
import { formatServices } from '../utils/services';

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
      case config.tags.project:
        instance.project = value;
        break;
      case config.tags.deployment:
        instance.environment = tag.Value;
        break;
      case config.tags.os:
        instance.os = tag.Value;
        break;
      case config.tags.name:
        instance.name = tag.Value;
        break;
      case config.tags.services:
        instance.services = formatServices(tag.Value);
        break;
    }
  });

  return instance;
}
