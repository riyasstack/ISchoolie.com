"use client";
import Link from "next/link";
import { useId, type ReactElement, type ReactNode } from "react";
import * as Tooltip from "@animate-ui/react/primitives/radix-ui/tooltip";
import * as Popover from "@animate-ui/react/primitives/radix-ui/popover";
import * as Menu from "@animate-ui/react/primitives/radix-ui/dropdown-menu";
import { ChevronRight, X } from "lucide-react";
export function Hint({
  label,
  children,
}: {
  label: string;
  children: ReactElement;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="product-tooltip" sideOffset={8}>
            {label}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
export function ContextPopover({
  title,
  trigger,
  children,
}: {
  title: string;
  trigger: ReactElement;
  children: ReactNode;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="product-popover"
          sideOffset={8}
          align="start"
          aria-label={title}
        >
          <div className="row between">
            <h3>{title}</h3>
            <Popover.Close
              className="icon-button"
              aria-label="Close contextual panel"
            >
              <X size={18} />
            </Popover.Close>
          </div>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
export function ActionMenu({
  trigger,
  label,
  items,
}: {
  trigger: ReactElement;
  label: string;
  items: { label: string; disabled?: boolean; onSelect: () => void }[];
}) {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{trigger}</Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          className="product-menu"
          sideOffset={8}
          align="end"
          aria-label={label}
        >
          {items.map((item) => (
            <Menu.Item
              key={item.label}
              disabled={item.disabled}
              onSelect={item.onSelect}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
export function DateField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}) {
  const id = useId();
  return (
    <label htmlFor={id}>
      {label}
      <input
        type="date"
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        min={min}
        max={max}
      />
    </label>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="product-breadcrumb">
        {items.map((item, index) => (
          <li key={`${item.label}:${index}`}>
            {index > 0 && <ChevronRight size={14} aria-hidden />}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function LoadingSkeleton({
  label = "Loading content",
}: {
  label?: string;
}) {
  return (
    <div className="product-skeleton" role="status" aria-busy="true">
      <span className="sr-only">{label}</span>
      <span aria-hidden />
      <span aria-hidden />
      <span aria-hidden />
    </div>
  );
}
