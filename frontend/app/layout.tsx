﻿import "./globals.css";

export const metadata = {
  title: "Brain Tumor Diagnostics AI",
  description: "AI-assisted MRI scan brain tumor classification system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}