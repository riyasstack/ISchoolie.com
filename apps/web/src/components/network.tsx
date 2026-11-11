"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  ArrowUpRight,
  Plus,
  Send,
  Search,
  Globe2,
  Check,
  Users,
} from "lucide-react";
import { PageHeading } from "./app-shell";
import {
  Avatar,
  Badge,
  Button,
  Empty,
  Meter,
  Modal,
  useNotice,
  usePreviewData,
} from "./ui";
import { courses, people, type Post } from "@/lib/preview";

function PostCard({ post }: { post: Post }) {
  const { saved: savedIds, toggleSave } = usePreviewData();
  const saved = savedIds.includes(post.id);
  const [liked, setLiked] = useState(false),
    [comments, setComments] = useState<string[]>([]),
    [comment, setComment] = useState(""),
    [expanded, setExpanded] = useState(false);
  const notice = useNotice();
  return (
    <article className="post-card panel" id={post.id}>
      <div className="row between">
        <Link href="/app/network" className="row">
          <Avatar name={post.author} />
          <div>
            <strong>{post.author}</strong>
            <p className="metadata">{post.role} · Example profile</p>
          </div>
        </Link>
        <Badge>{post.topic}</Badge>
      </div>
      <p className="post-body">{post.body}</p>
      {post.visual && (
        <div className="post-art">
          <small>THOUGHTS FROM THE CLASSROOM</small>
          <p>
            Less finding answers.
            <br />
            <em>More asking questions.</em>
          </p>
          <span>↗</span>
        </div>
      )}
      <div className="post-counts">
        <span>{post.likes + (liked ? 1 : 0)} example appreciations</span>
        <span>{comments.length} comments</span>
      </div>
      <div className="post-actions">
        <Button
          className="subtle"
          aria-pressed={liked}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
          Appreciate
        </Button>
        <Button
          className="subtle"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <MessageCircle size={17} />
          Discuss
        </Button>
        <Button
          className="subtle"
          aria-pressed={saved}
          aria-label={saved ? "Unsave post" : "Save post"}
          onClick={() => {
            toggleSave(post.id);
            notice(
              saved
                ? "Removed from this preview."
                : "Saved in your preview collection.",
            );
          }}
        >
          <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          <span className="save-label">Save</span>
        </Button>
      </div>
      {expanded && (
        <div className="comments">
          {comments.map((c, i) => (
            <p key={i}>
              <strong>You · Example</strong>
              <br />
              {c}
            </p>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (comment.trim()) {
                setComments([...comments, comment.trim()]);
                setComment("");
              }
            }}
          >
            <label className="sr-only" htmlFor={`comment-${post.id}`}>
              Add a comment
            </label>
            <input
              id={`comment-${post.id}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add to the conversation…"
              maxLength={1000}
              required
            />
            <Button
              type="submit"
              className="small"
              aria-label="Add example comment"
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      )}
    </article>
  );
}
export function Feed() {
  const { posts, addPost } = usePreviewData();
  const [draft, setDraft] = useState(""),
    [open, setOpen] = useState(false),
    [topic, setTopic] = useState("All");
  const [scope, setScope] = useState("For you");
  const notice = useNotice();
  return (
    <>
      <PageHeading
        eyebrow="YOUR EDUCATION NETWORK"
        title="Your learning network."
        description="A little inspiration. A new perspective. Your next connection."
        action={<Badge tone="green">Example network</Badge>}
      />
      <div className="feed-layout">
        <aside className="feed-left-rail" aria-label="Your network context">
          <section className="panel">
            <Avatar name="Alex Morgan" size="large" />
            <h3>Alex Morgan</h3>
            <p>Learning in public. Thinking beyond the classroom.</p>
            <Badge>Example profile</Badge>
            <Link className="text-link" href="/app/profile">
              View profile <ArrowUpRight size={14} />
            </Link>
          </section>
          <section className="panel">
            <h3>Your corner</h3>
            <nav>
              <Link href="/app/network">My network</Link>
              <Link href="/app/communities">Communities</Link>
              <Link href="/app/saved">Saved ideas</Link>
              <Link href="/courses">Discover learning</Link>
            </nav>
          </section>
        </aside>
        <div>
          <div className="composer panel">
            <Avatar name="Alex Morgan" />
            <Modal
              open={open}
              onOpenChange={setOpen}
              title="Share a little inspiration"
              description="This adds an example post to this in-memory preview. No content is published."
              trigger={
                <Button id="compose-post" className="composer-trigger subtle">
                  What are you curious about today?
                </Button>
              }
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (draft.trim()) {
                    addPost({
                      id: `local-${posts.length}`,
                      author: "Alex Morgan",
                      role: "Example learner",
                      topic: "Teaching & learning",
                      body: draft.trim(),
                      likes: 0,
                    });
                    setDraft("");
                    setOpen(false);
                    notice(
                      "Example post added locally. Nothing was published.",
                    );
                  }
                }}
              >
                <label>
                  Your thought
                  <textarea
                    required
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    maxLength={2000}
                    placeholder="A question, a discovery, a new perspective…"
                  />
                </label>
                <div className="row between">
                  <Badge>
                    <Globe2 size={12} /> Preview audience
                  </Badge>
                  <Button type="submit">
                    Add example post
                    <Send size={15} />
                  </Button>
                </div>
              </form>
            </Modal>
          </div>
          <div className="feed-scope-tabs" role="group" aria-label="Feed view">
            {[
              "For you",
              "Following",
              "My network",
              "Institutions",
              "Communities",
            ].map((value) => (
              <Button
                key={value}
                className="subtle"
                aria-pressed={scope === value}
                onClick={() => setScope(value)}
              >
                {value}
              </Button>
            ))}
          </div>
          <div className="filter-row" aria-label="Feed topics">
            {["All", "Teaching & learning", "Science & discovery"].map((t) => (
              <Button
                key={t}
                className={`tab ${topic === t ? "selected" : ""}`}
                onClick={() => setTopic(t)}
                aria-pressed={topic === t}
              >
                {t}
              </Button>
            ))}
          </div>
          <div className="stack">
            {!["For you", "My network"].includes(scope) ? (
              <Empty title={`No ${scope.toLowerCase()} posts in this preview`}>
                This view has no example content. Choose For you to explore the
                local feed.
              </Empty>
            ) : (
              posts
                .filter((p) => topic === "All" || p.topic === topic)
                .map((p) => <PostCard post={p} key={p.id} />)
            )}
          </div>
        </div>
        <aside className="context-rail">
          <section className="panel">
            <div className="row between">
              <h3>Keep your curiosity going</h3>
              <BookMini />
            </div>
            <div className="rail-course-art sage">Aa</div>
            <small>YOUR LEARNING JOURNEY</small>
            <h4>{courses[0].title}</h4>
            <p className="metadata">5 of 12 lessons · Example progress</p>
            <Meter value={42} label="Example learning progress" />
            <Link href="/app/student/player" className="rail-link">
              Continue learning
              <ArrowUpRight size={16} />
            </Link>
          </section>
          <section className="panel">
            <h3>People to learn with</h3>
            {people.slice(0, 3).map((p, i) => (
              <div className="person-mini" key={p.name}>
                <Avatar name={p.name} color={i} />
                <div>
                  <strong>{p.name}</strong>
                  <small>{p.subject} educator</small>
                </div>
                <Link
                  href="/app/network"
                  className="icon-button"
                  aria-label={`Discover ${p.name}`}
                >
                  <Plus size={17} />
                </Link>
              </div>
            ))}
            <Link href="/app/network" className="rail-link">
              Find your people
              <ArrowUpRight size={16} />
            </Link>
          </section>
          <p className="rail-note">
            A place for ideas that move education forward.
            <br />
            All names and activity are example content.
          </p>
        </aside>
      </div>
    </>
  );
}
function BookMini() {
  return <span className="tiny-symbol">↗</span>;
}
export function SavedItems() {
  const { posts, saved } = usePreviewData();
  return (
    <>
      <PageHeading
        eyebrow="SAVED ITEMS"
        title="Ideas worth coming back to."
        description="Your preview collection. Saved posts stay in memory until you refresh."
      />
      <div className="feed-layout">
        <div className="stack">
          {posts
            .filter((p) => saved.includes(p.id))
            .map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          {!saved.length && (
            <Empty title="A little space for inspiration">
              Save a post in your education feed to keep it here.{" "}
              <Link href="/app" className="text-link">
                Explore your world →
              </Link>
            </Empty>
          )}
        </div>
      </div>
    </>
  );
}
export function Network() {
  const [search, setSearch] = useState(""),
    [subject, setSubject] = useState("All"),
    [requests, setRequests] = useState<string[]>([]);
  const matches = people.filter(
    (p) =>
      (subject === "All" || p.subject === subject) &&
      `${p.name} ${p.role}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="MY NETWORK"
        title="People who open new worlds."
        description="Discover educators, exchange ideas, and find your learning community."
      />
      <div className="network-banner">
        <Users size={32} />
        <div>
          <h3>The right connection starts a conversation.</h3>
          <p>
            Example adult professional discovery. Student contact eligibility is
            not implied.
          </p>
        </div>
        <Badge>Professional network preview</Badge>
      </div>
      <div className="filter-row">
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search people"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people or expertise"
          />
        </label>
        <label className="sr-only" htmlFor="subject">
          Subject
        </label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          {["All", "Design", "Science", "Language"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="metadata">{matches.length} example profiles</span>
      </div>
      <div className="people-grid">
        {matches.map((p, i) => (
          <article className="person-card panel" key={p.name}>
            <div className={`person-cover cover-${i % 3}`} />
            <Avatar name={p.name} color={i} size="large" />
            <h3>{p.name}</h3>
            <p className="metadata">{p.role}</p>
            <p>{p.bio}</p>
            <Badge>Example · Not verified</Badge>
            <Button
              className="secondary"
              aria-pressed={requests.includes(p.name)}
              onClick={() =>
                setRequests(
                  requests.includes(p.name)
                    ? requests.filter((n) => n !== p.name)
                    : [...requests, p.name],
                )
              }
            >
              {requests.includes(p.name) ? (
                <>
                  <Check size={16} />
                  Request previewed
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Preview connection
                </>
              )}
            </Button>
          </article>
        ))}
      </div>
      {!matches.length && (
        <Empty title="No people found">Try another name or subject.</Empty>
      )}
    </>
  );
}
export function Communities() {
  const [joined, setJoined] = useState<string[]>([]);
  return (
    <>
      <PageHeading
        eyebrow="COMMUNITIES"
        title="A shared curiosity is a good start."
        description="Find a circle of people who care about the things you do."
      />
      <div className="people-grid">
        {[
          {
            name: "The curious classroom",
            subject: "Teaching practice",
            body: "Questions, reflection, and small experiments that make learning better.",
            color: "sage",
          },
          {
            name: "Design for learning",
            subject: "Design & creativity",
            body: "A space to explore how thoughtful design supports understanding.",
            color: "lavender",
          },
          {
            name: "Everyday science",
            subject: "Science & discovery",
            body: "Finding extraordinary questions in ordinary things.",
            color: "peach",
          },
        ].map((c) => (
          <article className="panel community-card" key={c.name}>
            <div className={`community-symbol ${c.color}`}>
              <Globe2 size={32} />
            </div>
            <Badge>{c.subject}</Badge>
            <h3>{c.name}</h3>
            <p>{c.body}</p>
            <small>Example community · Membership approval required</small>
            <Button
              className="secondary"
              aria-pressed={joined.includes(c.name)}
              onClick={() =>
                setJoined(
                  joined.includes(c.name)
                    ? joined.filter((n) => n !== c.name)
                    : [...joined, c.name],
                )
              }
            >
              {joined.includes(c.name)
                ? "Request previewed · Undo"
                : "Preview join request"}
            </Button>
          </article>
        ))}
      </div>
      <div className="callout space-top">
        Private discussions remain unavailable in this preview. A membership
        request does not unlock restricted content.
      </div>
    </>
  );
}
export function Inbox() {
  return (
    <>
      <PageHeading
        eyebrow="MESSAGES"
        title="A thoughtful conversation starts here."
        description="A calm home for authorized education conversations."
      />
      <div className="inbox-layout panel">
        <aside>
          <label className="search-field">
            <Search size={17} />
            <input
              placeholder="Search conversations"
              aria-label="Search conversations"
              disabled
            />
          </label>
          <Empty title="No authorized conversations">
            Messages will appear after the relevant relationship and policy
            checks.
          </Empty>
        </aside>
        <section>
          <MessageCircle size={44} />
          <h2>Room for a conversation.</h2>
          <p>
            Messaging is restricted in Module 00. Age, consent, relationship,
            and blocking policies must be approved before contact is enabled.
          </p>
          <Link href="/trust" className="text-link">
            Explore the safety approach
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>
    </>
  );
}
