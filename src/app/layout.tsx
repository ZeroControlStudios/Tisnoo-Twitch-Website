import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "TISNOO",
  description: "ZeroControlStudios Creation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-black">
      <body className={`${mono.variable} antialiased selection:bg-white/20`}>
        <div className="ps3-background" />
        {children}
      </body>
    </html>
  );
}
