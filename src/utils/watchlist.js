const KEY = "watchinema_watchlist";

export function get() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
