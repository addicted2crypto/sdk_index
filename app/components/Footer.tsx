 "use client";
import React from 'react';
import { ModeToggle } from './toggle-mode';

export default function Footer() {
  return (
 <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4">
        <div className=" mx-auto flex flex-col items-center p-2.5 gap-4">
          
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 EVM contract dashboard app. All rights reserved.
          </p>
          <p className="text-center text-gray-500 text-xs mt-1">
            For learning purposes only.
          </p>
          <ModeToggle/>
        </div>
      </footer>
  );
}