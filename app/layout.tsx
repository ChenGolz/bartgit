import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "בורסת הבארטר הישראלית",
  description: "פלטפורמת החלפת שירותים קהילתית בישראל",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
