import React from "react";

export function Header() {
  return (
    <header className="w-full flex justify-center py-4 bg-white shadow">
      <div className="max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">Token Analyzer</h1>
        <p className="text-sm text-gray-500 text-center">
          Welcome to your blockchain token indexer
        </p>
      </div>
    </header>
  );
}