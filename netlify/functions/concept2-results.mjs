const API_ROOT = "https://log.concept2.com/api";

function isDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value || ""); }

function publicResult(result) {
  const workout = result.workout || {};
  return {
    id: result.id, date: result.date, dateUtc: result.date_utc || null,
    timezone: result.timezone || null, type: result.type,
    workoutType: result.workout_type, source: result.source,
    distance: result.distance, time: result.time, timeFormatted: result.time_formatted,
    strokeRate: result.stroke_rate || null, strokeCount: result.stroke_count || null,
    dragFactor: result.drag_factor || null, calories: result.calories_total || null,
    heartRate: result.heart_rate || null, comments: result.comments || null,
    verified: Boolean(result.verified),
    intervals: Array.isArray(workout.intervals) ? workout.intervals : [],
    splits: Array.isArray(workout.splits) ? workout.splits : [],
  };
}

async function concept2Fetch(path, token) {
  const response = await fetch(`${API_ROOT}${path}`, { headers: {
    Accept: "application/vnd.c2logbook.v1+json", Authorization: `Bearer ${token}`,
    "X-Client-Version": "PRF-0.3.0", "X-Device": "PRF Web",
  }});
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(body.message || `Concept2 returned ${response.status}`);
    error.status = response.status; throw error;
  }
  return response.json();
}

export default async (request) => {
  if (request.method !== "GET") return Response.json({ error: "Method not allowed" }, { status: 405 });
  const token = Netlify.env.get("CONCEPT2_TOKEN");
  if (!token) return Response.json({ error: "Concept2 integration is not configured." }, { status: 503 });
  const url = new URL(request.url), from = url.searchParams.get("from"), to = url.searchParams.get("to");
  if ((from && !isDate(from)) || (to && !isDate(to))) return Response.json({ error: "Dates must use YYYY-MM-DD format." }, { status: 400 });
  const params = new URLSearchParams({ number: "100", page: "1" });
  if (from) params.set("from", from); if (to) params.set("to", to);
  try {
    const list = await concept2Fetch(`/users/me/results?${params}`, token);
    const summaries = Array.isArray(list.data) ? list.data : [];
    const detailed = await Promise.all(summaries.slice(0, 30).map(async summary => {
      try { const response = await concept2Fetch(`/users/me/results/${summary.id}`, token); return response.data || summary; }
      catch { return summary; }
    }));
    return Response.json({ data: detailed.map(publicResult), total: list.meta?.pagination?.total ?? detailed.length, syncedAt: new Date().toISOString() });
  } catch (error) {
    const status = error.status === 401 || error.status === 403 ? 502 : 503;
    return Response.json({ error: status === 502 ? "Concept2 authorization was rejected." : "Concept2 is temporarily unavailable." }, { status });
  }
};

export const config = { path: "/api/concept2/results" };
