// Long-form readable content for each book. Each chapter now contains
// multi-paragraph pages designed to read as a full printable page.

export type Chapter = { title: string; pages: string[] };
export type BookContent = {
  cover: { tagline: string; blurb: string };
  toc: string[];
  chapters: Chapter[];
};

const p = (s: string) => s.trim();

export const BOOK_CONTENT: Record<number, BookContent> = {
  // ─────────────────────────── 1. The Art of Intrusion ───────────────────────────
  1: {
    cover: {
      tagline: "True stories from the front lines of intrusion.",
      blurb:
        "A first-hand tour through real break-ins — phone phreaking, social engineering, and the human flaws that quietly defeat the strongest controls.",
    },
    toc: [
      "Foreword: Why Attackers Win",
      "Chapter 1 — The Hacker Mindset",
      "Chapter 2 — Social Engineering in Practice",
      "Chapter 3 — Inside the Phone System",
      "Chapter 4 — Physical Access and the Tailgate",
      "Chapter 5 — Insider Threats",
      "Chapter 6 — Lessons for Defenders",
    ],
    chapters: [
      {
        title: "Foreword: Why Attackers Win",
        pages: [
          p(`Every breach you read about in the news shares one quiet truth: the attackers were patient, the defenders were busy, and somewhere a human being made a small, understandable mistake. This book is about those moments — the seam between policy and reality where intrusions actually live.

We will not glamorize crime. We will study craft. Because understanding how a determined adversary actually thinks is the only honest path to building systems that survive contact with them. The rest is theater.

What you are about to read is drawn from interviews with people who have, in their day, broken into banks, telecommunications networks, government systems, and the private offices of executives who believed themselves untouchable. None of them used magic. All of them used the same set of techniques in different combinations, applied with patience and attention.`),
          p(`The single most important idea in this book is that security is asymmetric. The defender must be right every time across every surface they own. The attacker must be right once, in one place, at one moment. This asymmetry cannot be eliminated. It can only be managed.

The organizations that manage it well are not the ones with the biggest budgets or the loudest vendors. They are the ones whose leadership has internalized that asymmetry and built their program around it. They assume compromise. They invest in detection and response, not just prevention. They practice. They take security debt seriously the way a good engineering organization takes technical debt seriously.

If you take only one thing from these pages, take that posture.`),
        ],
      },
      {
        title: "Chapter 1 — The Hacker Mindset",
        pages: [
          p(`Good attackers are not magicians. They are curious, methodical, and comfortable with ambiguity. They read manuals nobody else reads. They notice the dropdown that should not exist, the error message that says too much, the receptionist who is too helpful on a Friday afternoon. They notice. That is the entire game.

Curiosity is the engine; patience is the fuel. The exploit is almost never the interesting part of the story. The interesting part is the months of mapping, listening, and waiting that made the exploit a five-minute job. Every breach you have read about ended with a single command. It began with weeks of homework.

Defenders who want to think this way have to give themselves permission to be slow. Walk into your own building as a stranger. Read your own job postings as an attacker. Open your own cloud console and ask, honestly, what would I do here if I were trying to cause harm. The answers will surprise you, and most of them will not require a CVE.`),
          p(`The attackers profiled in this book share a handful of traits. They are intensely curious about how systems actually work, not how the documentation says they work. They are unafraid to look stupid in the moment in service of looking smart later. They are comfortable holding many small facts in their heads for long periods of time, waiting for the moment those facts combine into something useful.

Most importantly, they are comfortable with the boring parts. Reconnaissance is boring. Reading source code is boring. Watching a target's social media for months to learn the rhythm of their week is boring. The willingness to do the boring work is what separates the people who break into banks from the people who only read about it.

If you are responsible for defending an organization, hire one of these people. Pay them what they are worth. Listen to them when they tell you something is wrong, even if it sounds paranoid. They are not being paranoid. They are doing the job you hired them to do.`),
        ],
      },
      {
        title: "Chapter 2 — Social Engineering in Practice",
        pages: [
          p(`Pretexting is storytelling with a goal. The story has to be boring enough to be believed and specific enough to be useful. "I'm from IT, your VPN cert expires today" works because it is dull, plausible, and slightly urgent — exactly the texture of real work. A pretext that is exciting is a pretext that fails.

The best social engineers do not improvise. They prepare. They learn the names of the team members, the internal terminology, the org chart, the recent project announcements. They call during the workday when people are too busy to think hard. They keep calls short. They leave the target feeling vaguely helpful rather than vaguely suspicious. By the time the target wonders if something was off, the engagement is over.`),
          p(`The countermeasure is not cynicism. Cynicism makes people miserable and does not actually improve security. The countermeasure is process. Verify out of band. Make the safe path the easy path. Build workflows where the correct action is obvious and the incorrect action requires extra effort, not the other way around.

When someone falls for a social-engineering attack, the failure is the process, not the person. Punish the system. The next person in the same situation will make the same mistake unless you change the conditions that made the mistake easy. Public shaming of phished employees is the single most counterproductive practice in corporate security awareness, and it is shockingly common.

Train people to recognize the levers — urgency, authority, scarcity, reciprocity — not to memorize the specific lures. The lures will change every quarter. The levers are constant.`),
        ],
      },
      {
        title: "Chapter 3 — Inside the Phone System",
        pages: [
          p(`The telephone network was the first global computer, and like every system since, its designers trusted the people inside it. Tones became commands, commands became control, and a generation of curious teenagers learned that trust at scale is just a vulnerability with marketing.

The phone phreaks of the 1970s and 1980s were not, by and large, malicious. They were explorers in a vast, weakly-defended territory whose existence most of the public never noticed. What they discovered, in essay form, was the central architectural lesson of the next fifty years of computer security: a system that distinguishes "control" from "data" by convention rather than by structure will eventually be controlled by its own data.

The lesson outlived the technology. Anywhere two systems trust each other implicitly — service mesh, OAuth scopes, SSO assertions, internal RPC calls without authentication — there is a phreaker waiting to be born.`),
        ],
      },
      {
        title: "Chapter 4 — Physical Access and the Tailgate",
        pages: [
          p(`A locked door is a strong control until someone holds it open for you. The single most reliable way into a corporate office in 2025 remains the same as it was in 1995: arrive at the same time as a smoker returning from a break, carry a stack of boxes, smile, and say thank you. The badge reader will never know.

Physical access defeats most logical controls. Network jacks in conference rooms are usually unfiltered. Unattended workstations are usually logged in. Printers, video conferencing systems, and door controllers are usually on the same flat network as everything else.

Sweep your own office. Walk in as a delivery person. Sit in the lobby for an hour and count badges you could clone. The exercise will be uncomfortable and instructive in equal measure.`),
        ],
      },
      {
        title: "Chapter 5 — Insider Threats",
        pages: [
          p(`The insider does not need to break in. They are already in. Most insider incidents are not espionage but ordinary human dramas — a contractor who feels underpaid, a sysadmin who feels overlooked, an executive who feels invincible. The technical sophistication is usually low; the access is the entire attack.

Detection requires combining what people do with what their role authorizes. A finance analyst pulling the entire customer database is not unusual on the network; it is unusual on the timeline of their job. The signal is in the gap between behavior and role, which is exactly where most monitoring programs do not look.

The mitigation is unglamorous: least privilege, separation of duties, mandatory time off, and an exit process that actually revokes access on the day of departure rather than three months later when someone notices an active session.`),
        ],
      },
      {
        title: "Chapter 6 — Lessons for Defenders",
        pages: [
          p(`Assume compromise. Log everything you can afford to log, and a little more. Rehearse the bad day before it arrives. The organizations that recover quickly from intrusions are not the ones with the cleverest tools. They are the ones that practiced recovering when nothing was on fire.

Reduce the attack surface ruthlessly. Every service you do not run is a service that cannot be exploited. Every credential you do not issue is a credential that cannot be stolen. Every integration you do not approve is a third party that cannot become your initial-access vector.

Invest in the people. The single highest-leverage spend in any security program is the difference between an adequate analyst and an excellent one. The excellent analyst will catch the breach the tool missed. The tool will not catch the breach the excellent analyst noticed.`),
          p(`And finally: be kind to the human in the loop. They are not your weakest link. They are your last line of defense, and they deserve tools that make doing the right thing the easy thing.

Build a culture where reporting a mistake is rewarded and hiding one is dangerous. The employee who clicks the phishing link and tells you immediately is a hero. The employee who clicks and panics and says nothing for two days is the start of an incident. The difference between those two outcomes is almost entirely cultural.

Security is, in the end, a service function for the rest of the business. The job is not to say no. The job is to find the way to say yes safely, and to be honest when the answer really has to be no. Do that work well for long enough and the organization will trust you. The trust is the actual security control. Everything else is implementation detail.`),
        ],
      },
    ],
  },

  // ─────────────────────── 2. Hacking: The Art of Exploitation ───────────────────────
  2: {
    cover: {
      tagline: "From C to shellcode — the mechanics of exploitation.",
      blurb:
        "A hands-on walk through memory, processors, and the small misunderstandings between them that become every buffer overflow you have ever heard of.",
    },
    toc: [
      "Chapter 1 — A Map of Memory",
      "Chapter 2 — Stack Smashing, Gently",
      "Chapter 3 — Shellcode That Survives",
      "Chapter 4 — Heap Exploitation",
      "Chapter 5 — Modern Mitigations",
      "Chapter 6 — Where Exploitation Goes Next",
    ],
    chapters: [
      {
        title: "Chapter 1 — A Map of Memory",
        pages: [
          p(`A program in memory is a city. Code lives in one district, the stack grows downward like a tide, the heap sprawls outward like suburbs, and somewhere in between sit the small, crucial signs that tell the CPU where to go next. The signs are called return addresses, function pointers, and virtual-method tables, and bending them is the entire business of exploitation.

Before you can change a sign, you have to be able to read the map. Tools like a disassembler, a debugger, and a memory inspector are the cartographer's instruments of this trade. Learn them deeply. The single biggest predictor of whether someone becomes good at exploitation is how comfortable they are sitting in a debugger for hours at a time.`),
          p(`The CPU itself is a remarkably literal machine. It does what the instruction stream tells it to do, in order, without judgment. The interesting question in exploitation is not what the CPU does — that part is documented — but what the program intended for it to do, and how an attacker can introduce a divergence between intent and behavior.

Almost every exploit in this book is, in some form, the same trick: convince the CPU to execute instructions the programmer did not intend, by changing data the programmer assumed would never be changed. The variety of techniques exists because programmers, compilers, and operating systems have spent forty years trying to make that trick harder, and attackers have spent the same forty years adapting.`),
        ],
      },
      {
        title: "Chapter 2 — Stack Smashing, Gently",
        pages: [
          p(`A buffer is a promise: "I will hold N bytes." A buffer overflow is what happens when the program forgets the promise and the language does not remember it either. The next bytes on the stack are not random — they are the breadcrumbs the function uses to find its way home.

The classic stack smash overwrites the saved return address. When the function reaches its return instruction, the CPU pops what it believes to be the address of the caller and jumps there. If you wrote that address, the CPU is now executing your code. The mechanics are unchanged from 1996; the difficulty is no longer "can I overflow the buffer" but "where, on a hardened modern system, can I point the return address that still works."

The rest of this book is the answer to that question.`),
          p(`To understand the smash, you have to internalize the calling convention. A function on x86_64 Linux receives its first arguments in registers, saves the caller's stack frame, allocates local variables, and stores the return address at a specific offset from the frame pointer. Every one of those facts is an opportunity. Every overwrite that reaches a saved register is, in principle, a redirection of control flow.

The exercises in this chapter use intentionally vulnerable programs compiled with stack protections disabled. The point is not that those programs are realistic targets in 2025; the point is that the mental model you build by exploiting them is the same model you will use to defeat the protections later.`),
        ],
      },
      {
        title: "Chapter 3 — Shellcode That Survives",
        pages: [
          p(`Shellcode is a tiny program with awkward constraints: no null bytes, no library calls, often no fixed addresses. It is the haiku of offensive programming. The best shellcode is unmemorable — it does its job and disappears into the noise of normal execution. Shellcode that crashes the target is a missed opportunity. Shellcode that triggers an EDR alert is worse.

Writing shellcode by hand teaches you what compilers hide. Every instruction has a size, every system call has a number, every register has a purpose. Learning to write a thirty-byte execve stub by hand is one of the few rites of passage that genuinely makes you a better exploit developer.`),
        ],
      },
      {
        title: "Chapter 4 — Heap Exploitation",
        pages: [
          p(`The heap is harder than the stack. There is no neat array of return addresses to overwrite. The data structures are allocator-specific, the layout is non-deterministic, and the same exploit can work reliably on one libc version and fail entirely on the next.

What the heap offers in exchange is power. Heap exploits can survive across function calls, evade mitigations that protect the stack, and provide arbitrary read-write primitives that turn a single bug into a key to the whole process. The techniques have names — unlink, fastbin, tcache poisoning — and each one is a small puzzle about how the allocator's own bookkeeping can be turned into a weapon.

If you find heap exploitation frustrating at first, that is a feature, not a bug. Stick with it. The mental model you build is transferable to almost every other class of memory-corruption bug you will ever see.`),
        ],
      },
      {
        title: "Chapter 5 — Modern Mitigations",
        pages: [
          p(`ASLR, DEP, stack canaries, CFI, shadow stacks, pointer authentication — each was invented after a generation of exploits made the previous defense look naive. None of them is sufficient alone. Together they raise the cost of exploitation from "afternoon" to "campaign," which is often the difference between a breach and a near miss.

The right way to read this chapter is not as a list of obstacles but as a history of arms races. Each mitigation was a response to a specific class of exploit; each new exploit class was a response to a specific mitigation. The pattern is unlikely to stop. If you are building defenses, your goal is not to be unbreakable. Your goal is to make breaking you so expensive that the attacker chooses someone else.`),
        ],
      },
      {
        title: "Chapter 6 — Where Exploitation Goes Next",
        pages: [
          p(`Memory-safe languages — Rust, Swift, modern C++ with discipline — are slowly eroding the population of bugs that this book has been about. That is unambiguously good news for the world and slightly bittersweet news for the craft. The kinds of bugs that will define the next decade are not gone; they have moved up the stack.

Logic bugs in authorization, race conditions in distributed systems, cryptographic misuse, AI prompt injection, supply-chain compromise — none of these care whether the underlying language has memory safety. The techniques in this book are still relevant, because the underlying skill is not memory corruption per se. It is the discipline of finding the gap between intent and behavior, anywhere it exists.

Keep that skill sharp. The substrate will change. The work will not.`),
        ],
      },
    ],
  },

  // ──────────────── 3. The Web Application Hacker's Handbook ────────────────
  3: {
    cover: {
      tagline: "The web is the attack surface. Learn it cold.",
      blurb:
        "Every class of web vulnerability worth knowing, with the methodology to find them in software you have never seen before.",
    },
    toc: [
      "Chapter 1 — Mapping the Application",
      "Chapter 2 — Injection, Still Number One",
      "Chapter 3 — Authentication and Sessions",
      "Chapter 4 — Access Control Done Wrong",
      "Chapter 5 — Client-Side Attacks",
      "Chapter 6 — APIs and the Modern Web",
    ],
    chapters: [
      {
        title: "Chapter 1 — Mapping the Application",
        pages: [
          p(`Before you attack a web application you have to understand it — not its marketing, its actual shape. Every endpoint, every parameter, every redirect, every silent 302 that hints at a workflow nobody documented. Reconnaissance is 80% of the engagement. The exploitation, when it comes, is almost an anticlimax.

A good map turns a sprawling product into a small list of trust boundaries: client to server, server to database, server to third-party API, authenticated to anonymous, tenant A to tenant B. The bugs almost always live on those boundaries, because boundaries are where assumptions meet. The most productive question you can ask of any application is: what does this side trust the other side to have already validated?`),
          p(`Use a proxy and use it well. Burp Suite or its equivalents are not optional; they are the microscope of this discipline. Spend time learning the keyboard shortcuts. Learn to read a request the way a musician reads sheet music — the structure, the headers, the cookies, the timing all carry information.

Walk every workflow at least twice. The first walk teaches you the happy path. The second walk teaches you the assumptions baked into the happy path, which is where you will spend the rest of the engagement.`),
        ],
      },
      {
        title: "Chapter 2 — Injection, Still Number One",
        pages: [
          p(`SQL injection should be a museum piece by now. It is not, because somewhere a developer is still concatenating strings into a query at 2am on a deadline. The pattern repeats in every new language and framework: trust user input, hand it to an interpreter, regret it later. The interpreter changes — SQL, shell, LDAP, NoSQL, XPath, template engine, ORM — but the structure of the bug is invariant.

The fix is structural: parameterize, escape at the boundary, never let untrusted data become code. The bug is cultural: we keep hiring humans, and humans keep being in a hurry. Frameworks that make the secure path the default path have done more for the world than any number of training videos. If you are building a framework or library, this is the highest-leverage decision you can make.`),
          p(`Finding injection in 2025 requires more imagination than it used to. The obvious places have been hardened, but the less obvious places — internal microservices, admin tools, deserialization paths, NoSQL operators, GraphQL resolvers — still produce reliable findings. The methodology is the same: identify every input, map it to every sink, look for missing sanitization at the boundary in between.

Server-side template injection and SQL injection through stored data are particularly productive in modern applications. Both reward the kind of patient mapping that this chapter has been advocating.`),
        ],
      },
      {
        title: "Chapter 3 — Authentication and Sessions",
        pages: [
          p(`Authentication answers "who are you" exactly once. Session management answers it on every subsequent request, which is where most of the bugs live. Predictable tokens, missing rotation, cookies without Secure or HttpOnly, password reset flows that trust the email address in the request, OAuth implementations that conflate identity with authorization — all classic, all still found in production this quarter.

The right model for session security is paranoia: assume the session token will be stolen, and design controls that limit the damage when it is. Short lifetimes, device binding, anomaly detection, step-up authentication for sensitive actions. None of these are exotic. All of them are skipped in the average application because they feel like friction.`),
        ],
      },
      {
        title: "Chapter 4 — Access Control Done Wrong",
        pages: [
          p(`The vulnerability of the decade is the missing authorization check. Change a numeric ID in a URL and read someone else's invoice. Add a parameter to a request and edit data you should not have known about. Submit a form for an admin endpoint that nobody ever expected an ordinary user to find. Modern frameworks make this dangerously easy to get wrong because they make data access feel free.

Defense in depth is the only honest answer. Check authorization at the controller, at the service, and in the database — three layers, because any one of them will eventually be bypassed by a developer who did not understand the model. Better still: design the data model so that authorization is structural, not procedural. If a user cannot construct a query that would return another tenant's data, no missing check can leak it.`),
        ],
      },
      {
        title: "Chapter 5 — Client-Side Attacks",
        pages: [
          p(`Cross-site scripting still pays the rent. Modern frameworks make the obvious cases harder, but the application's HTML output is only one of many places untrusted strings end up. JavaScript event handlers, attribute values, URLs that flow into navigation, postMessage handlers, DOM-based sinks reached through ten layers of indirection — all live, all exploitable, all found regularly.

CSRF, clickjacking, and the wider category of UI-redress attacks remain underestimated. They do not require XSS. They do not require any flaw in the target's server. They exploit the browser's willingness to act on behalf of the user across origins, and the application's failure to verify intent.`),
        ],
      },
      {
        title: "Chapter 6 — APIs and the Modern Web",
        pages: [
          p(`Most "web application" testing in 2025 is API testing. The browser is a thin rendering layer on top of a JSON API, and the API is where the interesting bugs are. Treat the SPA as documentation: it tells you the names of the endpoints and the shape of the requests. The actual attack surface is everything those endpoints will accept that the SPA never sends.

Mass assignment, BOLA (broken object-level authorization), excessive data exposure, unbounded pagination, and the wider OWASP API Top 10 are the modern equivalents of the classic web bugs. They are easy to find and embarrassingly common. Any team building APIs should be running an API-aware scanner on every build and treating the findings as P1.`),
        ],
      },
    ],
  },

  // ─────────────────────────── 4. Blue Team Handbook ───────────────────────────
  4: {
    cover: {
      tagline: "A field guide for the people who catch the attackers.",
      blurb:
        "Practical playbooks for detection, triage, and response — the stuff you actually need at 3am, not the stuff that wins conference talks.",
    },
    toc: [
      "Chapter 1 — The Anatomy of an Alert",
      "Chapter 2 — Triage Under Pressure",
      "Chapter 3 — Containment, Then Eradication",
      "Chapter 4 — Threat Hunting",
      "Chapter 5 — Writing the Postmortem",
    ],
    chapters: [
      {
        title: "Chapter 1 — The Anatomy of an Alert",
        pages: [
          p(`Every alert is a hypothesis. "Something unusual happened, and a rule someone wrote at some point thought you might want to know." Treat it that way and you will spend your time testing hypotheses instead of arguing with dashboards.

A well-designed alert tells you what happened, why someone thought it mattered, and what to look at next. Most alerts in most environments do none of these things. Fixing that is unglamorous work, and it is also the single highest-leverage activity an analyst can perform between incidents. Every alert you tune today is an hour you save during next quarter's breach.`),
          p(`The hardest part of detection engineering is honest measurement. An alert that fires once a week and is always a real finding is more valuable than an alert that fires a thousand times and produces an occasional gem. Track precision per rule. Retire the rules that are dragging the team's attention down. The cost of an alert is not its writing; it is the cumulative analyst-minutes it consumes over its lifetime.`),
        ],
      },
      {
        title: "Chapter 2 — Triage Under Pressure",
        pages: [
          p(`Under pressure, write things down. Timestamps in UTC, hostnames, the exact query you ran, the exact value you copied. Future you, six hours into the incident, will thank present you for the simple act of typing. Memory is unreliable when adrenaline is high.

Triage is ruthless prioritization. Not every alert is an incident, and not every incident is a breach. Sort by blast radius first, novelty second, severity third. The single account that touched a sensitive system is a higher priority than the hundred accounts that touched ordinary ones, even if the hundred-account event has a louder score.`),
        ],
      },
      {
        title: "Chapter 3 — Containment, Then Eradication",
        pages: [
          p(`Stop the bleeding before you investigate the wound. Pull the host off the network, rotate the credentials, revoke the tokens, disable the OAuth application. You can always re-image later; you cannot un-exfiltrate data. The instinct to "watch the attacker" is romantic and almost always wrong unless you are operating with a mature deception program and explicit legal cover.

Eradication is the patient half. Find every host the attacker touched, every credential they harvested, every persistence mechanism they planted. Missing one means you will be back in this incident in two weeks under worse conditions. The cost of being thorough now is always less than the cost of being insufficient.`),
        ],
      },
      {
        title: "Chapter 4 — Threat Hunting",
        pages: [
          p(`Hunting is what you do when no alert has fired but you suspect something is wrong, or when you want to know what your monitoring is missing. A good hunt starts with a hypothesis grounded in a known attacker technique, defines the data that would prove or disprove it, and ends with either a finding or a new detection.

Hunts that produce no findings are not wasted. The negative result is itself valuable: it tells you the technique is not currently in your environment, or that your data does not let you tell. Either answer is useful. The hunt that produces no finding and no new detection is the only true waste.`),
        ],
      },
      {
        title: "Chapter 5 — Writing the Postmortem",
        pages: [
          p(`Blameless does not mean toothless. A good postmortem names the systems, the assumptions, and the small decisions that compounded — and then it commits to changing one or two things that would have stopped the chain. Anything more ambitious will not survive next quarter.

The structure that works: timeline first, then root cause, then impact, then what worked, then what did not, then action items with owners and dates. Distribute it. Read it aloud at the next all-hands. Refer back to it the next time someone proposes a control that the postmortem already showed would have helped. Postmortems that sit in a shared drive untouched are an opportunity cost, not a deliverable.`),
        ],
      },
    ],
  },

  // ────────────────────── 5. Threat Intelligence and Me ──────────────────────
  5: {
    cover: {
      tagline: "Build a threat intelligence program that pays rent.",
      blurb:
        "From feeds to fusion: how to take raw indicators and turn them into decisions your business actually makes differently.",
    },
    toc: [
      "Chapter 1 — What Intelligence Is Not",
      "Chapter 2 — Collection That Earns Its Keep",
      "Chapter 3 — Analysis Without Hand-Waving",
      "Chapter 4 — Dissemination and Feedback",
      "Chapter 5 — Building the Team",
    ],
    chapters: [
      {
        title: "Chapter 1 — What Intelligence Is Not",
        pages: [
          p(`A list of IP addresses is not intelligence. A PDF nobody reads is not intelligence. A weekly briefing the CISO skims on the way to another meeting is not intelligence. These artifacts can contain intelligence, but the artifact itself is not the product.

Intelligence is information that changes a decision. If nothing changes, you produced trivia, and you should be honest about that with yourself before someone else is honest about it with your budget. The single most powerful question a TI program can ask of itself is: what decision did our product change this quarter, and what would have happened without us?`),
        ],
      },
      {
        title: "Chapter 2 — Collection That Earns Its Keep",
        pages: [
          p(`Every feed you add has a cost: ingestion, normalization, false positives, analyst attention. Buy feeds the way you buy groceries — for what you will actually consume this week, not for what looked impressive in the aisle.

Open-source intelligence is dramatically underrated. A motivated analyst with a browser, a paid subscription to a couple of high-quality blogs, and a structured habit of reading can produce more value than a six-figure feed contract. The constraint is rarely access; it is attention and synthesis.`),
        ],
      },
      {
        title: "Chapter 3 — Analysis Without Hand-Waving",
        pages: [
          p(`Estimative language matters. "Likely" and "almost certainly" are not synonyms. Pick a scale, publish it, and use it consistently across the team. Your readers will calibrate to you, and you will stop getting in arguments about what you meant.

Show the analytic line of reasoning, not just the conclusion. The reader who agrees with your conclusion gets nothing extra from the reasoning, but the reader who disagrees gets exactly the artifact they need to push back productively. Both outcomes are healthier than a community that defers to oracles.`),
        ],
      },
      {
        title: "Chapter 4 — Dissemination and Feedback",
        pages: [
          p(`The last mile is the hardest. A brilliant report delivered in a format nobody reads is worth less than a one-line Slack message at the right moment. Match the medium to the decision-maker, and ask — every time — whether the report changed anything.

Feedback closes the loop. Without it, every report is launched into a vacuum and the program slowly drifts away from utility. Build feedback into the workflow: a question at the bottom of every report, a quarterly review with the consumers, a willingness to retire products that nobody asks for twice.`),
        ],
      },
      {
        title: "Chapter 5 — Building the Team",
        pages: [
          p(`Threat intelligence teams fail when they are staffed only with collectors or only with analysts. The work requires both, and a third role that is rarely named: the translator who turns analysis into the language of the consumer. A CISO does not want a STIX bundle. An incident responder does not want a strategic forecast. A board does not want either. Each audience needs a different artifact built by a different sensibility.

Hire for curiosity and writing ability. Tools are teachable. The instinct to ask "so what" and the discipline to answer it in plain language are not.`),
        ],
      },
    ],
  },

  // ────────────────────────── 6. Zero Trust Networks ──────────────────────────
  6: {
    cover: {
      tagline: "Trust nothing. Verify everything. Repeat.",
      blurb:
        "Architectural patterns for systems that assume the network is already hostile — because, statistically, it is.",
    },
    toc: [
      "Chapter 1 — Why Perimeters Failed",
      "Chapter 2 — Identity as the New Perimeter",
      "Chapter 3 — Device Trust and Posture",
      "Chapter 4 — Microsegmentation in Practice",
      "Chapter 5 — Migrating Without Breaking Production",
    ],
    chapters: [
      {
        title: "Chapter 1 — Why Perimeters Failed",
        pages: [
          p(`The perimeter model assumed that "inside" meant "safe." That assumption was already shaky when laptops left the building, and it was actively dangerous by the time half the workforce was working from coffee shops. Zero trust is, in a sense, what happens when you finally take the perimeter's death seriously.

The perimeter was never as protective as its proponents claimed. It was always a single, brittle wall that, once breached, exposed everything inside to lateral movement. Modern attacker tradecraft is, in large part, the art of breaching that wall once and then enjoying months of free reign in a flat trust environment. The fix is not a better wall. The fix is to stop treating the network as a trust signal at all.`),
        ],
      },
      {
        title: "Chapter 2 — Identity as the New Perimeter",
        pages: [
          p(`If you cannot trust the network, you must trust something else. That something is identity — strongly authenticated, continuously verified, scoped to the smallest useful permission. Everything else in zero trust is a footnote to this idea.

This means consolidating your IdP, eliminating local accounts wherever possible, enforcing phishing-resistant MFA for every privileged action, and treating the time between a credential compromise and its revocation as the critical metric of your identity program. If you cannot revoke a stolen credential in under fifteen minutes, you do not have a zero trust program; you have aspirations.`),
        ],
      },
      {
        title: "Chapter 3 — Device Trust and Posture",
        pages: [
          p(`Identity alone is insufficient. A valid token on a malware-infected laptop is still a problem. Device posture — patched, encrypted, managed, free of known indicators of compromise — is the second leg of the access decision.

The hard part is honest assessment. Posture checks that the user can trivially fool are theater. Posture checks that depend on agents the user can uninstall are theater. Real posture comes from hardware-rooted attestation, which is now feasible across major endpoint platforms and should be the target architecture for any new deployment.`),
        ],
      },
      {
        title: "Chapter 4 — Microsegmentation in Practice",
        pages: [
          p(`Microsegmentation sounds like a networking problem and is actually an inventory problem. You cannot segment what you cannot enumerate. Spend the first three months of any zero trust project on a brutally honest service catalog: every service, every dependency, every flow. The rest will be easier.

The implementation tooling matters less than people imagine. Identity-aware proxies, service meshes, host-based firewalls, and cloud-native network policies are all viable substrates. The deciding factor is not which one is technically best but which one your team can operate. A policy that is correct but unmaintained becomes incorrect, quietly, over time.`),
        ],
      },
      {
        title: "Chapter 5 — Migrating Without Breaking Production",
        pages: [
          p(`Big-bang migrations fail. Strangler-fig migrations succeed. Pick one application, ideally one with a sympathetic owner, and migrate it end to end. The pattern you discover will become the template for everything else.

The hardest applications are the ones nobody wants to touch — legacy ERPs, integrations with regulators, the system that runs payroll. Save them for last. By the time you get there, your patterns will be mature and your team will be experienced. The early wins build the political capital you will need to spend on those final migrations.`),
        ],
      },
    ],
  },

  // ──────────────────────── 7. Practical Malware Analysis ────────────────────────
  7: {
    cover: {
      tagline: "Pull malware apart, then put it back together wiser.",
      blurb:
        "A working analyst's introduction to static and dynamic reverse engineering — disassemblers, sandboxes, and the discipline of knowing when to stop.",
    },
    toc: [
      "Chapter 1 — Safe Lab, Safe Analyst",
      "Chapter 2 — Static Analysis Fundamentals",
      "Chapter 3 — Dynamic Analysis and Sandboxes",
      "Chapter 4 — Unpacking and Anti-Analysis",
      "Chapter 5 — Writing Useful Reports",
    ],
    chapters: [
      {
        title: "Chapter 1 — Safe Lab, Safe Analyst",
        pages: [
          p(`Before you touch the sample, build the lab. Isolated network, snapshot-capable VM, clipboard sharing off, host-only adapter, and a written rule that the sample never leaves the segment. Malware is patient; so is your discipline.

Document the lab as if a colleague will inherit it tomorrow. Document the rules as if a regulator will audit them next week. Both are likely to happen, and both will go better with documentation than without.`),
        ],
      },
      {
        title: "Chapter 2 — Static Analysis Fundamentals",
        pages: [
          p(`Strings, imports, sections, entropy. The boring four. Most samples will tell you 60% of what they do before you ever load them into a disassembler — if you bother to look. Run the basics on every sample, every time. The discipline of always doing the cheap work first is what distinguishes a productive analyst from a brilliant one.

When you do open the disassembler, start with the entry point and work outward, naming functions as you understand them. Half of reverse engineering is good note-taking. The sample is a maze; your annotations are the breadcrumbs that let you back out and try a different path.`),
        ],
      },
      {
        title: "Chapter 3 — Dynamic Analysis and Sandboxes",
        pages: [
          p(`Run it and watch. Process tree, file writes, registry mutations, network beacons. The sample is now performing for you. Your job is to take notes and stay skeptical: many samples behave very differently when they think a human is watching, or when they think they are in a sandbox.

Layer the instrumentation. A noisy sandbox tells you what the sample wants you to see. A quiet, hardened sandbox with realistic decoys tells you what the sample actually does. The difference between those two pictures is itself useful intelligence about the sample's evasion posture.`),
        ],
      },
      {
        title: "Chapter 4 — Unpacking and Anti-Analysis",
        pages: [
          p(`Packers, obfuscators, and anti-analysis tricks are the malware author's way of saying "I do not want you to read this." Read it anyway. The techniques have names — UPX, custom crypters, control-flow flattening, virtualized obfuscation — and each one has known defeats. Most of the time, dumping the unpacked image from memory at the right moment is sufficient.

Know when to stop. Some samples are not worth full reverse engineering. If you can extract the C2 configuration, the persistence mechanism, and the network indicators, you have produced 80% of the value with 20% of the effort. The remaining 80% effort is a research project, not an operational deliverable.`),
        ],
      },
      {
        title: "Chapter 5 — Writing Useful Reports",
        pages: [
          p(`A malware report has exactly one purpose: enable someone else to act. Indicators at the top, capabilities in the middle, narrative at the bottom. If a tier-one analyst cannot block based on the first page, you wrote the wrong report.

The narrative section is for the reader who wants to understand. Make it readable. Write in sentences. Resist the temptation to copy-paste assembly listings as a substitute for explanation. Your job is to translate, not to transcribe.`),
        ],
      },
    ],
  },

  // ──────────────────── 8. Social Engineering: The Science ────────────────────
  8: {
    cover: {
      tagline: "Humans are the operating system. Patch accordingly.",
      blurb:
        "Why people fall for manipulation, what to do about it without turning your office into a paranoid wasteland, and how to build awareness that actually changes behavior.",
    },
    toc: [
      "Chapter 1 — The Physics of Persuasion",
      "Chapter 2 — Phishing, Vishing, and the Long Con",
      "Chapter 3 — Building Healthy Skepticism",
      "Chapter 4 — Programs That Actually Work",
    ],
    chapters: [
      {
        title: "Chapter 1 — The Physics of Persuasion",
        pages: [
          p(`Reciprocity, authority, scarcity, social proof, liking, commitment. Cialdini's classics are not a curiosity — they are a checklist of the levers used in nearly every successful social engineering engagement. Recognize them and the spell weakens. Teach your people to recognize them and you have built a control that no firewall can replicate.

The mistake most awareness programs make is teaching the specific lures rather than the underlying levers. The lures change every quarter. The levers have been constant since long before computers existed and will continue to work long after the current generation of phishing kits has gone out of style.`),
        ],
      },
      {
        title: "Chapter 2 — Phishing, Vishing, and the Long Con",
        pages: [
          p(`Email phishing remains the volume game, but voice and video are catching up fast. Generative audio has made impersonation calls dramatically more convincing. Generative video is not far behind. The defensive posture that worked when "the CEO would never send this email" no longer works when the CEO appears to be on the video call.

The mitigation is verification flows that do not depend on the user's ability to tell a fake from a real. Call-back numbers from the official directory. Out-of-band approvals for any financial transaction over a threshold. A culture in which calling the actual CEO to confirm a strange request is rewarded, not penalized as bothersome.`),
        ],
      },
      {
        title: "Chapter 3 — Building Healthy Skepticism",
        pages: [
          p(`Healthy skepticism is not paranoia. Paranoia degrades the organization. Skepticism strengthens it. The difference is whether the default state is suspicion of everyone or trust with verification at the moments that matter.

The goal of an awareness program is not to make every employee permanently mistrustful. The goal is to install a small set of habits that fire automatically at the moments of highest risk: before clicking a link in a request for credentials, before approving a wire transfer, before granting access to a new vendor. The rest of the time, people should be free to do their jobs.`),
        ],
      },
      {
        title: "Chapter 4 — Programs That Actually Work",
        pages: [
          p(`The best security-awareness programs share three traits. First, they measure behavior, not training completion. Click rates, report rates, time-to-report are the metrics that matter. Course completion is a vanity number. Second, they reward reporting. The employee who reports a phishing attempt is a sensor; treat them like one. Third, they run continuously. A quarterly compliance event teaches employees to tune out for thirteen weeks at a time.

Above all, integrate the program with the rest of security. The phishing report queue should feed the SOC. The repeat-clicker list should inform conditional access. The trend data should drive engineering investment in controls that make the human decision matter less. Awareness is not a substitute for engineering. It is the layer that catches what the engineering misses, and it works best when both layers know about each other.`),
        ],
      },
    ],
  },
};
