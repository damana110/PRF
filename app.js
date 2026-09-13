const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const strengthA = [
  ["Box/broad jump", 4, 3],
  ["Med-ball backward throw", 4, 4],
  ["Trap-bar deadlift", 4, 4],
  ["Bulgarian split squat", 3, 6],
  ["Weighted pull-up / lat pulldown", 4, 6],
  ["Single-arm cable row", 3, 8],
  ["Pallof press", 3, 8],
];
const strengthB = [
  ["Light jump squat", 4, 4],
  ["Med-ball rotational throw", 3, 5],
  ["Front / safety-bar squat", 4, 4],
  ["Romanian deadlift", 3, 5],
  ["Hip thrust", 3, 6],
  ["Seated cable row", 3, 6],
  ["Push-up / DB bench", 3, 8],
  ["Core", 3, ""],
];
const plan = {
  Monday: {
    training: "Team row · moderate–hard",
    protein: "110–125 g",
    carbs: "250–325 g",
    items: [
      [
        "4:40 AM",
        "Pre-row snack",
        "Toast + almond butter + maple syrup; small soy milk",
      ],
      [
        "5:15 AM",
        "Team on-water row",
        "Mandatory team practice. Log duration, effort, distance/metrics if available.",
        "rowing",
      ],
      [
        "7:15 AM",
        "Recovery breakfast",
        "Overnight oats, soy milk, berries, chia, walnuts, protein powder",
      ],
      ["7:30 AM", "Creatine", "5 g creatine monohydrate"],
      ["10:30 AM", "Snack", "Soy yogurt + granola + raspberries"],
      [
        "12:30 PM",
        "Lunch",
        "Quinoa-edamame bowl with roasted vegetables, greens, avocado, tahini-lemon dressing",
      ],
      ["3:30 PM", "Snack", "Apple + peanut butter + roasted edamame"],
      [
        "6:30 PM",
        "Dinner",
        "Baked salmon, roasted potatoes, broccoli, green salad",
      ],
    ],
  },
  Tuesday: {
    training: "Power + Strength A + erg HIIT",
    protein: "110–125 g",
    carbs: "275–350 g",
    items: [
      ["4:45 AM", "Pre-workout fuel", "Toast + jam; soy protein shake"],
      [
        "5:15 AM",
        "Power + Strength A",
        "Explosive work first, then heavy strength. Trap-bar deadlift target RPE 7–8.",
        "strengthA",
      ],
      [
        "6:15 AM",
        "Erg HIIT",
        "6 × 1 min hard / 2 min easy. Hard reps ~RPE 9.",
        "erg6",
      ],
      [
        "7:00 AM",
        "Recovery breakfast",
        "Oatmeal + soy milk + protein powder + blueberries/cherries/hemp; toast",
      ],
      ["7:15 AM", "Creatine", "5 g creatine monohydrate"],
      ["10:30 AM", "Snack", "Whole-grain crackers + hummus + orange"],
      [
        "12:30 PM",
        "Lunch",
        "Tofu rice bowl with edamame, vegetables and sesame sauce",
      ],
      ["3:30 PM", "Snack", "Soy yogurt + berries + granola"],
      [
        "6:30 PM",
        "Dinner",
        "Lentil pasta, tomato sauce, mushrooms, spinach, salad and whole-grain bread",
      ],
    ],
  },
  Wednesday: {
    training: "Team row",
    protein: "110–125 g",
    carbs: "250–325 g",
    items: [
      [
        "4:40 AM",
        "Pre-row snack",
        "Applesauce + toast with jam + small protein shake",
      ],
      ["5:15 AM", "Team on-water row", "Mandatory team practice.", "rowing"],
      [
        "7:15 AM",
        "Recovery breakfast",
        "Tofu scramble, roasted potatoes, whole-grain toast, berries",
      ],
      ["7:30 AM", "Creatine", "5 g creatine monohydrate"],
      ["10:30 AM", "Snack", "Soy yogurt + walnuts + fruit"],
      ["12:30 PM", "Lunch", "Mediterranean chickpea/quinoa bowl"],
      ["3:30 PM", "Snack", "Pear + almond butter + roasted chickpeas"],
      ["6:30 PM", "Dinner", "Grilled cod tacos, black beans, salsa and rice"],
    ],
  },
  Thursday: {
    training: "Zone 2 · 45–60 min",
    protein: "110–125 g",
    carbs: "200–275 g",
    items: [
      ["4:45 AM", "Pre-workout fuel", "Toast + jam or applesauce"],
      [
        "5:15 AM",
        "Zone 2",
        "45–60 min easy aerobic work. Optional mobility in the evening.",
        "rowing",
      ],
      [
        "6:20 AM",
        "Breakfast",
        "Overnight oats, soy milk, protein powder, berries, chia, almonds",
      ],
      ["7:15 AM", "Creatine", "5 g creatine monohydrate"],
      ["10:30 AM", "Snack", "Edamame + fruit"],
      ["12:30 PM", "Lunch", "Lentil soup + whole-grain bread + large salad"],
      ["3:30 PM", "Snack", "Hummus, vegetables and pita"],
      [
        "6:30 PM",
        "Dinner",
        "Tofu or tempeh stir-fry, vegetables and brown rice",
      ],
    ],
  },
  Friday: {
    training: "Team row",
    protein: "110–125 g",
    carbs: "250–325 g",
    items: [
      ["4:40 AM", "Pre-row snack", "English muffin + jam + soy milk"],
      ["5:15 AM", "Team on-water row", "Mandatory team practice.", "rowing"],
      [
        "7:15 AM",
        "Recovery breakfast",
        "Protein oatmeal with soy milk, berries, maple syrup and walnuts",
      ],
      ["7:30 AM", "Creatine", "5 g creatine monohydrate"],
      ["10:30 AM", "Snack", "Soy yogurt + granola"],
      [
        "12:30 PM",
        "Lunch",
        "Tempeh burrito bowl with rice, beans, corn, salsa, greens and avocado",
      ],
      ["3:30 PM", "Snack", "Apple + peanut butter"],
      [
        "6:30 PM",
        "Dinner",
        "Salmon poke-style bowl with rice, edamame, cucumber, avocado and seaweed",
      ],
    ],
  },
  Saturday: {
    training: "Zone 2 60–90 min OR recovery",
    protein: "110–125 g",
    carbs: "180–275 g",
    items: [
      ["7:00 AM", "Pre-session fuel", "Toast + almond butter + berries"],
      [
        "7:30 AM",
        "Zone 2 / recovery",
        "60–90 min easy. Drop entirely if Friday was hard or fatigue is high.",
        "rowing",
      ],
      [
        "9:00 AM",
        "Breakfast",
        "Whole-grain pancakes, berries, soy yogurt/protein and maple syrup",
      ],
      ["9:15 AM", "Creatine", "5 g creatine monohydrate"],
      ["12:30 PM", "Lunch", "Chickpea salad sandwich + vegetable soup"],
      ["3:30 PM", "Snack", "Edamame or hummus + pita"],
      ["6:30 PM", "Dinner", "Thai tofu curry with vegetables and rice"],
    ],
  },
  Sunday: {
    training: "Power + Heavy Strength B",
    protein: "110–125 g",
    carbs: "250–325 g",
    items: [
      [
        "7:00 AM",
        "Pre-lift fuel",
        "Toast + maple syrup or jam + soy protein shake",
      ],
      [
        "7:30 AM",
        "Power + Strength B",
        "Power + heavy strength, low enough volume to protect Monday rowing.",
        "strengthB",
      ],
      [
        "8:30 AM",
        "Optional erg power",
        "6 × 10 hard strokes with generous recovery. Not metabolic HIIT.",
        "ergPower",
      ],
      [
        "9:00 AM",
        "Breakfast",
        "Tofu scramble + potatoes + avocado + whole-grain toast + berries",
      ],
      ["9:15 AM", "Creatine", "5 g creatine monohydrate"],
      [
        "12:30 PM",
        "Lunch",
        "Lentil/quinoa power bowl with edamame, roasted vegetables and tahini",
      ],
      ["3:30 PM", "Snack", "Apple + nut butter"],
      [
        "6:30 PM",
        "Dinner",
        "Whole-wheat pasta with lentil marinara + salad + bread. Keep carbs substantial to fuel Monday rowing.",
      ],
    ],
  },
};
let date = new Date();
const key = (d) => {
  const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return x.toISOString().slice(0, 10);
};
const logs = () => JSON.parse(localStorage.getItem("prfLogs") || "{}");
const save = (x) => localStorage.setItem("prfLogs", JSON.stringify(x));
function dayPlan(d) {
  return plan[DAYS[d.getDay()]];
}
function show(v) {
  document
    .querySelectorAll(".view")
    .forEach((x) => x.classList.toggle("active", x.id === v));
  document
    .querySelectorAll(".bottom-nav button")
    .forEach((x) => x.classList.toggle("selected", x.dataset.view === v));
  if (v === "progress") renderProgress();
  if (v === "coach") renderCoach();
}
function render() {
  const p = dayPlan(date),
    l = logs()[key(date)] || {};
  dayTitle.textContent = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  daySubtitle.textContent = p.training;
  targets.innerHTML = [
    ["Training", p.training],
    ["Protein", p.protein],
    ["Carbs", p.carbs],
    ["Recovery", "Protect sleep"],
  ]
    .map(
      (x) =>
        `<div class="target"><span>${x[0]}</span><strong>${x[1]}</strong></div>`,
    )
    .join("");
  timeline.innerHTML = p.items
    .map(
      (x, i) =>
        `<button class="timeline-card ${l.items?.[i]?.status === "yes" ? "done" : ""}" data-i="${i}"><span class="time">${x[0]}</span><span><div class="card-title">${x[1]}</div><div class="card-summary">${x[2]}</div></span><span class="status">${l.items?.[i]?.status === "yes" ? "✓" : "›"}</span></button>`,
    )
    .join("");
  timeline.insertAdjacentHTML(
    "beforeend",
    (l.activities || [])
      .map(
        (activity, i) =>
          `<button class="timeline-card activity-card" data-activity-i="${i}"><span class="time">${esc(activity.time || "Added")}</span><span><div class="card-title">${esc(activity.name)}</div><div class="card-summary">${esc([activity.duration ? `${activity.duration} min` : "", activity.effort ? `RPE ${activity.effort}` : "", activity.notes || ""].filter(Boolean).join(" · "))}</div></span><span class="status">›</span></button>`,
      )
      .join(""),
  );
  document
    .querySelectorAll(".timeline-card[data-i]")
    .forEach((b) => (b.onclick = () => openItem(+b.dataset.i)));
  document
    .querySelectorAll("[data-activity-i]")
    .forEach((b) => (b.onclick = () => openActivity(+b.dataset.activityI)));
  loadCheckin();
}
const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
function strengthForm(exercises, entry) {
  return `<h3>Set log</h3>${exercises
    .map(
      (e, ei) =>
        `<div class="exercise-log"><strong>${e[0]}</strong><small>${e[1]} × ${e[2] || "—"} prescribed</small>${Array.from(
          { length: e[1] },
          (_, si) => {
            const v = entry.workout?.exercises?.[ei]?.sets?.[si] || {};
            return `<div class="set-row"><span>Set ${si + 1}</span><input data-f="load" data-e="${ei}" data-s="${si}" inputmode="decimal" placeholder="lb" value="${esc(v.load)}"><input data-f="reps" data-e="${ei}" data-s="${si}" inputmode="numeric" placeholder="reps" value="${esc(v.reps)}"><input data-f="rpe" data-e="${ei}" data-s="${si}" inputmode="decimal" placeholder="RPE" value="${esc(v.rpe)}"></div>`;
          },
        ).join("")}</div>`,
    )
    .join("")}`;
}
function ergForm(kind, entry) {
  const n = kind === "ergPower" ? 6 : 6;
  return `<h3>${kind === "ergPower" ? "Power-stroke" : "Interval"} log</h3><div class="interval-head"><span>Rep</span><span>Split</span><span>Watts</span><span>SPM</span><span>HR</span></div>${Array.from(
    { length: n },
    (_, i) => {
      const v = entry.workout?.intervals?.[i] || {};
      return `<div class="interval-row"><span>${i + 1}</span><input data-if="split" data-i="${i}" placeholder="1:55" value="${esc(v.split)}"><input data-if="watts" data-i="${i}" inputmode="numeric" placeholder="W" value="${esc(v.watts)}"><input data-if="spm" data-i="${i}" inputmode="numeric" placeholder="SPM" value="${esc(v.spm)}"><input data-if="hr" data-i="${i}" inputmode="numeric" placeholder="HR" value="${esc(v.hr)}"></div>`;
    },
  ).join(
    "",
  )}<div class="log-grid"><label>Session RPE<input id="sessionRpe" type="number" min="1" max="10" step="0.5" value="${esc(entry.workout?.sessionRpe)}"></label><label>Total meters<input id="meters" type="number" inputmode="numeric" value="${esc(entry.workout?.meters)}"></label></div>`;
}
function rowingForm(entry) {
  return `<h3>Row / aerobic log</h3><div class="log-grid"><label>Duration (min)<input id="duration" type="number" step="0.1" value="${esc(entry.workout?.duration)}"></label><label>Distance (m)<input id="meters" type="number" value="${esc(entry.workout?.meters)}"></label><label>Avg split /500m<input id="avgSplit" placeholder="2:05" value="${esc(entry.workout?.avgSplit)}"></label><label>Avg SPM<input id="avgSpm" type="number" value="${esc(entry.workout?.avgSpm)}"></label><label>Avg HR<input id="avgHr" type="number" value="${esc(entry.workout?.avgHr)}"></label><label>Session RPE<input id="sessionRpe" type="number" min="1" max="10" step="0.5" value="${esc(entry.workout?.sessionRpe)}"></label></div>`;
}
function openItem(i) {
  const p = dayPlan(date),
    item = p.items[i],
    all = logs(),
    d = all[key(date)] || {},
    entry = d.items?.[i] || {},
    type = item[3];
  let form = "";
  if (type === "strengthA") form = strengthForm(strengthA, entry);
  if (type === "strengthB") form = strengthForm(strengthB, entry);
  if (type === "erg6" || type === "ergPower") form = ergForm(type, entry);
  if (type === "rowing") form = rowingForm(entry);
  detailBody.innerHTML = `<h2>${item[1]}</h2><p class="muted">${item[0]}</p><p>${item[2]}</p>${form}<div class="choice-row">${["yes", "modified", "no"].map((s) => `<button class="choice ${entry.status === s ? "selected" : ""}" data-s="${s}">${s.toUpperCase()}</button>`).join("")}</div><label>Actual / notes<textarea id="itemNotes" rows="4">${esc(entry.notes || "")}</textarea></label><button id="saveItem" class="primary">Save</button>`;
  let status = entry.status || "";
  detailBody.querySelectorAll(".choice").forEach(
    (b) =>
      (b.onclick = () => {
        status = b.dataset.s;
        detailBody
          .querySelectorAll(".choice")
          .forEach((c) => c.classList.toggle("selected", c === b));
      }),
  );
  saveItem.onclick = () => {
    const a = logs(),
      k = key(date);
    a[k] = a[k] || {};
    a[k].items = a[k].items || {};
    const out = { status, notes: itemNotes.value, workout: {} };
    if (type === "strengthA" || type === "strengthB") {
      const ex = type === "strengthA" ? strengthA : strengthB;
      out.workout.exercises = ex.map((e, ei) => ({
        name: e[0],
        sets: Array.from({ length: e[1] }, (_, si) => {
          const q = detailBody.querySelectorAll(
            `[data-e="${ei}"][data-s="${si}"]`,
          );
          return {
            load: q[0]?.value || "",
            reps: q[1]?.value || "",
            rpe: q[2]?.value || "",
          };
        }),
      }));
    }
    if (type === "erg6" || type === "ergPower") {
      out.workout.intervals = Array.from({ length: 6 }, (_, ii) => {
        const get = (f) =>
          detailBody.querySelector(`[data-if="${f}"][data-i="${ii}"]`)?.value ||
          "";
        return {
          split: get("split"),
          watts: get("watts"),
          spm: get("spm"),
          hr: get("hr"),
        };
      });
      out.workout.sessionRpe =
        document.getElementById("sessionRpe")?.value || "";
      out.workout.meters = document.getElementById("meters")?.value || "";
    }
    if (type === "rowing") {
      [
        "duration",
        "meters",
        "avgSplit",
        "avgSpm",
        "avgHr",
        "sessionRpe",
      ].forEach(
        (f) => (out.workout[f] = document.getElementById(f)?.value || ""),
      );
    }
    a[k].items[i] = out;
    save(a);
    detail.close();
    render();
  };
  detail.showModal();
}
function renderCalendar() {
  weekGrid.innerHTML = DAYS.slice(1)
    .concat("Sunday")
    .map(
      (n) =>
        `<button class="day-card" data-day="${n}"><strong>${n}</strong><p>${plan[n].training}</p></button>`,
    )
    .join("");
  document.querySelectorAll(".day-card").forEach(
    (b) =>
      (b.onclick = () => {
        const target = DAYS.indexOf(b.dataset.day),
          diff = (target - date.getDay() + 7) % 7;
        date = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + diff,
        );
        render();
        show("today");
      }),
  );
}
function loadCheckin() {
  const c = logs()[key(date)]?.checkin || {};
  weight.value = c.weight || "";
  sleep.value = c.sleep || "";
  document.querySelectorAll('[name="recovery"]').forEach((input) => {
    input.checked = input.value === String(c.recovery || "");
  });
  dailyNotes.value = c.notes || "";
  checkinStatus.textContent = c.savedAt ? "Saved for this day." : "";
}
function openActivity(index = null) {
  const all = logs(),
    day = all[key(date)] || {},
    existing = index === null ? {} : day.activities?.[index] || {};
  activityRoot.innerHTML = `<h2>${index === null ? "Add an activity" : "Edit activity"}</h2><p class="muted">Log training, cross-training, mobility or any other activity that was not in the plan.</p><label>Activity<input id="activityName" value="${esc(existing.name)}" placeholder="Example: easy bike ride"></label><div class="log-grid"><label>Start time<input id="activityTime" type="time" value="${esc(existing.time)}"></label><label>Duration (min)<input id="activityDuration" type="number" min="1" value="${esc(existing.duration)}"></label><label>Effort (RPE 1–10)<input id="activityEffort" type="number" min="1" max="10" step="0.5" value="${esc(existing.effort)}"></label></div><label>Notes<textarea id="activityNotes" rows="3">${esc(existing.notes)}</textarea></label><div class="activity-actions">${index === null ? "" : '<button id="deleteActivity" class="danger-button">Delete</button>'}<button id="saveActivity" class="primary">Save activity</button></div>`;
  saveActivity.onclick = () => {
    if (!activityName.value.trim()) {
      activityName.focus();
      return;
    }
    const data = logs(),
      k = key(date);
    data[k] = data[k] || {};
    data[k].activities = data[k].activities || [];
    const value = {
      name: activityName.value.trim(),
      time: activityTime.value,
      duration: activityDuration.value,
      effort: activityEffort.value,
      notes: activityNotes.value.trim(),
    };
    if (index === null) data[k].activities.push(value);
    else data[k].activities[index] = value;
    save(data);
    activityDialog.close();
    render();
  };
  if (index !== null)
    deleteActivity.onclick = () => {
      const data = logs(),
        k = key(date);
      data[k].activities.splice(index, 1);
      save(data);
      activityDialog.close();
      render();
    };
  activityDialog.showModal();
}
function workoutHighlights(a) {
  const out = [];
  Object.keys(a)
    .sort()
    .reverse()
    .forEach((k) =>
      Object.values(a[k].items || {}).forEach((x) => {
        if (x.workout?.intervals) {
          const w = x.workout.intervals.map((i) => +i.watts).filter(Boolean);
          if (w.length)
            out.push(
              `${k}: erg ${Math.round(w.reduce((a, b) => a + b, 0) / w.length)} W avg`,
            );
        }
        if (x.workout?.exercises) {
          x.workout.exercises.forEach((e) => {
            const loads = e.sets.map((s) => +s.load).filter(Boolean);
            if (
              loads.length &&
              (e.name.includes("Trap-bar") || e.name.includes("squat"))
            )
              out.push(`${k}: ${e.name} ${Math.max(...loads)} lb`);
          });
        }
      }),
    );
  return out.slice(0, 6);
}
function renderProgress() {
  const a = logs();
  const rows = Object.keys(a)
    .sort()
    .reverse()
    .slice(0, 14)
    .filter((k) => a[k].checkin);
  const h = workoutHighlights(a);
  progressList.innerHTML =
    (h.length
      ? `<h3>Performance</h3>${h.map((x) => `<p>${x}</p>`).join("")}`
      : "") +
    (rows.length
      ? `<h3>Recovery</h3>${rows
          .map((k) => {
            const c = a[k].checkin;
            return `<p><strong>${k}</strong> · ${c.weight || "—"} lb · ${c.sleep || "—"} h sleep · recovery ${c.recovery || "—"}/5</p>`;
          })
          .join("")}`
      : '<p class="muted">No check-ins yet. Your trends will appear here.</p>');
}
function renderCoach() {
  const a = logs(),
    recent = Object.keys(a)
      .sort()
      .reverse()
      .slice(0, 7)
      .map((k) => a[k].checkin)
      .filter(Boolean);
  if (!recent.length) {
    ruleCoach.innerHTML =
      "<h2>Current guidance</h2><p>Log several days of sleep, recovery, body weight and workouts to begin trend-based coaching.</p>";
    return;
  }
  const r = recent.map((x) => +x.recovery).filter(Boolean),
    s = recent.map((x) => +x.sleep).filter(Boolean),
    avg = (x) =>
      x.length ? (x.reduce((a, b) => a + b, 0) / x.length).toFixed(1) : "—";
  ruleCoach.innerHTML = `<h2>Current guidance</h2><p>Recent average recovery: <strong>${avg(r)}/5</strong>. Average sleep: <strong>${avg(s)} h</strong>.</p><p>${r.length && +avg(r) < 3 ? "Recovery is running low. Preserve key rowing sessions and consider reducing accessory volume until it rebounds." : "Keep building the log. PRF will use performance plus recovery trends to guide progression without automatically changing the plan."}</p>`;
}
document
  .querySelectorAll(".bottom-nav button")
  .forEach((b) => (b.onclick = () => show(b.dataset.view)));
prevDay.onclick = () => {
  date.setDate(date.getDate() - 1);
  render();
};
nextDay.onclick = () => {
  date.setDate(date.getDate() + 1);
  render();
};
todayBtn.onclick = () => {
  date = new Date();
  render();
  show("today");
};
closeDialog.onclick = () => detail.close();
closeActivityDialog.onclick = () => activityDialog.close();
addActivity.onclick = () => openActivity();
saveCheckin.onclick = () => {
  const a = logs(),
    k = key(date);
  a[k] = a[k] || {};
  a[k].checkin = {
    weight: weight.value,
    sleep: sleep.value,
    recovery: document.querySelector('[name="recovery"]:checked')?.value || "",
    notes: dailyNotes.value,
    savedAt: new Date().toISOString(),
  };
  save(a);
  renderProgress();
  checkinStatus.textContent = "Check-in saved.";
};
renderCalendar();
render();
if ("serviceWorker" in navigator) navigator.serviceWorker.register("./sw.js");
