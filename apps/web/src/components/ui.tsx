"use client";
import Link from "next/link";
import {
  createContext,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { AnimateUIProvider } from "@animate-ui/react/provider";
import { ReducedMotionConfig } from "@animate-ui/react/utils/motion";
import {
  Button as AnimatedButton,
  type ButtonProps,
} from "@animate-ui/react/primitives/buttons/button";
import * as Dialog from "@animate-ui/react/primitives/radix-ui/dialog";
import * as Progress from "@animate-ui/react/primitives/radix-ui/progress";
import { ArrowUpRight, X, Check } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsHighlight,
  TabsHighlightItem,
  TabsContents,
  TabsContent,
} from "@animate-ui/react/primitives/tabs";
import { posts as initialPosts, type Post } from "@/lib/preview";
import { createPreviewState, previewReducer } from "@/lib/preview-state";
const PreviewData = createContext<{
  posts: Post[];
  addPost: (post: Post) => void;
  saved: string[];
  toggleSave: (id: string) => void;
}>({
  posts: initialPosts,
  addPost: () => {},
  saved: [],
  toggleSave: () => {},
});
export const usePreviewData = () => useContext(PreviewData);
const Notice = createContext<(message: string) => void>(() => {});
export const useNotice = () => useContext(Notice);
export function Providers({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState("");
  const [{ posts, saved }, dispatch] = useReducer(
    previewReducer,
    initialPosts,
    createPreviewState,
  );
  return (
    <AnimateUIProvider reducedMotion="user" tempo={0.85}>
      <ReducedMotionConfig>
        <PreviewData.Provider
          value={{
            posts,
            addPost: (post) => dispatch({ type: "post-added", post }),
            saved,
            toggleSave: (id) => dispatch({ type: "save-toggled", id }),
          }}
        >
          <Notice.Provider value={setNotice}>
            {children}
            <div className="notice" role="status" aria-live="polite">
              {notice && (
                <>
                  <Check size={18} />
                  <span>{notice}</span>
                  <button
                    aria-label="Dismiss notification"
                    onClick={() => setNotice("")}
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
          </Notice.Provider>
        </PreviewData.Provider>
      </ReducedMotionConfig>
    </AnimateUIProvider>
  );
}
export function MotionTabs({
  items,
  label,
}: {
  items: { id: string; label: string; content: ReactNode }[];
  label: string;
}) {
  return (
    <Tabs defaultValue={items[0].id}>
      <TabsHighlight
        mode="parent"
        className="motion-tab-highlight"
      >
        <TabsList className="motion-tab-list" aria-label={label}>
          {items.map((item) => (
            <TabsHighlightItem key={item.id} value={item.id} asChild>
              <TabsTrigger value={item.id}>{item.label}</TabsTrigger>
            </TabsHighlightItem>
          ))}
        </TabsList>
      </TabsHighlight>
      <TabsContents className="motion-tab-contents">
        {items.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            {item.content}
          </TabsContent>
        ))}
      </TabsContents>
    </Tabs>
  );
}
export function Button({ className = "", ...props }: ButtonProps) {
  return <AnimatedButton className={`button ${className}`} {...props} />;
}
export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Brand({ small = false }: { small?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${small ? "small" : ""}`}
      data-logo-status="preserved-provisional"
      aria-label="iSchoolie home"
    >
      <svg
        width="33"
        height="33"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path d="M7 12L20 5l13 7-13 7L7 12Z" fill="currentColor" />
        <path
          d="M7 20l13 7 13-7M7 28l13 7 13-7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        iSchoolie<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
export function Avatar({
  name,
  color = 0,
  size = "",
}: {
  name: string;
  color?: number;
  size?: string;
}) {
  return (
    <span aria-hidden="true" className={`avatar avatar-${color % 4} ${size}`}>
      {name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")}
    </span>
  );
}
export function Meter({ value, label }: { value: number; label: string }) {
  return (
    <Progress.Root className="progress" value={value} aria-label={label}>
      <Progress.Indicator
        className="progress-fill"
        style={{ width: `${value}%` }}
      />
    </Progress.Root>
  );
}
export function Modal({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  returnFocusTo,
}: {
  trigger?: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  returnFocusTo?: () => HTMLElement | null;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="dialog-content"
          onCloseAutoFocus={(event) => {
            const element = returnFocusTo?.();
            if (element?.isConnected) {
              event.preventDefault();
              element.focus();
            }
          }}
        >
          <div className="row between">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Close className="icon-button" aria-label="Close dialog">
              <X size={20} />
            </Dialog.Close>
          </div>
          <Dialog.Description>{description}</Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="empty">
      <span className="empty-symbol">↗</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
