"use client";
import Image from "next/image";
import Footer from './components/Footer';
import ContractInput from './components/ContractInput';
import { Header } from './components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center jutstify-items-center p-8 pb-20 sm:p-20">
    
      <div className="container px-4 py-16 flex items-center justify-between flex-col">
         <Header />
       <div className='container items-center text-center gap-4 mb-8'>
       
        <Image
        aria-hidden="true"
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={330}
          height={330}
          className="mx-auto"
          priority
        />
        </div>
        <h1 className='text-center container'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti blanditiis unde aut ratione repudiandae, harum nihil consectetur. Ipsam ex fugit quod ab culpa nam! Harum quod perferendis voluptate nam est.</h1>
        <ContractInput />
      </div>
      <div className='pt-10 pb-16'>
      <Footer />
      </div>
    </main>
  )
}
