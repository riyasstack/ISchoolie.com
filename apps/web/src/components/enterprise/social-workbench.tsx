"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Send,
  MessageCircle,
  LockKeyhole,
  Users,
  ArrowUpRight,
  Plus,
  Check,
  GraduationCap,
  BriefcaseBusiness,
  BookOpen,
} from "lucide-react";
import { Avatar, Badge, Button, Empty } from "../ui";
import { FormWorkbench } from "./form-workbench";
import type { ScreenSpec } from "../../../../../packages/contracts/frontend";
export function MessageWorkbench({ spec }: { spec: ScreenSpec }) {
  const [thread, setThread] = useState("Teaching practice"),
    [text, setText] = useState(""),
    [messages, setMessages] = useState<Record<string, string[]>>({
      "Teaching practice": [
        "What observation prompt worked well for your example class?",
      ],
      "Resource exchange": [
        "The sample worksheet is described in the resource library.",
      ],
    });
  return (
    <div className="conversation-workbench panel">
      <aside>
        <h3>Example channels</h3>
        {Object.keys(messages).map((t) => (
          <button
            key={t}
            aria-pressed={thread === t}
            className={thread === t ? "active" : ""}
            onClick={() => {
              setThread(t);
              setText("");
            }}
          >
            <Avatar name={t} />
            <span>
              {t}
              <small>Fictional adult / institutional context</small>
            </span>
          </button>
        ))}
        <div className="callout">
          <LockKeyhole size={17} />
          No private child inbox or unrestricted contact.
        </div>
      </aside>
      <section>
        <div className="conversation-heading">
          <h2>{thread}</h2>
          <Badge>Local examples only</Badge>
        </div>
        <div className="message-history" aria-live="polite">
          {messages[thread].map((m, i) => (
            <article
              key={`${thread}-${i}`}
              className={i ? "message local" : "message"}
            >
              <span>{i ? "You · Local draft" : "Example participant"}</span>
              <p>{m}</p>
              <small>Not delivered to anyone</small>
            </article>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!text.trim()) return;
            setMessages({
              ...messages,
              [thread]: [...messages[thread], text.trim()],
            });
            setText("");
          }}
        >
          <label htmlFor="local-message">
            Message preview
            <textarea
              id="local-message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2000}
              required
              placeholder="Write a fictional example message…"
            />
          </label>
          <div className="row between">
            <small>Sending updates this page only.</small>
            <Button type="submit">
              <Send size={16} />
              Add local message
            </Button>
          </div>
        </form>
        <p className="metadata">{spec.policy}</p>
      </section>
    </div>
  );
}
export function DiscussionWorkbench({ spec }: { spec: ScreenSpec }) {
  const [text, setText] = useState(""),
    [replies, setReplies] = useState([
      "Try asking learners to describe before they explain.",
    ]),
    [requested, setRequested] = useState(false);
  return (
    <div className="feed-layout">
      <section className="panel discussion-thread">
        <Badge>Public sample discussion</Badge>
        <h2>What makes a question useful?</h2>
        <div className="row space-top">
          <Avatar name="Ananya Rao" />
          <div>
            <strong>Ananya Rao</strong>
            <p className="metadata">Example educator · Teaching practice</p>
          </div>
        </div>
        <p className="space-top">
          When we ask “What do you notice?” we create room for different
          perspectives. Which prompts invite careful observation in your
          classroom?
        </p>
        <div className="thread-replies">
          {replies.map((r, i) => (
            <article key={i}>
              <Avatar name={i ? "Your example" : "Kabir Sen"} color={1} />
              <div>
                <strong>
                  {i ? "Your local contribution" : "Kabir Sen · Example"}
                </strong>
                <p>{r}</p>
              </div>
            </article>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) {
              setReplies([...replies, text.trim()]);
              setText("");
            }
          }}
        >
          <label>
            Your contribution
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={2000}
              required
            />
          </label>
          <Button type="submit">
            <MessageCircle size={16} />
            Add local reply
          </Button>
        </form>
      </section>
      <aside className="panel task-aside">
        <Users size={27} />
        <h3>The curious classroom</h3>
        <p>Teaching ideas, careful observation, and thoughtful discussion.</p>
        <Badge>Example community</Badge>
        <Button className="secondary" onClick={() => setRequested(!requested)}>
          {requested ? <Check size={16} /> : <Plus size={16} />}{" "}
          {requested
            ? "Request previewed · Undo"
            : "Preview membership request"}
        </Button>
        <div className="callout">
          A request never unlocks private discussions.
        </div>
        {spec.links.map((id) => (
          <Link className="rail-link" href={`/preview/${id}`} key={id}>
            {id}
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </aside>
    </div>
  );
}
export function ProfileWorkbench({ spec }: { spec: ScreenSpec }) {
  const [edit, setEdit] = useState(false);
  const institution = spec.family === "INS" || spec.id === "PUB-12";
  return (
    <>
      <section className="profile-banner">
        <div className="profile-cover" aria-hidden="true" />
        <div className="profile-body">
          <Avatar
            name={institution ? "Example Campus" : "Ananya Rao"}
            size="large"
          />
          <div className="row between wrap">
            <h2>{institution ? "Example Learning Campus" : "Ananya Rao"}</h2>
            <Badge>Example identity · Unverified</Badge>
          </div>
          <p className="profile-headline">
            {institution
              ? "A place for learning, inquiry and community."
              : "Design educator · Helping curious minds see new possibilities"}
          </p>
          <div className="profile-facts">
            <span>
              {institution
                ? "Institution profile concept"
                : "Education professional"}
            </span>
            <span>General location not shared</span>
            <span>No verified affiliation claimed</span>
          </div>
          <div className="row wrap">
            <Button
              className="secondary"
              aria-expanded={edit}
              onClick={() => setEdit(!edit)}
            >
              {edit ? "Return to profile" : "Edit example draft"}
            </Button>
            {!institution && (
              <Link href="/app/profile/onboarding" className="button">
                Build your profile <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>
      {edit ? (
        <FormWorkbench spec={spec} />
      ) : (
        <div className="profile-layout">
          <div className="profile-sections">
            <section className="panel">
              <h3>About</h3>
              <p>{spec.summary}</p>
              <p>
                This self-described profile is an example. Profile information
                does not establish institution membership, teaching credentials
                or permission to contact a student.
              </p>
            </section>
            {spec.sections.filter(([title])=>title.toLowerCase()!=="about").map(([title, body], index) => (
              <section className="panel" key={title}>
                <h3>{title}</h3>
                <div className="profile-section-row">
                  {index % 3 === 0 ? (
                    <GraduationCap size={24} />
                  ) : index % 3 === 1 ? (
                    <BriefcaseBusiness size={24} />
                  ) : (
                    <BookOpen size={24} />
                  )}
                  <div>
                    <p>{body}</p>
                    <span className="metadata">Example profile content</span>
                  </div>
                </div>
              </section>
            ))}
            {!institution && (
              <section className="panel">
                <h3>Skills & interests</h3>
                <div className="profile-skill-list">
                  {[
                    "Learning design",
                    "Visual thinking",
                    "Teaching practice",
                    "Inquiry",
                  ].map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
          <aside className="profile-sidebar">
            <section className="panel">
              <h3>A considered introduction.</h3>
              <p>
                Share the work and experiences that matter to you. Choose what
                others can discover.
              </p>
              <Link href="/app/profile/onboarding" className="text-link">
                Preview profile setup <ArrowUpRight size={16} />
              </Link>
            </section>
            <section className="panel">
              <h3>Keep exploring</h3>
              {spec.links.map((id) => (
                <p key={id}>
                  <Link className="text-link" href={`/preview/${id}`}>
                    Related example {id}
                    <ArrowUpRight size={14} />
                  </Link>
                </p>
              ))}
            </section>
          </aside>
        </div>
      )}
    </>
  );
}
export function DirectoryWorkbench({ spec }: { spec: ScreenSpec }) {
  const [search, setSearch] = useState(""),
    [requested, setRequested] = useState<string[]>([]);
  const rows = spec.rows.filter((r) =>
    r.join(" ").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <label className="directory-search">
        Find a person, subject, or institution
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the example directory"
        />
      </label>
      <div className="directory-grid">
        {rows.map((r, i) => (
          <article className="panel discovery-card" key={r[0]}>
            <div className={`discovery-cover cover-${i % 3}`}>
              <Avatar name={r[0]} color={i} size="large" />
            </div>
            <Badge>Example · Not verified</Badge>
            <h2>{r[0]}</h2>
            {r.slice(1).map((cell, j) => (
              <p key={j}>
                <strong>{spec.columns[j + 1]}</strong>
                {cell}
              </p>
            ))}
            <div className="row wrap">
              <Button
                className="secondary"
                aria-pressed={requested.includes(r[0])}
                onClick={() =>
                  setRequested(
                    requested.includes(r[0])
                      ? requested.filter((n) => n !== r[0])
                      : [...requested, r[0]],
                  )
                }
              >
                {requested.includes(r[0])
                  ? "Request previewed"
                  : "Preview interest"}
              </Button>
              {spec.links[0] && (
                <Link className="text-link" href={`/preview/${spec.links[0]}`}>
                  View example
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
      {!rows.length && (
        <Empty title="No matches">
          Try a different subject, name, or city.
        </Empty>
      )}
    </>
  );
}
