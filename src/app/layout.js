import "./globals.css";

export const metadata = {
  title: "Hassan Hashmi — AI Engineer & Full-Stack Developer",
  description: "Hassan Hashmi is an AI engineer and full-stack developer exploring retrieval, agent systems, evaluation, and useful software.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
