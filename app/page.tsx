"use client";
import Image from "next/image";
import Footer from './components/Footer';
import ContractInput from './components/ContractInput';
import { Header } from './components/Header';
import { Link } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen items-center jutstify-items-center p-8 pb-20">
    
      <header className="min-h-screen sticky top-0 z-50">
         <Link href="/" className="flex itmes-center gap-2"> 
        
         
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
          width={220}
          height={330}
          className="justify-center items-center"
          priority
        />
        
        </div>
        <h1 className='text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti blanditiis unde aut ratione repudiandae, harum nihil consectetur. Ipsam ex fugit quod ab culpa nam! Harum quod perferendis voluptate nam est.</h1>
        <ContractInput />
      
      <div className='pt-10 pb-16'>
      <Footer />
      </div>
    </main>
  )
}
