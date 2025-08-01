"use client";
import Image from "next/image";
import Footer from './components/Footer';
import ContractInput from './components/ContractInput';
import { Header } from './components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen h-full">
      <div className="container px-4 py-16 ">
       <div className='text-center mb-6 mt-10'>
        <Header />
        <Image
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={160}
          height={160}
          className="rounded-sm shadow-lg w-32 sm:w-40"
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
