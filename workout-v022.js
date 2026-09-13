// PRF v0.2.2 — equipment-aware strength plan and logging.
// This patch preserves existing v0.2 logs while improving exercise prescriptions.

strengthA.splice(0,strengthA.length,
  ['Box jump',4,3,'height','Height (in)'],
  ['Trap-bar deadlift',4,4,'load','Load (lb)'],
  ['Bulgarian split squat',3,6,'load','Load (lb)'],
  ['Pull-up',4,6,'pullup','Added wt (lb)'],
  ['One-arm dumbbell row',3,8,'load','Load (lb)'],
  ['Band Pallof press / dead bug',3,8,'resistance','Band/load'],
);

strengthB.splice(0,strengthB.length,
  ['Box jump',4,3,'height','Height (in)'],
  ['Front / safety-bar squat',4,4,'load','Load (lb)'],
  ['Romanian deadlift',3,5,'load','Load (lb)'],
  ['Hip thrust',3,6,'load','Load (lb)'],
  ['One-arm dumbbell row',3,8,'load','Load (lb)'],
  ['Dumbbell bench press / push-up',3,8,'load','Load / added wt'],
  ['Core',3,'','duration','Sec / reps'],
);

plan.Tuesday.items[1][2]='Box jumps for explosive power, then heavy strength. Trap-bar deadlift target RPE 7–8. No medicine-ball or cable-machine work required.';
plan.Sunday.items[1][2]='Box jumps, squat, RDL, hip thrust, dumbbell row, press and core. Keep volume low enough to protect Monday rowing.';

function metricPlaceholder(exercise){
  return exercise[4] || 'Load (lb)';
}

function metricHint(exercise){
  switch(exercise[3]){
    case 'height': return 'Track the box height you land on cleanly. Prioritize crisp, explosive reps over chasing height.';
    case 'pullup': return 'Enter added weight. Use 0 for bodyweight. If assisted, enter the assistance as a negative number (for example -20).';
    case 'resistance': return 'Enter band level, dumbbell weight, or another repeatable resistance marker.';
    case 'duration': return 'Use this field for seconds held or another repeatable core-work measure.';
    default: return '';
  }
}

strengthForm=function(exercises,entry){
  return `<h3>Set log</h3>${exercises.map((e,ei)=>{
    const hint=metricHint(e);
    return `<div class="exercise-log"><strong>${e[0]}</strong><small>${e[1]} × ${e[2]||'—'} prescribed${hint?` · ${hint}`:''}</small>${Array.from({length:e[1]},(_,si)=>{
      const v=entry.workout?.exercises?.[ei]?.sets?.[si]||{};
      return `<div class="set-row"><span>Set ${si+1}</span><input data-f="load" data-e="${ei}" data-s="${si}" inputmode="decimal" placeholder="${metricPlaceholder(e)}" value="${esc(v.load)}"><input data-f="reps" data-e="${ei}" data-s="${si}" inputmode="numeric" placeholder="reps" value="${esc(v.reps)}"><input data-f="rpe" data-e="${ei}" data-s="${si}" inputmode="decimal" placeholder="RPE" value="${esc(v.rpe)}"></div>`;
    }).join('')}</div>`;
  }).join('')}`;
};

// Refresh the visible day so revised workout descriptions appear immediately.
renderCalendar();
render();