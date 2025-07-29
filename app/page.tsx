"use client";
import Image from "next/image";
import Footer from './components/Footer';
import ContractInput from './components/ContractInput';
import { Header } from './components/Header';

export default function HomePage() {
  return (
   
  
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='text-4xl font-bold px-4 py-16 pt-10 text-center w-max'>
        <Header />
       <Image
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={160}
          height={160}
          className="rounded-md shadow-lg w-32 sm:w-40"
          priority
        />
        <ContractInput />
      </div>
     <Footer />
    </div>
  )
}
