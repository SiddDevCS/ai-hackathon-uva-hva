// Course picker, then a Noordhoff vein. Ore counts sit above Steve's bar.

const SAMPLE = {
  quote: "The derivative of a product is not the product of the derivatives.",
};

const UNIVERSITIES = [
  { id: "uva", name: "University of Amsterdam", short: "UvA" },
  { id: "hva", name: "Amsterdam University of Applied Sciences", short: "HvA" },
];

const LEVELS = [
  { id: "bachelor", label: "Bachelor" },
  { id: "master", label: "Master" },
];

const COURSES = [
  { id: "calc", uni: "uva", level: "bachelor", name: "Calculus 1", number: "5122CALC1Y" },
  { id: "linalg", uni: "uva", level: "bachelor", name: "Linear Algebra", number: "5122LINA6Y" },
  { id: "cog", uni: "uva", level: "bachelor", name: "Cognitive Psychology", number: "7203BP12XY" },
  { id: "ml", uni: "uva", level: "master", name: "Machine Learning", number: "5204MALI6Y" },
  { id: "metrics", uni: "uva", level: "master", name: "Econometrics", number: "6414M0151Y" },
  { id: "se", uni: "hva", level: "bachelor", name: "Software Engineering", number: "ICT-SE-Y1" },
  { id: "ba", uni: "hva", level: "bachelor", name: "Business Analytics", number: "AMSIB-BA2" },
  { id: "aai", uni: "hva", level: "master", name: "Applied Artificial Intelligence", number: "HvA-AAI-M1" },
  { id: "urban", uni: "hva", level: "master", name: "Urban Management", number: "HvA-UM-M2" },
];

const SOURCES = [
  { id: "slides", name: "Lecture slides", detail: "The deck from class" },
  { id: "book", name: "Textbook", detail: "The course book" },
];

const WAYS = [
  { id: "text", name: "Through text", detail: "A short written explanation of the chapter." },
  { id: "map", name: "Through a mind map", detail: "One idea in the middle, the moves around it." },
  { id: "info", name: "Through an infographic", detail: "One picture: the rule, the example, and the check." },
  { id: "cards", name: "Through flashcards", detail: "The idea on the front. The move on the back." },
  { id: "exam", name: "Through a quiz", detail: "Chapter, midterm, or final. Answer from memory." },
];

const CHAPTERS = {
  calc: {
    slides: ["Limits", "The product rule", "The chain rule"],
    book: ["Derivatives", "The product rule", "Applications"],
  },
  linalg: {
    slides: ["Vectors", "Linear systems", "Eigenvalues"],
    book: ["Matrices", "Vector spaces", "Orthogonality"],
  },
  cog: {
    slides: ["Attention", "Memory", "Language"],
    book: ["Perception", "Working memory", "Judgment"],
  },
  ml: {
    slides: ["Supervised learning", "Gradient descent", "Generalisation"],
    book: ["Models", "Optimisation", "Evaluation"],
  },
  metrics: {
    slides: ["Regression", "Inference", "Time series"],
    book: ["The linear model", "Hypothesis tests", "Forecasting"],
  },
  se: {
    slides: ["Requirements", "Design", "Testing"],
    book: ["The process", "Architecture", "Quality"],
  },
  ba: {
    slides: ["Data and decisions", "Dashboards", "Forecasts"],
    book: ["Descriptive analysis", "Models", "Communication"],
  },
  aai: {
    slides: ["Search", "Learning from data", "Responsible AI"],
    book: ["Agents", "Machine learning", "Evaluation"],
  },
  urban: {
    slides: ["Cities and governance", "Housing and land", "Mobility"],
    book: ["Urban systems", "Housing policy", "Participation"],
  },
};

const ORES = [
  { id: "silver", level: "T1", name: "Silver", rank: 3, band: "Nice hard question", src: "assets/minecraft_iron.webp", plain: "Same move as the worked example." },
  { id: "gold", level: "T2", name: "Gold", rank: 2, band: "Pretty hard question", src: "assets/minecraft_gold_ingot.webp", plain: "A new story, and you choose the rule." },
  { id: "diamond", level: "I", name: "Diamond", rank: 1, band: "Hard question", src: "assets/minecraft-diamond.png", plain: "Connect chapters and judge the result." },
];

const RANKED = [...ORES].sort((a, b) => a.rank - b.rank);
const PROGRESS_TOTAL = 3;

const FRIENDS = [
  { name: "Juliet", where: "Calculus 1", streak: 6 },
  { name: "Sidd", where: "Machine Learning", streak: 4, you: true },
  { name: "Salomé", where: "Linear Algebra", streak: 7 },
  { name: "Aditi", where: "Urban Management", streak: 3 },
  { name: "Nikita", where: "Software Engineering", streak: 5 },
];

const GROUP = [
  { name: "Juliet", streak: 6 },
  { name: "Sidd", streak: 4, you: true },
  { name: "Salomé", streak: 7 },
  { name: "Aditi", streak: 3 },
  { name: "Nikita", streak: 5 },
];

const GUIDE = [
  { target: "#overview", place: "right", title: "How far", body: "This map is the course. It marks the layer you are on, what is done, and what is still ahead." },
  { target: "#app .hud", place: "below", title: "The ores", body: "You earn these only on the quiz. Diamond is the hard question, gold is pretty hard, and silver is the nice hard one. Spend an ore later for a hint." },
  { target: "#app .screen", place: "below", title: "The course", body: "Start here. University, bachelor or master, then the course. The daily quiz at the top is retrieval. After that you pick lecture slides or the textbook, a chapter, and a way to learn." },
  { target: "#social", place: "left", title: "Social", body: "Friends who are online, and your group." },
];

const LESSON = [
  {
    ore: 0,
    title: "Training 1",
    prompt: "The blue box differentiates x² sin x. Which is the derivative of x³ cos x?",
    options: ["3x² cos x − x³ sin x", "3x² (−sin x)", "x³ cos x"],
    answer: 0,
    hint: "Same move as the box. Derivative of the first times the second, plus the first times the derivative of the second. The derivative of cos x is −sin x.",
    why: "Silver is a nice hard question: the factors changed, the move did not.",
  },
  {
    ore: 1,
    title: "Training 2",
    prompt: "Listeners are t² and volume each is e⁻ᵗ. Total sound is listeners times volume. What do you differentiate?",
    options: [
      "The product, with the product rule",
      "Each function, then multiply those derivatives",
      "Only t², with the power rule",
    ],
    answer: 0,
    hint: "The story is new. Total sound is still a product. Which rule did the blue box teach?",
    why: "Gold is a pretty hard question: a new story, and you still have to choose the rule.",
  },
  {
    ore: 2,
    title: "Insight",
    prompt: "The diagnostic uses the product rule for t < 0 and a limit from last week. The course says t is hours after opening. What is the item asking?",
    options: [
      "Judge whether the model still makes sense, using both chapters",
      "Repeat the blue box with new numbers",
      "Quote the formula and stop",
    ],
    answer: 0,
    hint: "A new story that still follows the model would be gold. This one steps outside the story and pulls in another chapter.",
    why: "Diamond is the hard question. It connects chapters and asks you to judge. A miss sends you back to the blue box.",
  },
];

function fresh() {
  return {
    screen: "intro",
    university: null,
    level: null,
    courseId: null,
    courseNumber: "",
    numberMissing: false,
    source: null,
    chapterId: null,
    chapterQuery: "",
    way: null,
    learnMissing: false,
    readObjective: false,
    readTheory: false,
    q: 0,
    choice: null,
    verdict: null,
    need: false,
    hinted: false,
    skipWarn: false,
    solved: [false, false, false],
    wallet: [0, 0, 0],
    examScope: "chapter",
    examFocus: "",
    examTypes: { mc: true, rank: false, open: false },
    pastExam: false,
    paper: [],
    examIndex: 0,
    examOrder: [],
    examText: "",
    examHint: 0,
    examAlt: false,
    examHintsUsed: 0,
    examLog: [],
    examSubmitted: false,
    examGrade: null,
    xp: 0,
    cardFace: false,
    dailyPaper: [],
    dailyIndex: 0,
    dailyChoice: null,
    dailySubmitted: false,
    dailyVerdict: null,
    dailyHint: 0,
    dailyAlt: false,
    dailyLog: [],
    dailyDone: false,
  };
}

let state = fresh();

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function uniById(id) {
  return UNIVERSITIES.find((uni) => uni.id === id);
}

function courseById(id) {
  return COURSES.find((course) => course.id === id);
}

function currentCourse() {
  return courseById(state.courseId);
}

function chaptersNow() {
  const course = currentCourse();
  if (!course || !state.source || !CHAPTERS[course.id]) return [];
  return CHAPTERS[course.id][state.source].map((name, index) => ({
    id: String(index),
    name,
  }));
}

function currentChapter() {
  return chaptersNow().find((chapter) => chapter.id === state.chapterId) || null;
}

function visibleChapters() {
  const query = state.chapterQuery.trim().toLowerCase();
  const chapters = chaptersNow();
  if (!query) return chapters;
  return chapters.filter((chapter) => chapter.name.toLowerCase().includes(query));
}

function clearLearn() {
  state.source = null;
  state.chapterId = null;
  state.chapterQuery = "";
  state.way = null;
  state.learnMissing = false;
}

function progressDone() {
  return state.solved.filter(Boolean).length;
}

function oreCount(id) {
  const index = ORES.findIndex((ore) => ore.id === id);
  return state.wallet[index] || 0;
}

function oreImg(ore, className) {
  return `<img class="${className}" src="${ore.src}" alt="" width="48" height="48">`;
}

function hud() {
  const done = progressDone();
  const pct = Math.round((done / PROGRESS_TOTAL) * 100);
  const steveShift = Math.round(43 * pct / 100);
  const ores = RANKED.map((ore) => {
    const count = oreCount(ore.id);
    const just = state.verdict === "ok" && state.screen === "question" && ORES[state.q].id === ore.id;
    return `<li class="ore-stat${count ? " is-in" : ""}${just ? " fresh" : ""}">
      <span class="ore-chip">${oreImg(ore, "ore-img")}</span>
      <span class="ore-num">×${count}</span>
      <span class="ore-name">${esc(ore.name)}</span>
      <span class="ore-band">${ore.rank}. ${esc(ore.band)}</span>
    </li>`;
  }).join("");
  return `<section class="hud" aria-label="Ore count and mining progress">
    <ol class="ore-count">${ores}</ol>
    <div class="mine-row">
      <div class="mine-track" role="progressbar" aria-valuemin="0" aria-valuemax="${PROGRESS_TOTAL}" aria-valuenow="${done}" aria-label="Ores earned on the quiz">
        <div class="mine-fill" style="width:${pct}%"></div>
        <div class="steve-crop" style="left:calc(${pct}% - ${steveShift}px)">
          <img src="assets/steve_mining.gif" alt="Steve mining">
        </div>
      </div>
      <p class="mine-count">${done} / ${PROGRESS_TOTAL}</p>
    </div>
  </section>`;
}

function courseChip() {
  const course = currentCourse();
  const uni = uniById(state.university);
  const level = LEVELS.find((item) => item.id === state.level);
  if (!course || !uni || !level) return "";
  return `<p class="kicker">${esc(uni.short)} · ${esc(level.label)} · ${esc(course.name)} · ${esc(state.courseNumber)}</p>`;
}

function screenIntro() {
  return `
    <p class="kicker">MindMine</p>
    <h1>Open a vein</h1>
    <p class="lead">A lode is a vein of ore. You study along it.</p>
    <p>Pick your university, then your course. The daily quiz is retrieval: bring the course back from memory. Steve mines a block only when a vein question pays an ore.</p>
    <div class="actions">
      <button type="button" class="btn btn-green" data-action="start" data-primary="true">Find your course</button>
    </div>`;
}

function screenUniversity() {
  const buttons = UNIVERSITIES.map((uni) => `
    <button type="button" class="btn choice" data-action="university" data-id="${uni.id}">
      <strong>${esc(uni.short)}</strong>
      <span>${esc(uni.name)}</span>
    </button>`).join("");
  return `
    <p class="kicker">Step 1</p>
    <h1>Choose your university</h1>
    <div class="choices">${buttons}</div>
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="intro">Back</button>
    </div>`;
}

function screenLevel() {
  const uni = uniById(state.university);
  const buttons = LEVELS.map((level) => `
    <button type="button" class="btn choice" data-action="level" data-level="${level.id}">${esc(level.label)}</button>`).join("");
  return `
    <p class="kicker">${esc(uni.short)}</p>
    <h1>Bachelor or master?</h1>
    <div class="choices">${buttons}</div>
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="university">Back</button>
    </div>`;
}

function screenCourse() {
  const uni = uniById(state.university);
  const level = LEVELS.find((item) => item.id === state.level);
  const list = COURSES.filter((course) => course.uni === state.university && course.level === state.level);
  const buttons = list.map((course) => `
    <button type="button" class="btn choice${course.id === state.courseId ? " is-on" : ""}" data-action="pick-course" data-id="${course.id}">
      <strong>${esc(course.name)}</strong>
      <span>${esc(course.number)}</span>
    </button>`).join("");
  const missing = state.numberMissing ? `<p class="feedback need" role="status">Add the course number.</p>` : "";
  return `
    <p class="kicker">${esc(uni.short)} · ${esc(level.label)}</p>
    <h1>Course and course number</h1>
    <div class="choices">${buttons}</div>
    <label class="number-field" for="course-number">Course number
      <input id="course-number" value="${esc(state.courseNumber)}" autocomplete="off" ${state.courseId ? "" : "disabled"}>
    </label>
    ${missing}
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="level">Back</button>
      <button type="button" class="btn btn-green" data-action="get-course" data-primary="true" ${state.courseId ? "" : "disabled"}>Get the course</button>
    </div>`;
}

function screenLearn() {
  const ready = state.source && state.chapterId && state.way;
  const sources = SOURCES.map((source) => `
    <button type="button" class="btn choice${source.id === state.source ? " is-on" : ""}" data-action="source" data-source="${source.id}">
      <strong>${esc(source.name)}</strong>
      <span>${esc(source.detail)}</span>
    </button>`).join("");
  const chapters = visibleChapters();
  let chapterBody = `<p>Choose lecture slides or the textbook. Then its chapters show up here.</p>`;
  if (state.source && chapters.length) {
    chapterBody = `<div class="choices">${chapters.map((chapter) => `
      <button type="button" class="btn choice${chapter.id === state.chapterId ? " is-on" : ""}" data-action="chapter" data-id="${chapter.id}">
        <strong>${esc(chapter.name)}</strong>
      </button>`).join("")}</div>`;
  } else if (state.source) {
    chapterBody = `<p class="feedback need" role="status">No chapter with that name.</p>`;
  }
  const startLabels = {
    text: "Open the text",
    map: "Open the mind map",
    info: "Open the infographic",
    cards: "Open the flashcards",
    exam: "Open quiz and exam",
  };
  const ways = WAYS.map((way) => `
    <button type="button" class="btn choice way${way.id === state.way ? " is-on" : ""}" data-action="way" data-way="${way.id}">
      ${wayMark(way.id)}
      <span class="way-copy">
        <strong>${esc(way.name)}</strong>
        <span>${esc(way.detail)}</span>
      </span>
    </button>`).join("");
  const missing = state.learnMissing ? `<p class="feedback need" role="status">Choose the slides or the textbook, a chapter, and a way to learn.</p>` : "";
  const chosen = currentChapter();
  const chosenNote = chosen ? `<p>Chosen chapter: <strong>${esc(chosen.name)}</strong></p>` : "";
  return `
    ${courseChip()}
    <h1>How do you want to learn?</h1>
    <p class="lead">${esc(currentCourse().name)} has lecture slides and a textbook. Pick where to start, the chapter, and the way.</p>
    <section class="learn-block">
      <p class="kicker">Your materials</p>
      <div class="choices sources">${sources}</div>
    </section>
    <section class="learn-block">
      <label class="number-field" for="chapter-name">Chapter name
        <input id="chapter-name" value="${esc(state.chapterQuery)}" placeholder="Type a chapter name" autocomplete="off">
      </label>
      <p class="kicker">Choose the chapter</p>
      ${chapterBody}
      ${chosenNote}
    </section>
    <section class="learn-block">
      <p class="kicker">What way would you like to learn?</p>
      <p>Through text, a mind map, an infographic, flashcards, or a quiz.</p>
      <div class="choices ways">${ways}</div>
    </section>
    ${missing}
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="welcome">Back</button>
      <button type="button" class="btn btn-green" data-action="start-learn" data-primary="true" ${ready ? "" : "disabled"}>${startLabels[state.way] || "Learn this chapter"}</button>
    </div>`;
}

function wayMark(id) {
  const marks = {
    text: `<svg class="way-mark" viewBox="0 0 36 36" aria-hidden="true"><rect x="4" y="6" width="28" height="3" fill="#111"/><rect x="4" y="14" width="22" height="3" fill="#111"/><rect x="4" y="22" width="26" height="3" fill="#111"/></svg>`,
    map: `<svg class="way-mark" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="5" fill="#f0c14a" stroke="#111" stroke-width="2"/><circle cx="6" cy="8" r="3" fill="#fff" stroke="#111" stroke-width="2"/><circle cx="30" cy="8" r="3" fill="#fff" stroke="#111" stroke-width="2"/><circle cx="8" cy="30" r="3" fill="#fff" stroke="#111" stroke-width="2"/><circle cx="28" cy="28" r="3" fill="#fff" stroke="#111" stroke-width="2"/><path d="M9 10l6 5M27 10l-6 5M11 28l4-6M26 26l-5-4" stroke="#111" stroke-width="2"/></svg>`,
    info: `<svg class="way-mark" viewBox="0 0 36 36" aria-hidden="true"><rect x="3" y="6" width="9" height="24" fill="#f0c14a" stroke="#111" stroke-width="2"/><rect x="14" y="6" width="9" height="24" fill="#fff" stroke="#111" stroke-width="2"/><rect x="25" y="6" width="8" height="24" fill="#e7f3df" stroke="#111" stroke-width="2"/></svg>`,
    cards: `<svg class="way-mark" viewBox="0 0 36 36" aria-hidden="true"><rect x="8" y="8" width="20" height="16" fill="#fff" stroke="#111" stroke-width="2"/><rect x="5" y="12" width="20" height="16" fill="#fff3d6" stroke="#111" stroke-width="2"/></svg>`,
    exam: `<svg class="way-mark" viewBox="0 0 36 36" aria-hidden="true"><rect x="6" y="4" width="24" height="28" fill="#fff" stroke="#111" stroke-width="2"/><path d="M11 12h14M11 18h14M11 24h8" stroke="#111" stroke-width="2"/></svg>`,
  };
  return marks[id] || "";
}

function formatBits(name) {
  if (/product/i.test(name)) {
    return {
      rule: "The derivative of a product is not the product of the derivatives.",
      example: "(uv)' = u'v + uv'. For x³ cos x, keep both terms.",
      check: "A new story still uses that same move.",
    };
  }
  return {
    rule: `${name} starts from the worked example.`,
    example: "Follow the example once, with the numbers it uses.",
    check: "Then use the same move when the story changes.",
  };
}

function screenFormat() {
  const chapter = currentChapter();
  const name = chapter ? chapter.name : "This chapter";
  const way = WAYS.find((item) => item.id === state.way);
  const bits = formatBits(name);
  let body = "";
  if (state.way === "map") {
    body = `<div class="mind">
      <p class="mind-core">${esc(name)}</p>
      <ul>
        <li>${esc(bits.rule)}</li>
        <li>${esc(bits.example)}</li>
        <li>${esc(bits.check)}</li>
      </ul>
    </div>`;
  } else if (state.way === "info") {
    body = `<div class="info-strip">
      <section><p class="kicker">Rule</p><strong>${esc(bits.rule)}</strong></section>
      <section><p class="kicker">Example</p><strong>${esc(bits.example)}</strong></section>
      <section><p class="kicker">Check</p><strong>${esc(bits.check)}</strong></section>
    </div>`;
  } else if (state.way === "cards") {
    const front = state.cardFace;
    body = `<button type="button" class="flash" data-action="flip">
      <span class="kicker">${front ? "Back" : "Front"}</span>
      <strong>${front ? esc(bits.example) : esc(bits.rule)}</strong>
    </button>
    <p>Turn the card, then go on to the worked example.</p>`;
  } else {
    body = `<div class="prose">
      <p>${esc(bits.rule)}</p>
      <p>${esc(bits.example)}</p>
      <p>${esc(bits.check)}</p>
    </div>`;
  }
  return `
    ${courseChip()}
    <p class="kicker">${esc(way ? way.name : "This chapter")}</p>
    <h1>${esc(name)}</h1>
    <p class="lead">${esc(way ? way.detail : "")}</p>
    ${body}
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="learn">Back</button>
      <button type="button" class="btn btn-green" data-action="to-objective" data-primary="true">Continue to the example</button>
    </div>`;
}

function screenWelcome() {
  const course = currentCourse();
  const hello = "Hello.";
  const ask = `Would you like any help with ${course.name}?`;
  const body = "The daily quiz is retrieval. Bring the course back without the notes. Study the example, then the vein. You earn an ore only on the vein quiz.";
  return `
    ${courseChip()}
    <div class="chat" data-typewriter>
      <h1 class="type-line" data-text="${esc(hello)}"></h1>
      <p class="lead type-line" data-text="${esc(ask)}"></p>
      <p class="type-line" data-text="${esc(body)}"></p>
      <div class="actions type-actions">
        <button type="button" class="btn btn-green" data-action="help" data-primary="true">Yes, help me study</button>
        <button type="button" class="linkish" data-action="back" data-to="course">Not now</button>
      </div>
    </div>`;
}

function screenObjective() {
  const source = SOURCES.find((item) => item.id === state.source);
  const chapter = currentChapter();
  const way = WAYS.find((item) => item.id === state.way);
  const from = source && chapter ? `${source.name} · ${chapter.name}` : currentCourse().name;
  const how = way ? way.name : "Worked example, then questions";
  return `
    ${courseChip()}
    <p class="kicker">${esc(from)}</p>
    <h1><span class="work-icon book" aria-hidden="true"></span> Today's objective</h1>
    <p class="lead">${esc(how)}. You started from ${esc(from)}. Recall the product rule, repeat the example's move, spot it in a new story, and judge a case that breaks the story.</p>
    <p>This is study for the quiz. An ore is earned only when a question is right.</p>
    <blockquote>${esc(SAMPLE.quote)}</blockquote>
    <p>The questions use this course, not a generic chapter.</p>
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="learn">Back</button>
      <button type="button" class="btn btn-green" data-action="theory" data-primary="true">Show the blue box</button>
    </div>`;
}

function screenTheory() {
  return `
    ${courseChip()}
    <p class="kicker">Worked example · read this before the sums</p>
    <h1><span class="work-icon box" aria-hidden="true"></span> The blue box</h1>
    <section class="bluebox">
      <h2>From ${esc(currentCourse().name)}</h2>
      <blockquote>${esc(SAMPLE.quote)}</blockquote>
      <p><strong>(uv)' = u'v + uv'</strong></p>
      <p>u = x², v = sin x<br>u' = 2x, v' = cos x<br>(uv)' = 2x sin x + x² cos x</p>
    </section>
    <p>The sums practice this move. They do not replace it. The quiz is where you earn silver, gold, or diamond.</p>
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="objective">Back</button>
      <button type="button" class="btn btn-green" data-action="practice" data-primary="true">I've followed the example</button>
    </div>`;
}

function screenQuestion() {
  const q = LESSON[state.q];
  const ore = ORES[q.ore];
  const locked = state.verdict === "ok";
  const options = q.options.map((option, index) => {
    const on = state.choice === index ? " is-on" : "";
    const bad = state.verdict === "no" && state.choice === index ? " is-bad" : "";
    return `<button type="button" class="btn option${on}${bad}" data-action="pick" data-choice="${index}" ${locked ? "disabled" : ""}>${esc(option)}</button>`;
  }).join("");
  let feedback = "";
  if (state.need) feedback = `<p class="feedback need" role="status">Pick a line first.</p>`;
  else if (state.verdict === "no" && !state.hinted) feedback = `<p class="feedback no" role="status">No ore for that. A hint costs one you already earned.</p>`;
  else if (state.verdict === "ok") feedback = `<p class="feedback ok" role="status">${esc(q.why)}</p>`;
  const heldIndex = state.wallet.findIndex((count) => count > 0);
  const cost = heldIndex < 0 ? null : ORES[heldIndex];
  const torch = `<img class="torch" src="assets/torch.png" alt="" width="20" height="50">`;
  let hintBox = "";
  if (state.hinted) {
    hintBox = `<div class="hint-card" role="status">
      ${torch}
      <div>
        <p class="kicker">Hint</p>
        <p>${esc(q.hint)}</p>
      </div>
    </div>`;
  } else if (!locked) {
    hintBox = `<div class="hint-row">
      <button type="button" class="torch-knob" data-action="spend" data-ore="${cost ? cost.id : ""}" ${cost ? "" : "disabled"}>
        ${torch}
        <span>Hint</span>
      </button>
      <p class="hint-note">${cost ? `Hint. Costs one ${esc(cost.name.toLowerCase())}.` : "Hint. Earn an ore on a question, then light the torch."}</p>
    </div>`;
  }
  const next = state.q === LESSON.length - 1 ? `Take the ${ore.name.toLowerCase()}` : `Take the ${ore.name.toLowerCase()} and go deeper`;
  const skipBox = locked ? "" : `
    <div class="skip-box">
      <p class="skip-warn" role="status">You will definitely not be rewarded.</p>
      ${state.skipWarn
        ? `<div class="actions">
            <button type="button" class="btn" data-action="skip-anyway">Skip anyway</button>
            <button type="button" class="linkish" data-action="skip-stay">Stay</button>
          </div>`
        : `<button type="button" class="linkish" data-action="skip-ask">Skip this question</button>`}
    </div>`;
  return `
    ${courseChip()}
    <div class="q-head">
      ${oreImg(ore, "ore-img q-ore")}
      <div>
        <p class="kicker">${ore.rank}. Earn ${esc(ore.name.toLowerCase())} · ${esc(ore.band)}</p>
        <h1>${esc(q.title)}</h1>
      </div>
    </div>
    <p class="lead">${esc(q.prompt)}</p>
    ${options}
    ${feedback}
    ${hintBox}
    <div class="actions">
      ${locked
        ? `<button type="button" class="btn btn-green" data-action="collect" data-primary="true">${esc(next)}</button>`
        : `<button type="button" class="btn btn-green" data-action="check" data-primary="true">Check</button>`}
    </div>
    ${skipBox}`;
}

function screenDone() {
  const rows = RANKED.map((ore) => `<li>${oreImg(ore, "ore-img")}<span><strong>${ore.rank}. ${esc(ore.name)}</strong> · ${esc(ore.band)}<br>${esc(ore.plain)}</span></li>`).join("");
  const skipped = state.solved.filter((ok) => !ok).length;
  const lead = skipped
    ? "A skipped question paid nothing. You will definitely not be rewarded for it. The count is the ore you still hold."
    : "Steve mined the quiz. The count is the ore you still hold. A spent ore was used for a hint.";
  return `
    ${courseChip()}
    <h1>Vein complete</h1>
    <p class="lead">${lead}</p>
    <ul class="legend">${rows}</ul>
    <div class="actions">
      <button type="button" class="btn btn-green" data-action="restart" data-primary="true">Walk it again</button>
    </div>`;
}

function canJump(key) {
  if (key === "university") return true;
  if (key === "level") return Boolean(state.university);
  if (key === "course") return Boolean(state.university && state.level);
  return Boolean(state.courseId && state.courseNumber);
}

function hereKey() {
  if (state.screen === "intro" || state.screen === "university") return "university";
  if (state.screen === "question") return `q${state.q}`;
  if (state.screen.startsWith("exam")) return "exam-setup";
  if (state.screen === "daily" || state.screen === "daily-done") return "daily";
  if (state.screen === "format") return "learn";
  return state.screen;
}

function stepComplete(key) {
  if (key === "university") return Boolean(state.university);
  if (key === "level") return Boolean(state.level);
  if (key === "course") return Boolean(state.courseId && state.courseNumber);
  if (key === "welcome") {
    const later = ["learn", "format", "objective", "theory", "question", "done", "daily", "daily-done", "exam-setup", "exam-q", "exam-results", "exam-review", "exam-cards", "exam-map"];
    return later.includes(state.screen) || Boolean(state.source || state.dailyDone || state.dailyPaper.length);
  }
  if (key === "daily") return Boolean(state.dailyDone);
  if (key === "learn") return ["objective", "theory", "question", "done"].includes(state.screen) || state.readObjective || state.readTheory;
  if (key === "exam-setup") return state.paper.length > 0 && state.examLog.length >= state.paper.length;
  if (key === "objective") return state.readObjective || ["theory", "question", "done"].includes(state.screen);
  if (key === "theory") return state.readTheory || state.screen === "question" || state.screen === "done";
  if (key.startsWith("q")) return Boolean(state.solved[Number(key.slice(1))]);
  return false;
}

function overview() {
  const course = currentCourse();
  const uni = state.university ? uniById(state.university) : null;
  const level = LEVELS.find((item) => item.id === state.level);
  const done = progressDone();
  const pct = Math.round((done / PROGRESS_TOTAL) * 100);
  const steps = [
    { key: "university", title: "University", detail: uni ? uni.short : "Choose one" },
    { key: "level", title: "Degree", detail: level ? level.label : "Bachelor or master" },
    { key: "course", title: "Course", detail: course ? `${course.name} · ${state.courseNumber}` : "Pick a course" },
    { key: "welcome", title: "Welcome", detail: course ? `Help with ${course.name}` : "Hello" },
    { key: "daily", title: "Daily quiz", detail: state.dailyDone ? "Retrieved today" : "Retrieval" },
    { key: "learn", title: "Learn", detail: currentChapter() ? currentChapter().name : "Chapter and way" },
    { key: "exam-setup", title: "Quiz", detail: "Chapter, midterm, or final" },
    { key: "objective", title: "Objective", detail: "For the quiz", icon: "book" },
    { key: "theory", title: "Blue box", detail: "For the quiz", icon: "box" },
    { key: "q0", title: "Silver", detail: "Earn on the quiz", ore: ORES[0] },
    { key: "q1", title: "Gold", detail: "Earn on the quiz", ore: ORES[1] },
    { key: "q2", title: "Diamond", detail: "Earn on the quiz", ore: ORES[2] },
  ];
  const here = hereKey();
  const rows = steps.map((step) => {
    const current = step.key === here;
    const complete = stepComplete(step.key);
    const cls = current ? "now" : complete ? "did" : "open";
    const word = complete ? "Complete" : "Incomplete";
    const hereMark = current
      ? `<span class="you-are-here"><span class="here-label">you are here</span><svg class="here-arrow" viewBox="0 0 32 14" aria-hidden="true"><path d="M1 5.2h16V1.5L30 7 17 12.5V8.8H1z" fill="#e10600" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg></span>`
      : "";
    const mark = step.ore
      ? oreImg(step.ore, "step-icon")
      : step.key === "daily"
        ? fireIcon()
        : step.icon
          ? `<span class="work-icon ${step.icon}" aria-hidden="true"></span>`
          : `<span class="pip" aria-hidden="true"></span>`;
    const open = canJump(step.key);
    return `<li class="${cls}${step.key === "daily" ? " is-daily" : ""}"${current ? ` aria-current="step"` : ""}>
      ${hereMark}
      <button type="button" class="map-jump" data-action="jump" data-to="${step.key}" ${open ? "" : "disabled"}>
        ${mark}
        <span>
          <strong>${esc(step.title)}</strong>
          <small>${esc(step.detail)}</small>
        </span>
        <em class="${complete ? "is-complete" : "is-incomplete"}">${word}</em>
      </button>
    </li>`;
  }).join("");
  const title = course ? course.name : "No course yet";
  const doneNote = state.screen === "done" ? `<p class="map-done">Vein complete</p>` : "";
  return `
    <div class="overview-card">
      <p class="kicker">How far</p>
      <h2>${esc(title)}</h2>
      <p class="map-frac">${done}<span> / ${PROGRESS_TOTAL}</span></p>
      <p class="map-caption">ores earned</p>
      <div class="map-meter" aria-hidden="true"><span style="width:${pct}%"></span></div>
      ${doneNote}
      <ol class="map">${rows}</ol>
    </div>`;
}

const QUANT = new Set(["calc", "linalg", "ml", "metrics", "se", "ba", "aai"]);

function courseChapterNames() {
  const course = currentCourse();
  const pack = course && CHAPTERS[course.id];
  if (!pack) return ["This chapter"];
  return [...new Set([...pack.slides, ...pack.book])];
}

function examTopics() {
  const chapters = courseChapterNames();
  if (state.examScope === "chapter") return [state.examFocus || chapters[0]];
  if (state.examScope === "week") return [state.examFocus];
  const count = state.examScope === "final" ? 7 : 3;
  return Array.from({ length: count }, (_, index) => `Week ${index + 1} · ${chapters[index % chapters.length]}`);
}

function chosenTypes() {
  return ["mc", "rank", "open"].filter((id) => state.examTypes[id]);
}

function makeQuestion(type, topic, index) {
  const course = currentCourse().name;
  const past = state.pastExam ? "Past-exam style. " : "";
  const rank = index % 3;
  if (type === "rank") {
    const steps = QUANT.has(state.courseId) && /product|derivative|chain|limit/i.test(topic)
      ? [["name", "Name the two factors"], ["diff", "Differentiate each factor"], ["write", "Write u'v + uv'"], ["check", "Check the sign of each derivative"]]
      : [["goal", `State what ${topic} asks`], ["example", "Follow the worked example"], ["move", "Repeat the move in a new story"], ["judge", "Judge a case that breaks the story"]];
    return {
      type, topic, rank,
      prompt: `${past}Put these steps for ${topic} in ${course} in order.`,
      steps,
      order: steps.map((step) => step[0]),
      why: "Name the task, follow the example, repeat the move, then judge.",
      alt: "You do not start by judging. You start by naming the task.",
      hint1: "The first step names the task. The last step is the judgment.",
      hint2: "Order: name the task, follow the worked example, repeat the move, then judge.",
    };
  }
  if (type === "open") {
    if (QUANT.has(state.courseId)) {
      return {
        type, topic, rank,
        prompt: `${past}From ${topic} in ${course}: (uv)' = u'v + uv'. Give the derivative of x³ cos x.`,
        keys: ["3x", "cos", "sin"],
        model: "3x² cos x − x³ sin x",
        well: "A strong answer keeps both parts of the product rule and the minus from cos x.",
        why: "u = x³, v = cos x, u' = 3x², v' = −sin x.",
        alt: "Differentiate x³ while cos x stays, then keep x³ while cos x becomes −sin x.",
        hint1: "This is a product. Do not multiply the two derivatives.",
        hint2: "Let u = x³ and v = cos x. Write u'v + uv', and keep the minus from cos x.",
      };
    }
    const word = topic.split(" ")[0].toLowerCase();
    return {
      type, topic, rank,
      prompt: `${past}Explain how ${topic} in ${course} is used when the story changes.`,
      keys: ["example", "rule", word],
      model: `Name the rule from the worked example of ${topic}, then use that same rule in the new story.`,
      well: "A strong answer keeps the worked example and says the new story still uses that rule.",
      why: "A new story is still the same move. The example comes first.",
      alt: "The story changed. The rule did not.",
      hint1: `Think about what the worked example of ${topic} already showed.`,
      hint2: "The example teaches the rule. The question only changes the story around that rule.",
    };
  }
  const correct = `${topic} is learned from the worked example, then tested`;
  const options = [
    `${topic} means you skip the example and guess`,
    `${topic} is a score for speed`,
    `${topic} replaces the course notes`,
  ];
  const answer = (index + 2) % 4;
  options.splice(answer, 0, correct);
  return {
    type: "mc", topic, rank,
    prompt: `${past}In ${course}, which line fits ${topic}?`,
    options,
    answer,
    why: `${topic} is studied from the example first. The quiz checks the move. It does not pay for speed.`,
    alt: `Read ${topic}, follow the example, then answer. The ore only marks that test.`,
    hint1: `Ask what ${topic} is for in this course, before you look for a shortcut.`,
    hint2: "The fitting line keeps the worked example and the test. It does not skip the example.",
    similar: {
      type: "mc", topic, rank,
      prompt: `${past}A new story in ${course} still depends on ${topic}. What do you do?`,
      options: [
        "Use the same rule the example taught",
        "Multiply the derivatives and stop",
        "Ignore the example",
        "Treat it as a different course",
      ],
      answer: 0,
      why: "A new story still uses the rule from the example.",
      alt: "The setting changed. The rule stayed.",
      hint1: "The story is new. The rule is not.",
      hint2: "Look for the line that carries the example's rule into the new story.",
    },
  };
}

function shuffleIds(ids) {
  const copy = ids.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  if (copy.every((id, index) => id === ids[index]) && copy.length > 1) {
    [copy[0], copy[1]] = [copy[1], copy[0]];
  }
  return copy;
}

function closeExamCard(correct) {
  if (state.examSubmitted) return;
  const question = currentExamQuestion();
  state.examLog.push({ topic: question.topic, correct });
  state.examHintsUsed += state.examHint;
  if (correct) {
    state.xp += 100;
    state.wallet[question.rank] += 1;
  }
  state.examSubmitted = true;
  state.verdict = correct ? "ok" : "no";
}

function resetExamCard() {
  const question = state.paper[state.examIndex];
  state.choice = null;
  state.verdict = null;
  state.need = false;
  state.skipWarn = false;
  state.examSubmitted = false;
  state.examHint = 0;
  state.examAlt = false;
  state.examText = "";
  state.examGrade = null;
  state.examOrder = question && question.type === "rank" ? shuffleIds(question.order) : [];
}

function buildPaper() {
  const topics = examTopics();
  const types = chosenTypes();
  const count = state.examScope === "final" ? 8 : state.examScope === "midterm" ? 6 : 5;
  state.paper = Array.from({ length: count }, (_, index) => makeQuestion(types[index % types.length], topics[index % topics.length], index));
  state.examIndex = 0;
  state.examLog = [];
  state.examHintsUsed = 0;
  state.xp = 0;
  resetExamCard();
}

function gradeOpen(text, question) {
  const lower = text.toLowerCase();
  const hits = question.keys.filter((key) => lower.includes(key.toLowerCase()));
  const ratio = hits.length / question.keys.length;
  const understanding = Math.round(4 + ratio * 6);
  const concepts = Math.round(3 + ratio * 7);
  const explanation = text.trim().length > 40 ? Math.min(10, understanding) : Math.max(2, understanding - 2);
  return {
    correct: ratio >= 0.5 && text.trim().length > 8,
    understanding,
    concepts,
    explanation,
    missing: question.keys.filter((key) => !hits.includes(key)),
  };
}

function scopeLabel() {
  if (state.examScope === "midterm") return "Midterm · weeks 1–3";
  if (state.examScope === "final") return "Final · weeks 1–7";
  return state.examFocus || "This chapter";
}

function screenExamSetup() {
  const chapters = courseChapterNames();
  const scopeButton = (scope, focus, label, detail) => {
    const on = state.examScope === scope && state.examFocus === focus;
    return `<button type="button" class="btn choice${on ? " is-on" : ""}" data-action="exam-scope" data-scope="${scope}" data-focus="${esc(focus)}"><strong>${esc(label)}</strong><span>${esc(detail)}</span></button>`;
  };
  const chapterButtons = chapters.map((name) => scopeButton("chapter", name, name, "Chapter")).join("");
  const weekButtons = [1, 2, 3].map((week) => scopeButton("week", `Week ${week}`, `Week ${week}`, chapters[(week - 1) % chapters.length])).join("");
  const types = [
    ["mc", "Multiple choice", "Four options. One is correct."],
    ["rank", "Ranking", "Drag the steps into order."],
    ["open", "Open answer", "A calculation or a short explanation."],
  ].map(([id, name, detail]) => `
    <button type="button" class="btn choice${state.examTypes[id] ? " is-on" : ""}" data-action="exam-type" data-type="${id}">
      <strong>${esc(name)}</strong><span>${esc(detail)}</span>
    </button>`).join("");
  return `
    ${courseChip()}
    <p class="kicker">${esc(currentCourse().name)}</p>
    <h1>Quiz and exam</h1>
    <p class="lead">Test only this course. Pick the scope, then the kinds of question.</p>
    <section class="learn-block">
      <p class="kicker">Chapter or week</p>
      <div class="choices">${chapterButtons}${weekButtons}</div>
    </section>
    <section class="learn-block">
      <p class="kicker">Whole paper</p>
      <div class="choices">
        ${scopeButton("midterm", "", "Midterm exam", "Covers weeks 1–3")}
        ${scopeButton("final", "", "Final exam", "Covers weeks 1–7")}
      </div>
    </section>
    <section class="learn-block">
      <p class="kicker">Question types</p>
      <div class="choices">${types}</div>
    </section>
    <section class="learn-block">
      <button type="button" class="btn choice${state.pastExam ? " is-on" : ""}" data-action="exam-past">
        <strong>Past exam style</strong>
        <span>New questions in the manner of a past paper. The course notes still set the material.</span>
      </button>
    </section>
    <div class="actions">
      <button type="button" class="linkish" data-action="back" data-to="learn">Back</button>
      <button type="button" class="btn btn-green" data-action="exam-start" data-primary="true">Start ${esc(scopeLabel())}</button>
    </div>`;
}

function currentExamQuestion() {
  return state.paper[state.examIndex];
}

function screenExamQuestion() {
  const question = currentExamQuestion();
  if (!question) return screenExamSetup();
  const ore = ORES[question.rank];
  const total = state.paper.length;
  const locked = state.examSubmitted;
  let body = "";
  if (question.type === "mc") {
    body = question.options.map((option, index) => {
      const on = state.choice === index ? " is-on" : "";
      const bad = locked && state.choice === index && index !== question.answer ? " is-bad" : "";
      const good = locked && index === question.answer ? " is-on" : "";
      const letter = String.fromCharCode(65 + index);
      return `<button type="button" class="btn option${on}${bad}${good}" data-action="exam-pick" data-choice="${index}" ${locked ? "disabled" : ""}>${letter}. ${esc(option)}</button>`;
    }).join("");
  } else if (question.type === "rank") {
    const byId = Object.fromEntries(question.steps);
    body = `<ol class="rank-list">${state.examOrder.map((id, index) => `
      <li class="rank-row" draggable="${locked ? "false" : "true"}" data-rank="${esc(id)}">
        <span class="rank-n">${index + 1}</span>
        <span>${esc(byId[id])}</span>
        ${locked ? "" : `<span class="rank-moves">
          <button type="button" class="linkish" data-action="rank-move" data-rank="${esc(id)}" data-dir="-1">Up</button>
          <button type="button" class="linkish" data-action="rank-move" data-rank="${esc(id)}" data-dir="1">Down</button>
        </span>`}
      </li>`).join("")}</ol>`;
  } else {
    body = `<label class="number-field" for="open-answer">Your answer
      <textarea id="open-answer" rows="4" ${locked ? "disabled" : ""}>${esc(state.examText)}</textarea>
    </label>`;
  }
  let hints = "";
  if (state.examHint >= 1) hints += `<div class="hint-card" role="status"><img class="torch" src="assets/torch.png" alt="" width="16" height="40"><div><p class="kicker">Hint 1</p><p>${esc(question.hint1)}</p></div></div>`;
  if (state.examHint >= 2) hints += `<div class="hint-card" role="status"><img class="torch" src="assets/torch.png" alt="" width="16" height="40"><div><p class="kicker">Hint 2</p><p>${esc(question.hint2)}</p></div></div>`;
  const hintButton = locked || state.examHint >= 2 ? "" : `
    <div class="hint-row">
      <button type="button" class="torch-knob" data-action="exam-hint">
        <img class="torch" src="assets/torch.png" alt="" width="20" height="50">
        <span>Need a hint?</span>
      </button>
      <p class="hint-note">${state.examHint === 0 ? "Hint stays hidden until you light the torch." : "Hint 2 is the deeper one."}</p>
    </div>`;
  let feedback = "";
  if (state.need) feedback = `<p class="feedback need" role="status">Answer first.</p>`;
  else if (locked && question.type === "open" && state.examGrade) {
    const grade = state.examGrade;
    const mark = state.verdict === "ok" ? "Correct. +100 XP." : "Not quite. No ore for that.";
    feedback = `<div class="grade" role="status">
      <p class="feedback ${state.verdict === "ok" ? "ok" : "no"}">${mark}</p>
      <p class="kicker">Your answer</p>
      <p>${esc(state.examText || "No answer")}</p>
      <p class="kicker">AI assessment</p>
      <p>Understanding ${grade.understanding}/10 · Key concepts ${grade.concepts}/10 · Explanation ${grade.explanation}/10</p>
      <p><strong>What you did well.</strong> ${esc(question.well)}</p>
      <p><strong>What you are missing.</strong> ${grade.missing.length ? `You did not mention ${esc(grade.missing.join(", "))}.` : "The main ideas are there."}</p>
      <p><strong>Model answer.</strong> ${esc(question.model)}</p>
    </div>`;
  } else if (locked && state.verdict === "ok") {
    feedback = `<p class="feedback ok" role="status">Correct. +100 XP. ${esc(question.why)}</p>`;
  } else if (locked) {
    const yours = question.type === "mc" ? `Your answer: ${String.fromCharCode(65 + (state.choice ?? 0))}. Correct answer: ${String.fromCharCode(65 + question.answer)}.` : "That order is not the one the example uses.";
    feedback = `<p class="feedback no" role="status">Not quite. ${esc(yours)} ${esc(question.why)}</p>`;
  }
  const alt = locked && state.examAlt ? `<p class="feedback ok" role="status">${esc(question.alt)}</p>` : "";
  const after = locked ? `
    <div class="actions">
      ${question.similar ? `<button type="button" class="btn" data-action="exam-similar">Try a similar question</button>` : ""}
      <button type="button" class="btn" data-action="exam-alt">Explain differently</button>
      <button type="button" class="btn btn-green" data-action="exam-next" data-primary="true">${state.examIndex === total - 1 ? "See results" : "Next question"}</button>
    </div>` : `
    <div class="actions">
      <button type="button" class="btn btn-green" data-action="exam-submit" data-primary="true">Submit answer</button>
    </div>
    <div class="skip-box">
      <p class="skip-warn" role="status">You will definitely not be rewarded.</p>
      ${state.skipWarn
        ? `<div class="actions"><button type="button" class="btn" data-action="exam-skip">Skip anyway</button><button type="button" class="linkish" data-action="skip-stay">Stay</button></div>`
        : `<button type="button" class="linkish" data-action="skip-ask">Skip this question</button>`}
    </div>`;
  return `
    ${courseChip()}
    <p class="kicker">${esc(scopeLabel())}${state.pastExam ? " · Past exam style" : ""} · Earn ${esc(ore.name.toLowerCase())}</p>
    <h1>Question ${state.examIndex + 1} / ${total}</h1>
    <p class="lead">${esc(question.prompt)}</p>
    ${body}
    ${hintButton}
    ${hints}
    ${feedback}
    ${alt}
    ${after}`;
}

function topicRows() {
  const buckets = new Map();
  state.examLog.forEach((row) => {
    const bucket = buckets.get(row.topic) || { correct: 0, total: 0 };
    bucket.total += 1;
    if (row.correct) bucket.correct += 1;
    buckets.set(row.topic, bucket);
  });
  return [...buckets.entries()].map(([topic, bucket]) => ({
    topic,
    pct: Math.round((bucket.correct / bucket.total) * 100),
  }));
}

function weakTopic() {
  const rows = topicRows();
  if (!rows.length) return null;
  return rows.reduce((worst, row) => (row.pct < worst.pct ? row : worst));
}

function screenExamResults() {
  const total = state.examLog.length;
  const correct = state.examLog.filter((row) => row.correct).length;
  const score = total ? Math.round((correct / total) * 100) : 0;
  const rows = topicRows().map((row) => `<tr><td>${esc(row.topic)}</td><td>${row.pct}%</td></tr>`).join("");
  const weak = weakTopic();
  const weakLine = weak && weak.pct < 100
    ? `You may want to review ${weak.topic} before the next paper.`
    : "Every topic on this paper held.";
  return `
    ${courseChip()}
    <p class="kicker">${esc(scopeLabel())}</p>
    <h1>Your results</h1>
    <p class="lead">Score ${score}%. Questions ${total}. Correct ${correct}. Incorrect ${total - correct}.</p>
    <p>Hints used ${state.examHintsUsed}. XP earned +${state.xp} XP.</p>
    <table class="results"><thead><tr><th>Topic</th><th>Performance</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="kicker">Your weak area</p>
    <p>${esc(weakLine)}</p>
    <div class="actions">
      <button type="button" class="btn" data-action="exam-go" data-to="exam-review">Review weak topic</button>
      <button type="button" class="btn" data-action="exam-go" data-to="exam-cards">Create flashcards</button>
      <button type="button" class="btn" data-action="exam-go" data-to="exam-map">Generate mind map</button>
      <button type="button" class="btn btn-green" data-action="exam-go" data-to="exam-setup" data-primary="true">Try another quiz</button>
    </div>`;
}

function screenExamReview() {
  const weak = weakTopic();
  const topic = weak ? weak.topic : scopeLabel();
  return `
    ${courseChip()}
    <h1>Review ${esc(topic)}</h1>
    <p class="lead">Go back to the worked example for this topic, then sit the question again.</p>
    <p>The example comes first. The quiz checks it. A miss sends you back to the example, not to a score.</p>
    <div class="actions">
      <button type="button" class="btn" data-action="jump" data-to="theory">Open the blue box</button>
      <button type="button" class="btn btn-green" data-action="exam-go" data-to="exam-results" data-primary="true">Back to results</button>
    </div>`;
}

function screenExamCards() {
  const weak = weakTopic();
  const topic = weak ? weak.topic : "This chapter";
  const front = state.cardFace;
  return `
    ${courseChip()}
    <h1>Flashcards · ${esc(topic)}</h1>
    <button type="button" class="flash" data-action="flip">
      <span class="kicker">${front ? "Back" : "Front"}</span>
      <strong>${front ? `Use the worked example of ${esc(topic)}, then answer.` : `What comes before the quiz on ${esc(topic)}?`}</strong>
    </button>
    <div class="actions">
      <button type="button" class="btn btn-green" data-action="exam-go" data-to="exam-results" data-primary="true">Back to results</button>
    </div>`;
}

function screenExamMap() {
  const weak = weakTopic();
  const topic = weak ? weak.topic : "This chapter";
  return `
    ${courseChip()}
    <h1>Mind map</h1>
    <div class="mind">
      <p class="mind-core">${esc(topic)}</p>
      <ul>
        <li>Worked example</li>
        <li>Same move, new numbers</li>
        <li>New story</li>
        <li>Judge the break</li>
      </ul>
    </div>
    <div class="actions">
      <button type="button" class="btn btn-green" data-action="exam-go" data-to="exam-results" data-primary="true">Back to results</button>
    </div>`;
}

function resetDailyCard() {
  state.dailyChoice = null;
  state.need = false;
  state.skipWarn = false;
  state.dailySubmitted = false;
  state.dailyVerdict = null;
  state.dailyHint = 0;
  state.dailyAlt = false;
}

function buildDaily() {
  const topics = courseChapterNames();
  state.dailyPaper = [0, 1, 2].map((index) => {
    const question = makeQuestion("mc", topics[index % topics.length], index);
    question.prompt = `From memory. ${question.prompt}`;
    return question;
  });
  state.dailyIndex = 0;
  state.dailyLog = [];
  resetDailyCard();
}

function openDaily() {
  if (!currentCourse()) {
    state.screen = state.university ? "course" : "university";
    render();
    return;
  }
  const finished = state.dailyPaper.length > 0 && state.dailyLog.length >= state.dailyPaper.length;
  if (finished) {
    state.screen = "daily-done";
    render();
    return;
  }
  if (!state.dailyPaper.length) buildDaily();
  state.screen = "daily";
  render();
}

function closeDailyCard(correct) {
  if (state.dailySubmitted) return;
  state.dailyLog.push({ correct });
  state.dailySubmitted = true;
  state.dailyVerdict = correct ? "ok" : "no";
}

function screenDaily() {
  const question = state.dailyPaper[state.dailyIndex];
  if (!question) return screenDailyDone();
  const total = state.dailyPaper.length;
  const locked = state.dailySubmitted;
  const options = question.options.map((option, index) => {
    const on = state.dailyChoice === index ? " is-on" : "";
    const bad = locked && state.dailyChoice === index && index !== question.answer ? " is-bad" : "";
    const good = locked && index === question.answer ? " is-on" : "";
    const letter = String.fromCharCode(65 + index);
    return `<button type="button" class="btn option${on}${bad}${good}" data-action="daily-pick" data-choice="${index}" ${locked ? "disabled" : ""}>${letter}. ${esc(option)}</button>`;
  }).join("");
  let hints = "";
  if (state.dailyHint >= 1) hints += `<div class="hint-card" role="status"><img class="torch" src="assets/torch.png" alt="" width="16" height="40"><div><p class="kicker">Hint 1</p><p>${esc(question.hint1)}</p></div></div>`;
  if (state.dailyHint >= 2) hints += `<div class="hint-card" role="status"><img class="torch" src="assets/torch.png" alt="" width="16" height="40"><div><p class="kicker">Hint 2</p><p>${esc(question.hint2)}</p></div></div>`;
  const hintButton = locked || state.dailyHint >= 2 ? "" : `
    <div class="hint-row">
      <button type="button" class="torch-knob" data-action="daily-hint">
        <img class="torch" src="assets/torch.png" alt="" width="20" height="50">
        <span>Need a hint?</span>
      </button>
      <p class="hint-note">${state.dailyHint === 0 ? "Hint stays hidden until you light the torch." : "Hint 2 is the deeper one."}</p>
    </div>`;
  let feedback = "";
  if (state.need) feedback = `<p class="feedback need" role="status">Answer first.</p>`;
  else if (locked && state.dailyVerdict === "ok") feedback = `<p class="feedback ok" role="status">Retrieved. ${esc(question.why)}</p>`;
  else if (locked) feedback = `<p class="feedback no" role="status">Not quite. Your answer: ${String.fromCharCode(65 + (state.dailyChoice ?? 0))}. Correct answer: ${String.fromCharCode(65 + question.answer)}. ${esc(question.why)}</p>`;
  const alt = locked && state.dailyAlt ? `<p class="feedback ok" role="status">${esc(question.alt)}</p>` : "";
  const after = locked ? `
    <div class="actions">
      <button type="button" class="btn" data-action="daily-alt">Explain differently</button>
      <button type="button" class="btn btn-green" data-action="daily-next" data-primary="true">${state.dailyIndex === total - 1 ? "Finish today" : "Next question"}</button>
    </div>` : `
    <div class="actions">
      <button type="button" class="btn btn-green" data-action="daily-submit" data-primary="true">Submit answer</button>
    </div>`;
  return `
    ${courseChip()}
    <p class="kicker">Daily quiz · Retrieval</p>
    <h1>Question ${state.dailyIndex + 1} / ${total}</h1>
    <p class="lead">${esc(question.prompt)}</p>
    ${options}
    ${hintButton}
    ${hints}
    ${feedback}
    ${alt}
    ${after}`;
}

function screenDailyDone() {
  const total = state.dailyLog.length;
  const correct = state.dailyLog.filter((row) => row.correct).length;
  return `
    ${courseChip()}
    <p class="kicker">Daily quiz</p>
    <h1>Retrieved today</h1>
    <p class="lead">${correct} of ${total} came back from memory. The streak is ${yourStreak()}. It marks days you retrieved, not how fast you answered.</p>
    <p>Retrieval is the practice that keeps the course. The vein quiz is still where an ore is earned.</p>
    <div class="actions">
      <button type="button" class="btn" data-action="daily-replay">Retrieve again</button>
      <button type="button" class="btn btn-green" data-action="jump" data-to="learn" data-primary="true">Keep studying</button>
    </div>`;
}

function bindRank() {
  const list = document.querySelector(".rank-list");
  if (!list || state.examSubmitted) return;
  let from = null;
  list.querySelectorAll(".rank-row").forEach((row) => {
    row.addEventListener("dragstart", () => { from = row.dataset.rank; });
    row.addEventListener("dragover", (event) => event.preventDefault());
    row.addEventListener("drop", (event) => {
      event.preventDefault();
      if (!from) return;
      const order = state.examOrder.slice();
      const fromIndex = order.indexOf(from);
      const toIndex = order.indexOf(row.dataset.rank);
      if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
      const [item] = order.splice(fromIndex, 1);
      order.splice(toIndex, 0, item);
      state.examOrder = order;
      render();
    });
  });
}

let shown = "";

function render() {
  const bodies = {
    intro: screenIntro,
    university: screenUniversity,
    level: screenLevel,
    course: screenCourse,
    welcome: screenWelcome,
    learn: screenLearn,
    format: screenFormat,
    objective: screenObjective,
    theory: screenTheory,
    question: screenQuestion,
    done: screenDone,
    "exam-setup": screenExamSetup,
    "exam-q": screenExamQuestion,
    "exam-results": screenExamResults,
    "exam-review": screenExamReview,
    "exam-cards": screenExamCards,
    "exam-map": screenExamMap,
    daily: screenDaily,
    "daily-done": screenDailyDone,
  };
  const overviewEl = document.getElementById("overview");
  if (overviewEl) overviewEl.innerHTML = overview();
  const app = document.getElementById("app");
  const previous = app.querySelector(".screen");
  const scroll = previous ? previous.scrollTop : 0;
  app.dataset.screen = state.screen;
  const key = state.screen === "question" ? `question-${state.q}` : state.screen === "exam-q" ? `exam-${state.examIndex}-${state.examSubmitted ? "done" : "ask"}` : state.screen === "daily" ? `daily-${state.dailyIndex}-${state.dailySubmitted ? "done" : "ask"}` : state.screen;
  const arrive = key !== shown;
  shown = key;
  app.innerHTML = `${hud()}<div class="screen${arrive ? " arrive" : ""}">${bodies[state.screen]()}</div>`;
  const screen = app.querySelector(".screen");
  if (screen) screen.scrollTop = arrive ? 0 : scroll;
  if (arrive) startTypewriter();
  paintSocial();
  placeGuide();
  bindRank();
}

function fireIcon() {
  return `<svg class="flame" viewBox="0 0 16 20" aria-hidden="true"><path fill="#e25822" d="M8.1 0c.5 3.1 3.6 4.4 4.2 8.1.6 3.5-1.4 6.6-4.3 7.6-2.9-1-4.9-4.1-4.3-7.6C4.3 4.4 6.4 3.4 6.8 1.2c.2 1.4.8 2 1.2 1.4C7.6 1.2 8.1 0 8.1 0z"/><path fill="#ffe08a" d="M8 7.4c.7 1.3 2 1.9 2 3.6a2 2 0 1 1-4 0c0-.7.4-1.3.8-1.7.1.9.7 1 1.1.4.3-1.1.7-1.6 1.1-2.3z"/></svg>`;
}

function streakMark(days) {
  return `<span class="streak" aria-label="${days} day streak">${fireIcon()}${days}</span>`;
}

function yourStreak() {
  return 4 + (state.dailyDone ? 1 : 0);
}

function social() {
  const people = FRIENDS.map((friend) => `
    <li>
      <span class="who-top">
        <strong>${esc(friend.name)}</strong>
        ${streakMark(friend.you ? yourStreak() : friend.streak)}
      </span>
      <small>${esc(friend.where)}</small>
      <em><span class="dot" aria-hidden="true"></span>Online</em>
    </li>`).join("");
  const members = GROUP.map((member) => `
    <li class="${member.you ? "is-you" : ""}">
      <span>${esc(member.name)}</span>
      ${streakMark(member.you ? yourStreak() : member.streak)}
    </li>`).join("");
  return `
    <p class="kicker">Social</p>
    <h2>Friends online</h2>
    <ul class="friends">${people}</ul>
    <p class="kicker group-kicker">Your group</p>
    <ul class="group">${members}</ul>`;
}

function paintSocial() {
  const el = document.getElementById("social");
  if (!el) return;
  el.innerHTML = social();
}

let guide = { mode: "ask", step: 0 };

function guidePop() {
  let pop = document.getElementById("guide-pop");
  if (!pop) {
    pop = document.createElement("div");
    pop.id = "guide-pop";
    document.body.appendChild(pop);
  }
  return pop;
}

function placeGuide() {
  const layer = document.getElementById("guide");
  if (!layer) return;
  const pop = guidePop();
  document.body.classList.toggle("is-guiding", guide.mode !== "off");
  document.querySelectorAll(".guide-target").forEach((el) => el.classList.remove("guide-target"));
  if (guide.mode === "off") {
    layer.hidden = true;
    layer.innerHTML = "";
    layer.dataset.mode = "off";
    pop.hidden = true;
    pop.innerHTML = "";
    return;
  }
  layer.hidden = false;
  layer.innerHTML = "";
  pop.hidden = false;
  if (guide.mode === "ask") {
    layer.dataset.mode = "ask";
    pop.innerHTML = `
      <div class="guide-card guide-ask" role="dialog" aria-modal="true" aria-labelledby="guide-title">
        <p class="kicker">First visit</p>
        <h2 id="guide-title">MindMine</h2>
        <p class="lead">Are you new here?</p>
        <p>A short walk across the mine, before you open a vein.</p>
        <div class="actions">
          <button type="button" class="btn btn-green" data-action="guide-yes" data-primary="true">Yes, guide me</button>
          <button type="button" class="linkish" data-action="guide-no">Not now</button>
        </div>
      </div>`;
    return;
  }
  const step = GUIDE[guide.step];
  const target = document.querySelector(step.target);
  if (target) {
    target.classList.add("guide-target");
    target.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  layer.dataset.mode = "tour";
  const last = guide.step === GUIDE.length - 1;
  pop.innerHTML = `
    <div class="guide-card" role="dialog" aria-labelledby="guide-title">
      <p class="kicker">Guide ${guide.step + 1} / ${GUIDE.length}</p>
      <h2 id="guide-title">${esc(step.title)}</h2>
      <p>${esc(step.body)}</p>
      <div class="actions">
        <button type="button" class="btn btn-green" data-action="guide-next" data-primary="true">${last ? "Got it" : "Next"}</button>
        <button type="button" class="linkish" data-action="guide-skip">Skip</button>
      </div>
    </div>`;
  const card = pop.querySelector(".guide-card");
  if (!target || !card) return;
  const width = Math.min(320, window.innerWidth - 24);
  const rect = target.getBoundingClientRect();
  card.style.width = `${width}px`;
  let left = rect.left;
  let top = rect.bottom + 12;
  if (step.place === "right") {
    left = rect.right + 12;
    top = rect.top;
  } else if (step.place === "left") {
    left = rect.left - width - 12;
    top = rect.top;
  }
  if (left < 12) left = 12;
  if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
  card.style.left = `${left}px`;
  card.style.top = `${Math.max(12, top)}px`;
  const cardRect = card.getBoundingClientRect();
  if (cardRect.bottom > window.innerHeight - 12) {
    card.style.top = `${Math.max(12, window.innerHeight - cardRect.height - 12)}px`;
  }
}

let typeTimer = 0;

function startTypewriter() {
  window.clearTimeout(typeTimer);
  const root = document.querySelector("[data-typewriter]");
  if (!root) return;
  const lines = [...root.querySelectorAll(".type-line")];
  const actions = root.querySelector(".type-actions");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    lines.forEach((line) => {
      line.textContent = line.dataset.text;
    });
    actions?.classList.add("is-in");
    actions?.removeAttribute("inert");
    return;
  }
  actions?.setAttribute("inert", "");
  let lineIndex = 0;
  let charIndex = 0;
  function tick() {
    if (!root.isConnected) return;
    const line = lines[lineIndex];
    if (!line) {
      actions?.classList.add("is-in");
      actions?.removeAttribute("inert");
      return;
    }
    lines.forEach((item) => item.classList.remove("is-typing"));
    const text = line.dataset.text || "";
    charIndex += 1;
    line.textContent = text.slice(0, charIndex);
    line.classList.add("is-typing");
    if (charIndex < text.length) {
      const previous = text[charIndex - 1];
      const delay = previous === "." || previous === "," ? 28 : previous === " " ? 4 : 8;
      typeTimer = window.setTimeout(tick, delay);
      return;
    }
    line.classList.remove("is-typing");
    lineIndex += 1;
    charIndex = 0;
    typeTimer = window.setTimeout(tick, 90);
  }
  tick();
}

const actions = {
  start() {
    state.screen = "university";
    render();
  },
  university(el) {
    state.university = el.dataset.id;
    state.level = null;
    state.courseId = null;
    state.courseNumber = "";
    state.numberMissing = false;
    clearLearn();
    state.screen = "level";
    render();
  },
  level(el) {
    state.level = el.dataset.level;
    state.courseId = null;
    state.courseNumber = "";
    state.numberMissing = false;
    clearLearn();
    state.screen = "course";
    render();
  },
  "pick-course"(el) {
    const course = courseById(el.dataset.id);
    state.courseId = course.id;
    state.courseNumber = course.number;
    state.numberMissing = false;
    clearLearn();
    render();
  },
  "get-course"() {
    const input = document.getElementById("course-number");
    state.courseNumber = (input ? input.value : state.courseNumber).trim();
    if (!state.courseId || !state.courseNumber) {
      state.numberMissing = true;
      render();
      return;
    }
    state.numberMissing = false;
    state.screen = "welcome";
    render();
  },
  help() {
    state.screen = "learn";
    render();
  },
  source(el) {
    state.source = el.dataset.source;
    if (!chaptersNow().some((chapter) => chapter.id === state.chapterId)) state.chapterId = null;
    state.learnMissing = false;
    render();
  },
  chapter(el) {
    const chapter = chaptersNow().find((item) => item.id === el.dataset.id);
    if (!chapter) return;
    state.chapterId = chapter.id;
    state.chapterQuery = chapter.name;
    state.learnMissing = false;
    render();
  },
  way(el) {
    state.way = el.dataset.way;
    state.learnMissing = false;
    render();
  },
  "start-learn"() {
    if (!state.source || !state.chapterId || !state.way) {
      state.learnMissing = true;
      render();
      return;
    }
    state.learnMissing = false;
    if (state.way === "exam") {
      state.examScope = "chapter";
      state.examFocus = currentChapter().name;
      state.screen = "exam-setup";
    } else {
      state.cardFace = false;
      state.screen = "format";
    }
    render();
  },
  "to-objective"() {
    state.screen = "objective";
    render();
  },
  "exam-scope"(el) {
    state.examScope = el.dataset.scope;
    state.examFocus = el.dataset.focus || "";
    render();
  },
  "exam-type"(el) {
    const id = el.dataset.type;
    state.examTypes[id] = !state.examTypes[id];
    if (!chosenTypes().length) state.examTypes[id] = true;
    render();
  },
  "exam-past"() {
    state.pastExam = !state.pastExam;
    render();
  },
  "exam-start"() {
    buildPaper();
    state.screen = "exam-q";
    render();
  },
  "exam-pick"(el) {
    if (state.examSubmitted) return;
    state.choice = Number(el.dataset.choice);
    state.need = false;
    render();
  },
  "exam-hint"() {
    if (state.examSubmitted || state.examHint >= 2) return;
    const field = document.getElementById("open-answer");
    if (field) state.examText = field.value;
    const index = state.wallet.findIndex((count) => count > 0);
    if (index >= 0) state.wallet[index] -= 1;
    state.examHint += 1;
    render();
  },
  "exam-submit"() {
    const question = currentExamQuestion();
    if (!question || state.examSubmitted) return;
    if (question.type === "open") {
      const field = document.getElementById("open-answer");
      state.examText = field ? field.value : state.examText;
      if (!state.examText.trim()) {
        state.need = true;
        render();
        return;
      }
      state.examGrade = gradeOpen(state.examText, question);
      closeExamCard(state.examGrade.correct);
    } else if (question.type === "rank") {
      closeExamCard(state.examOrder.every((id, index) => id === question.order[index]));
    } else if (state.choice === null) {
      state.need = true;
      render();
      return;
    } else {
      closeExamCard(state.choice === question.answer);
    }
    render();
  },
  "exam-next"() {
    if (state.examIndex >= state.paper.length - 1) state.screen = "exam-results";
    else {
      state.examIndex += 1;
      resetExamCard();
    }
    render();
  },
  "exam-skip"() {
    const field = document.getElementById("open-answer");
    if (field) state.examText = field.value;
    closeExamCard(false);
    if (state.examIndex >= state.paper.length - 1) state.screen = "exam-results";
    else {
      state.examIndex += 1;
      resetExamCard();
    }
    render();
  },
  "exam-alt"() {
    state.examAlt = true;
    render();
  },
  "exam-similar"() {
    const question = currentExamQuestion();
    if (!question || !question.similar || !state.examSubmitted) return;
    const last = state.examLog.pop();
    if (last && last.correct) {
      state.xp = Math.max(0, state.xp - 100);
      state.wallet[question.rank] = Math.max(0, state.wallet[question.rank] - 1);
    }
    if (last) state.examHintsUsed = Math.max(0, state.examHintsUsed - state.examHint);
    state.paper[state.examIndex] = { ...question.similar, similar: null };
    resetExamCard();
    render();
  },
  "exam-go"(el) {
    state.cardFace = false;
    state.screen = el.dataset.to;
    render();
  },
  flip() {
    state.cardFace = !state.cardFace;
    render();
  },
  "rank-move"(el) {
    if (state.examSubmitted) return;
    const order = state.examOrder.slice();
    const index = order.indexOf(el.dataset.rank);
    const next = index + Number(el.dataset.dir);
    if (index < 0 || next < 0 || next >= order.length) return;
    [order[index], order[next]] = [order[next], order[index]];
    state.examOrder = order;
    render();
  },
  theory() {
    state.readObjective = true;
    state.screen = "theory";
    render();
  },
  practice() {
    state.readTheory = true;
    state.screen = "question";
    state.q = 0;
    state.choice = null;
    state.verdict = null;
    state.need = false;
    state.hinted = false;
    render();
  },
  back(el) {
    state.screen = el.dataset.to;
    state.numberMissing = false;
    state.skipWarn = false;
    render();
  },
  jump(el) {
    const key = el.dataset.to;
    if (!canJump(key)) return;
    state.numberMissing = false;
    state.need = false;
    state.skipWarn = false;
    state.hinted = false;
    state.choice = null;
    state.verdict = null;
    if (key === "daily") {
      openDaily();
      return;
    }
    if (key.startsWith("q")) {
      state.q = Number(key.slice(1));
      state.screen = "question";
      if (state.solved[state.q]) state.verdict = "ok";
    } else {
      state.screen = key;
    }
    render();
  },
  "open-daily"() {
    openDaily();
  },
  "daily-pick"(el) {
    if (state.dailySubmitted) return;
    state.dailyChoice = Number(el.dataset.choice);
    state.need = false;
    render();
  },
  "daily-hint"() {
    if (state.dailySubmitted || state.dailyHint >= 2) return;
    const index = state.wallet.findIndex((count) => count > 0);
    if (index >= 0) state.wallet[index] -= 1;
    state.dailyHint += 1;
    render();
  },
  "daily-submit"() {
    const question = state.dailyPaper[state.dailyIndex];
    if (!question || state.dailySubmitted) return;
    if (state.dailyChoice === null) {
      state.need = true;
      render();
      return;
    }
    closeDailyCard(state.dailyChoice === question.answer);
    render();
  },
  "daily-next"() {
    if (state.dailyIndex >= state.dailyPaper.length - 1) {
      state.dailyDone = true;
      state.screen = "daily-done";
    } else {
      state.dailyIndex += 1;
      resetDailyCard();
    }
    render();
  },
  "daily-alt"() {
    state.dailyAlt = true;
    render();
  },
  "daily-replay"() {
    state.dailyPaper = [];
    buildDaily();
    state.screen = "daily";
    render();
  },
  pick(el) {
    if (state.verdict === "ok") return;
    state.choice = Number(el.dataset.choice);
    state.verdict = null;
    state.need = false;
    state.skipWarn = false;
    render();
  },
  check() {
    if (state.choice == null) {
      state.need = true;
      render();
      return;
    }
    const q = LESSON[state.q];
    state.verdict = state.choice === q.answer ? "ok" : "no";
    if (state.verdict === "ok" && !state.solved[state.q]) {
      state.solved[state.q] = true;
      state.wallet[q.ore] += 1;
    }
    state.need = false;
    render();
  },
  "skip-ask"() {
    state.skipWarn = true;
    render();
  },
  "skip-stay"() {
    state.skipWarn = false;
    render();
  },
  "skip-anyway"() {
    state.choice = null;
    state.verdict = null;
    state.need = false;
    state.hinted = false;
    state.skipWarn = false;
    if (state.q < LESSON.length - 1) {
      state.q += 1;
      state.screen = "question";
    } else {
      state.screen = "done";
    }
    render();
  },
  spend(el) {
    if (state.hinted || state.verdict === "ok") return;
    const index = ORES.findIndex((ore) => ore.id === el.dataset.ore);
    if (index < 0 || state.wallet[index] < 1) return;
    state.wallet[index] -= 1;
    state.hinted = true;
    render();
  },
  collect() {
    if (state.verdict !== "ok") return;
    state.choice = null;
    state.verdict = null;
    state.need = false;
    state.hinted = false;
    if (state.q < LESSON.length - 1) {
      state.q += 1;
      state.screen = "question";
    } else {
      state.screen = "done";
    }
    render();
  },
  restart() {
    state = fresh();
    render();
  },
  "guide-yes"() {
    guide.mode = "tour";
    guide.step = 0;
    placeGuide();
  },
  "guide-no"() {
    guide.mode = "off";
    placeGuide();
  },
  "guide-next"() {
    if (guide.step >= GUIDE.length - 1) guide.mode = "off";
    else guide.step += 1;
    placeGuide();
  },
  "guide-skip"() {
    guide.mode = "off";
    placeGuide();
  },
};

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  const app = document.getElementById("app");
  const layer = document.getElementById("guide");
  const pop = document.getElementById("guide-pop");
  const overview = document.getElementById("overview");
  const inGuide = (layer && layer.contains(target)) || (pop && pop.contains(target));
  const inMap = overview && overview.contains(target);
  if (!target || (!app.contains(target) && !inGuide && !inMap)) return;
  const run = actions[target.dataset.action];
  if (run) run(target);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "open-answer") {
    state.examText = event.target.value;
    return;
  }
  if (event.target.id === "course-number") {
    state.courseNumber = event.target.value;
    return;
  }
  if (event.target.id !== "chapter-name") return;
  state.chapterQuery = event.target.value;
  const caret = event.target.selectionStart;
  render();
  const input = document.getElementById("chapter-name");
  if (!input) return;
  input.focus();
  input.setSelectionRange(caret, caret);
});

window.addEventListener("resize", () => {
  if (guide.mode === "tour") placeGuide();
});

document.addEventListener("keydown", (event) => {
  if (guide.mode !== "off") {
    if (event.key === "Escape") {
      actions["guide-skip"]();
      return;
    }
    if (event.key !== "Enter" || event.target.closest("button, a, input, textarea")) return;
    const guidePrimary = document.querySelector("#guide-pop [data-primary]");
    if (guidePrimary) guidePrimary.click();
    return;
  }
  if (event.key !== "Enter" || event.target.closest("button, a, input, textarea")) return;
  const primary = document.querySelector("[data-primary]");
  const held = primary && primary.closest(".type-actions");
  if (held && !held.classList.contains("is-in")) return;
  if (primary && !primary.disabled) primary.click();
});

render();
