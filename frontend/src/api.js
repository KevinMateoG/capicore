const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  getDashboard: async () => {
    const r = await fetch(`${BASE}/api/dashboard`);
    if (!r.ok) return { container: {}, stats: {}, breakdown: [], weekly: [] };
    return r.json();
  },
  getSensors: async () => {
    const r = await fetch(`${BASE}/api/sensors`);
    if (!r.ok) return [];
    return r.json();
  },
  getCompost: async () => {
    const r = await fetch(`${BASE}/api/compost`);
    if (!r.ok) return { compost: {}, participants: [] };
    return r.json();
  },
};