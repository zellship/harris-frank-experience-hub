import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harris & Frank Experience Hub",
  description:
    "Presentación, demostración y propuesta ejecutiva para la evolución operativa de Harris & Frank.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
