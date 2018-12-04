/**
 * Splits the services with the criteria.
 *
 * @param {String} services
 * @returns {Array}
 */
export function formatServices(services) {
  return services ? services.split(/\/|\|/) : [];
}
