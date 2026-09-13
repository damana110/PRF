// PRF v0.4 — constraint-aware plan setup and deterministic weekly plan generator.
const PROFILE_KEY = "prfPlanProfileV1";
const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const defaultProfile = {
  name: "",
  age: "",
  gender: "prefer-not",
  genderSelfDescribe: "",
  goals: ["rowing-performance", "strength"],
  experience: "intermediate",
  weight: "",
  units: "lb",
  strengthDays: 2,
  availability: {
    Monday: { enabled: true, windows: [{ start: "05:00", end: "07:15" }] },
    Tuesday: { enabled: true, windows: [{ start: "05:00", end: "06:45" }] },
    Wednesday: { enabled: true, windows: [{ start: "05:00", end: "07:15" }] },
    Thursday: { enabled: true, windows: [{ start: "05:00", end: "06:45" }] },
    Friday: { enabled: true, windows: [{ start: "05:00", end: "07:15" }] },
    Saturday: { enabled: true, windows: [{ start: "07:00", end: "10:00" }] },
    Sunday: { enabled: true, windows: [{ start: "07:00", end: "10:00" }] },
  },
  fixedRows: "Monday, Wednesday, Friday",
  equipment: ["erg", "dumbbells", "barbell", "box", "bands"],
  injuries: "",
  limitations: "",
  diet: "pescatarian",
  avoid: "",
  prepDishes: 3,
  prepDays: "Sunday",
  leftovers: true,
};
const profile = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"),
      merged = {
        ...defaultProfile,
        ...saved,
        availability: {
          ...defaultProfile.availability,
          ...(saved.availability || {}),
        },
      };
    merged.goals = saved.goals?.length
      ? saved.goals
      : [saved.goal || defaultProfile.goals[0]];
    DAY_ORDER.forEach((day) => {
      const a = merged.availability[day];
      if (!a.windows?.length) {
        const start =
            a.start ||
            a.time ||
            defaultProfile.availability[day].windows[0].start,
          [h, m] = start.split(":").map(Number),
          total = h * 60 + m + (+a.minutes || 60);
        a.windows = [
          {
            start,
            end:
              a.end ||
              `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`,
          },
        ];
      }
    });
    return merged;
  } catch {
    return structuredClone(defaultProfile);
  }
};
let setupState = profile(),
  setupStep = 0;
const goalNames = {
  "rowing-performance": "Rowing performance",
  "2k-speed": "Faster 2k",
  strength: "Strength & power",
  "general-fitness": "General fitness",
  "fat-loss": "Fat loss",
  endurance: "Endurance",
};
const dietNames = {
  omnivore: "Omnivore",
  pescatarian: "Pescatarian",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
};

function setupTime(value) {
  const [h, m] = (value || "07:00").split(":").map(Number),
    suffix = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${suffix}`;
}
function selected(name, value) {
  return setupState[name] === value ? "checked" : "";
}
function windowMinutes(a) {
  if (!a?.start || !a?.end) return 0;
  const parts = (value) => value.split(":").map(Number),
    [sh, sm] = parts(a.start),
    [eh, em] = parts(a.end);
  return Math.max(0, eh * 60 + em - (sh * 60 + sm));
}
function scheduledSlot(availability, requestedMinutes) {
  const windows = (availability?.windows || [])
      .filter((w) => windowMinutes(w) >= 20)
      .sort((a, b) => windowMinutes(b) - windowMinutes(a)),
    window = windows.find((w) => windowMinutes(w) >= requestedMinutes) ||
      windows[0] || { start: "07:00", end: "08:00" },
    available = Math.max(20, windowMinutes(window)),
    duration = Math.min(requestedMinutes, available),
    [h, m] = window.start.split(":").map(Number),
    startTotal = h * 60 + m + Math.floor((available - duration) / 10) * 5,
    endTotal = startTotal + duration,
    clock = (total) =>
      `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  return { start: clock(startTotal), end: clock(endTotal), minutes: duration };
}
function primaryGoal(p) {
  const priority = [
    "2k-speed",
    "rowing-performance",
    "endurance",
    "strength",
    "fat-loss",
    "general-fitness",
  ];
  return (
    priority.find((goal) => (p.goals || []).includes(goal)) || "general-fitness"
  );
}
function checked(list, value) {
  return (list || []).includes(value) ? "checked" : "";
}
function setupWizard() {
  const steps = [
    `<section class="setup-step active"><h3>Tell PRF about you and your goals</h3><p class="muted">Select every goal that matters. PRF uses age, body weight and experience to scale training and fueling—not to limit what you can achieve.</p><div class="option-grid">${Object.entries(
      goalNames,
    )
      .map(
        ([v, n]) =>
          `<label class="option-card"><input type="checkbox" name="goals" value="${v}" ${checked(setupState.goals, v)}>${n}</label>`,
      )
      .join(
        "",
      )}</div><div class="setup-grid"><label>Name (optional)<input name="name" value="${esc(setupState.name)}" placeholder="Your name"></label><label>Age<input name="age" type="number" min="13" max="100" value="${esc(setupState.age)}" placeholder="Years"></label><label>Gender<select name="gender"><option value="woman">Woman</option><option value="man">Man</option><option value="nonbinary">Nonbinary</option><option value="self-describe">Self-describe</option><option value="prefer-not">Prefer not to say</option></select></label><label>Self-described gender (optional)<input name="genderSelfDescribe" value="${esc(setupState.genderSelfDescribe)}" placeholder="Optional"></label><label>Training experience<select name="experience"><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></label><label>Body weight<input name="weight" type="number" step="0.1" value="${esc(setupState.weight)}" placeholder="Used for fueling ranges"></label><label>Weight units<select name="units"><option value="lb">lb</option><option value="kg">kg</option></select></label></div></section>`,
    `<section class="setup-step"><h3>When can training actually happen?</h3><p class="muted">Add one or more open blocks per day. These are availability windows—not workouts PRF must fill completely.</p><div class="availability">${DAY_ORDER.map(
      (d) => {
        const a = setupState.availability?.[d] || {};
        return `<div class="availability-day"><div class="availability-day-head"><label><input type="checkbox" data-day-enabled="${d}" ${a.enabled ? "checked" : ""}><strong>${d}</strong></label><button type="button" data-add-window="${d}">+ Add window</button></div><div class="window-list">${(a.windows || []).map((w, i) => `<div class="window-block" data-window-row="${d}" data-window-index="${i}"><span class="window-accent"></span><label class="time-field"><span>Available from</span><input type="time" data-window-start value="${w.start}"></label><label class="time-field"><span>Until</span><input type="time" data-window-end value="${w.end}"></label><button type="button" class="remove-window" data-remove-window="${d}" data-window-index="${i}" aria-label="Remove ${d} window">×</button></div>`).join("")}</div></div>`;
      },
    ).join(
      "",
    )}</div><div class="setup-grid"><label>Fixed practices or classes<textarea name="fixedRows" rows="2" placeholder="Example: team row Monday, Wednesday, Friday">${esc(setupState.fixedRows)}</textarea></label><label>Strength sessions per week<select name="strengthDays"><option value="0">None</option><option value="1">1 day</option><option value="2">2 days</option><option value="3">3 days</option></select></label></div></section>`,
    `<section class="setup-step"><h3>Equipment, injuries and limitations</h3><p class="muted">Plans should fit the body and equipment available—not require improvising at the gym.</p><div class="option-grid">${[
      ["erg", "Rowing erg"],
      ["on-water", "On-water rowing"],
      ["dumbbells", "Dumbbells"],
      ["barbell", "Barbell / rack"],
      ["trap-bar", "Trap bar"],
      ["box", "Jump box"],
      ["bands", "Resistance bands"],
      ["machines", "Cable machines"],
    ]
      .map(
        ([v, n]) =>
          `<label class="option-card"><input type="checkbox" name="equipment" value="${v}" ${checked(setupState.equipment, v)}>${n}</label>`,
      )
      .join(
        "",
      )}</div><label>Injuries or areas needing care<textarea name="injuries" rows="3" placeholder="Example: left Achilles soreness; avoid repeated jumping">${esc(setupState.injuries)}</textarea></label><label>Other limitations or exercise preferences<textarea name="limitations" rows="3" placeholder="Example: no medicine-ball throws; prefer dumbbells to machines">${esc(setupState.limitations)}</textarea></label><p class="setup-note">PRF can make conservative exercise substitutions, but it does not diagnose injuries or replace medical guidance.</p></section>`,
    `<section class="setup-step"><h3>Make nutrition fit your week</h3><div class="setup-grid"><label>Diet pattern<select name="diet"><option value="omnivore">Omnivore</option><option value="pescatarian">Pescatarian</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option></select></label><label>Main dishes to prep per week<select name="prepDishes"><option value="2">2 dishes</option><option value="3">3 dishes</option><option value="4">4 dishes</option><option value="7">A different dinner daily</option></select></label><label>Food-prep day(s)<input name="prepDays" value="${esc(setupState.prepDays)}" placeholder="Sunday"></label><label>Foods to avoid / allergies<input name="avoid" value="${esc(setupState.avoid)}" placeholder="Example: peanuts, dairy"></label></div><label class="option-card"><input type="checkbox" name="leftovers" ${setupState.leftovers ? "checked" : ""}>I am happy eating planned leftovers</label><div class="dish-preview"><strong>How meal prep works</strong><span>PRF chooses the requested number of main dishes, rotates them through lunch and dinner, and places more carbohydrate around demanding sessions.</span></div></section>`,
  ];
  setupRoot.innerHTML = `<div class="setup-shell"><div class="setup-top"><div><h2>Build your PRF plan</h2><p class="muted">Step ${setupStep + 1} of ${steps.length}</p></div>${localStorage.getItem(PROFILE_KEY) ? '<button class="setup-close" aria-label="Close">×</button>' : ""}</div><div class="setup-progress"><span style="width:${((setupStep + 1) / steps.length) * 100}%"></span></div>${steps.join("")}<div class="setup-actions">${setupStep ? "<button data-setup-back>Back</button>" : ""}<button class="primary" data-setup-next>${setupStep === steps.length - 1 ? "Generate my week" : "Continue"}</button></div></div>`;
  setupRoot
    .querySelectorAll(".setup-step")
    .forEach((x, i) => x.classList.toggle("active", i === setupStep));
  [
    "gender",
    "experience",
    "units",
    "strengthDays",
    "diet",
    "prepDishes",
  ].forEach((n) => {
    const el = setupRoot.querySelector(`[name="${n}"]`);
    if (el) el.value = String(setupState[n]);
  });
  setupRoot
    .querySelector(".setup-close")
    ?.addEventListener("click", () => setupDialog.close());
  setupRoot.querySelectorAll("[data-add-window]").forEach((button) =>
    button.addEventListener("click", () => {
      captureSetup();
      const day = button.dataset.addWindow;
      setupState.availability[day].windows.push({
        start: "17:00",
        end: "18:30",
      });
      setupWizard();
    }),
  );
  setupRoot.querySelectorAll("[data-remove-window]").forEach((button) =>
    button.addEventListener("click", () => {
      captureSetup();
      const day = button.dataset.removeWindow;
      setupState.availability[day].windows.splice(
        +button.dataset.windowIndex,
        1,
      );
      setupWizard();
    }),
  );
  setupRoot
    .querySelector("[data-setup-back]")
    ?.addEventListener("click", () => {
      captureSetup();
      setupStep--;
      setupWizard();
    });
  setupRoot.querySelector("[data-setup-next]").addEventListener("click", () => {
    captureSetup();
    if (setupStep < 3) {
      setupStep++;
      setupWizard();
    } else {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(setupState));
      applyPersonalPlan(setupState);
      renderProfileSummary();
      setupDialog.close();
      renderCalendar();
      render();
    }
  });
}
function captureSetup() {
  setupRoot
    .querySelectorAll("input[name],textarea[name],select[name]")
    .forEach((el) => {
      if (el.name === "equipment" || el.name === "goals") return;
      if (el.type === "radio" && !el.checked) return;
      if (el.type === "checkbox") setupState[el.name] = el.checked;
      else setupState[el.name] = el.value;
    });
  setupState.equipment = [
    ...setupRoot.querySelectorAll('[name="equipment"]:checked'),
  ].map((x) => x.value);
  setupState.goals = [
    ...setupRoot.querySelectorAll('[name="goals"]:checked'),
  ].map((x) => x.value);
  if (!setupState.goals.length) setupState.goals = ["general-fitness"];
  setupState.availability = setupState.availability || {};
  DAY_ORDER.forEach((d) => {
    const enabled = setupRoot.querySelector(`[data-day-enabled="${d}"]`);
    if (enabled)
      setupState.availability[d] = {
        enabled: enabled.checked,
        windows: [
          ...setupRoot.querySelectorAll(`[data-window-row="${d}"]`),
        ].map((row) => ({
          start: row.querySelector("[data-window-start]").value,
          end: row.querySelector("[data-window-end]").value,
        })),
      };
  });
  setupState.strengthDays = +setupState.strengthDays;
  setupState.prepDishes = +setupState.prepDishes;
}

function weekNumber(referenceDate = new Date()) {
  const d = new Date(
    Date.UTC(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate(),
    ),
  );
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return Math.ceil(
    ((d - new Date(Date.UTC(d.getUTCFullYear(), 0, 1))) / 86400000 + 1) / 7,
  );
}
function dishPool(p, referenceDate = new Date()) {
  const pools = {
    vegan: [
      "Tofu-edamame rice bowls",
      "Lentil pasta with spinach",
      "Tempeh peanut-free stir-fry",
      "Chickpea quinoa power bowls",
      "Black-bean sweet-potato chili",
      "Red-lentil coconut curry",
      "Sesame soba bowls with tofu",
      "White-bean kale stew with bread",
    ],
    vegetarian: [
      "Tofu-edamame rice bowls",
      "Lentil pasta with spinach",
      "Egg and black-bean burrito bowls",
      "Chickpea quinoa power bowls",
      "Vegetable frittata with potatoes",
      "Black-bean sweet-potato chili",
      "Paneer or tofu tikka bowls",
      "White-bean kale stew with bread",
    ],
    pescatarian: [
      "Salmon rice bowls",
      "Lentil pasta with spinach",
      "Tofu-edamame stir-fry",
      "White-fish tacos with beans",
      "Tuna white-bean pasta salad",
      "Shrimp vegetable curry with rice",
      "Black-bean sweet-potato chili",
      "Mediterranean farro bowls",
    ],
    omnivore: [
      "Chicken rice and roasted vegetables",
      "Turkey-bean chili",
      "Salmon potato bowls",
      "Tofu-edamame stir-fry",
      "Beef and bean burrito bowls",
      "Chicken lentil curry with rice",
      "Turkey meatballs with pasta",
      "Mediterranean farro bowls",
    ],
  };
  const avoid = (p.avoid || "").toLowerCase();
  const compatible = pools[p.diet].filter(
    (x) =>
      !avoid
        .split(",")
        .some((a) => a.trim() && x.toLowerCase().includes(a.trim())),
  );
  const count = Math.min(p.prepDishes, compatible.length),
    offset = ((weekNumber(referenceDate) - 1) * count) % compatible.length;
  return Array.from(
    { length: count },
    (_, i) => compatible[(offset + i) % compatible.length],
  );
}
function nutritionTargets(p, hard) {
  const kg = p.weight ? +p.weight * (p.units === "lb" ? 0.453592 : 1) : 0;
  const protein = kg
    ? `${Math.round(kg * 1.6)}–${Math.round(kg * 2)} g`
    : "1.6–2.0 g/kg";
  const carbFactor = hard ? [4, 6] : [3, 5],
    carbs = kg
      ? `${Math.round(kg * carbFactor[0])}–${Math.round(kg * carbFactor[1])} g`
      : `${carbFactor[0]}–${carbFactor[1]} g/kg`;
  return { protein, carbs };
}
function isFixedRow(day, p) {
  return (p.fixedRows || "").toLowerCase().includes(day.toLowerCase());
}
function spacedDays(candidates, count, blocked = []) {
  const chosen = [],
    distance = (a, b) => {
      const d = Math.abs(DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
      return Math.min(d, 7 - d);
    };
  while (chosen.length < count && chosen.length < candidates.length) {
    const remaining = candidates.filter((day) => !chosen.includes(day));
    remaining.sort((a, b) => {
      const occupied = [...blocked, ...chosen],
        score = (day) =>
          occupied.length
            ? Math.min(...occupied.map((other) => distance(day, other)))
            : 0;
      return score(b) - score(a) || DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b);
    });
    chosen.push(remaining[0]);
  }
  return chosen;
}
function workoutFor(day, index, p, strengthUsed, doStrength) {
  const a = p.availability[day],
    fixed = isFixedRow(day, p),
    goal = primaryGoal(p),
    requested = fixed ? 90 : doStrength ? 75 : goal === "strength" ? 45 : 60,
    slot = scheduledSlot(a, requested),
    minutes = slot.minutes;
  if (!a?.enabled)
    return {
      label: "Recovery / no scheduled training",
      detail: "No workout scheduled within your stated availability.",
      type: null,
      hard: false,
      start: null,
    };
  if (fixed)
    return {
      label: "Fixed rowing practice",
      detail: `${minutes} min scheduled within an open availability block. Follow the team session and log available metrics.`,
      type: "rowing",
      hard: true,
      start: slot.start,
    };
  if (doStrength)
    return {
      label: strengthUsed ? "Strength B" : "Strength A",
      detail: `${Math.min(minutes, 75)} min strength and power session adapted to available equipment.`,
      type: strengthUsed ? "strengthB" : "strengthA",
      hard: true,
      start: slot.start,
    };
  if (goal === "2k-speed" && (index === 1 || index === 4))
    return {
      label: "Erg intervals",
      detail: `${Math.min(minutes, 60)} min including warm-up and 6 × 1 min hard / 2 min easy.`,
      type: "erg6",
      hard: true,
      start: slot.start,
    };
  if (goal === "strength")
    return {
      label: "Aerobic support",
      detail: `${Math.min(minutes, 45)} min easy aerobic work.`,
      type: "rowing",
      hard: false,
      start: slot.start,
    };
  if (index === 3 && ["rowing-performance", "endurance"].includes(goal))
    return {
      label: "Threshold / tempo",
      detail: `${Math.min(minutes, 60)} min including controlled tempo intervals.`,
      type: "rowing",
      hard: true,
      start: slot.start,
    };
  return {
    label: "Zone 2 aerobic",
    detail: `${Math.min(minutes, 75)} min easy conversational work.`,
    type: "rowing",
    hard: false,
    start: slot.start,
  };
}
function adaptStrength(p) {
  const eq = p.equipment || [],
    notes = `${p.injuries || ""} ${p.limitations || ""}`.toLowerCase(),
    avoidJump = /achilles|knee|no jump|avoid jump/.test(notes);
  const hinge = eq.includes("trap-bar")
    ? "Trap-bar deadlift"
    : eq.includes("barbell")
      ? "Romanian deadlift"
      : "Dumbbell Romanian deadlift";
  const squat = eq.includes("barbell")
    ? "Front / safety-bar squat"
    : "Goblet squat";
  const pull = eq.includes("dumbbells")
    ? "One-arm dumbbell row"
    : eq.includes("bands")
      ? "Band row"
      : eq.includes("machines")
        ? "Seated cable row"
        : "Table / bodyweight row";
  const power = avoidJump
    ? ["Fast step-up", 4, 4, "height", "Step height (in)"]
    : eq.includes("box")
      ? ["Box jump", 4, 3, "height", "Height (in)"]
      : ["Broad jump", 4, 3, "distance", "Distance (in)"];
  strengthA.splice(
    0,
    strengthA.length,
    power,
    [hinge, 4, 4, "load", "Load (lb)"],
    ["Split squat", 3, 6, "load", "Load (lb)"],
    [pull, 4, 6, "load", "Load / resistance"],
    ["Push-up / dumbbell press", 3, 8, "load", "Load / added wt"],
    ["Dead bug / Pallof press", 3, 8, "resistance", "Band/load"],
  );
  strengthB.splice(
    0,
    strengthB.length,
    power,
    [squat, 4, 4, "load", "Load (lb)"],
    ["Hip thrust / glute bridge", 3, 6, "load", "Load (lb)"],
    [pull, 3, 8, "load", "Load / resistance"],
    ["Push-up / dumbbell press", 3, 8, "load", "Load / added wt"],
    ["Side plank", 3, 30, "duration", "Seconds"],
  );
}
function applyPersonalPlan(p, referenceDate = new Date()) {
  adaptStrength(p);
  const dishes = dishPool(p, referenceDate),
    fallback = "Flexible meal using preferred foods",
    prepCount = Math.max(dishes.length, 1);
  let strengthUsed = 0;
  const available = DAY_ORDER.filter(
      (day) => p.availability[day]?.enabled && !isFixedRow(day, p),
    ),
    fixedDays = DAY_ORDER.filter(
      (day) => p.availability[day]?.enabled && isFixedRow(day, p),
    ),
    strengthSchedule = spacedDays(
      available,
      Math.min(p.strengthDays, available.length),
      fixedDays,
    );
  DAY_ORDER.forEach((day, index) => {
    const w = workoutFor(
      day,
      index,
      p,
      strengthUsed,
      strengthSchedule.includes(day),
    );
    if (w.type === "strengthA" || w.type === "strengthB") strengthUsed++;
    const a = p.availability[day] || {},
      targets = nutritionTargets(p, w.hard),
      dishA = dishes[index % prepCount] || fallback,
      dishB = dishes[(index + 1) % prepCount] || fallback;
    const items = [];
    if (a.enabled) {
      const t = setupTime(w.start);
      items.push([t, "Training", w.detail, w.type]);
      items.unshift([
        t,
        "Pre-workout fuel",
        w.hard
          ? "Easy carbohydrate plus a little protein"
          : "Light snack if needed",
      ]);
    }
    items.push([
      "After training",
      "Recovery meal",
      "Carbohydrate, protein and fluids matched to session demand",
    ]);
    items.push([
      "12:30 PM",
      "Lunch",
      `${dishA}${p.leftovers ? " · planned prep portion" : ""}`,
    ]);
    items.push([
      "3:30 PM",
      "Snack",
      p.diet === "vegan"
        ? "Fruit, soy yogurt or hummus"
        : "Fruit, yogurt or hummus",
    ]);
    items.push([
      "6:30 PM",
      "Dinner",
      `${dishB}${p.leftovers ? " · planned prep portion" : ""}`,
    ]);
    plan[day] = {
      training: w.label,
      protein: targets.protein,
      carbs: targets.carbs,
      items,
    };
  });
}
function renderProfileSummary() {
  const p = profile(),
    days = DAY_ORDER.filter((d) => p.availability?.[d]?.enabled),
    dishes = dishPool(p, date);
  profileSummary.innerHTML = `<div class="profile-chips">${p.goals.map((goal) => `<span class="profile-chip">${esc(goalNames[goal])}</span>`).join("")}<span class="profile-chip">${days.length} training days</span><span class="profile-chip">${p.strengthDays} strength days</span><span class="profile-chip">${esc(dietNames[p.diet])}</span><span class="profile-chip">${p.prepDishes} prep dishes</span></div><p class="profile-summary-line"><strong>Athlete:</strong> ${p.age ? `${esc(p.age)} years` : "Age not entered"}${p.weight ? ` · ${esc(p.weight)} ${esc(p.units)}` : ""}</p><p class="profile-summary-line"><strong>Availability:</strong> ${days.map((d) => `${d.slice(0, 3)} ${(p.availability[d].windows || []).map((w) => `${setupTime(w.start)}–${setupTime(w.end)}`).join(", ")}`).join(" · ") || "No days selected"}</p><p class="profile-summary-line"><strong>Week ${weekNumber(date)} main dishes:</strong> ${dishes.join(" · ") || "Add compatible meal preferences"}</p>${p.injuries ? `<p class="profile-summary-line"><strong>Injury considerations:</strong> ${esc(p.injuries)}</p>` : ""}`;
}
function openSetup() {
  setupState = profile();
  setupStep = 0;
  setupWizard();
  setupDialog.showModal();
}

editPlanSetup.addEventListener("click", openSetup);
const originalDayPlan = dayPlan;
let generatedPlanWeek = "";
dayPlan = function (d) {
  const id = `${d.getFullYear()}-${weekNumber(d)}`;
  if (id !== generatedPlanWeek) {
    applyPersonalPlan(profile(), d);
    generatedPlanWeek = id;
    if (document.getElementById("profileSummary")) renderProfileSummary();
  }
  return originalDayPlan(d);
};
applyPersonalPlan(profile(), date);
generatedPlanWeek = `${date.getFullYear()}-${weekNumber(date)}`;
renderProfileSummary();
renderCalendar();
render();
if (!localStorage.getItem(PROFILE_KEY)) setTimeout(openSetup, 250);
