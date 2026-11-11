"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Globe2,
  Users,
  BookOpen,
  MessageCircle,
  Bookmark,
  Bell,
  Search,
  ChevronDown,
  Settings,
  ArrowUpRight,
  PanelLeftClose,
  Menu,
  Building2,
  CalendarDays,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react";
import { Brand, Button, Modal, Avatar, Badge } from "./ui";
import { workspaceLinks, courses, people } from "@/lib/preview";
export function AppShell({
  children,
  workspaceRole,
}: {
  children: ReactNode;
  workspaceRole?: string;
}) {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [command, setCommand] = useState(false);
  const commandFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        if (!command)
          commandFocus.current =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null;
        setCommand(!command);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [command]);
  const role =
    workspaceRole ??
    (path.includes("/guardian")
      ? "Guardian"
      : path.includes("/educator")
        ? "Educator"
        : path.includes("/professional")
          ? "Professional"
          : path.startsWith("/org")
            ? "Institution"
            : path.startsWith("/ops")
              ? "Operations"
              : path.includes("/student")
                ? "Student"
                : "Education network");
  const primary =
    role === "Operations"
      ? [
          { label: "Governance", href: "/ops", icon: LayoutDashboard },
          { label: "Users & identities", href: "/preview/ADM-02", icon: Users },
          { label: "Institutions", href: "/preview/ADM-03", icon: Building2 },
          {
            label: "Security & audit",
            href: "/preview/ADM-16",
            icon: Settings,
          },
          { label: "Moderation", href: "/preview/ADM-06", icon: Globe2 },
          { label: "Support", href: "/preview/ADM-14", icon: HelpCircle },
        ]
      : role === "Institution"
        ? [
            { label: "Students", href: "/org/example/students", icon: Users },
            {
              label: "Attendance",
              href: "/org/example/attendance",
              icon: CalendarDays,
            },
            { label: "Finance", href: "/org/example/finance", icon: Building2 },
          ]
        : role === "Educator"
          ? [
              {
                label: "Overview",
                href: "/app/educator",
                icon: LayoutDashboard,
              },
              {
                label: "Curriculum editor",
                href: "/app/educator/editor",
                icon: BookOpen,
              },
              {
                label: "Attendance",
                href: "/org/example/attendance",
                icon: CalendarDays,
              },
            ]
          : role === "Guardian"
            ? [
                { label: "Children", href: "/app/guardian", icon: Users },
                {
                  label: "School notices",
                  href: "/app/notifications",
                  icon: Bell,
                },
              ]
            : role === "Professional"
              ? [
                  {
                    label: "Availability",
                    href: "/app/professional",
                    icon: CalendarDays,
                  },
                  { label: "Network", href: "/app/network", icon: Users },
                ]
              : [
                  { label: "My world", href: "/app", icon: Globe2 },
                  { label: "My network", href: "/app/network", icon: Users },
                  { label: "Learning", href: "/app/student", icon: BookOpen },
                  {
                    label: "Communities",
                    href: "/app/communities",
                    icon: Globe2,
                  },
                  { label: "Inbox", href: "/app/inbox", icon: MessageCircle },
                  { label: "Saved items", href: "/app/saved", icon: Bookmark },
                ];
  const results = [
    ...courses.map((c) => ({
      label: c.title,
      type: "Course",
      href: `/courses/${c.id}`,
    })),
    ...people.map((p) => ({
      label: p.name,
      type: "Educator",
      href: "/app/network",
    })),
    ...workspaceLinks.map((w) => ({
      label: w.label,
      type: "Workspace preview",
      href: w.href,
    })),
  ].filter((x) => x.label.toLowerCase().includes(search.toLowerCase()));
  return (
    <div
      data-workspace={role}
      className={`app-frame ${collapsed ? "collapsed" : ""}`}
    >
      <div className="preview-strip">
        <span>
          <i /> UI Preview / Example Data
        </span>
        <span>Local interactions · No live transactions</span>
        <Link href="/">
          Public website <ArrowUpRight size={12} />
        </Link>
      </div>
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <Brand />
          <Button
            className="icon-button"
            aria-label={mobile ? "Close navigation" : "Collapse sidebar"}
            onClick={() => {
              setCollapsed(!collapsed);
              setMobile(false);
            }}
          >
            <PanelLeftClose size={18} />
          </Button>
        </div>
        <Modal
          title="Explore a workspace"
          description="These are design contexts with fictional data. Switching does not sign you in or grant permissions."
          trigger={
            <Button
              id="workspace-picker"
              className="workspace-trigger secondary"
            >
              <span className="workspace-symbol">iS</span>
              <span>
                {role}
                <small>Design preview</small>
              </span>
              <ChevronDown size={15} />
            </Button>
          }
        >
          <div className="workspace-list">
            {workspaceLinks.map((w) => (
              <Link key={w.role} href={w.href}>
                {w.label}
                <ArrowUpRight size={17} />
              </Link>
            ))}
            <Link href="/design-lab">
              Design lab
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/design-lab/screens">
              All 180 screen designs
              <ArrowUpRight size={17} />
            </Link>
            <Link href="/design-lab/workflows">
              40 workflow prototypes
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </Modal>
        <p className="nav-label">Your workspace</p>
        <nav aria-label="Workspace navigation">
          {primary.map((n) => (
            <Link
              key={n.href}
              className={path === n.href ? "nav-item active" : "nav-item"}
              href={n.href}
              aria-label={n.label}
              aria-current={path === n.href ? "page" : undefined}
              onClick={() => setMobile(false)}
            >
              <n.icon size={18} />
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <Link
            className="nav-item"
            href="/app/settings"
            aria-label="Preferences"
          >
            <Settings size={18} />
            <span>Preferences</span>
          </Link>
          <Link className="nav-item" href="/trust" aria-label="Trust and help">
            <HelpCircle size={18} />
            <span>Trust & help</span>
          </Link>
          <div className="sidebar-person">
            <Avatar name="Alex Morgan" />
            <div>
              <strong>Alex Morgan</strong>
              <small>Example profile</small>
            </div>
            <Badge>UI</Badge>
          </div>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <div className="row">
            {collapsed && (
              <Button
                className="icon-button expand-sidebar"
                aria-label="Expand sidebar"
                onClick={() => setCollapsed(false)}
              >
                <PanelLeftClose size={18} />
              </Button>
            )}
            <Modal
              open={mobile}
              onOpenChange={setMobile}
              title={`${role} navigation`}
              description="Explore your workspace or choose another design context."
              trigger={
                <Button
                  className="icon-button sidebar-toggle"
                  aria-label="Open navigation"
                >
                  <Menu size={20} />
                </Button>
              }
            >
              <div className="workspace-list">
                {primary.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobile(false)}
                  >
                    {n.label}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
                <p className="metadata space-top">WORKSPACE PREVIEWS</p>
                {workspaceLinks.map((w) => (
                  <Link
                    key={w.role}
                    href={w.href}
                    onClick={() => setMobile(false)}
                  >
                    {w.label}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </Modal>
            <span className="breadcrumb">
              Workspace <span>/</span> {role}
            </span>
          </div>
          <div className="row">
            <Button
              id="command-search"
              className="search-trigger secondary"
              aria-label="Search your world"
              onClick={(event) => {
                commandFocus.current = event.currentTarget;
                setCommand(true);
              }}
            >
              <Search size={16} />
              <span>Search your world</span>
              <kbd>Ctrl K</kbd>
            </Button>
            <Link
              href="/app/notifications"
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={19} />
            </Link>
            <Link href="/app/settings" aria-label="Account preferences">
              <Avatar name="Alex Morgan" size="small" />
            </Link>
          </div>
        </header>
        <main id="main-content" className="workspace-content" key={path}>
          {children}
        </main>
        <footer className="app-footer">
          iSchoolie · Learn. Teach. Connect. Grow.
          <span>Module 00 / Design preview</span>
        </footer>
      </div>
      <nav
        className="mobile-bottom"
        aria-label={`${role} mobile quick navigation`}
      >
        {primary.slice(0, 4).map((n) => (
          <Link
            href={n.href}
            key={n.href}
            aria-current={path === n.href ? "page" : undefined}
          >
            <n.icon size={20} />
            {n.label}
          </Link>
        ))}
        <Link href="/app/settings">
          <Avatar name="Alex Morgan" />
          Profile
        </Link>
      </nav>
      <Modal
        open={command}
        returnFocusTo={() => commandFocus.current}
        onOpenChange={setCommand}
        title="Search your world"
        description="Search example courses, people, and workspace previews."
      >
        <label>
          Search
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try science, Ananya, or guardian"
          />
        </label>
        <div className="search-results">
          {results.map((r) => (
            <Link href={r.href} key={r.label} onClick={() => setCommand(false)}>
              <span>
                {r.label}
                <small>{r.type}</small>
              </span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
          {!results.length && <p>No matches. Try another search.</p>}
        </div>
      </Modal>
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="section-kicker">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
