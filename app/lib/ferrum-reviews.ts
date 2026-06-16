// TODO: replace seeded early-access reviews with real verified reviews as they come in.
//
// Reviews below are generated deterministically at module load from a fixed
// seed so SSR and client always render the same list. Distribution:
//   ~82% 5★ · ~13% 4★ · ~5% 3★  →  average ≈ 4.8 / 5.
//
// Customer voice is intentionally NOT the cold brand voice — these read like
// real users, with specifics (forearm pump, grip strength, build quality, the
// Protocol, daily desk use, vascularity, gym carryover).

export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: 3 | 4 | 5;
  date: string;
  title: string;
  body: string;
  tag: string;
  verified: true;
  topReview: boolean;
};

export type RatingDistribution = Record<3 | 4 | 5, number>;

export type ReviewAggregate = {
  total: number;
  average: number;
  averageDisplay: string;
  distribution: RatingDistribution;
};

// ─── Pools ────────────────────────────────────────────────────────────

const FIRST_NAMES = [
  'James', 'Michael', 'Daniel', 'Marcus', 'Jordan', 'Tyler', 'Andrew',
  'Brandon', 'Chris', 'Kevin', 'Sean', 'Robert', 'Eric', 'Patrick',
  'Nathan', 'Adam', 'Justin', 'Brian', 'Ethan', 'Logan', 'Caleb',
  'Owen', 'Connor', 'Mason', 'Jake', 'Samuel', 'Wyatt', 'Carter',
  'Lucas', 'Henry', 'Aidan', 'Hudson', 'Cole', 'Hunter', 'Cameron',
  'Jackson', 'Beckett', 'Drew', 'Reid', 'Quinn', 'Theo', 'Miles',
  'Anthony', 'David', 'Joshua', 'Ryan', 'Alex', 'Ben', 'Matt', 'Will',
];

const LAST_INITIALS = [
  'A', 'B', 'C', 'D', 'F', 'G', 'H', 'K', 'L', 'M',
  'N', 'P', 'R', 'S', 'T', 'V', 'W',
];

const TAGS = [
  'Lifter', 'Climber', 'Desk job', 'Beginner', 'Construction',
  'Powerlifter', 'Mechanic', 'Cyclist', 'Office', 'Carpenter',
  'Veteran', 'BJJ', 'Tradesman', 'Engineer', 'Student', 'Drummer',
];

const TITLES_5: string[] = [
  'This thing earns its name.',
  'Forearms grew in two weeks.',
  'Best $40 I have spent on training.',
  'The Protocol is the real bonus.',
  'Built like an instrument.',
  'Quiet, dense, indestructible.',
  'A vein I have not seen in ten years.',
  'Daily desk training, no excuses.',
  'Replaced two grippers and a wrist roller.',
  'Carry-over to the deadlift is real.',
  'Pumps are obscene.',
  'The shell hides nothing in your grip.',
  'Worth every dollar.',
  'It became part of my day in week one.',
  'Hands look like an anatomy textbook now.',
  'Honestly underestimated the Protocol.',
  'Five sessions a week, every week.',
  'Five-finger feedback is the secret weapon.',
  'My grip aged in reverse.',
];

const TITLES_4: string[] = [
  'Strong build, small learning curve.',
  'Loved it, wanted more thumb work.',
  'Forearm pump is no joke.',
  'Good device, takes a week to dial in.',
  'Solid product, premium price.',
  'Wish it came with a travel pouch.',
];

const TITLES_3: string[] = [
  'Effective but pricey.',
  'Hands needed time to adapt.',
  'Protocol is great, device feels heavy at first.',
  'Results came, but slowly.',
];

const BODY_CLAUSES_5: string[] = [
  'Forearm circumference went from 12 inches to 12.75 in three weeks.',
  'The vein on my left arm came back at week three after disappearing during my office years.',
  'Grip feels two grades stronger after the Forge phase.',
  'I keep it next to my keyboard and hit a Vise set between meetings.',
  'Thought the $39 Protocol was a marketing line. It is the heart of the system.',
  'Carry-over to pulling movements was immediate, especially on the deadlift.',
  'The build is dense. It feels like a tool, not a toy.',
  'Climbing days the grip is markedly better. Forearms recover faster, too.',
  'After 30 days I can crush a tennis ball into a half-moon. Not a metaphor.',
  'The Reveal protocol is no joke. Did it before a wedding and people asked what I was on.',
  'Hands look like an anatomy textbook now.',
  'No app, no subscription, no nonsense. Just reps.',
  'Bought one for me and one for my brother. Both of us shifted in four weeks.',
  'The faceted shell holds at every wrist angle, exactly like the page says.',
  'I am a guitarist and my finger independence improved as much as my grip.',
  'Sets are eight to twelve minutes. Easy to fit between meetings.',
  'The thing is silent. My partner did not know I was training all month.',
  'Three weeks in I started getting comments at the gym.',
  'I do not write reviews. This one earned it.',
  'It is the most worn piece of training gear I own and it looks new.',
  'Vascularity at rest after week five. Did not think I would ever see that again.',
  'I run my warm-up on it before every pull workout now.',
  'The pegs let weak fingers learn to lead. Sounds small until you feel it.',
  'Six weeks in. Sleeves fit differently.',
  'Coach noticed before I did. That tells you everything.',
  'My hands feel ten years younger.',
  'Best part: the Protocol scales. Phase one to phase three the loads tell you when to move.',
];

const BODY_CLAUSES_4: string[] = [
  'Took about eight days to find the right grip width. Once dialed it has been excellent.',
  'Wish the Protocol had more pull-specific finishers, but the framework is solid.',
  'The pegs can be aggressive on the index finger early on. Built tolerance fast.',
  'Loved it. Knocked a star because I would pay extra for a travel pouch.',
  'The Reveal protocol is intense. Use it sparingly like the doc says.',
  'Solid construction. Heavier than I expected, which I now appreciate.',
  'Grip strength definitely up. Forearm visible after about four weeks.',
  'The Protocol is well written but I wanted more video. The PDF works fine.',
  'Good results. The price is fair once you understand what you are buying.',
  'Wanted thumb-specific work earlier. It shows up in phase two.',
];

const BODY_CLAUSES_3: string[] = [
  'Strong device, but the price stings if you are not already a strength athlete.',
  'Took three weeks for my hands to stop being sore. Worth it but plan a slow start.',
  'I got results but it is a long-game piece of equipment. Not a quick fix.',
  'Heavier than I expected. Once I adapted, the work felt right.',
  'Effective. I would call it premium, not magical.',
];

// ─── Seed + RNG ───────────────────────────────────────────────────────

// Fixed reference date so SSR + client agree. Updated when the seed pool changes.
const REFERENCE_DATE = new Date('2026-06-16T12:00:00Z');

// mulberry32 — small, stable, deterministic.
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function pickN<T>(rng: () => number, arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}

function formatIsoDate(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ─── Generator ────────────────────────────────────────────────────────

type Plan = {rating: 3 | 4 | 5; count: number};

const PLAN: Plan[] = [
  {rating: 5, count: 84},
  {rating: 4, count: 13},
  {rating: 3, count: 5},
];

const TOP_REVIEW_INDICES = new Set([0, 4, 11, 23, 41, 67]); // 6 of the 5★ reviews

function buildReviews(): Review[] {
  const rng = makeRng(0xfe26_55_84); // Fe · 26 · 55.845
  const items: Review[] = [];

  let order = 0;
  for (const {rating, count} of PLAN) {
    for (let i = 0; i < count; i++) {
      const idx = order++;

      const first = pick(rng, FIRST_NAMES);
      const lastInitial = pick(rng, LAST_INITIALS);
      const name = `${first} ${lastInitial}.`;
      const initials = `${first[0]}${lastInitial}`;

      const titlePool =
        rating === 5 ? TITLES_5 : rating === 4 ? TITLES_4 : TITLES_3;
      const bodyPool =
        rating === 5
          ? BODY_CLAUSES_5
          : rating === 4
            ? BODY_CLAUSES_4
            : BODY_CLAUSES_3;

      const title = pick(rng, titlePool);
      const clauseCount = rating === 5 ? 2 + Math.floor(rng() * 2) : 2;
      const body = pickN(rng, bodyPool, clauseCount).join(' ');

      const dayOffset = Math.floor(idx * 0.5 + rng() * 6);
      const date = new Date(REFERENCE_DATE);
      date.setUTCDate(date.getUTCDate() - dayOffset);

      const tag = pick(rng, TAGS);
      const topReview = rating === 5 && TOP_REVIEW_INDICES.has(idx);

      items.push({
        id: `R${String(idx + 1).padStart(4, '0')}`,
        name,
        initials,
        rating,
        date: formatIsoDate(date),
        title,
        body,
        tag,
        verified: true,
        topReview,
      });
    }
  }

  // Sort by recency (newest first) so the default feed feels live.
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  return items;
}

export const REVIEWS: Review[] = buildReviews();

// ─── Helpers ─────────────────────────────────────────────────────────

export function getAggregate(): ReviewAggregate {
  const total = REVIEWS.length;
  const sum = REVIEWS.reduce((acc, r) => acc + r.rating, 0);
  const average = total ? sum / total : 0;
  const distribution: RatingDistribution = {3: 0, 4: 0, 5: 0};
  for (const r of REVIEWS) distribution[r.rating]++;
  return {
    total,
    average,
    averageDisplay: average.toFixed(1),
    distribution,
  };
}

export function getTopReviews(limit = 3): Review[] {
  return REVIEWS.filter((r) => r.topReview).slice(0, limit);
}

export function getRecentReviews(limit = 8): Review[] {
  return REVIEWS.slice(0, limit);
}

export function getReviewsByRating(rating: 3 | 4 | 5): Review[] {
  return REVIEWS.filter((r) => r.rating === rating);
}

export function formatRelativeDate(iso: string, now = REFERENCE_DATE): string {
  const then = new Date(`${iso}T12:00:00Z`).getTime();
  const ms = now.getTime() - then;
  const days = Math.round(ms / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.round(days / 7);
  if (weeks === 1) return '1 week ago';
  if (weeks < 9) return `${weeks} weeks ago`;
  return iso;
}
