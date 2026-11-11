import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../../packages/design-tokens/foundation.css";
import "./globals.css";
import "./enterprise.css";
import "./product-v3.css";
import { Providers } from "@/components/ui";
import { Suspense, type CSSProperties } from "react";
import tokens from "../../../../packages/design-tokens/tokens.json";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "iSchoolie — Learn. Teach. Connect. Grow.",
    template: "%s | iSchoolie",
  },
  description:
    "An education network connecting people, knowledge, learning, institutions, and opportunity. Frontend design preview.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body
        style={
          Object.fromEntries(
            Object.entries(tokens.color).map(([key, value]) => [
              `--${key}`,
              value,
            ]),
          ) as CSSProperties
        }
      >
        <Providers>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <Suspense
            fallback={
              <div className="auth-boundary" role="status">
                <p>Opening your learning world…</p>
              </div>
            }
          >
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
