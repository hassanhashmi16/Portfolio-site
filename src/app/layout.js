import "./globals.css";

export const metadata = {
  title: "Portfolio of Hassan Hashmi – Full Stack Web Developer",
  description: "Hi, I’m Hassan Hashmi, a web developer specializing in Next.js, Mongodb, and modern UI design. Explore my projects, skills, and experience. Frontend & full-stack developer portfolio of Hassan Hashmi. Skilled in Next.js, React, Node.js, and building fast, responsive web apps. Discover projects and skills of Hassan Hashmi, a Next.js developer passionate about building sleek, scalable, and user-friendly web experiences"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
