"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Users,
  Building2,
  Globe2,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { Fade } from "@animate-ui/react/primitives/effects/fade";
import {
  Brand,
  Button,
  ActionLink,
  Badge,
  Avatar,
  Meter,
  MotionTabs,
} from "./ui";
import { courses } from "@/lib/preview";

export function BrandReveal() {
  return (
    <div className="brand-reveal" aria-hidden="true">
      <svg viewBox="0 0 200 100">
        <path d="M70 27L100 10l30 17-30 17-30-17M70 45l30 17 30-17M70 63l30 17 30-17" />
        <circle cx="70" cy="27" r="3" />
        <circle cx="130" cy="45" r="3" />
        <circle cx="100" cy="80" r="3" />
      </svg>
      <span>Connected knowledge.</span>
    </div>
  );
}
export function BrandIntro() {
  return (
    <Fade initialOpacity={0.7}>
      <Brand />
    </Fade>
  );
}
export function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="public-header">
      <BrandIntro />
      <nav
        aria-label="Main navigation"
        className={open ? "public-nav open" : "public-nav"}
      >
        <Link href="/discover/network">Discover</Link>
        <Link href="/courses">Learning</Link>
        <Link href="/institutions">For institutions</Link>
        <Link href="/about">Our story</Link>
      </nav>
      <div className="header-actions">
        <Link href="/auth/sign-in" className="text-link">
          Sign in
        </Link>
        <ActionLink href="/auth/register">Get started</ActionLink>
        <Button
          className="icon-button secondary mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
    </header>
  );
}
export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div>
        <Brand />
        <p>Learn. Teach. Connect. Grow.</p>
        <small>Proposed identity · Frontend design preview</small>
      </div>
      <div>
        <Link href="/about">Our story</Link>
        <Link href="/trust">Trust & safety</Link>
        <Link href="/courses">Explore learning</Link>
        <Link href="/institutions">Institutions</Link>
        <Link href="/discover/help">Help & resources</Link>
        <Link href="/discover/legal">Policy drafts</Link>
        <Link href="/discover/pricing">Offering concepts</Link>
        <Link href="/design-lab/screens">All screen designs</Link>
      </div>
      <p>
        Built around the possibility
        <br />
        in every learner.
      </p>
    </footer>
  );
}
export function CourseArt({ color, mark }: { color: string; mark: string }) {
  return (
    <div className={`course-art ${color}`} aria-hidden="true">
      <span className="art-orbit one" />
      <span className="art-orbit two" />
      <span className="art-mark">{mark}</span>
      <span className="art-caption">A LITTLE CURIOSITY GOES A LONG WAY</span>
    </div>
  );
}
export function HeroEntrance() {
  return (
    <div className="ecosystem-preview" aria-hidden="true" inert>
      <div className="mock-toolbar">
        <Brand small />
        <span>
          <i /> Your learning world, connected
        </span>
        <span className="mock-dots">•••</span>
      </div>
      <div className="mock-app">
        <aside className="mock-nav">
          <span className="selected">
            <Globe2 size={17} /> My world
          </span>
          <span>
            <Users size={17} /> My network
          </span>
          <span>
            <BookOpen size={17} /> Learning
          </span>
          <span>
            <MessageCircle size={17} /> Messages
          </span>
          <div className="mock-profile">
            <Avatar name="Alex Morgan" />
            <strong>Alex Morgan</strong>
            <small>A curious mind</small>
          </div>
        </aside>
        <div className="mock-content">
          <div className="row between">
            <div>
              <small>YOUR NEXT CHAPTER</small>
              <h3>Good things grow together.</h3>
            </div>
            <Sparkles size={22} />
          </div>
          <div className="mock-feature">
            <div>
              <Badge tone="green">Continue learning</Badge>
              <h3>
                The art of
                <br />
                thinking clearly.
              </h3>
              <p>With Ananya Rao</p>
              <Meter value={42} label="Example course progress 42 percent" />
            </div>
            <div className="mini-art">
              Aa<span>↗</span>
            </div>
          </div>
          <div className="row mock-post">
            <Avatar name="Kabir Sen" color={1} />
            <div>
              <strong>A question worth exploring</strong>
              <p>What if the classroom was just the beginning?</p>
            </div>
            <Bookmark size={17} />
          </div>
        </div>
        <aside className="mock-rail">
          <p>PEOPLE TO LEARN WITH</p>
          {["Ananya Rao", "Meera Iyer", "Dev Patel"].map((n, i) => (
            <div className="row" key={n}>
              <Avatar name={n} color={i} />
              <div>
                <strong>{n}</strong>
                <small>Educator & curious mind</small>
              </div>
              <span>+</span>
            </div>
          ))}
          <div className="connection-note">
            <span>↗</span>
            <strong>
              One connection.
              <br />A world of possibility.
            </strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
export function PublicHome({ embedded = false }: { embedded?: boolean } = {}) {
  const Content = embedded ? "div" : "main";
  return (
    <>
      {!embedded && <PublicNav />}
      <Content className="v3-home" id={embedded ? undefined : "main-content"}>
        <section className="v3-hero">
          <div className="v3-hero-copy">
            <span className="v3-kicker">
              <span className="live-dot" /> Learn. Teach. Connect. Grow.
            </span>
            <h1>
              Education opens doors.
              <br />
              <span>People open worlds.</span>
            </h1>
            <p>
              Your ideas, your people, your next chapter. Bring learning and the
              connections that move you forward into one place.
            </p>
            <div className="v3-hero-actions">
              <ActionLink href="/auth/register">
                Find your next chapter
              </ActionLink>
              <Link href="#product" className="text-link">
                Explore iSchoolie <ArrowRight size={18} />
              </Link>
            </div>
            <div className="v3-hero-note">
              <ShieldCheck size={16} />
              <span>
                Your identity. Your choices. Institution access verified
                separately.
              </span>
            </div>
          </div>
          <div className="v3-product-scene">
            <div className="v3-scene-caption">
              <span>One connected learning world</span>
              <Badge>Product preview</Badge>
            </div>
            <HeroEntrance />
          </div>
        </section>
        <section id="product" className="v3-product-section">
          <div className="v3-section-intro">
            <span className="v3-kicker">Designed around your next step</span>
            <h2>
              A little curiosity.
              <br />A much bigger world.
            </h2>
            <p>
              Less moving between tools. More room for the people and ideas that
              matter.
            </p>
          </div>
          <div className="v3-editorial-grid">
            <Link href="/app/network" className="v3-editorial-item">
              <Users size={26} />
              <span className="v3-index">01 / Connect</span>
              <h3>Find your kind of curious.</h3>
              <p>
                Meet educators and professionals. Exchange a perspective. Build
                a network with purpose.
              </p>
              <span className="text-link">
                Explore the network <ArrowUpRight size={18} />
              </span>
            </Link>
            <Link href="/courses" className="v3-editorial-item">
              <BookOpen size={26} />
              <span className="v3-index">02 / Learn</span>
              <h3>Make space for what’s next.</h3>
              <p>
                Go deeper into an interest. Pick up a practical skill. Learn at
                a pace that works for you.
              </p>
              <span className="text-link">
                Discover learning <ArrowUpRight size={18} />
              </span>
            </Link>
            <Link href="/institutions" className="v3-editorial-item">
              <Building2 size={26} />
              <span className="v3-index">03 / Grow together</span>
              <h3>A clearer day on campus.</h3>
              <p>
                Bring academic work, communication and everyday administration
                into a focused workspace.
              </p>
              <span className="text-link">
                For institutions <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </section>
        <section className="v3-audience-section">
          <div className="v3-section-intro">
            <span className="v3-kicker">
              Different paths. One connected place.
            </span>
            <h2>Made for your world.</h2>
            <p>A purposeful workspace for every part of education.</p>
          </div>
          <MotionTabs
            label="Explore your iSchoolie workspace"
            items={[
              {
                id: "learner",
                label: "Learners",
                content: (
                  <AudiencePanel
                    label="A little progress, every day."
                    description="Keep your learning in focus. Return to a lesson, organize your notes and build a portfolio of what you discover."
                    href="/app/student"
                    icon={<BookOpen size={40} />}
                    items={[
                      "Your learning, in one place",
                      "Notes that stay with the lesson",
                      "A portfolio that grows with you",
                    ]}
                  />
                ),
              },
              {
                id: "educator",
                label: "Educators",
                content: (
                  <AudiencePanel
                    label="More room for good teaching."
                    description="Shape an idea into a course, prepare for class and connect with other educators. A quiet workspace for meaningful work."
                    href="/app/educator"
                    icon={<Users size={40} />}
                    items={[
                      "A focused course studio",
                      "Classes and tasks at a glance",
                      "Your professional teaching identity",
                    ]}
                  />
                ),
              },
              {
                id: "guardian",
                label: "Families",
                content: (
                  <AudiencePanel
                    label="Stay close to their learning."
                    description="A clear view of school updates, attendance and upcoming work, limited to the children and information you are authorized to see."
                    href="/app/guardian"
                    icon={<ShieldCheck size={40} />}
                    items={[
                      "Clear school communication",
                      "Simple child context",
                      "Privacy at every step",
                    ]}
                  />
                ),
              },
              {
                id: "institution",
                label: "Institutions",
                content: (
                  <AudiencePanel
                    label="Clarity for the whole campus."
                    description="Task-specific registers, calm navigation and contextual approvals. Serious tools for the people who keep education moving."
                    href="/org/example/students"
                    icon={<Building2 size={40} />}
                    items={[
                      "Students and staff, organized",
                      "Readable academic registers",
                      "Scoped actions and review",
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>
        <section className="v3-learning-section">
          <div className="v3-section-line">
            <div>
              <span className="v3-kicker">Follow a spark</span>
              <h2>What will you explore?</h2>
            </div>
            <Link href="/courses" className="text-link">
              Explore the example catalog <ArrowRight size={18} />
            </Link>
          </div>
          <div className="v3-course-grid">
            {courses.slice(0, 3).map((course) => (
              <Link
                href={`/courses/${course.id}`}
                className="v3-course"
                key={course.id}
              >
                <CourseArt color={course.color} mark={course.mark} />
                <div>
                  <span className="v3-index">
                    {course.category} · Example course
                  </span>
                  <h3>{course.title}</h3>
                  <p>{course.teacher}</p>
                  <span className="text-link">
                    View course <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="v3-trust-section">
          <ShieldCheck size={32} />
          <div>
            <span className="v3-kicker">Connection starts with trust</span>
            <h2>
              A world of possibility.
              <br />
              With clear boundaries.
            </h2>
            <p>
              Your public identity, institution permissions and private
              information each have their own place. Our product concepts keep
              those distinctions visible.
            </p>
            <Link href="/trust" className="text-link">
              Our approach to trust <ArrowRight size={18} />
            </Link>
          </div>
        </section>
        <section className="v3-closing">
          <span className="v3-kicker">Your next chapter starts here</span>
          <h2>
            Bring your curiosity.
            <br />
            We’ll make room.
          </h2>
          <ActionLink href="/auth/register">Create your account</ActionLink>
          <p>
            Explore the product preview before you begin. Example content is
            clearly labeled.
          </p>
        </section>
      </Content>
      {!embedded && <PublicFooter />}
    </>
  );
}
function AudiencePanel({
  label,
  description,
  href,
  icon,
  items,
}: {
  label: string;
  description: string;
  href: string;
  icon: import("react").ReactNode;
  items: string[];
}) {
  return (
    <div className="v3-audience-panel">
      <div>
        <h3>{label}</h3>
        <p>{description}</p>
        <ActionLink href={href} secondary>
          Explore this workspace
        </ActionLink>
      </div>
      <div className="v3-audience-outline">
        {icon}
        {items.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
            <ArrowRight size={16} />
          </div>
        ))}
        <small>Interactive design preview · Example data</small>
      </div>
    </div>
  );
}
