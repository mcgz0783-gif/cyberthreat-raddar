// Long-form readable content for each book. Each book has a cover blurb,
// a table of contents, and multiple chapters with paginated body text.

export type Chapter = { title: string; pages: string[] };
export type BookContent = {
  id: number;
  cover: { tagline: string; blurb: string };
  toc: string[];
  chapters: Chapter[];
};

const p = (s: string) => s.trim();

export const BOOK_CONTENT: Record<number, BookContent> = {
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
      "Chapter 4 — Lessons for Defenders",
    ],
    chapters: [
      {
        title: "Foreword: Why Attackers Win",
        pages: [
          p(`Every breach you read about in the news shares one quiet truth: the attackers were patient,
the defenders were busy, and somewhere a human being made a small, understandable mistake.
This book is about those moments — the seam between policy and reality where intrusions live.`),
          p(`We will not glamorize crime. We will study craft. Because understanding how a determined
adversary actually thinks is the only honest path to building systems that survive contact
with them. The rest is theater.`),
        ],
      },
      {
        title: "Chapter 1 — The Hacker Mindset",
        pages: [
          p(`Good attackers are not magicians. They are curious, methodical, and comfortable with
ambiguity. They read manuals nobody else reads. They notice the dropdown that should not exist,
the error message that says too much, the receptionist who is too helpful on a Friday afternoon.`),
          p(`Curiosity is the engine; patience is the fuel. The exploit is almost never the interesting
part. The interesting part is the months of mapping, listening, and waiting that made the
exploit a five-minute job.`),
          p(`If you want to defend, learn to think this way. Walk into your own building as a stranger.
Read your own job postings as an attacker. Ask what each system would confess if asked nicely.`),
        ],
      },
      {
        title: "Chapter 2 — Social Engineering in Practice",
        pages: [
          p(`Pretexting is storytelling with a goal. The story has to be boring enough to be believed
and specific enough to be useful. "I'm from IT, your VPN cert expires today" works because
it is dull, plausible, and slightly urgent — exactly the texture of real work.`),
          p(`The countermeasure is not cynicism. It is process. Verify out of band. Make the safe path
the easy path. Punish the system, not the person who fell for it — because next time it will
be someone else, and the time after that it will be you.`),
        ],
      },
      {
        title: "Chapter 3 — Inside the Phone System",
        pages: [
          p(`The telephone network was the first global computer, and like every system since, its
designers trusted the people inside it. Tones became commands, commands became control,
and a generation of curious teenagers learned that trust at scale is just a vulnerability
with marketing.`),
          p(`The lesson outlived the technology. Anywhere two systems trust each other implicitly —
service mesh, OAuth scopes, SSO assertions — there is a phreaker waiting to be born.`),
        ],
      },
      {
        title: "Chapter 4 — Lessons for Defenders",
        pages: [
          p(`Assume compromise. Log everything you can afford to log, and a little more. Rehearse the
bad day before it arrives. The organizations that recover quickly are the ones that practiced
recovering when nothing was on fire.`),
          p(`And finally: be kind to the human in the loop. They are not your weakest link. They are
your last line of defense, and they deserve tools that make doing the right thing the easy thing.`),
        ],
      },
    ],
  },
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
      "Chapter 4 — Modern Mitigations",
    ],
    chapters: [
      {
        title: "Chapter 1 — A Map of Memory",
        pages: [
          p(`A program in memory is a city. Code lives in one district, the stack grows downward like
a tide, the heap sprawls outward like suburbs, and somewhere in between sit the small,
crucial signs that tell the CPU where to go next.`),
          p(`Exploitation is, almost always, the art of changing one of those signs. Everything else
in this book — registers, calling conventions, gadgets — is in service of that single idea.`),
        ],
      },
      {
        title: "Chapter 2 — Stack Smashing, Gently",
        pages: [
          p(`A buffer is a promise: "I will hold N bytes." A buffer overflow is what happens when the
program forgets the promise and the language does not remember it either. The next bytes
on the stack are not random — they are the breadcrumbs the function uses to find its way home.`),
          p(`Overwrite the return address and the function goes home to wherever you point it. The
difficulty is no longer "can I overwrite memory" but "where, on a hardened modern system,
can I point it that still works." That is the rest of the book.`),
        ],
      },
      {
        title: "Chapter 3 — Shellcode That Survives",
        pages: [
          p(`Shellcode is a tiny program with awkward constraints: no null bytes, no library calls,
often no fixed addresses. It is the haiku of offensive programming. The best shellcode is
unmemorable — it does its job and disappears into the noise of normal execution.`),
        ],
      },
      {
        title: "Chapter 4 — Modern Mitigations",
        pages: [
          p(`ASLR, DEP, stack canaries, CFI — each was invented after a generation of exploits made
the previous defense look naive. None of them are sufficient alone. Together they raise the
cost of exploitation from "afternoon" to "campaign," which is often the difference between
a breach and a near miss.`),
        ],
      },
    ],
  },
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
    ],
    chapters: [
      {
        title: "Chapter 1 — Mapping the Application",
        pages: [
          p(`Before you attack a web application you have to understand it — not its marketing,
its actual shape. Every endpoint, every parameter, every redirect, every silent 302 that
hints at a workflow nobody documented. Reconnaissance is 80% of the engagement.`),
          p(`A good map turns a sprawling product into a small list of trust boundaries. The bugs
almost always live on those boundaries.`),
        ],
      },
      {
        title: "Chapter 2 — Injection, Still Number One",
        pages: [
          p(`SQL injection should be a museum piece by now. It is not, because somewhere a developer
is still concatenating strings into a query at 2am on a deadline. The pattern repeats in
every new language: trust user input, hand it to an interpreter, regret it later.`),
          p(`The fix is structural: parameterize, escape at the boundary, never let untrusted data
become code. The bug is cultural: we keep hiring humans, and humans keep being in a hurry.`),
        ],
      },
      {
        title: "Chapter 3 — Authentication and Sessions",
        pages: [
          p(`Authentication answers "who are you" exactly once. Session management answers it on
every subsequent request, which is where most of the bugs live. Predictable tokens, missing
rotation, cookies without Secure or HttpOnly, password reset flows that trust the email
address in the request — all classic, all still found in production this quarter.`),
        ],
      },
      {
        title: "Chapter 4 — Access Control Done Wrong",
        pages: [
          p(`The vulnerability of the decade is the missing authorization check. Change a numeric ID
in a URL and read someone else's invoice. Modern frameworks make this dangerously easy to
get wrong because they make data access feel free.`),
          p(`Defense in depth: check authorization at the controller, at the service, and in the
database. Belt, suspenders, and a second belt.`),
        ],
      },
    ],
  },
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
      "Chapter 4 — Writing the Postmortem",
    ],
    chapters: [
      {
        title: "Chapter 1 — The Anatomy of an Alert",
        pages: [
          p(`Every alert is a hypothesis. "Something unusual happened, and a rule someone wrote at
some point thought you might want to know." Treat it that way and you will spend your time
testing hypotheses instead of arguing with dashboards.`),
        ],
      },
      {
        title: "Chapter 2 — Triage Under Pressure",
        pages: [
          p(`Under pressure, write things down. Timestamps, hostnames, the exact query you ran. Future
you, six hours into the incident, will thank present you for the simple act of typing.`),
          p(`Triage is ruthless prioritization. Not every alert is an incident, and not every incident
is a breach. Sort by blast radius first, novelty second, severity third.`),
        ],
      },
      {
        title: "Chapter 3 — Containment, Then Eradication",
        pages: [
          p(`Stop the bleeding before you investigate the wound. Pull the host off the network,
rotate the credentials, revoke the tokens. You can always re-image later; you cannot
un-exfiltrate data.`),
        ],
      },
      {
        title: "Chapter 4 — Writing the Postmortem",
        pages: [
          p(`Blameless does not mean toothless. A good postmortem names the systems, the assumptions,
and the small decisions that compounded — and then it commits to changing one or two things
that would have stopped the chain. Anything more ambitious will not survive next quarter.`),
        ],
      },
    ],
  },
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
    ],
    chapters: [
      {
        title: "Chapter 1 — What Intelligence Is Not",
        pages: [
          p(`A list of IP addresses is not intelligence. A PDF nobody reads is not intelligence. A
weekly briefing the CISO skims on the way to another meeting is not intelligence.`),
          p(`Intelligence is information that changes a decision. If nothing changes, you produced
trivia, and you should be honest about that with yourself before someone else is honest about
it with your budget.`),
        ],
      },
      {
        title: "Chapter 2 — Collection That Earns Its Keep",
        pages: [
          p(`Every feed you add has a cost: ingestion, normalization, false positives, analyst
attention. Buy feeds the way you buy groceries — for what you will actually consume this
week, not for what looked impressive in the aisle.`),
        ],
      },
      {
        title: "Chapter 3 — Analysis Without Hand-Waving",
        pages: [
          p(`Estimative language matters. "Likely" and "almost certainly" are not synonyms. Pick a
scale, publish it, and use it consistently. Your readers will calibrate to you, and you
will stop getting in arguments about what you meant.`),
        ],
      },
      {
        title: "Chapter 4 — Dissemination and Feedback",
        pages: [
          p(`The last mile is the hardest. A brilliant report delivered in a format nobody reads is
worth less than a one-line Slack message at the right moment. Match the medium to the
decision-maker, and ask — every time — whether the report changed anything.`),
        ],
      },
    ],
  },
  6: {
    cover: {
      tagline: "Trust nothing. Verify everything. Repeat.",
      blurb:
        "Architectural patterns for systems that assume the network is already hostile — because, statistically, it is.",
    },
    toc: [
      "Chapter 1 — Why Perimeters Failed",
      "Chapter 2 — Identity as the New Perimeter",
      "Chapter 3 — Microsegmentation in Practice",
      "Chapter 4 — Migrating Without Breaking Production",
    ],
    chapters: [
      {
        title: "Chapter 1 — Why Perimeters Failed",
        pages: [
          p(`The perimeter model assumed that "inside" meant "safe." That assumption was already
shaky when laptops left the building, and it was actively dangerous by the time half the
workforce was working from coffee shops. Zero trust is, in a sense, what happens when you
finally take the perimeter's death seriously.`),
        ],
      },
      {
        title: "Chapter 2 — Identity as the New Perimeter",
        pages: [
          p(`If you cannot trust the network, you must trust something else. That something is
identity — strongly authenticated, continuously verified, scoped to the smallest useful
permission. Everything else in zero trust is a footnote to this idea.`),
        ],
      },
      {
        title: "Chapter 3 — Microsegmentation in Practice",
        pages: [
          p(`Microsegmentation sounds like a networking problem and is actually an inventory problem.
You cannot segment what you cannot enumerate. Spend the first three months of any zero
trust project on a brutally honest service catalog. The rest will be easier.`),
        ],
      },
      {
        title: "Chapter 4 — Migrating Without Breaking Production",
        pages: [
          p(`Big-bang migrations fail. Strangler-fig migrations succeed. Pick one application, ideally
one with a sympathetic owner, and migrate it end to end. The pattern you discover will
become the template for everything else.`),
        ],
      },
    ],
  },
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
      "Chapter 4 — Writing Useful Reports",
    ],
    chapters: [
      {
        title: "Chapter 1 — Safe Lab, Safe Analyst",
        pages: [
          p(`Before you touch the sample, build the lab. Isolated network, snapshot-capable VM,
clipboard sharing off, host-only adapter, and a written rule that the sample never leaves
the segment. Malware is patient; so is your discipline.`),
        ],
      },
      {
        title: "Chapter 2 — Static Analysis Fundamentals",
        pages: [
          p(`Strings, imports, sections, entropy. The boring four. Most samples will tell you 60% of
what they do before you ever load them into a disassembler — if you bother to look.`),
        ],
      },
      {
        title: "Chapter 3 — Dynamic Analysis and Sandboxes",
        pages: [
          p(`Run it and watch. Process tree, file writes, registry mutations, network beacons. The
sample is now performing for you. Your job is to take notes and stay skeptical: many
samples behave very differently when they think a human is watching.`),
        ],
      },
      {
        title: "Chapter 4 — Writing Useful Reports",
        pages: [
          p(`A malware report has exactly one purpose: enable someone else to act. Indicators at the
top, capabilities in the middle, narrative at the bottom. If a tier-one analyst cannot
block based on the first page, you wrote the wrong report.`),
        ],
      },
    ],
  },
  8: {
    cover: {
      tagline: "Humans are the operating system. Patch accordingly.",
      blurb:
        "Why people fall for manipulation, what to do about it without turning your office into a paranoid wasteland, and how to build awareness that actually changes behavior.",
    },
    toc: [
      "Chapter 1 — The Physics of Persuasion",
      "Chapter 2 — Phishing, Vishing, and the Long Con",
      "Chapter 3 — Building a Healthy Skepticism",
      "Chapter 4 — Programs That Actually Work",
    ],
    chapters: [
      {
        title: "Chapter 1 — The Physics of Persuasion",
        pages: [
          p(`Reciprocity, authority, scarcity, social proof. Cialdini's classics are not a curiosity —
they are a checklist of the levers used in nearly every successful social engineering
engagement. Recognize them and the spell weakens.`),
        ],
      },
      {
        title: "Chapter 2 — Phishing, Vishing, and the Long Con",
        pages: [
          p(`A phishing email is a one-shot attempt. A vishing call is a conversation. A long con is
a relationship. Each step up that ladder is more expensive for the attacker and more
dangerous for you — because the trust it borrows is harder to revoke.`),
        ],
      },
      {
        title: "Chapter 3 — Building a Healthy Skepticism",
        pages: [
          p(`Teach people to slow down on the third sign of urgency, not the first. Three urgent
emails in a morning is normal; an urgent email about something you have never been asked
about before is not. Skepticism is a muscle, not a personality trait.`),
        ],
      },
      {
        title: "Chapter 4 — Programs That Actually Work",
        pages: [
          p(`Stop measuring click rates as if they were the goal. Measure report rates, time to
report, and how the helpdesk responded. A workforce that reports phishing in 90 seconds is
worth more than one that clicks 1% less.`),
        ],
      },
    ],
  },
};
