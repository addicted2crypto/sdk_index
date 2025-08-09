"use client";
import Image from "next/image";
import Footer from './components/Footer';
import ContractInput from './components/ContractInput';
import { Header } from './components/Header';
import { Link, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen items-center jutstify-items-center p-8 pb-20">
        <ExternalLink href="dexscreener.com/avax" target="_blank" className="text-sm text-muted-foreground">
        dexscreener.com/avax
        <span className="ml-1 text-blue-500 hover:underline">View on Dexscreener</span>
        </ExternalLink>
         
      <header className="min-h-screen sticky top-0 z-50">
         <Link href="/" className="flex items-center gap-2"> 
         </Link>
        
         <Header />
        </header>
       <div className='cointainer mx-auto px-4 py-4'>
     
        <div className='flex items-center justify-center'>
          <span>
          <h1 className="text-5xl font-bold">AVAX Token Analyze</h1>
          </span>

        </div>
        
   
         <Image
        aria-hidden="true"
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={60}
          height={60}
          className="ruonded-full"
          priority
        />
        
        </div>
        <h1 className='text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti blanditiis unde aut ratione repudiandae, harum nihil consectetur. Ipsam ex fugit quod ab culpa nam! Harum quod perferendis voluptate nam est.</h1>
        
      
      <div className='pt-10 pb-16'>
        <ContractInput />
      <Footer />
       
      </div>
    </main>
  )
}
