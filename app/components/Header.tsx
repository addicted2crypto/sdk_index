"use client";
import { Button } from '@/components/ui/button';
import React from "react";

export function Header() {
  return (
    <div className="flex flex-col justify-center py-4 bg-white shadow">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Token Analyzer</h1>
        <p className="text-sm text-gray-500 text-center">
          Welcome to your blockchain token indexer
        </p>
         {/* Will~Header and Content message */}
       <div className="text-center mb-16">
        <div className='fixed top-4 right-4'>
          
          
          <Button>
            test
          </Button>
        </div>
        <div />
        <h1 className="text-center text-5xl font-bold mb-6">
          Welcome to your TOKEN analyzer
        </h1>
        <h2 className="text-base sm:text-lg text-gray-700 text-center">
          This app will provide you with all the blockchain data you need.
        </h2>
        
    </div>
      </div>
    </div>
  );
}