import { ThemeProvider } from "@/components/ui/theme-provider";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Token Analyzer",
  description: "Welcome to your blockchain token indexer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    
    <html lang='en'suppressHydrationWarning>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          
            {children}
         
        </ThemeProvider>
      </body>
    </html>
    </>
  );
}
