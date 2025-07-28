"use client";
import Image from "next/image";
import Footer from './footer/Footer';
import { Header } from './header/Header';
import ContractInput from './components/ContractInput';

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto px-4 py-16'>
        {/* Will~Header and Content message */}
       <div className="text-center mb-16">
        <Header />
        <h1 className="text-center text-5xl font-bold mb-6">
          Welcome to your TOKEN analyzer
        </h1>
        <h2 className="text-base sm:text-lg text-gray-700 text-center">
          This app will provide you with all the blockchain data you need.
        </h2>
        <Image
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={160}
          height={160}
          className="rounded-lg shadow-lg w-32 sm:w-40"
          priority
        />
    </div>
        <ContractInput />
      </div>
     <Footer />
    </div>
  )
}
