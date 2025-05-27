import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Akash Prasher - Software Engineer at Inspect Element | Ex IBM, Grantit",
  description:
    "Experienced Software Engineer with expertise in mobile and web development. Specialized in React, React Native, and Flutter with a proven track record of improving user retention and developer efficiency. Currently building innovative solutions with a focus on AI-powered applications and comprehensive client management systems.",
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
