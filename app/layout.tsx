import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Akash Prasher - Software Engineer at Inspect Element | Ex IBM, Grantit",
  description: "Akash Prasher - Software Engineer - Portfolio - Akash Prashar",
  generator: "Akash Prasher",
  keywords: [
    "Akash Prasher",
    "Software Engineer",
    "Portfolio",
    "Akash Prashar",
    "Software Developer",
    "Kangra",
    "Himachal Pradesh",
    "Hong Kong",
    "IBM",
    "Grantit",
    "India",
    "React",
    "React Native",
    "Flutter",
    "Node.js",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
  ],
  icons: {
    icon: "/ap-circle.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
