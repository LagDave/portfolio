import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Download, X } from "lucide-react";

interface SpeedWithStructureProps {
  isDark: boolean;
}

const WORKFLOW_STAGES = [
  {
    number: "01",
    title: "Explore",
    commands: ["-b", "-a"],
    desc: "Read the codebase first. Trace flows and map blast radius before any plan exists.",
  },
  {
    number: "02",
    title: "Plan",
    commands: ["-s"],
    desc: "Isolated worktree, hard questions, mandatory risk pushback, and a spec that becomes the contract.",
  },
  {
    number: "03",
    title: "Execute",
    commands: ["-x", "-i", "-q"],
    desc: "Spec-driven tasks in dependency order. Read-before-write, no phantom files, sub-agents on large plans.",
  },
  {
    number: "04",
    title: "Verify",
    commands: ["-tw", "-r"],
    desc: "Hard type gate, lint, and tests, then behavioral acceptance against a disposable, isolated runtime.",
  },
  {
    number: "05",
    title: "Finalize",
    commands: ["-c", "-d"],
    desc: "Revisions logged, never lost. Done is blocked until spec, code, and acceptance all agree.",
  },
];

const COMMAND_REFERENCE = [
  { cmd: "-b", name: "context-building", desc: "Explore the codebase and trace flows before any plan exists." },
  { cmd: "-s", name: "start", desc: "Isolated worktree, interrogation until shared understanding, risk pushback, then the spec." },
  { cmd: "-i", name: "instant", desc: "Auto-plan and execute small, well-understood tasks: same artifacts, less ceremony." },
  { cmd: "-x", name: "execute", desc: "Run the approved spec's tasks in dependency order with every gate on." },
  { cmd: "-q", name: "quickfix", desc: "Genuine fixes only: three-file budget, no new patterns, never feature work in disguise." },
  { cmd: "-c", name: "continue", desc: "Revisions against the same spec, recorded in an append-only revision log." },
  { cmd: "-tw", name: "test-worktree", desc: "Behavioral acceptance in a disposable runtime: isolated DB, mail sink, namespaced queues." },
  { cmd: "-r", name: "review", desc: "Read-only engineering review with severities and a ship/needs-changes verdict." },
  { cmd: "-st", name: "status", desc: "Where the session stands, including a spec-code parity check." },
  { cmd: "-u", name: "undo", desc: "Safe, explicit revert of the last execution, with no history rewrites." },
  { cmd: "-a", name: "ask", desc: "Read-only questions. No planning, no code." },
  { cmd: "-d", name: "done", desc: "Blocked until spec, code, tests, and acceptance agree, then the changelog is written." },
];

function WorkflowModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="workflow-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-white/14 bg-[#101010] p-6 text-white shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close workflow details"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <X size={16} />
        </button>

        <p className="font-mono text-[0.66rem] uppercase tracking-[0.04em] text-white/45">
          Controlled agentic engineering
        </p>
        <h3
          id="workflow-modal-title"
          className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl"
        >
          The workflow, briefly.
        </h3>
        <p className="mt-4 text-sm leading-6 text-white/70">
          This system has been running, and continuously honed, since the
          earliest AI pair-coding setups, before agents could be trusted with
          more than autocomplete. The guardrails came first; the agents grew
          into them. Every session is command-gated: the command declares
          intent, and intent decides what the agent is allowed to touch.
        </p>

        <div className="mt-7">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.04em] text-white/45">
            The command gate
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {COMMAND_REFERENCE.map((entry) => (
              <li
                key={entry.cmd}
                className="rounded-md border border-white/10 bg-white/[0.03] p-3"
              >
                <p className="flex items-baseline gap-2">
                  <code className="rounded border border-white/20 bg-black px-1.5 py-0.5 font-mono text-[0.7rem] font-bold text-white">
                    {entry.cmd}
                  </code>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.04em] text-white/50">
                    {entry.name}
                  </span>
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-5 text-white/64">
                  {entry.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 border-t border-white/12 pt-6">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.04em] text-white/45">
            The contract
          </p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Every planned change lives in a plan folder whose spec is the
            source of truth for intent: why, what, constraints, risk with
            blast radius, tasks, and a done checklist. Code and spec are never
            allowed to drift: divergence halts execution until the spec is
            revised, and every revision lands in an append-only log. Each
            execution ships a runnable acceptance checklist, and finalization
            is blocked until every done item and acceptance check passes or
            carries a written waiver.
          </p>
        </div>

        <div className="mt-7 border-t border-white/12 pt-6">
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.04em] text-white/45">
            The code constitution
          </p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Process rules say how work happens; the Constitution says how code
            is written. It is a numbered instrument: Parts, Sections, and
            Articles with stable §N.M identifiers covering naming, structure,
            error handling, layering, security, and testing. Violations are
            never "this looks messy": they cite the Article, quote the rule,
            name the file and line, and prescribe the fix. A mechanized checker
            in CI prints the same §IDs a human reviewer would, so review and
            automation speak one language.
          </p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            The principles are stack-neutral; the file skeletons and mechanized
            checks are tailored per framework, which is why the Constitution
            is shared on request rather than as a download.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/12 pt-6">
          <a
            href="/files/AGENTS.md"
            download="AGENTS.md"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            <Download size={15} />
            Download AGENTS.md
          </a>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.04em] text-white/45">
            Code Constitution available on request
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SpeedWithStructure({ isDark }: SpeedWithStructureProps) {
  const slabRef = useRef<HTMLDivElement>(null);
  const [isWorkflowOpen, setWorkflowOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: slabRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [-36, 36]);

  return (
    <section className={`relative py-16 md:py-24 ${isDark ? "bg-carbon" : "bg-paper"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={slabRef}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-xl overflow-hidden p-10 md:p-16 border ${
            isDark
              ? "bg-dark-surface border-dark-line"
              : "bg-black border-black"
          }`}
        >
          {/* Blueprint grid inside the slab, parallax on scroll */}
          <motion.div
            style={{ y: gridY }}
            className="absolute -top-20 -bottom-20 inset-x-0 blueprint-grid text-white pointer-events-none"
          />

          <div className="relative text-center max-w-3xl mx-auto">
            <span className="font-mono text-[0.7rem] tracking-[0.04em] uppercase text-white/40">
              How I harness AI
            </span>
            <h2 className="mt-4 font-display font-semibold tracking-[-0.015em] leading-[1.08] text-white"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)" }}
            >
              Fast prototypes are easy.
              <br />
              Sustainable systems are engineered.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/65 max-w-2xl mx-auto">
              When code is produced without structure, teams pay later: fragile
              behavior, slow changes, unclear ownership. I run AI through a
              controlled agentic workflow: commands declare intent, specs are
              the contract, and nothing ships unverified.
            </p>
          </div>

          {/* Workflow pipeline, a real ordered process */}
          <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {WORKFLOW_STAGES.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="relative rounded-lg border border-white/12 bg-white/[0.04] p-5 text-left transition-colors duration-300 hover:border-white/30"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[0.66rem] text-white/40">
                    {stage.number}
                  </span>
                  <span className="flex flex-wrap justify-end gap-1">
                    {stage.commands.map((cmd) => (
                      <code
                        key={cmd}
                        className="rounded border border-white/18 bg-black/60 px-1.5 py-0.5 font-mono text-[0.62rem] font-bold text-white/85"
                      >
                        {cmd}
                      </code>
                    ))}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">
                  {stage.title}
                </h3>
                <p className="mt-1.5 text-[0.8rem] leading-5 text-white/55">
                  {stage.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Provenance */}
          <div className="relative mx-auto mt-8 max-w-2xl text-center">
            <p className="text-sm leading-6 text-white/60">
              This isn't a prompt pack. It's a system I've been building and
              honing since the earliest AI-coding setups, before agents were
              anywhere near this capable. The guardrails came first; the agents
              grew into them.
            </p>
          </div>

          {/* Workflow actions */}
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setWorkflowOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/[0.06]"
            >
              <BookOpen size={15} />
              Learn the workflow
            </button>
            <a
              href="/files/AGENTS.md"
              download="AGENTS.md"
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/[0.06]"
            >
              <Download size={15} />
              Download AGENTS.md
            </a>
          </div>
          <p className="relative mt-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.04em] text-white/40">
            Code Constitution available on request, tailored to your stack
          </p>

          {/* CTA */}
          <div className="relative mt-10 text-center">
            <motion.button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md text-sm font-semibold bg-white text-black hover:bg-white/90 transition-colors duration-300 cursor-pointer group"
            >
              Let's build it right
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isWorkflowOpen && (
          <WorkflowModal onClose={() => setWorkflowOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
