import "./globals.css";

const siteUrl = "https://hassanhashmi.vercel.app";
const description = "Hassan Hashmi is an AI engineer and full-stack developer exploring retrieval, agent systems, evaluation, and useful software.";
const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hassan Hashmi — AI Engineer & Full-Stack Developer",
    template: "%s — Hassan Hashmi",
  },
  description,
  keywords: ["Hassan Hashmi", "AI engineer", "full-stack developer", "LLM applications", "retrieval", "agents", "evaluation"],
  authors: [{ name: "Hassan Hashmi" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Hassan Hashmi",
    title: "Hassan Hashmi — AI Engineer & Full-Stack Developer",
    description,
    locale: "en_US",
    images: [{ url: "/og/og.png", width: 1200, height: 630, alt: "Hassan Hashmi — AI Engineer and Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hassan Hashmi — AI Engineer & Full-Stack Developer",
    description,
    images: ["/og/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
