const API_BASE = "http://localhost:3000";

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API Error");
  }
  if (res.status === 204) return true;
  return res.json();
}

export const api = {
  get: (url) => request(url),
  post: (url, data) =>
    request(url, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  put: (url, data) =>
    request(url, {
      method: "PUT", 
      body: JSON.stringify(data),
    }),
  delete: (url) =>
    request(url, {
      method: "DELETE",
    }),
};
