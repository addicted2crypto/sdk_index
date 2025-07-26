import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to your TOKEN anyalizer.
        </h1>
        <p className="text-lg text-gray-700">
          This app will provide you with all the blockchain data you need.
        </p>
        <Image
          src="/avax-logo.png"
          alt="AVAX Logo"
          width={200}
          height={200}
          className="rounded-lg shadow-lg"
        />
      </main>
      <footer className="text-center text-gray-500 text-sm row-start-3">
        <p>&copy; 2023 AVAX Token Build App. All rights reserved.</p>
      </footer>
      <div className="absolute bottom-0 left-0 right-0 text-center text-gray-500 text-xs">
        <p>For learning purposes only.</p>
      </div>
    </div>
  );
}
