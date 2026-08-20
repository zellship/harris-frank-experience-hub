import type { Metadata } from "next";
import "./globals.css";
import { sitePath } from "./site-path";

export const metadata: Metadata = {
  title: "Harris & Frank Experience Hub",
  description:
    "Presentación, demostración y propuesta ejecutiva para la evolución operativa de Harris & Frank.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: sitePath("/favicon.svg"),
    shortcut: sitePath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
