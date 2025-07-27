import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "./header/Header";

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
    <html lang='en' className='h-full'>
      <body className='min-h-screen h-full bg-background'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='flex flex-col items-center justify-center min-h-screen w-full'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
