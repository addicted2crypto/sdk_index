import Image from "next/image";
import { ContractInput } from './contract-input/ContractInput';

import { ModeToggle } from './toggle-mode/toggle-mode';

export default function Home() {
  return (
    <>
    
    <main className="flex p-8">
      <div className= "flex items-center justify-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Welcome to your TOKEN analyzer
        </h1>
        <p className="text-base sm:text-lg text-gray-700 text-center">
          This app will provide you with all the blockchain data you need.
        </p>
        <Image
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={160}
          height={160}
          className="rounded-lg shadow-lg w-32 sm:w-40"
          priority
        />
        <ContractInput />
      </div>
      <footer className="fixed bottom-0 left-3 right-0 bg-white/80 backdrop-blur-sm p-4">
        <div className="max-w-md mx-auto p-2.5 gap-4">
          <ModeToggle />
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 EVM contract dashboard app. All rights reserved.
          </p>
          <p className="text-center text-gray-500 text-xs mt-1">
            For learning purposes only.
          </p>
        </div>
      </footer>
    </main>
    </>
  )
}
