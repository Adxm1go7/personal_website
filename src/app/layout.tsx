import type { Metadata } from "next";
import "./globals.css";
import StarField from "./components/StarField";

export const metadata: Metadata = {
  title: "Adam Ornoch",
  description: "Personal site of Adam Ornoch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StarField />
        {children}
      </body>
    </html>
  );
}
