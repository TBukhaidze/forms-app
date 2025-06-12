import SessionProvider from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
            <Header />
            {children}
          {/* </ThemeProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
