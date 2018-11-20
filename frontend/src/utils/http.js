import 'whatwg-fetch'

export function get(url, raw = false) {
  if (raw) {
    return fetch(url);
  }

  return fetch(url).then(response => response.json());
}
